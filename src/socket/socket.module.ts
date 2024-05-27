import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationModule } from 'src/conversation/conversation.module';
import { ConversationSchema } from 'src/conversation/entities/conversation.entity';
import { MessageSchema } from 'src/conversation/entities/message.entity';
import { UserSchema } from 'src/schemas/User.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        MongooseModule.forFeature([
          { name: 'Conversation', schema: ConversationSchema },
          { name: 'Message', schema: MessageSchema },
          { name: 'User', schema: UserSchema },
        ]),
        ConversationModule,
        UsersModule,
      ],
    providers: [SocketGateway],
    exports: [SocketGateway],
})
export class SocketModule {}
