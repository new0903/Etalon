import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO } from './dto/create.category.tdo';
import { UpdateCategoryDTO } from './dto/update.category.tdo';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  async create(@Body() data: CreateCategoryDTO) {
    return this.categoryService.CreateCategory(data);
  }

  @Get(':categoryId')
  async get(@Query('categoryId') categoryId?: string) {
    return this.categoryService.GetOneCategoryOfAll(categoryId);
  }

  @Delete('delete/:categoryId')
  async delete(@Param('categoryId') categoryId: string) {
    return this.categoryService.DeleteCategory(categoryId);
  }

  @Put('update')
  async update(@Body() data: UpdateCategoryDTO) {
    return this.categoryService.UpdateCategory(data);
  }  
}
