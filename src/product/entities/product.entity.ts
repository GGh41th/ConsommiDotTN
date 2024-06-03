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
  brand: string; // ADIDAS
  @IsNotEmpty()
  color: string; // red
  @IsOptional()
  functionality: string; // 9at3a: shirt
  @IsOptional()
  thickness: number; // 5ochn
  @IsOptional()
  height: number; // 40.8
  @IsOptional()
  width: number; // 54.0
  @IsOptional()
  material: string; // cotton
  @IsOptional()
  seasonality: string; // summer
  @IsNotEmpty()
  size: string; // XL
  @IsOptional()
  style: string; // formal
  @IsNotEmpty()
  type: string; // confy
}

export class TechDetails {
  @IsNotEmpty()
  brand: string;
  @IsNotEmpty()
  type: string;

  // Optional fields
  @IsOptional()
  model: string;
  @IsOptional()
  features: string;
}

export class PhoneDetails {
  @IsNotEmpty()
  brand: string; // "LG"

  @IsNotEmpty()
  model: string; // "Wing"

  @IsNotEmpty()
  storage: number; // 256

  @IsNotEmpty()
  ram: number; // 12

  @IsNotEmpty()
  screenSize: number; // 7

  @IsNotEmpty()
  camera: number; // 20

  @IsNotEmpty()
  battery: number; // 4000
}

export class LaptopDetails {
  @IsNotEmpty()
  brand: string; // "ASUS"

  @IsNotEmpty()
  processor_brand: string; // "Intel"

  @IsNotEmpty()
  processor_name: string; // "Core i5"

  @IsOptional()
  processor_gnrtn?: string; // "10th"

  @IsNotEmpty()
  ram_gb: string; // "8 GB"

  @IsNotEmpty()
  ram_type: string; // "DDR4"

  @IsNotEmpty()
  ssd: string; // "512 GB"

  @IsOptional()
  hdd?: string; // "0 GB"

  @IsNotEmpty()
  os: string; // "Windows"

  @IsNotEmpty()
  os_bit: string; // "32-bit"

  @IsOptional()
  graphic_card_gb?: string; // "2 GB"

  @IsOptional()
  weight?: string; // "Casual"

  @IsOptional()
  warranty?: string; // "No warranty"

  @IsOptional()
  Touchscreen?: string; // "No"

  @IsOptional()
  msoffice?: string; // "No"

  @IsOptional()
  rating?: string; // "3 stars"

  @IsOptional()
  numberOfRatings?: number; // 0

  @IsOptional()
  numberOfReviews?: number; // 0
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

export class CarDetails {
  @IsNotEmpty()
  title: string; // "neuvqdfqsdfe"

  @IsNotEmpty()
  brand: string; // "BMW"

  @IsNotEmpty()
  model: string; // "Golf"

  @IsNotEmpty()
  transmission: string; // "Automatique"

  @IsNotEmpty()
  fuelType: string; // "Diesel"

  @IsNotEmpty()
  year: number; // 2020

  @IsNotEmpty()
  mileage: number; // 90000
}
