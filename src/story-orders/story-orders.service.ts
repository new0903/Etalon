import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStoryOrderDTO } from './dto/create.story-order.tdo';
import { UpdateStoryOrderDTO } from './dto/update.story-order.tdo';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';

@Injectable()
export class StoryOrdersService {
    constructor(private readonly prismaService: PrismaService) {}

    async CreateStoryOrder(data: CreateStoryOrderDTO, jwtPayload: JwtPayload) {
        try {
            var curUser=await this.prismaService.user.findFirst({
                where: { email: jwtPayload.Email }

            });

            var newOrder= await this.prismaService.order.create({
              data:{
                userId:curUser.id,
                TotalCost:data.TotalCost
              }
            })
            const counter=data.Record.length
            for (let i = 0; i < counter; i++) {
              var productOrder=await this.prismaService.productOrder.create({
                data:{
                  orderId:newOrder.id,
                  cost:data.Record[i].priceDef,
                  productId:data.Record[i].id,
                  counterProduct:data.Record[i].countProduct
                }
              })
              var storyOrder= await this.prismaService.historyProductsUser.create({
                  data: {
                    productId:data.Record[i].id,
                    userId:curUser.id,
                  }
              });
            }
            


            return newOrder;
        }
        catch(e) {
          console.debug("Error for creating new storyorder")
          throw new HttpException('Error for creating new storyorder', HttpStatus.NOT_FOUND);
        }
    }

    async UpdateStoryOrder(data: UpdateStoryOrderDTO, jwtPayload: JwtPayload) {
        try {

          var curUser=await this.prismaService.user.findFirst({
              where: { email: jwtPayload.Email }

          });

          var Order= await this.prismaService.order.findFirst({
            where: { id:data.id }
          });
          if (Order!=null) {
            await this.prismaService.productOrder.deleteMany({
              where:{
                orderId:Order.id
              }
            });
            const counter=data.Record.length;
            for (let i = 0; i < counter; i++) {
              var productOrder=await this.prismaService.productOrder.create({
                data:{
                  orderId:Order.id,
                  cost:data.Record[i].priceDef,
                  productId:data.Record[i].id,
                  counterProduct:data.Record[i].countProduct
                }
              })
              var storyOrder= await this.prismaService.historyProductsUser.create({
                  data: {
                    productId:data.Record[i].id,
                    userId:curUser.id,
                  }
              });
            }
            return Order;
          }
          throw new HttpException('Заказа нет', HttpStatus.NOT_FOUND);
          // return await this.prismaService.historyProductsUser.update({
          //   where: { id: data.id },
          //   data: {
          //     productId:data.productId,
          //     userId:data.userId,
          //   },
          // });
        }
        catch (e) {
          console.debug("Update crashed")
        }
    }

    async DeleteStoryOrder(id: string) {
    try {
      await this.prismaService.order.delete({ where: { id: id } });
      return HttpStatus.OK;
    } 
    catch (e) {
      throw new HttpException('Истории покупок нет', HttpStatus.NOT_FOUND);
    }
  }

  async GetOneStoryOrderOfAll( storyOrderId?: string) {
    try {
      if (storyOrderId) {
        return await this.prismaService.order.findFirst({ where: { id: storyOrderId },include:{ProductsOrder:true,user:true} });
      } 
      return await this.prismaService.order.findMany({include:{ProductsOrder:true,user:true}});
    } catch (error) {
      throw new HttpException('Error GetOneStoryOrderOfAll', HttpStatus.NOT_FOUND);
    }
  }
}
