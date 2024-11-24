import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDTO } from './dto/create.product.dto';
import { UpdateProductDTO } from './dto/update.product.dto';


@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async CreateProduct(data: CreateProductDTO, files) {
    try {

        const response =files[0].filename;
        var product= await this.prismaService.product.create({
        data: {
          title: data.title,
          article:data.article,
          inStock: data.inStock,
          priceDef: data.priceDef,
          priceNDS: data.priceNDS,
          ImgUrls:response,
          max:data.maxSize,
          min:data.minSize,
          categoryId:data.categoryId,
          properties:data.properties


        },
       
      });
      return product;
    } catch (error) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
  }

  async UpdateProduct(data: UpdateProductDTO, files) {
    try {
      const response =files[0].filename;
      return await this.prismaService.product.update({
        where: { id: data.id },
        data: {

          title: data.title,
          article:data.article,
          inStock: data.inStock,
          priceDef: data.priceDef,
          priceNDS: data.priceNDS,
          ImgUrls:response,
          max:data.maxSize,
          min:data.minSize,
          categoryId:data.categoryId,
          properties:data.properties
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
      return this.prismaService.product.findMany();
    } catch (error) {}
  }

}
