import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDTO } from './dto/create.category.tdo';
import { UpdateCategoryDTO } from './dto/update.category.tdo';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async CreateCategory(data: CreateCategoryDTO) {
    try {
      var category = this.prismaService.category.create({
        data: {
          name: data.name,
        }
      });

      return category;
    } catch (e) {
      console.debug("Ошибка при создании новой категории.", e);
    }
  }

  async GetOneCategoryOfAll(categoryId?: string) {
    try {
      if (categoryId) {
        return this.prismaService.category.findFirst({
          where: {
            id: categoryId,
          }
        })
      }

      return this.prismaService.category.findMany();
    } catch (e) {
      console.debug("Ошибка поиска категории.", e);
    }
  }

  async DeleteCategory(categoryId: string) {
    try {
      await this.prismaService.category.delete({
        where: {
          id: categoryId,
        }
      });
  
      return HttpStatus.OK;
    } catch (e) {
      console.debug("Ошибка при удалении категории.", e)
    }
  }

  async UpdateCategory(data: UpdateCategoryDTO) {
    try {
      return await this.prismaService.category.update({
        where: {
          id: data.id,
        },
        data: {
          name: data.name,
        }
      })
    } catch (e) {
      console.debug("Ошибка при обновлении категории.", e);
    }
  }
}
