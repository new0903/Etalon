
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength, IsOptional, IsUrl, IsInt,IsArray,ArrayMinSize,IsObject  } from "class-validator"

export class UpdateUserDTO{

    @IsNotEmpty()
    @IsInt()
    @MaxLength(3000)
    id: string;
    
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
    oldPassword: string;
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    newPassword: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    confirmPassword: string;


}