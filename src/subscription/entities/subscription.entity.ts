import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

@Schema()
export class Subscription {
  @Prop({ required: true })
  userId: string; // Changed to string

  @Prop({ required: true })
  productId: string;

  @Prop({ required: true, default: 0 })
  alertprice: number;

  @Prop({ required: true })
  availability: string;

  @Prop()
  discount: string;

  @Prop()
  modifiedinfo: string;

  @Prop()
  pricechange: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
