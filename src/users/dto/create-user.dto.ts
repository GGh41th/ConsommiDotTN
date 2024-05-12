import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

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
  phone: string;
  @IsOptional()
  city: string;
  @IsOptional()
  street: string;
  @IsOptional()
  postalCode: string;
}
