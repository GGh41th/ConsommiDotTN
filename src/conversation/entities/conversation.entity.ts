import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Mongoose, Types } from "mongoose";
import { Product } from "src/product/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Message } from "./message.entity";


@Schema()
export class Conversation  {
    static fromDoc(doc: any): User {
       const { _id = null, __v = null, ...user } = { ...doc };
    
       return user;
     }
    
    @Prop()
    id: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true })
    client: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true })
    product: string;


    @Prop({ type: Date, default: Date.now })
    createdAt: Date;

    @Prop({ type:[{type: mongoose.Schema.Types.ObjectId, ref: "Message"}],required:true})
    messages: string[];


}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);

