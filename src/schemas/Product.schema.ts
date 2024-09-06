import { SchemaFactory } from '@nestjs/mongoose';
import { Product } from 'src/product/entities/product.entity';


export const ProductSchema = SchemaFactory.createForClass(Product);

