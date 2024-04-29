import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI),
    ConfigModule.forRoot({isGlobal: true}),
    UsersModule,
    
   ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
