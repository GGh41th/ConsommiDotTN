import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscription, SubscriptionDocument } from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/subscription-dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name) private subscriptionModel: Model<SubscriptionDocument>,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto, userId: string): Promise<Subscription> {
    const subscription = new this.subscriptionModel({
      ...createSubscriptionDto,
      userId,
    });
    return subscription.save();
  }

  async findByProductId(productId: string): Promise<Subscription[]> {
    return this.subscriptionModel.find({ productId }).exec();
  }

  async findByUserId(userId: string): Promise<Subscription[]> {
    return this.subscriptionModel.find({ userId }).exec();
  }

  async remove(subscriptionId: string): Promise<void> {
    await this.subscriptionModel.findByIdAndDelete(subscriptionId).exec();
  }
}
