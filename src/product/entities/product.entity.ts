import { Prop, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { City } from "src/enum/city.enum";
import { ApproveStatus } from "src/enum/product-approve-status.enum";
import { Category } from "src/enum/product-category.enum";
import { User } from "../../users/entities/user.entity";

@Schema()
export class Product {
  constructor(userId: string) {
    this.owner = userId;
    this.isAvailable = true;
    this.status = ApproveStatus.PENDING;
  }

  static fromDoc(doc: any): Product {
    const { _id = null, __v = null, ...prod } = { ...doc };
    return prod;
  }

  static fromArray(docs: any[]): Product[] {
    return docs.map((doc) => Product.fromDoc(doc));
  }

  // static detailsFromDTO(
  //   productDTO: CreateProductDto,
  // ): TechDetails | ClothesDetails {
  //   if (productDTO.category === Category.TECH) {
  //   }
  // }

  //id in prop
  @Prop({ required: true, unique: true })
  id: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true, default: 1 })
  quantity: number;
  @Prop({ required: true, default: 0, max: 100, min: 0 })
  discount: number;
  @Prop({ required: true })
  isAvailable: boolean;
  @Prop({ required: true, default: ApproveStatus.PENDING })
  status: ApproveStatus;
  @Prop({ required: true })
  category: Category;
  @Prop({ required: true })
  location: City;
  @Prop({ required: false, type: Object })
  details: any;
  @Prop({ required: true, default: [] })
  images: string[];
  //relation user
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  owner: string;
}

export class ClothesDetails {
  brand: string;
  color: number;
  functionality: string;
  material: string;
  seasonality: string;
  size: string;
  style: string;
  type: string;
}

export class TechDetails {
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

export type JewelryDetails = {};
export type FurnitureDetails = {};
export type AnimalDetails = {};
