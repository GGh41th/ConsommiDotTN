import { Prop, Schema } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { City } from "src/enum/city.enum";
import { ApproveStatus } from "src/enum/product-approve-status.enum";
import { Category } from "src/enum/product-category.enum";
import { User } from "../../users/entities/user.entity";
import { IsNotEmpty, IsOptional } from "class-validator";

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
  @IsNotEmpty()
  brand: string;
  @IsNotEmpty()
  color: number;
  @IsOptional()
  functionality: string;
  @IsOptional()
  material: string;
  @IsOptional()
  seasonality: string;
  @IsNotEmpty()
  size: string;
  @IsOptional()
  style: string;
  @IsNotEmpty()
  type: string;
}

export class TechDetails {
  batteryLife: string;
  @IsNotEmpty()
  brand: string;
  @IsOptional()
  cpu: string;
  @IsOptional()
  features: string;
  @IsOptional()
  gpu: string;
  @IsOptional()
  os: string;
  @IsOptional()
  ram: string;
  @IsOptional()
  screenSize: string;

  @IsOptional()
  storage: string;
  @IsNotEmpty()
  type: string;
}

export class JewelryDetails {
  @IsNotEmpty()
  material: string;
  @IsNotEmpty()
  type: string;
}

export class FurnitureDetails {
  @IsNotEmpty()
  material: string;
  @IsNotEmpty()
  color: string;
  @IsNotEmpty()
  type: string;
}

export class AnimalDetails {
  @IsNotEmpty()
  species: string;
  @IsOptional()
  age: number;
  @IsOptional()
  gender: string;
  @IsNotEmpty()
  color: string;
}
