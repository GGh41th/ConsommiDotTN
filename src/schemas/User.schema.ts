import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/users/entities/user.entity";
export const UserSchema = SchemaFactory.createForClass(User);
