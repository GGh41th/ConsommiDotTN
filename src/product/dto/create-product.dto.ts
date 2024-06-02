import { Type } from "class-transformer";
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { City } from "src/enum/city.enum";
import { Category } from "src/enum/product-category.enum";
import {
  AnimalDetails,
  ClothesDetails,
  FurnitureDetails,
  JewelryDetails,
  TechDetails,
} from "../entities/product.entity";
import { BadRequestException } from "@nestjs/common";

export class CreateProductDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  quantity: number;
  @IsNotEmpty()
  discount: number;
  @IsNotEmpty()
  isAvailable: boolean;

  @IsNotEmpty()
  category: Category;

  @IsNotEmpty()
  @IsEnum(City)
  location: City;

  @IsNotEmpty()
  @ValidateNested()
  @Type((obj: any) => {
    switch (obj.object.category) {
      case Category.TECH:
        return TechDetails;
      case Category.JEWELRY:
        return JewelryDetails;
      case Category.CLOTHES:
        return ClothesDetails;
      case Category.FURNITURE:
        return FurnitureDetails;
      case Category.ANIMAL:
        return AnimalDetails;
      default:
        throw new BadRequestException("infound category");
    }
  })
  details:
    | TechDetails
    | JewelryDetails
    | ClothesDetails
    | FurnitureDetails
    | AnimalDetails;
}

export class ClothesDetailsDto {
  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsString()
  functionality?: string;

  @IsOptional()
  @IsString()
  material?: string;

  @IsOptional()
  @IsString()
  seasonality?: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsString()
  style?: string;

  @IsOptional()
  @IsString()
  type?: string;
}

export class TechDetailsDto {
  @IsOptional()
  @IsString()
  batteryLife?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  cpu?: string;

  @IsOptional()
  @IsString()
  features?: string;

  @IsOptional()
  @IsString()
  gpu?: string;

  @IsOptional()
  @IsString()
  os?: string;

  @IsOptional()
  @IsString()
  ram?: string;

  @IsOptional()
  @IsString()
  screenSize?: string;

  @IsOptional()
  @IsString()
  storage?: string;

  @IsNotEmpty()
  type: string;
}

const DetailsDTOType = {
  clothes: ClothesDetailsDto,
  tech: TechDetailsDto,
};
