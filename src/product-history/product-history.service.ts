import { Injectable } from '@nestjs/common';
import { UpdateProductHistoryDto } from './dto/update-product-history.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductHistory } from './entities/product-history.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { SocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class ProductHistoryService {
  constructor(
    @InjectModel('ProductHistory') private readonly productHistoryModel: Model<ProductHistory>,
    private readonly socketService: SocketGateway,
  ) {}

  @OnEvent('cvupdate')
  async recordChange(oldDto:UpdateProductHistoryDto,newDto : UpdateProductHistoryDto , type: Changetype,productId:string,productName:string ): Promise<ProductHistory> {
    var action ="";

    if(type === Changetype.UPDATE){
      if(oldDto.price !== newDto.price || oldDto.discount !== newDto.discount){
        action = productName +"price has been updated from "+oldDto.price+" to "+newDto.price+" and discount from "+oldDto.discount+" to "+newDto.discount;
        //emit to socketio
        
      }
      if(oldDto.availability !== newDto.availability){
        action = (newDto.availability) ? productName+" is now available" : productName+" is now unavailable";
        //emit to socketio
      }
    }
    if(type === Changetype.DELETE){
      action = productName+" has been deleted";
      //emit to socketio
    }

    this.socketService.server.to(productId).emit('productUpdate', {action});

    const newRecord = new this.productHistoryModel({
      productId,
      action,
      type,
    });
    return await newRecord.save();
  }

  async getHistoryForProduct(productId: string): Promise<ProductHistory[]> {
    return await this.productHistoryModel.find({ productId }).exec();
  }
  
}
