
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
import { Public } from 'src/customDecorators/public.decorator';
import { CurrentUser } from 'src/customDecorators/current-user.decorator';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post('create')
  @UseInterceptors(FilesInterceptor('files'))
  async CreateProductController(@Body() data: CreateProductDTO, @UploadedFiles() files:any, @CurrentUser() jwtPayload: JwtPayload) {
    console.log(data)
    console.log(jwtPayload)
    console.log(files)
    return this.productService.CreateProduct(data, files, jwtPayload);
  }

  @Put('update')
  @UseInterceptors(FilesInterceptor('files'))
  async UpdateProductController(@Body() data: UpdateProductDTO, @UploadedFiles() files:any, @CurrentUser() jwtPayload: JwtPayload) {
    return this.productService.UpdateProduct(data, files, jwtPayload);
  }

  @Delete('delete/:id')
  async DeleteProductController(@Param('id') id: string, @CurrentUser() jwtPayload: JwtPayload) {

    return this.productService.DeleteProduct(id, jwtPayload);
  }

  @Public()
  @Get('products')
  async GetProductController(
    @Query('Id') Id?: string,
  ) {
    return this.productService.GetOneProductOrAll(Id);
  }


}
