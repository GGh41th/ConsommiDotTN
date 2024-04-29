import { SchemaFactory } from '@nestjs/mongoose';
import { Product } from 'src/product/entities/product.entity';
import { Subscription } from 'src/product/entities/subscription.entity';
import { Tech } from 'src/product/entities/tech.entity';
import { Clothes } from 'src/users/entities/clothes.entity';

export const ProductSchema = SchemaFactory.createForClass(Product);

export const ClothesSchema = SchemaFactory.createForClass(Clothes);

export const TechSchema = SchemaFactory.createForClass(Tech);

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
