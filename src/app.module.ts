import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose } from 'mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';


@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI),
    ConfigModule.forRoot({isGlobal: true}),
    UsersModule
   ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
