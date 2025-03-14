import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserOrderDTO } from './dto/CreateUserOrderDTO';

@Injectable()
export class UserOrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async createOrder(dataOrder: CreateUserOrderDTO) {
    const { userToken } = dataOrder;
    const { products, totalPrice } = dataOrder.order;

    const newOrder = await this.prismaService.userOrder.create({
      data: {
        userToken,
        totalPrice,
        products: {
          create: products.map((item) => ({
            product: { connect: { id: item.id } },
          })),
        },
      },
    });

    return newOrder;
  }

  async getOrders() {
    try {
    } catch (e) {
      console.log(e);
    }
  }
}
