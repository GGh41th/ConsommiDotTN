import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/schemas/Product.schema';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import path from 'path';
import { ImageModule } from 'src/image/image.module';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: ProductSchema,
        discriminators: [
          { name: 'Clothes', schema: ProductSchema },
          { name: 'Tech', schema: ProductSchema },
        ],
      },
    ]),
    ImageModule
    
    
  ],

  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
