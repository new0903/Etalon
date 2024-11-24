
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength, IsOptional, IsUrl, IsInt,IsArray,ArrayMinSize,IsObject } from "class-validator"

export class CreateUserDTO{

    @IsNotEmpty()
    @IsString()
    @MaxLength(200)
    email: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    login: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    password: string;

}