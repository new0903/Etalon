import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDTO } from './dto/update.user.dto';
import { CreateUserDTO } from './dto/create.user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { genSalt, hashSync, compare } from 'bcrypt';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async CreateUser(data: CreateUserDTO, jwtPayload: JwtPayload) {
    try {
      this.prismaService.historyProductsUser;
      const saltOrRounds = await genSalt();
      const hash = await hashSync(data.password, saltOrRounds);
      var user = await this.prismaService.user.create({
        data: {
          email: data.email,
          login: data.login,
          password: hash,
        },
      });
      return user;
    } catch (error) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
  }

  async UpdateUser(data: UpdateUserDTO, jwtPayload: JwtPayload) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: { id: data.id },
      });
      const isMatch = await compare(data.oldPassword, user.password);
      if (isMatch) {
        let hash = user.password;
        if (data.newPassword === data.confirmPassword) {
          const saltOrRounds = await genSalt();
          hash = await hashSync(data.newPassword, saltOrRounds);
        }
        return await this.prismaService.user.update({
          where: { id: data.id },
          data: {
            email: data.email,
            login: data.login,
            password: data.newPassword,
          },
        });
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  async DeleteUser(id: string, jwtPayload: JwtPayload) {
    try {
      await this.prismaService.user.delete({ where: { id: id } });
      return HttpStatus.OK;
    } catch (error) {
      throw new HttpException('user is not exist', HttpStatus.NOT_FOUND);
    }
  }

  async GetOneUserOrAll(loginUser?: string) {
    try {
      if (loginUser) {
        return this.prismaService.user.findFirst({
          where: { login: loginUser },
        });
      }
      return this.prismaService.user.findMany();
    } catch (error) {}
  }
  async findOne(userEmail: string) {
    return this.prismaService.user.findFirst({
      where: { email: userEmail },
      include: { refreshToken: true },
    });
  }
}
