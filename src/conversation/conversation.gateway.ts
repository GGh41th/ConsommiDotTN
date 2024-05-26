import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConversationService } from './conversation.service';
import { CreateMessageDto } from './dto/send-message.dto';
 
import { User } from 'src/users/entities/user.entity'; // Adjust the import path as necessary
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@WebSocketGateway({ cors: {origin :'*'} })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private readonly conversationService: ConversationService) {}

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  //@UseGuards(JwtAuthGuard) // Use your existing HTTP Auth Guard
  @SubscribeMessage('sendMessage')
  async handleSendMessage(@MessageBody() messageDto: CreateMessageDto, @ConnectedSocket() client: Socket, @CurrentUser() user: User) {
    const message = await this.conversationService.sendMessage(messageDto, user.id);
    this.server.to(messageDto.conversationId).emit('message', message);
    return message;
  }

  //@UseGuards(AuthGuard) // Use your existing HTTP Auth Guard
  @SubscribeMessage('joinConversation')
  handleJoinConversation(@MessageBody('conversationId') conversationId: string, @ConnectedSocket() client: Socket) {
    client.join(conversationId);
    console.log(`Client ${client.id} joined conversation ${conversationId}`);
  }
}
