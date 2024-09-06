import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, ValidateNested } from "class-validator";
import { City } from "../../enum/city.enum";
import { Category } from "../../enum/product-category.enum";
import {
  AnimalDetails,
  CarDetails,
  ClothesDetails,
  FurnitureDetails,
  JewelryDetails,
  LaptopDetails,
  PhoneDetails,
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
      case Category.CAR:
        return CarDetails;
      case Category.PHONE:
        return PhoneDetails;
      case Category.LAPTOP:
        return LaptopDetails;
      default:
        throw new BadRequestException("infound category");
    }
  })
  details:
    | TechDetails
    | PhoneDetails
    | LaptopDetails
    | JewelryDetails
    | ClothesDetails
    | FurnitureDetails
    | CarDetails
    | AnimalDetails;
}
