import { IsNotEmpty, IsString, MaxLength, IsInt, IsOptional, IsUrl } from "class-validator";

export class CreateStoryOrderDTO {
    @IsNotEmpty()
    @IsString()
    productId: string;

    @IsNotEmpty()
    @IsString()
    userId: string;
}