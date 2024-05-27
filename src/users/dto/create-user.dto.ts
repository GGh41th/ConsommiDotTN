import { IsEmail, IsNotEmpty, IsOptional, MaxLength, maxLength } from "class-validator";

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
  @MaxLength(8, { message: 'Phone number is too long. Maximum length is 8 characters.' })
  phone: string;
  @IsOptional()
  city: string;
  @IsOptional()
  street: string;
  @IsOptional()
  
  postalCode: string;
}
