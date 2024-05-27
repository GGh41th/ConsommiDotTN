
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
import { UseGuards } from '@nestjs/common';
import { WsJwtGuard } from 'src/auth/guards/ws-auth.guard';
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
  @UseGuards(WsJwtGuard)
  @SubscribeMessage('sendMessage')
  async handleSendMessage(@MessageBody() messageDto, @ConnectedSocket() client: any) {
    messageDto = JSON.parse(messageDto);
    console.log('messageDto',messageDto.conversationId);
    console.log('client',client.user.id);
    if (!await this.conversationService.validateUser(messageDto.conversationId.toString(),client.user.id.toString() )){
      client.emit('error', 'Unauthorized');
      console.log("Unauthorized is sent to client");
      return;
    }
    const message = await this.conversationService.sendMessage(messageDto,client.user.id );
    this.server.to(messageDto.conversationId).emit('message', message);
    return message;
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('joinConversation')
  handleJoinConversation(@MessageBody() conversationBody, @ConnectedSocket() client: Socket){
    console.log("hahahahahaha ");
    conversationBody = JSON.parse(conversationBody);
    
    client.join(conversationBody.conversationId);
    console.log(`Client ${client.id} joined conversation ${conversationBody.conversationId}`);
    this.server.emit('joined', "Hello everhoenr ererere");
  }
}
