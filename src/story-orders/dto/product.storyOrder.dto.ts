import { IsNotEmpty, IsString, MaxLength, IsInt, IsOptional, IsUrl } from "class-validator";
import { Type } from "class-transformer";


export class ProductsStoryOrderDTO {
    @IsNotEmpty()
    @IsString()
    id: string;


    @IsInt()
    @Type(() => Number)
    priceDef:number

    @IsInt()
    @Type(() => Number)
    countProduct:number

    @IsString()
    article: string

    @IsString()
    title:string
    

}