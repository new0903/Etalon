
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength, IsOptional, IsUrl, IsInt,IsArray,ArrayMinSize,IsObject, isInt  } from "class-validator"
import { Type } from "class-transformer";

export class UpdateProductDTO{

    @IsNotEmpty()
    @IsString()
    @MaxLength(3000)
    id: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(3000)
    title: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    article: string;

    // @IsNotEmpty()
    @IsInt()
     @Type(() => Number)
    priceDef: number;

    // @IsNotEmpty()
    // @IsString()
    @IsInt()
     @Type(() => Number)
    priceNDS: number;

    // @IsNotEmpty()
    // @IsInt()
    @IsInt()
     @Type(() => Number)
    inStock: number;

    // @IsNotEmpty()
    // @IsInt()
    @IsInt()
     @Type(() => Number)
    maxSize: number;

    @IsNotEmpty()
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