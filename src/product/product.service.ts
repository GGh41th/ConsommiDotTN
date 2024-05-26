import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  ClothesDetails,
  FurnitureDetails,
  JewelryDetails,
  Product,
  TechDetails,
} from "./entities/product.entity";
import { ImageService } from "src/image/image.service";
import { Category } from "../enum/product-category.enum";

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

  create(createProductDto: CreateProductDto, userid: string) {
    const image = createProductDto.image;
    delete createProductDto.image;
    let newProduct = new Product(userid);
    let detail:
      | ClothesDetails
      | TechDetails
      | JewelryDetails
      | FurnitureDetails
      | Details;
    switch (createProductDto.category) {
      case Category.ALIMENTATION:
        break;
      case Category.ANIMAL:
      case Category.CAR:
      case Category.CLOTHES:
      case Category.FURNITURE:
      case Category.JEWELRY:
      case Category.TECH:
    }
    createProductDto.details.newProduct = {
      ...newProduct,
      ...createProductDto,
    };

    const product = new this.productModel(newProduct);
    this.imageService.changeImagepath(image, newProduct.id);

    return product.save();
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
