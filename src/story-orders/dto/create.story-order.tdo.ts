import { IsNotEmpty, IsString, MaxLength, IsInt, IsOptional, IsUrl,isArray } from "class-validator";
import { ProductsStoryOrderDTO } from "./product.storyOrder.dto";
import { Type } from "class-transformer";

export class CreateStoryOrderDTO {
    @IsNotEmpty()
    Record: ProductsStoryOrderDTO[];

    @IsInt()
    @Type(() => Number)
    TotalCost:number;
}