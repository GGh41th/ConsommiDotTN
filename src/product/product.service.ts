import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product } from "./entities/product.entity";
import { ImageService } from "src/image/image.service";
import axios from "axios";
import * as process from "process";
import { User } from "../users/entities/user.entity";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { UpdateProductHistoryDto } from "../product-history/dto/update-product-history.dto";

const FormData = require("form-data");

require("dotenv").config();
const fs = require("fs").promises;

@Injectable()
export class ProductService {
  constructor(
    @InjectModel("Product") private readonly productModel: Model<Product>,
    private readonly imageService: ImageService,
    private readonly eventEmitter: EventEmitter2,
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

  pathFromId(id: string, index: number): string {
    return `uploads/products/${id}/${index}.jpg`;
  }

  async create(
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
    const productDocument = new this.productModel(newProduct);
    productDocument.id = productDocument._id.toString();
    const added = await productDocument.save();
    console.log(imageId);
    if (imageId) {
      try {
        await fs.mkdir(`uploads/products/${added.id}`);
        await fs.rename(
          `uploads/temp/${imageId}.jpg`,
          this.pathFromId(added.id, 0),
        );
        productDocument.images = [this.pathFromId(added.id, 0)];
      } catch (e) {
        console.log("Image Not Found ! ");
      }
    }
    productDocument.save();
    return added.id;
  }

  async discover(imageContent) {
    const id = require("uuid").v4();
    // TODO  : Forward Image to ML Model
    // const imageDiscovery = await this.discoverImage(imageContent);
    // console.log(imageDiscovery);
    await fs.writeFile(`uploads/temp/${id}.jpg`, Buffer.from(imageContent));

    return { id: id, details: {} };
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

  async addImage(product: Product, imageFile: Express.Multer.File) {
    const indecies = product.images.map((path) =>
      Number(path.split("/").pop().split(".")[0]),
    );
    const next = indecies.length == 0 ? 0 : Math.max(...indecies) + 1;
    await fs.mkdir(`uploads/products/${product.id}`, { recursive: true });
    const path = this.pathFromId(product.id, next);
    await fs.writeFile(path, Buffer.from(imageFile.buffer));
    await this.productModel.findByIdAndUpdate(product.id, {
      images: [...product.images, path],
    });
    return path;
  }

  async getProductOwner(productId: string) {
    const product = await this.productModel
      .findOne({ id: productId })
      .populate("owner")
      .lean()
      .exec();
    if (!product) {
      throw new NotFoundException("Product not found");
    }

    return User.fromDoc(product.owner);
  }

  async findAll(): Promise<Product[]> {
    return (await this.productModel.find().lean().exec()).map((doc) =>
      Product.fromDoc(doc),
    );
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    //get the product
    const product = await this.productModel.findById(id).exec();
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    //emit the event
    const oldDto = new UpdateProductHistoryDto(
      product.price,
      product.discount,
      product.isAvailable,
    );
    const newDto = new UpdateProductHistoryDto(
      updatedProduct.price,
      updatedProduct.discount,
      updatedProduct.isAvailable,
    );
    this.eventEmitter.emit(
      "cvupdate",
      oldDto,
      newDto,
      product.id,
      product.name,
    );

    return updatedProduct;
  }

  async remove(id: string): Promise<Product> {
    const removedProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!removedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return removedProduct;
  }

  async getFiltered(
    category: string,
    pageNumber: number = 1,
    sortBy: string,
    pageSize = 21,
  ) {
    const query = this.productModel;
    const filter: any = {};
    if (category) filter.category = category;

    if (!pageNumber && pageNumber < 1) pageNumber = 1;

    const results = await query
      .find(filter)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean()
      .exec();

    return Product.fromArray(results);
  }

  async findByUserId(id) {
    return (await this.productModel.find({ owner: id }).lean().exec()).map(
      (doc) => Product.fromDoc(doc),
    );
  }

  /**
   * Search for products by name.
   * @param name The name of the product to search for.
   */
  async searchByName(name: string): Promise<Product[]> {
    const products = await this.productModel
      .find({ name: { $regex: name, $options: "i" } })
      .lean()
      .exec();

    return products.map((doc) => Product.fromDoc(doc));
  }

  async isOwner(prod: Product, user: User): Promise<void> {
    if (prod.owner.toString() !== user.id.toString())
      throw new ForbiddenException("This Product is not yours");
  }

  async getImageLink(prod: Product, index: number) {
    if (prod.images && prod.images.length === 0)
      return "uploads/products/default.jpg";
    if (prod.images.length <= index || index < 0)
      throw new NotFoundException(`Image N° ${index + 1} cannot be found`);
    return prod.images[index];
  }

  async getAllImages(id: string) {
    const prod = await this.findOne(id);
    if (!prod) throw new NotFoundException("Product not found");
    return prod.images;
  }

  async changeImage(prod: Product, file, index: number) {
    if (!Boolean(prod.images) || !prod.images[index])
      throw new NotFoundException(`Image with index ${index} is not found`);
    // await fs.rm(prod.images[index]);
    console.log(file);
    console.log("inside change image handler");
    await fs.writeFile(prod.images[index], Buffer.from(file.buffer));
  }
}
