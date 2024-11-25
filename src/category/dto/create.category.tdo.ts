import { IsNotEmpty, IsString, MaxLength } from "class-validator";


export class CreateCategoryDTO {
  @IsString()
   @MaxLength(50)
   @IsNotEmpty()
  nameCategory: string
}
