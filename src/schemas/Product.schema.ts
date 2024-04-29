import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import e from "express";
import { identity } from "rxjs";
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

export const ProductSchema = SchemaFactory.createForClass(Product);

@Schema()
export class Clothes extends Product {
    @Prop({required: true})
    brand: string;
    @Prop({required: true})
    color: number;
    @Prop({required: true})
    functionality: string;
    @Prop({required: true})
    material: string;
    @Prop({required: true})
    seasonality: string;
    @Prop({required: true})
    size: string;
    @Prop({required: true})
    style: string;
    @Prop({required: true})
    type: string;
}

export const ClothesSchema = SchemaFactory.createForClass(Clothes);


@Schema()
export class Tech extends Product {
    @Prop({required: true})
    batteryLife: string;
    @Prop({required: true})
    brand: string;
    @Prop({required: true})
    cpu: string;
    @Prop({required: true})
    features: string;
    @Prop({required: true})
    gpu: string;
    @Prop({required: true})
    os: string;
    @Prop({required: true})
    ram: string;
    @Prop({required: true})
    screenSize: string;
    @Prop({required: true})
    storage: string;
    @Prop({required: true})
    type: string;
}

export const TechSchema = SchemaFactory.createForClass(Tech);


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

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);

