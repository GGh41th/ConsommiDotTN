import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { SubscriptionService } from "./subscription.service";
import { CurrentUser } from "../auth/decorators/user.decorator";
import { User } from "../users/entities/user.entity";
import { CreateSubscriptionDto } from "./dto/subscription-dto";

@Controller("subscriptions")
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
    @CurrentUser() user: User
  ) {
    return this.subscriptionService.create(createSubscriptionDto, user.id);
  }

  @Get("user")
  @UseGuards(JwtAuthGuard)
  findByUser(@CurrentUser() user: User) {
    return this.subscriptionService.findByUserId(user.id);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.subscriptionService.remove(id);
  }
}
