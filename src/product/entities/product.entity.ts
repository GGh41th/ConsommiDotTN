import { Prop, Schema } from "@nestjs/mongoose";
import { City } from "src/enum/city.enum";
import { ApproveStatus } from "src/enum/product-approve-status.enum";
import { Category } from "src/enum/product-category.enum";

@Schema()
export class Product {
    //id in prop
    @Prop({required: true, unique: true})
    id: string;
    @Prop({required: true})
    name: string;
    @Prop({required: true})
    description;
    @Prop({required: true})
    price: number;
    @Prop({required: true,default:1})
    quantity: number;
    @Prop({required: true,default:0,max:100,min:0})
    discount: number;
    @Prop({required: true})
    isAvailable: boolean;
    @Prop({required: true, default:true})
    status:ApproveStatus;
    @Prop({required: true})
    category:Category;
    @Prop({required: true})
    location:City;
}
