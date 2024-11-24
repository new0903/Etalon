import { IsNotEmpty, IsString, MaxLength, IsInt, IsOptional, IsUrl } from "class-validator";

export class CreateStoryOrderDTO {
    @IsNotEmpty()
    @IsString()
    @MaxLength(3000)
    title: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    article: string;

    @IsNotEmpty()
    @IsInt()
    priceDef: number;

    @IsOptional()
    @IsUrl()
    ImgUrls: string;
}