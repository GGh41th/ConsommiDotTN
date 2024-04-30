import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
constructor
(
  @InjectModel('Product') private readonly productModel: Model<Product>,
) {}


  create(createProductDto: CreateProductDto) {
    const uuid= require('uuid');
    const newProduct = {
      id: uuid.v4(),
      ...createProductDto,
    };
    console.log(newProduct);
    const product = new this.productModel(newProduct);
    return product.save();
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
