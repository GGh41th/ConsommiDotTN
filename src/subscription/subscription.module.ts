import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionService } from '../subscription/subscription.service';
import { Subscription, SubscriptionSchema } from '../subscription/entities/subscription.entity';
import { SseService } from 'src/sse/see.service';
import { SubscriptionController } from './subscription.controller';
import { SseModule } from 'src/sse/sse.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Subscription.name, schema: SubscriptionSchema }]),
  ],
  providers: [SubscriptionService], 
  exports: [SubscriptionService],
  controllers : [SubscriptionController]
})
export class SubscriptionModule {}
