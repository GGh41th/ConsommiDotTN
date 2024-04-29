import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import e from "express";
import { identity } from "rxjs";
export enum Category {
    ALIMENTATION = "alimentation",
    ANIMAL="animal",
    CAR="car",
    CLOTHES="clothes",
    TECH="tech",
    FURNITURE="furniture",
    JEWELRY="jewelry",
}
export enum City {
    ALL="all",
    ARIANA="ariana",
    BEJA="beja",
    BEN_AROUS="ben arous",
    BIZERTE="bizerte",
    GABES="gabes",
    GAFSA="gafsa",
    JENDOUBA="jendouba",
    KAIROUAN="kairouan",
    KASSERINE="kasserine",
    Kebili="kebili",
    KEF="kef",
    MAHDIA="mahdia",
    MANOUBA="manouba",
    MEDENINE="medenine",    
    MONASTIR="monastir",
    NABEUL="nabeul",
    SFAX="sfax",
    SIDI_BOUZID="sidi bouzid",
    SILIANA="siliana",
    SOUSSE="sousse",
    TATAOUINE="tataouine",
    TOZEUR="tozeur",
    TUNIS="tunis",
    ZAGHOUAN="zaghouan",
}
export enum ApproveStatus {
    APPROVED="approved",
    PENDING="pending",
    REJECTED="rejected",
}

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
    @Prop({required: true})
    stock: number;
    @Prop({required: true,default:0,max:100,min:0})
    discount: number;
    @Prop({required: true})
    isAvailable: boolean;
    @Prop({required: true})
    status:ApproveStatus;
    @Prop({required: true})
    category:Category;
    @Prop({required: true})
    location:City;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
