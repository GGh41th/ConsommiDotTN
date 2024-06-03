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
    this.id = null;
    this.name = null;
    this.description = null;
    this.price = null;
    this.quantity = 1;
    this.discount = 0;
    this.isAvailable = true;
    this.status = ApproveStatus.PENDING;
    this.category = null;
    this.location = null;
    this.details = null;
    this.images = [];
    this.owner = userId;
  }

  static fromDoc(doc: any): Product {
    const { _id = null, __v = null, ...prod } = { ...doc };
    return prod;
  }

  static fromArray(docs: any[]): Product[] {
    return docs.map((doc) => Product.fromDoc(doc));
  }

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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  owner: string;
}

export class ClothesDetails {
  constructor() {
    this.brand = null;
    this.color = null;
    this.functionality = null;
    this.thickness = null;
    this.height = null;
    this.width = null;
    this.material = null;
    this.seasonality = null;
    this.size = null;
    this.style = null;
    this.type = null;
  }

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
  constructor() {
    this.brand = null;
    this.type = null;
    this.model = null;
    this.features = null;
  }

  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  type: string;

  @IsOptional()
  model: string;

  @IsOptional()
  features: string;
}

export class PhoneDetails {
  constructor() {
    this.brand = null;
    this.model = null;
    this.storage = null;
    this.ram = null;
    this.screenSize = null;
    this.camera = null;
    this.battery = null;
  }

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
  constructor() {
    this.brand = null;
    this.processor_brand = null;
    this.processor_name = null;
    this.processor_gnrtn = null;
    this.ram_gb = null;
    this.ram_type = null;
    this.ssd = null;
    this.hdd = null;
    this.os = null;
    this.os_bit = null;
    this.graphic_card_gb = null;
    this.weight = null;
    this.warranty = null;
    this.Touchscreen = null;
    this.msoffice = null;
    this.rating = null;
    this.numberOfRatings = null;
    this.numberOfReviews = null;
  }

  @IsNotEmpty()
  brand: string; // "ASUS"

  @IsNotEmpty()
  processor_brand: string; // "Intel"

  @IsNotEmpty()
  processor_name: string; // "Core i5"

  @IsOptional()
  processor_gnrtn: string; // "10th"

  @IsNotEmpty()
  ram_gb: string; // "8 GB"

  @IsNotEmpty()
  ram_type: string; // "DDR4"

  @IsNotEmpty()
  ssd: string; // "512 GB"

  @IsOptional()
  hdd: string; // "0 GB"

  @IsNotEmpty()
  os: string; // "Windows"

  @IsNotEmpty()
  os_bit: string; // "32-bit"

  @IsOptional()
  graphic_card_gb: string; // "2 GB"

  @IsOptional()
  weight: string; // "Casual"

  @IsOptional()
  warranty: string; // "No warranty"

  @IsOptional()
  Touchscreen: string; // "No"

  @IsOptional()
  msoffice: string; // "No"

  @IsOptional()
  rating: string; // "3 stars"

  @IsOptional()
  numberOfRatings: number; // 0

  @IsOptional()
  numberOfReviews: number; // 0
}

export class JewelryDetails {
  constructor() {
    this.material = null;
    this.type = null;
  }

  @IsNotEmpty()
  material: string;

  @IsNotEmpty()
  type: string;
}

export class FurnitureDetails {
  constructor() {
    this.material = null;
    this.color = null;
    this.type = null;
  }

  @IsNotEmpty()
  material: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  type: string;
}

export class AnimalDetails {
  constructor() {
    this.species = null;
    this.age = null;
    this.gender = null;
    this.color = null;
  }

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
  constructor() {
    this.title = null;
    this.brand = null;
    this.model = null;
    this.transmission = null;
    this.fuelType = null;
    this.year = null;
    this.mileage = null;
  }

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
