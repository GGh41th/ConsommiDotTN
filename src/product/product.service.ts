import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "./entities/product.entity";
import { ImageService } from "src/image/image.service";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel("Product") private readonly productModel: Model<Product>,
    private readonly imageService: ImageService,
  ) {}

  async add(product: Product) {
    const productDocument = new this.productModel(product);
    productDocument.id = productDocument._id.toString();
    return await productDocument.save();
  }

  async create(createProductDto: CreateProductDto, userid: string) {
    const image = createProductDto.image;
    delete createProductDto.image;
    let newProduct = new Product(userid);
    newProduct = {
      ...newProduct,
      ...createProductDto,
    };

    let added = await this.add(newProduct);
    this.imageService.changeImagepath(image, added.id);

    return Product.fromDoc(added);
  }

  async getProductOwner(productId: string) {
    const product = await this.productModel
      .findOne({ id: productId })
      .populate("owner")
      .exec();
    if (!product) {
      throw new NotFoundException("Product not found");
    }

    return product.owner;
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
