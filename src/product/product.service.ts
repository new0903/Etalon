import { HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDTO } from './dto/create.product.dto';
import { UpdateProductDTO } from './dto/update.product.dto';
import { join } from 'path';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';


@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) { }

  async CreateProduct(data: CreateProductDTO, files, jwtPayload: JwtPayload) {
    try {
      // const userCurrent = await this.prismaService.user.findFirst({
      //   where: { id: jwtPayload.id },
      //   include: { refreshToken: true }
      // });
 //     if (jwtPayload.acessToken == userCurrent.refreshToken[0].token) {
        console.log(__dirname)
        console.log(files[0].path)
        console.log(join(__dirname, '..', '..', 'uploads', files[0].filename))
        const categoryM=await this.prismaService.category.findFirst({where:{name:data.categoryId}})

        var product = await this.prismaService.product.create({
          data: {
            title: data.title,
            article: data.article,
            inStock: Number(data.inStock),
            priceDef: Number(data.priceDef),
            priceNDS: Number(data.priceNDS),
            ImgUrls: join(__dirname, '..', '..', 'uploads', files[0].filename),
            max: Number(data.maxSize),
            min: Number(data.minSize),
            categoryId:  categoryM.id,//data.categoryId

            properties: data.properties,


          },

        });
        console.log(product)
        return product;
  //    }
  //    return new HttpException("error", HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException('product error found', HttpStatus.NOT_FOUND);
    }
  }

  async UpdateProduct(data: UpdateProductDTO, files, jwtPayload: JwtPayload) {
    try {
        console.log(data)
        console.log(data.id)
        let productOld=await this.prismaService.product.findFirst({ where: { id: data.id } })
        console.log(productOld)
        let filePath = productOld.ImgUrls;
        console.log(filePath)
        if (files.length > 0) {
          filePath = join(__dirname, '..', '..', 'uploads', files[0].filename)
        }
        const categoryM=await this.prismaService.category.findFirst({where:{id:data.categoryId}})
        console.log(categoryM)

     //   const stock=data.inStock;
       // console.log(stock);
       // console.log(data.inStock);
        return await this.prismaService.product.update({
          where: { id: data.id },
          data: {

            title: data.title,
            article: data.article,
            inStock: parseInt(data.inStock),
            priceDef: parseInt(data.priceDef),
            priceNDS: parseInt(data.priceNDS),
            ImgUrls: filePath,//response,
            max: parseInt(data.maxSize),
            min: parseInt(data.minSize),
            categoryId: categoryM.id, //data.categoryId,
            properties: data.properties
          },
        });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async DeleteProduct(id: string, jwtPayload: JwtPayload) {
    try {
      // const userCurrent = await this.prismaService.user.findFirst({
      //   where: { id: jwtPayload.id },
      //   include: { refreshToken: true }
      // });
    //  if (jwtPayload.acessToken == userCurrent.refreshToken[0].token) {
        await this.prismaService.product.delete({ where: { id: id } });
        return HttpStatus.OK;
 //     }
 //     return new HttpException("error access", HttpStatus.CONFLICT);
    } catch (error) {
      throw new HttpException('Product is not exist', HttpStatus.NOT_FOUND);
    }
  }

  async GetOneProductOrAll(productId?: string) {
    try {
      //console.log(productId)
      if (productId) {
      //  console.log(productId)
        return this.prismaService.product.findFirst({ where: { id: productId } });
      }
      return this.prismaService.product.findMany();
    } catch (error) { }
  }

}
