import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UpdateCategoryDTO {
  @IsNotEmpty()
  @IsString()
  id: string;
  
  @IsString()
  @IsNotEmpty()
  nameCategory: string;
}
