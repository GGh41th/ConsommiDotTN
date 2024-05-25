import { Prop, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { City } from "src/enum/city.enum";
import { ApproveStatus } from "src/enum/product-approve-status.enum";
import { Category } from "src/enum/product-category.enum";

@Schema()
export class Product  {
    //id in prop
    @Prop({required: true, unique: true})
    id: string;
    @Prop({required: true})
    name: string;
    @Prop({required: true})
    description:string;
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
    @Prop({required: true, type: Object})
    details: ClothesDetails | TechDetails;
    @Prop({required: true,default:[]} )
    images: string[];
    //relation user
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    owner: string;
}
type ClothesDetails ={
    brand: string;
    color: number;
    functionality: string;
    material: string;
    seasonality: string;
    size: string;
    style: string;
    type: string;
}

type TechDetails ={
    batteryLife: string;
    brand: string;
    cpu: string;
    features: string;
    gpu: string;
    os: string;
    ram: string;
    screenSize: string;
    storage: string;
    type: string;

} 
    

