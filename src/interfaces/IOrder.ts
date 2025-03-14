import { IProduct } from './IProduct';

export interface IOrder {
  products: IProduct[];
  totalPrice: number;
}
