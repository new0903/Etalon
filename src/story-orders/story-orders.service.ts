import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStoryOrderDTO } from './dto/create.story-order.tdo';
import { UpdateStoryOrderDTO } from './dto/update.story-order.tdo';

@Injectable()
export class StoryOrdersService {
    constructor(private readonly prismaService: PrismaService) {}

    async CreateStoryOrder(data: CreateStoryOrderDTO) {
        try {
            var storyOrder=this.prismaService.storyOrders.create({
                data: {
                    title:data.title,
                    article:data.article,
                    priceDef:data.priceDef,
                    ImgUrls:data.ImgUrls
                }
            });

            return storyOrder;
        }
        catch(e) {
            console.debug("Error for creating new storyorder")
        }
    }

    async UpdateStoryOrder(data: UpdateStoryOrderDTO) {
        try {
          return await this.prismaService.storyOrders.update({
            where: { id: data.id },
            data: {
    
              title: data.title,
              article:data.article,
              priceDef: data.priceDef,
            },
          });
        }
        catch (e) {
          console.debug("Update crashed")
        }
    }

    async DeleteStoryOrder(id: string) {
    try {
      await this.prismaService.storyOrders.delete({ where: { id: id } });
      return HttpStatus.OK;
    } 
    catch (e) {
      throw new HttpException('Истории покупок нет', HttpStatus.NOT_FOUND);
    }
  }

  async GetOneStoryOrderOfAll( storyOrderId?: string) {
    try {
      if (storyOrderId) {
        return this.prismaService.storyOrders.findFirst({ where: { id: storyOrderId } });
      } 
      return this.prismaService.storyOrders;
    } catch (error) {
      return error;
    }
  }
}
