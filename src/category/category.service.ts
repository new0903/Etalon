import { HttpStatus, Injectable,HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDTO } from './dto/create.category.tdo';
import { UpdateCategoryDTO } from './dto/update.category.tdo';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) { }

  async CreateCategory(data: CreateCategoryDTO, jwtPayload: JwtPayload) {
    try {
 
        var category = await this.prismaService.category.create({
          data: {
            name: data.nameCategory,
          }
        });

        return category;
    } catch (e) {
      return new HttpException("Ошибка при создании новой категории.", HttpStatus.NOT_FOUND);
    }
  }

  async UpdateCategory(data: UpdateCategoryDTO, jwtPayload: JwtPayload) {
    try {
        console.log(data)
         var category = await this.prismaService.category.update({
          where: {
            id: data.id,
          },
          data: {
            name: data.nameCategory,
          }
        })
        return category;
    } catch (e) {
      return new HttpException("error", HttpStatus.NOT_FOUND);
    }
  }

  async GetOneCategoryOfAll(categoryId?: string) {
    try {
      if (categoryId) {
        return await this.prismaService.category.findFirst({
          where: {
            id: categoryId,
          }
        })
      }

      return await this.prismaService.category.findMany();
    } catch (e) {
      return new HttpException("Ошибка поиска категории.", HttpStatus.NOT_FOUND);
    }
  }

  async DeleteCategory(categoryId: string, jwtPayload: JwtPayload) {
    try {

        await this.prismaService.category.delete({
          where: {
            id: categoryId,
          }
        });

        return HttpStatus.OK;
    } catch (e) {
      return new HttpException("error", HttpStatus.NOT_FOUND);
    }
  }
}
