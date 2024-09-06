import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SubscriptionService } from '../subscription/subscription.service';
import { Subscription, SubscriptionSchema } from '../subscription/entities/subscription.entity';
import { SubscriptionController } from './subscription.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Subscription.name, schema: SubscriptionSchema }]),
  ],
  providers: [SubscriptionService], 
  exports: [SubscriptionService],
  controllers : [SubscriptionController]
})
export class SubscriptionModule {}
