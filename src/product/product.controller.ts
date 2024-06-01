import {
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

@ApiTags("product")
//@Roles(['admin'])
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

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

  @Get("categories")
  async getAllCategories() {
    return Object.values(Category);
  }

  @Post("/create/:imageId?")
  @UseGuards(JwtAuthGuard)
  submit(
    @Body() createProductDto: CreateProductDto,
    @CurrentUser() user: User,
    @Param("imageId") imageId: string,
  ) {
    return this.productService.create(createProductDto, user.id, imageId);
  }

  @Post("/discover")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor("file", {
      storage: memoryStorage(), // Use memory storage
    }),
  )
  discover(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: User,
  ) {
    console.log(file.buffer);
    return this.productService.discover(file.buffer);
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get("property")
  async getMyProducts(@CurrentUser() user) {
    return this.productService.findByUserId(user.id);
  }

  @Get("owner/:id")
  async getProductOwner(@Param("id") id: string) {
    return this.productService.getProductOwner(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
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
  @Get('search/:name')
  async search(@Param('name') name: string) {
    return this.productService.searchByName(name);
  }
}
