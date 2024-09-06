import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class ProductHistory {
    static fromDoc(doc: any): ProductHistory {
        const { _id = null, __v = null, ...productHistory } = { ...doc };
    
        return productHistory;
    } 
    @Prop()
    id: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Product" })
    productId: string;

    @Prop()
    action: string;

    @Prop()
    type: Changetype;


}

export const ProductHistorySchema = SchemaFactory.createForClass(ProductHistory);



