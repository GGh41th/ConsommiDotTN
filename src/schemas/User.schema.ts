import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Address } from "cluster";
import e from "express";
import { identity } from "rxjs";
enum Role {
    ADMIN ,
    USER ,
}
class AddressClass {
    @Prop({required: true})
    city: string;
    @Prop({required: true})
    street: string;
    @Prop({required: true})
    zipCode: string;
}
@Schema()
export class User {
    //id in prop
   @Prop({required: true, unique: true})
    id: string;
    @Prop({required: true})
    address:AddressClass; 
    
    @Prop({required: true})
    email: string;
    @Prop({required: true})
    name: string;
    @Prop({required: true})
    password: string;
    @Prop({required: true,maxlength: 8, minlength: 8  })
    phone: string;
    @Prop({required: true})
    lastName: string;
    @Prop({required: true})
    isAprroved: boolean;
    @Prop({ required: true, type: Role}) // Reference the Role interface
    role: Role;

}
export const UserSchema = SchemaFactory.createForClass(User);


