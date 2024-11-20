import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDTO } from './dto/create.product.tdo';
import { UpdateProductDTO } from './dto/update.product.tdo';


@Injectable()
export class ProductService {
     //Подключаем к нашему сервису prismaService
  constructor(private readonly prismaService: PrismaService) {}

  //Здесь находится вся логика с ToDo карточками
  async CreateProduct(data: CreateProductDTO) {
    try {
        var product= await this.prismaService.product.create({
        data: {
          title: data.title,
          article:data.article,
          inStock: data.inStock,
          priceDef: data.priceDef,
          priceNDS: data.priceNDS,
          max:data.maxSize,
          min:data.minSize,

          categoryId:data.categoryId,
        },
       
      });
      return product;
    } catch (error) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
  }

  async UpdateProduct(data: UpdateProductDTO) {
    try {
      return await this.prismaService.product.update({
        where: { id: data.id },
        data: {

          title: data.title,
          article:data.article,
          inStock: data.inStock,
          priceDef: data.priceDef,
          priceNDS: data.priceNDS,
          categoryId:data.categoryId,
          max:data.maxSize,
          min:data.minSize,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async DeleteProduct(id: string) {
    try {
      await this.prismaService.product.delete({ where: { id: id } });
      return HttpStatus.OK;
    } catch (error) {
      throw new HttpException('Product is not exist', HttpStatus.NOT_FOUND);
    }
  }

  async GetOneProductOrAll( productId?: string) {
    try {
      if (productId) {
        return this.prismaService.product.findFirst({ where: { id: productId } });
      } 
      return this.prismaService.product;
    } catch (error) {
      return error;
    }
  }

}
