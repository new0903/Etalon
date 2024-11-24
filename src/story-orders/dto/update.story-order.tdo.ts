import { IsNotEmpty, IsInt, MaxLength, IsString, IsOptional, IsUrl } from "class-validator";

export class UpdateStoryOrderDTO{

    @IsNotEmpty()
    @IsInt()
    @MaxLength(3000)
    id: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(3000)
    title: string;

    @IsNotEmpty()
    @IsInt()
    priceDef: number;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    article: string;

    @IsOptional()
    @IsUrl()
    ImgUrls: string;
}