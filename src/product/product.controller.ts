
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
    async CreateProductController(@Body() data: CreateProductDTO) {
      return this.productService.CreateProduct(data);
    }
  
    @Put('update')
    async UpdateProductController(@Body() data: UpdateProductDTO) {
      return this.productService.UpdateProduct(data);
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
