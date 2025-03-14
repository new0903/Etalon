import { IsNotEmpty, IsString } from 'class-validator';
import { IOrder } from 'src/interfaces/IOrder';
import { IProduct } from 'src/interfaces/IProduct';

export class CreateUserOrderDTO {
  @IsNotEmpty()
  @IsString()
  userToken: string;

  @IsNotEmpty()
  order: IOrder;
}
