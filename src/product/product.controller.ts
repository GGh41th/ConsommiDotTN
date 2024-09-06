import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../auth/decorators/user.decorator";
import { User } from "../users/entities/user.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { Category } from "../enum/product-category.enum";
import { ProductByIdPipe } from "./pipe/porduct-by-id.pipe";
import { Product } from "./entities/product.entity";
import { Roles } from "../auth/roles/roles.decorator";
import { RolesGuard } from "../auth/roles/roles.guard";
import { Role } from "../enum/user-role.enum";

@ApiTags("product")
//@Roles(['admin'])
@Controller("product")
@UseGuards(RolesGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Put("/:id/image/change/:index?")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: memoryStorage(), // Use memory storage
    }),
  )
  async changeImage(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: User,
    @Param("id", ProductByIdPipe) product: Product,
    @Param("index", new DefaultValuePipe(0), ParseIntPipe) index: number,
  ) {
    await this.productService.isOwner(product, user);
    return this.productService.changeImage(product, file, index);
  }

  @Get("filter")
  async getFiltered(
    @Query("category") category: string,
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) pageNumber: number,
    @Query("pageSize", new DefaultValuePipe(21), ParseIntPipe) pageSize: number,
    @Query("sortBy") sortBy: string,
  ) {
    return this.productService.getFiltered(
      category,
      pageNumber,
      sortBy,
      pageSize,
    );
  }

  @Get(":id/images")
  async getAllImages(
    @Param("id") id: string,
    @Param("index", new DefaultValuePipe(-1), ParseIntPipe) index: number,
  ) {
    return this.productService.getAllImages(id);
  }

  @Get("categories")
  async getAllCategories() {
    return Object.values(Category);
  }

  @Post("/create/:imageId?")
  @Roles([Role.MERCHANT])
  async submit(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: User,
    @Param("imageId") imageId: string,
  ) {
    const id = await this.productService.create(
      createProductDto,
      user.id,
      imageId,
    );
    return { id };
  }

  @Roles([Role.MERCHANT])
  @Post("/discover")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: memoryStorage(), // Use memory storage
    }),
  )
  async discover(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: User,
  ) {
    if (!file) throw new BadRequestException("Image must no be empty");
    return this.productService.discover(file.buffer);
  }

  @Roles([Role.MERCHANT])
  @Post("/price")
  async predictPrice(@Body() product: { category: string; details: any }) {
    return this.productService.predictPrice(product);
  }

  @Post("/:id/image/add")
  @Roles([Role.MERCHANT])
  @UseInterceptors(
    FileInterceptor("file", {
      storage: memoryStorage(), // Use memory storage
    }),
  )
  async addImage(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: User,
    @Param("id", ProductByIdPipe) product: Product,
  ) {
    await this.productService.isOwner(product, user);
    return this.productService.addImage(product, file);
  }

  @Get(":id/image/:index?")
  async getImageLink(
    @Param("id", ProductByIdPipe) product: Product,
    @Param("index", new DefaultValuePipe(0), ParseIntPipe) index: number,
  ) {
    return this.productService.getImageLink(product, index);
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Roles([Role.MERCHANT])
  @Get("property")
  async getMyProducts(@CurrentUser() user) {
    return this.productService.findByUserId(user.id);
  }

  @Get("owner/:id")
  async getProductOwner(@Param("id") id: string) {
    return this.productService.getProductOwner(id);
  }

  @Roles([Role.MERCHANT])
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Roles([Role.MERCHANT])
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productService.remove(id);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const product = await this.productService.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  @Get("search/:name")
  async search(@Param("name") name: string) {
    return this.productService.searchByName(name);
  }
}
