import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/message.entity';
import { Product } from 'src/product/entities/product.entity';
import { CreateMessageDto } from './dto/send-message.dto';
//import { ChatGateway } from './conversation.gateway';
import { UsersService } from 'src/users/users.service';
import { ProductService } from 'src/product/product.service';


@Injectable()
export class ConversationService {
  constructor(
    @InjectModel('Conversation') private readonly conversationModel: Model<Conversation>,
    @InjectModel('Message') private readonly messageModel: Model<Message>,
    private readonly productService  : ProductService
    
  ) {}

  async sendMessage(messageDto: CreateMessageDto, userId: string) {
    const { conversationId, content } = messageDto;

    const conversation = await this.conversationModel.findById(conversationId).populate('product').lean().exec();
    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }
    const prod  = await this.productService.findOne(conversation.product);

    // Determine if the sender is the seller or the client
    const senderIsSeller = prod.owner.toString() === userId;

    const message = new this.messageModel({
      sender: senderIsSeller,
      content,
      createdAt: new Date(),
      conversation: conversationId
    });

    await this.addMessage(message);

    conversation.messages.push(message.id);
    await this.conversationModel.updateOne({ id: conversation.id }, conversation);

    return message;
  }

  async getConversation(product: string, user: any) {
    // Search for conversation with product ID and user ID
    let conversation = await this.conversationModel
      .findOne({ product, client: user.id })
      .populate('product')
      .lean()
      .exec();
  
    if (!conversation) {
      console.log('conversation not found');
      // If not found, create a new conversation
      var newconv= new this.conversationModel({
        client: user.id,
        product,
        messages: []
      });

      newconv=await this.addConversation(newconv);
      return await  this.getMessages(newconv._id.toString(), user);
      
    }
  const prod  = await this.productService.findOne(product);
    // Check if the user is either the client or the owner of the product
    if (conversation.client.toString() !== user.id && prod.owner.toString()!== user.id) {
      throw new NotFoundException('Conversation not found');
    }
  
    return this.getMessages(conversation.id, user);
  }
  
  async getMessages(conversationId: string, user: any) {
    const conversation = await this.conversationModel
      .findById(conversationId)
      .lean()
      .exec();
  
    if (!conversation) {
      throw new NotFoundException('Conversation not foundin meessage');
    }
    const prod  = await this.productService.findOne(conversation.product);
    console.log('prod',prod.id);
    console.log('user',user.id);
    console.log('conversation',conversation.client.toString());

    // Check if the user is either the client or the owner of the product
    if (conversation.client.toString() !== user.id && prod.owner.toString() !== user.id) {
      throw new NotFoundException('not part of conversation');
    }
  
    const messages = await this.messageModel.find({ conversation: conversationId }).exec();
    return { conversation, messages };
  }

  async getConversations(productId: string, userId: string) {
    const product = await this.productService.findOne(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if(product.owner.toString() !== userId){
      throw new NotFoundException('Product not found');
    }
    const conversations = await this.conversationModel.find({ product: productId }).populate('client').exec();
    const list=conversations.map(async (conversation) => {
      return { "conversationId": conversation.id, "client": conversation.client,"messagesSize":conversation.messages.length};

    }
    );
    return list;
    
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

  //validate user is part of the conversation
    async validateUser(conversationId: string, userId: string){

    const conversation = await this.conversationModel.findById(conversationId).lean().exec();

    if(!conversation){
      console.log('conversation not found');
      return false;
    }

    const prod  = await this.productService.findOne(conversation.product);
    console.log('prod',prod.owner.toString());
    console.log('user',userId);
    console.log('conversation',conversation.client.toString());
    if(conversation.client.toString() !== userId && prod.owner.toString() !== userId){
      console.log('user not part of conversation');
      return false;
    }
    return true;
    
  }
    
}
