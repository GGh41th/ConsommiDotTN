import { IsEmail, IsNotEmpty } from "class-validator";

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
@IsNotEmpty()
phone: string;
@IsNotEmpty()
address: {
    
    city: string;
    street: string;
    postalCode: string;
};
}
