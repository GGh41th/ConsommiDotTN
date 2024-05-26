import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/message.entity';
import { Product } from 'src/product/entities/product.entity';
import { CreateMessageDto } from './dto/send-message.dto';
import { ChatGateway } from './conversation.gateway';


@Injectable()
export class ConversationService {
  constructor(
    @InjectModel('Conversation') private readonly conversationModel: Model<Conversation>,
    @InjectModel('Message') private readonly messageModel: Model<Message>,
   
    
  ) {}

  async sendMessage(messageDto: CreateMessageDto, userId: string) {
    const { conversationId, content } = messageDto;

    const conversation = await this.conversationModel.findById(conversationId).populate('product').exec();
    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    // Determine if the sender is the seller or the client
    const senderIsSeller = String(conversation.product.owner) === userId;

    const message = new this.messageModel({
      sender: senderIsSeller,
      content,
      createdAt: new Date(),
      conversation: conversationId
    });

    await this.addMessage(message)

    conversation.messages.push(message.id);
    await conversation.save();

    return message;
  }

  async getConversation(product :string,user: any){
    //search for conversation with product id and user id
    const conversation =await  this.conversationModel.findOne({product:product,client:user.id});
    if(!conversation){
      //if not found create a new conversation
      const newConversation = new this.conversationModel({
        client:user.id,
        product:product
      });
      const conversation = newConversation.save();
      return this.getMessages(newConversation.id,user);

    }
    return this.getMessages(conversation.id,user);
  }

  async getMessages(conversationId: string,user) {
    const conversation = await this.conversationModel.findById(conversationId).populate('product').exec();
    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    if (String(conversation.client) !== user.id && String(conversation.product.owner) !== user.id) {
      throw new NotFoundException('Conversation not found');
    }

    const messages = await this.messageModel.find({ conversation: conversationId }).exec();
    return messages;
  }


  async addMessage(message: Message){
    const messageDocument = new this.messageModel(message);
    messageDocument.id = messageDocument._id.toString();
    return await messageDocument.save();
  }
  async addConversation(conversation: Conversation){
    const conversationDocument = new this.conversationModel(conversation);
    conversationDocument.id = conversationDocument._id.toString();
    return  await conversationDocument.save();
  }
}
