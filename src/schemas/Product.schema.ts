import { SchemaFactory } from '@nestjs/mongoose';
import { Product } from 'src/product/entities/product.entity';
import { Subscription } from 'src/product/entities/subscription.entity';


export const ProductSchema = SchemaFactory.createForClass(Product);

