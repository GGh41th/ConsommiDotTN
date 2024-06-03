import { Prop, Schema } from "@nestjs/mongoose";
import { ApproveStatus } from "../../enum/product-approve-status.enum";
import mongoose from "mongoose";
import { User } from "../../users/entities/user.entity";

@Schema({ timestamps: true })
export class Demand {
  constructor() {}

  static fromDoc(doc: any): Demand {
    const { _id = null, __v = null, ...user } = { ...doc };

    return user;
  }

  static fromArray(docs: any[]): Demand[] {
    return docs.map((doc) => Demand.fromDoc(doc));
  }

  @Prop()
  id: string;
  @Prop({ type: mongoose.Types.ObjectId, ref: "User" })
  user: string;
  @Prop({ required: true, default: ApproveStatus.PENDING })
  status: ApproveStatus;
}
