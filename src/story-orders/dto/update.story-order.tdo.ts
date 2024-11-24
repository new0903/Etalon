import { IsNotEmpty, IsInt, MaxLength, IsString, IsOptional, IsUrl } from "class-validator";

export class UpdateStoryOrderDTO{

    @IsNotEmpty()
    @IsInt()
    @MaxLength(3000)
    id: string;

    @IsNotEmpty()
    @IsString()
    productId: string;

    @IsNotEmpty()
    @IsString()
    userId: string;
}