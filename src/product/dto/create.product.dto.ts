
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength, IsOptional, IsUrl, IsInt,IsArray,ArrayMinSize,IsObject } from "class-validator"

export class CreateProductDTO{

    @IsNotEmpty()
    @IsString()
    @MaxLength(3000)
    title: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    article: string;

    @IsNotEmpty()
    @IsInt()
    @MaxLength(50)
    priceDef: number;

    @IsNotEmpty()
    @IsInt()
    @MaxLength(50)
    priceNDS: number;

    @IsNotEmpty()
    @IsInt()
    inStock: number;

    @IsNotEmpty()
    @IsInt()
    maxSize: number;

    @IsNotEmpty()
    @IsInt()
    minSize: number;

    @IsNotEmpty()
    @IsString()
    categoryId: string;

    @IsString()
    @MaxLength(50)
    properties: string;
}