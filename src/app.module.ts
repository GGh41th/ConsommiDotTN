import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles/roles.guard';
import { ImageModule } from './image/image.module';

dotenv.config();
@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI||"mongodb+srv://consommi:consommi@mainnode.m4kefk0.mongodb.net/?retryWrites=true&w=majority&appName=MainNode"
),
    ConfigModule.forRoot({isGlobal: true}),
    UsersModule,
    ProductModule,
    AuthModule,
    ImageModule
   ],
  controllers: [AppController],
  providers: [ AppService,
    {
      provide: APP_GUARD, // Use APP_GUARD token
      useClass: RolesGuard, // Specify the guard class
    },]

})
export class AppModule {}
