
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UpdateProductDTO } from './dto/update.product.dto';
import { CreateProductDTO } from './dto/create.product.dto';



@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post('create')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random());
          cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname)); // Генерация уникального имени файла
        },

      }),
    }),
  )
  async CreateProductController(@Body() data: CreateProductDTO, @UploadedFiles() files) {
    return this.productService.CreateProduct(data,files);
  }

  @Put('update')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: './uploads/',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random());
          cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname)); // Генерация уникального имени файла
        },

      }),
    }),
  )
  async UpdateProductController(@Body() data: UpdateProductDTO, @UploadedFiles() files) {
    return this.productService.UpdateProduct(data,files);
  }

  @Delete('delete/:id')
  async DeleteProductController(@Param('id') id: string) {

    return this.productService.DeleteProduct(id);
  }

  @Get(':productId')
  async GetProductController(
    @Query('productid') productId?: string,
  ) {
    return this.productService.GetOneProductOrAll(productId);
  }


}
