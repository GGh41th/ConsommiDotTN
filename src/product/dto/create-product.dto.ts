import { NotFoundException, Optional } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { Type } from 'class-transformer';
import { IsDefined, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { City } from 'src/enum/city.enum';
import { ApproveStatus } from 'src/enum/product-approve-status.enum';
import { Category } from 'src/enum/product-category.enum';

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
  @IsEnum(ApproveStatus)
  status: ApproveStatus;
  @IsNotEmpty()
  category: Category;
  @IsNotEmpty()
  location: City;
  @IsNotEmpty()
  image: string;
  @IsNotEmpty()
  @ValidateNested()
  @Type((value: any) =>{
    console.log(JSON.stringify
    (value)
    );
    if (value.newObject.category==='clothes') 
        return ClothesDetailsDto;
    if (value.newObject.category==='tech')
        return TechDetailsDto;
    throw new NotFoundException('Invalid category');
    
  })
  details: ClothesDetailsDto | TechDetailsDto;
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