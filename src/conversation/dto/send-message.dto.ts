import { IsNotEmpty, IsMongoId } from "class-validator";

export class CreateMessageDto {
  @IsNotEmpty()
  @IsMongoId()
  conversationId: string;

  @IsNotEmpty()
  content: string;
  
}
