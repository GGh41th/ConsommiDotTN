import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  alertprice: number;

  @IsString()
  availability: string;

  @IsString()
  @IsOptional()
  discount?: string;

  @IsString()
  @IsOptional()
  modifiedinfo?: string;

  @IsString()
  @IsOptional()
  pricechange?: string;
}
