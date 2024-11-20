import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UpdateCategoryDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(3000)
  id: string
  
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  name: string
}
