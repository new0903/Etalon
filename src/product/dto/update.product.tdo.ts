
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength, IsOptional, IsUrl, IsInt,IsArray,ArrayMinSize  } from "class-validator"
import { CreatePropertiesDTO } from "./create.productProperties.tdo" 
export class UpdateProductDTO{

    @IsNotEmpty()
    @IsInt()
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

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    priceDef: number;

    @IsNotEmpty()
    @IsString()
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

    
    @IsOptional()
    @IsUrl()
    ImgUrls: string;

    @IsArray()
    @ArrayMinSize(1)
    properties: CreatePropertiesDTO[];
}