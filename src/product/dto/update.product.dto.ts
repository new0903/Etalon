
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
    // @IsInt()
    //  @Type(() => Number)
    @IsString()
    priceDef: string;

    // @IsNotEmpty()
    // @IsString()
    // @IsInt()
    //  @Type(() => Number)
    @IsString()
    priceNDS: string;

    // @IsNotEmpty()
    // @IsInt()
   // @IsInt()
    // @Type(() => Number)
    @IsString()
    inStock: string;

    // @IsNotEmpty()
    // @IsInt()
    // @IsInt()
    //  @Type(() => Number)
     @IsString()
    maxSize: string;

    // @IsNotEmpty()
    // @IsInt()
    // @Type(() => Number)
     @IsString()
    minSize: string;

    @IsNotEmpty()
    @IsString()
    categoryId: string;


    @IsString()
    @MaxLength(50)
    properties: string;
}