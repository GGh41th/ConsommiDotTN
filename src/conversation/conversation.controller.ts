import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { WsJwtGuard } from 'src/auth/guards/ws-auth.guard';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("conversation")
@Controller("conversation")
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get('/:productId')
  @UseGuards(JwtAuthGuard)
  getConversation(
    @CurrentUser() user: any,
    @Param('productId') productId: string
  ) {
    console.log('get conversation');
    return this.conversationService.getConversation(productId, user);
  }

  

  
}
