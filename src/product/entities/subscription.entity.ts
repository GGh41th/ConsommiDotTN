import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class Subscription {
    @Prop({required: true, default:0})
    alertprice: number;
    @Prop({required: true})
    availability: string;
    @Prop()
    discount: string;
    @Prop()
    modifiedinfo: string;
    @Prop()
    pricechange: string;
}
