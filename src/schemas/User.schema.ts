import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Role {
    ADMIN= "admin",
    USER    = "user",
}

class AddressClass {
    @Prop({ required: true })
    city: string;
    @Prop({ required: true })
    street: string;
    @Prop({ required: true })
    postalCode: string;
}

@Schema()
export class User {
    @Prop({ required: true, unique: true   })
    id: string;
    @Prop({ required: true })
    address: AddressClass;
    @Prop({ required: true })
    email: string;
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    password: string;
    @Prop({ required: true, maxlength: 8, minlength: 8 })
    phone: string;
    @Prop({ required: true })
    lastName: string;
    @Prop({ required: true })
    isApproved: boolean;
    @Prop({ required: true, enum:Role,default:Role.USER }) // Reference the Role enum
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
