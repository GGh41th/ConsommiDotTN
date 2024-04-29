import { Prop } from "@nestjs/mongoose";

export class Address {
    @Prop({ required: true })
    city: string;
    @Prop({ required: true })
    street: string;
    @Prop({ required: true })
    postalCode: string;
}