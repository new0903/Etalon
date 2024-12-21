import { IsNotEmpty, IsInt, MaxLength, IsString, IsOptional, IsUrl } from "class-validator";

import { ProductsStoryOrderDTO } from "./product.storyOrder.dto";

import { Type } from "class-transformer";

export class UpdateStoryOrderDTO{

    @IsNotEmpty()
    @MaxLength(3000)
    id: string;

    @IsNotEmpty()
    Record: ProductsStoryOrderDTO[];

    @IsInt()
    @Type(() => Number)
    TotalCost:number;

  
}

/*
  
    @IsNotEmpty()
    @IsString()
    productId: string;

    @IsNotEmpty()
    @IsString()
    userId: string;
*/