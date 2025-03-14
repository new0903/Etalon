import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStoryOrderDTO } from './dto/create.story-order.tdo';
import { UpdateStoryOrderDTO } from './dto/update.story-order.tdo';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';

@Injectable()
export class StoryOrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async CreateStoryOrder(data: CreateStoryOrderDTO) {
    try {
      var storyOrder = await this.prismaService.historyProductsUser.create({
        data: {
          productId: data.productId,
          userId: data.userId,
        },
      });

      return storyOrder;
    } catch (e) {
      console.debug('Error for creating new storyorder');
    }
  }

  async UpdateStoryOrder(data: UpdateStoryOrderDTO) {
    try {
      return await this.prismaService.historyProductsUser.update({
        where: { id: data.id },
        data: {
          productId: data.productId,
          userId: data.userId,
        },
      });
    } catch (e) {
      console.debug('Update crashed');
    }
  }

  async DeleteStoryOrder(id: string) {
    try {
      await this.prismaService.historyProductsUser.delete({
        where: { id: id },
      });
      return HttpStatus.OK;
    } catch (e) {
      throw new HttpException('Истории покупок нет', HttpStatus.NOT_FOUND);
    }
  }

  async GetOneStoryOrderOfAll(storyOrderId?: string) {
    try {
      if (storyOrderId) {
        return await this.prismaService.historyProductsUser.findFirst({
          where: { id: storyOrderId },
          include: { product: true, user: true },
        });
      }
      return await this.prismaService.historyProductsUser.findMany({
        include: { product: true, user: true },
      });
    } catch (error) {
      throw new HttpException(
        'Error GetOneStoryOrderOfAll',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
