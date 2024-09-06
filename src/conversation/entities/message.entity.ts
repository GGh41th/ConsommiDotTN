import { Schema,Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, {  Types } from "mongoose";
import { User } from "../../users/entities/user.entity";

@Schema()
export class Message  {
    static fromDoc(doc: any): User {
    const { _id = null, __v = null, ...user } = { ...doc };
    
    return user;
    }
    
    @Prop()
    id: string;
    @Prop({required: true})
    sender: boolean;

    @Prop({ required: true })
    content: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref:"Conversation", required: true })
    conversation: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
