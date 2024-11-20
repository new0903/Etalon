
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
  } from '@nestjs/common';
  import { ProductService } from './product.service';
import { UpdateProductDTO } from './dto/update.product.tdo';
import { CreateProductDTO } from './dto/create.product.tdo';
  


@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post('create')
    async CreateToDoController(@Body() data: CreateProductDTO) {
      return this.productService.CreateToDo(data);
    }
  
    @Put('update')
    async UpdateToDoController(@Body() data: UpdateProductDTO) {
      return this.productService.UpdateToDo(data);
    }
  
    @Delete('delete/:id')
    async DeleteToDoController(@Param('id') id: string) {
      return this.productService.DeleteToDo(id);
    }
  
    @Get(':productId')
    async GetToDoController(
      @Query('productid') productId?: string,
    ) {
      return this.productService.GetOneProductOrAll(productId);
    }
  

}
