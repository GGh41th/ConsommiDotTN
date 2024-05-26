import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "./entities/product.entity";
import { ImageService } from "src/image/image.service";
import axios from "axios";
import * as process from "process";

const FormData = require("form-data");

require("dotenv").config();
const fs = require("fs").promises;

@Injectable()
export class ProductService {
  constructor(
    @InjectModel("Product") private readonly productModel: Model<Product>,
    private readonly imageService: ImageService,
  ) {}

  /**
   * Upload Product Object into Database ! Highly Recommended for any save
   * @param product : Product
   *
   */
  async add(product: Product) {
    const productDocument = new this.productModel(product);
    productDocument.id = productDocument._id.toString();
    return await productDocument.save();
  }

  /**
   *
   * @param createProductDto
   * @param imageId
   * @param userId
   */
  async submit(
    createProductDto: CreateProductDto,
    userId: string,
    imageId?: string,
  ) {
    // start with getting the image
    let imagePromise = null;

    let newProduct = new Product(userId);
    newProduct = {
      ...newProduct,
      ...createProductDto,
    };
    let added = await this.add(newProduct);
    if (imageId) {
      try {
        await fs.mkdir(`uploads/products/${added.id}`);
        await fs.rename(
          `uploads/temp/${imageId}.jpg`,
          `uploads/products/${added.id}/0.jpg`,
        );
      } catch (e) {}
    }
    return Product.fromDoc(added);
  }

  async discover(imageContent) {
    const id = require("uuid").v4();
    // TODO  : Forward Image to ML Model
    // const imageDiscovery = await this.discoverImage(imageContent);
    // console.log(imageDiscovery);
    await fs.writeFile(`uploads/temp/${id}.jpg`, Buffer.from(imageContent));

    return { id: id };
  }

  async discoverImage(imageBuffer) {
    try {
      // Create a form and append the image buffer
      const form = new FormData();
      form.append("file", imageBuffer, {
        filename: "image.jpg", // Filename
        contentType: "image/jpeg", // Mime type
      });

      const url = `${process.env.ML_MODEL_URL}/classify`; // Replace with your target URL
      const response = await axios.post(url, form, {
        headers: {
          ...form.getHeaders(),
        },
      });
      // Send the request
      return response.data;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
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
