import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/create.category.tdo';
import { UpdateCategoryDTO } from './dto/update.category.tdo';
import { Public } from 'src/customDecorators/public.decorator';

import { CurrentUser } from 'src/customDecorators/current-user.decorator';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';


@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  async CreateCategory(@Body() data: CreateCategoryDTO, @CurrentUser() jwtPayload: JwtPayload ) {
    console.log(data)
    console.log(jwtPayload)
    return this.categoryService.CreateCategory(data,jwtPayload);
  }

  @Public()
  @Get('categories')
  async get(@Query('Id') Id?: string) {
    return this.categoryService.GetOneCategoryOfAll(Id);
  }

  @Delete('delete/:categoryId')
  async delete(@Param('categoryId') categoryId: string, @CurrentUser() jwtPayload: JwtPayload ) {
    return this.categoryService.DeleteCategory(categoryId,jwtPayload);
  }

  @Put('update')
  async UpdateCategory(@Body() data: UpdateCategoryDTO, @CurrentUser() jwtPayload: JwtPayload ) {
    console.log(data)
    return this.categoryService.UpdateCategory(data,jwtPayload);
  }  



}
