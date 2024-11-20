
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength, IsOptional, IsUrl, IsInt  } from "class-validator"

export class CreatePropertiesDTO{

    @IsNotEmpty()
    @IsString()
    @MaxLength(3000)
    title: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    article: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    priceDef: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    priceNDS: string

    @IsNotEmpty()
    @IsInt()
    inStock: string

    @IsNotEmpty()
    @IsInt()
    maxSize: string

    @IsNotEmpty()
    @IsInt()
    minSize: string

    @IsNotEmpty()
    @IsString()
    categoryId: string

    
    @IsOptional()
    @IsUrl()
    ImgUrls: string;
}