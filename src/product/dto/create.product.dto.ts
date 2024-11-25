
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength, IsOptional, IsUrl, IsInt,IsArray,ArrayMinSize,IsObject } from "class-validator"
import { Type } from "class-transformer";
export class CreateProductDTO{

    @IsString()
    @MaxLength(3000)
    title: string;

    @IsString()
    @MaxLength(50)
    article: string;

    // @IsNotEmpty()
     @IsInt()
     @Type(() => Number)
    priceDef: number;

    // @IsNotEmpty()
     @IsInt()
     @Type(() => Number)
    priceNDS: number;

    // @IsNotEmpty()
     @IsInt()
     @Type(() => Number)
    inStock: number;

    // @IsNotEmpty()
     @IsInt()
     @Type(() => Number)
    maxSize: number;

    // @IsNotEmpty()
     @IsInt()
     @Type(() => Number)
    minSize: number;

    @IsNotEmpty()
    @IsString()
    categoryId: string;

    @IsString()
    @MaxLength(50)
    properties: string;
}