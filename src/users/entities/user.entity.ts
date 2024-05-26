import { Prop, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Role } from "src/enum/user-role.enum";

@Schema()
export class User {
  constructor() {
    this.role = Role.CONSUMER;
    this.isApproved = false;
  }

  static fromDoc(doc: any): User {
    const { _id = null, __v = null, ...user } = { ...doc };

    return user;
  }

  @Prop()
  id: string;
  @Prop({ required: true })
  email: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true })
  password: string;

  @Prop({ maxlength: 8, minlength: 8 })
  phone: string;

  @Prop()
  city: string;
  @Prop()
  street: string;
  @Prop()
  postalCode: string;

  @Prop({ required: true, default: false })
  isApproved: boolean;

  @Prop({ required: true, enum: Role, default: Role.CONSUMER }) // Reference the Role enum
  role: Role;
  //relation product
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }] })
  products: string[];
}
