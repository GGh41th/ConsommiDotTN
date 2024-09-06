import { Module } from '@nestjs/common';
import { ProductHistoryService } from './product-history.service';
import { ProductHistoryController } from './product-history.controller';
import { SocketModule } from 'src/socket/socket.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductHistory, ProductHistorySchema } from './entities/product-history.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ProductHistory.name, schema: ProductHistorySchema }]),
    SocketModule,
  ],
  controllers: [ProductHistoryController],
  providers: [ProductHistoryService],
  exports: [ProductHistoryService],
})
export class ProductHistoryModule {}
