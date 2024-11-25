import { HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDTO } from './dto/create.product.dto';
import { UpdateProductDTO } from './dto/update.product.dto';
import { join } from 'path';


@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) { }

  async CreateProduct(data: CreateProductDTO, files) {
    try {

    //  const response:string  =`/uploads/${files[0].filename}`; //{name:files[0].filename};


      // var categoryM = await this.prismaService.category.findFirstOrThrow({
      //   where: {
      //     name: data.categoryId,
      //   },
      // });
      //
      
      console.log(__dirname)
      console.log(files[0].path)
     // console.log(categoryM)
    //  console.log(response)
      console.log(join(__dirname, '..', '..', 'uploads',files[0].filename))
      var product = await this.prismaService.product.create({
        data: {
          title: data.title,
          article: data.article,
          inStock: Number(data.inStock),
          priceDef:  Number(data.priceDef),
          priceNDS: Number(data.priceNDS) ,
          ImgUrls: join(__dirname, '..', '..', 'uploads',files[0].filename),
          max:  Number(data.maxSize),
           min:  Number(data.minSize),
          categoryId: data.categoryId,// categoryM.id,//data.categoryId
          
          properties: data.properties,


        },

      });
      console.log(product)
      return product;
    } catch (error) {
      throw new HttpException('product error found', HttpStatus.NOT_FOUND);
    }
  }

  async UpdateProduct(data: UpdateProductDTO, files) {
    try {
     // const response = files[0].filename;
      return await this.prismaService.product.update({
        where: { id: data.id },
        data: {

          title: data.title,
          article: data.article,
          inStock: data.inStock,
          priceDef: data.priceDef,
          priceNDS: data.priceNDS,
          ImgUrls: join(__dirname, '..', '..', 'uploads',files[0].filename),//response,
          max: data.maxSize,
          min: data.minSize,
          categoryId: data.categoryId,
          properties: data.properties
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

  async GetOneProductOrAll(productId?: string) {
    try {
      if (productId) {
        return this.prismaService.product.findFirst({ where: { id: productId } });
      }
      return this.prismaService.product.findMany();
    } catch (error) { }
  }

}
