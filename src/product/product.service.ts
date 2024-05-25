import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import * as fs from 'fs';
import { ImageService } from 'src/image/image.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProductService {
constructor
(
  @InjectModel('Product') private readonly productModel: Model<Product>,
  private readonly imageService: ImageService,
) {}


  create(createProductDto: CreateProductDto,userid: string) {
    const uuid= require('uuid');
    const image = createProductDto.image;
   
    delete createProductDto.image;
    const newProduct = {
      id: uuid.v4(),
      ...createProductDto,
      image: [image],
      owner: userid,
    };
    
    const product = new this.productModel(newProduct);
    this.imageService.changeImagepath(image, newProduct.id);
    
 
    return product.save();
  }
  
  async getProductOwner(productId: string) {
    const product = await this.productModel.findOne({ id: productId }).populate('owner').exec();
    if (!product) {
      throw new NotFoundException('Product not found');
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
