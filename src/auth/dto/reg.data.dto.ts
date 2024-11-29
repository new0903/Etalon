import { IsEmail, IsNotEmpty, MaxLength, MinLength,IsString } from "class-validator"

export class AuthUserDTO{
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    login: string;


    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(60)
    password: string
}