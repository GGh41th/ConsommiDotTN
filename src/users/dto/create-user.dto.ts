import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from "class-validator";
import { City } from "../../enum/city.enum";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  lastName: string;
  @IsOptional()
  @MaxLength(8, {
    message: "Phone number is too long. Maximum length is 8 characters.",
  })
  phone: string;
  @IsOptional()
  @IsEnum(City)
  city: City;
  @IsOptional()
  street: string;
  @IsOptional()
  postalCode: string;
}
