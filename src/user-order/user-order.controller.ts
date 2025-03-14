import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserOrderService } from './user-order.service';
import { CreateUserOrderDTO } from './dto/CreateUserOrderDTO';

@Controller('user-order')
export class UserOrderController {
  constructor(private readonly userOrderService: UserOrderService) {}

  @Get('getOrders')
  async getOrders() {
    return this.userOrderService.getOrders();
  }

  @Post('createOrder')
  async createOrder(@Body() dataOrder: CreateUserOrderDTO) {
    const order = await this.userOrderService.createOrder(dataOrder);
    console.log(order);
  }
}
