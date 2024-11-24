import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDTO } from './dto/update.user.dto';
import { CreateUserDTO } from './dto/create.user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(private readonly prismaService: PrismaService) { }

    async CreateUser(data: CreateUserDTO) {
        try {
          //  this.prismaService.historyProductsUser
            const saltOrRounds =  await bcrypt.genSalt();
            const hash = await bcrypt.hash(data.password, saltOrRounds);
            var user = await this.prismaService.user.create({
                data: {
                    email: data.email,
                    login: data.login,
                    password:   hash 
                },
            });
            return user;
        } catch (error) {
            throw new HttpException('user not found', HttpStatus.NOT_FOUND);
        }
    }

    async UpdateUser(data: UpdateUserDTO) {
        try {
            
            const user=await this.prismaService.user.findFirst({ where: { id: data.id } });
            const isMatch = await bcrypt.compare( data.password, user.password);
            if (isMatch) {
                const saltOrRounds = 10;
                const hash = await bcrypt.hash(data.password, saltOrRounds);
                return await this.prismaService.user.update({
                    where: { id: data.id },
                    data: {
                        email: data.email,
                        login: data.login,
                        password: hash
                    },
                });
            }
            return  new HttpException('user is not valid', HttpStatus.NOT_FOUND);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT);
        }
    }

    async DeleteUser(id: string) {
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
                return this.prismaService.user.findFirst({ where: { login: loginUser } });
            }
            return this.prismaService.user.findMany();
        } catch (error) { }
    }

}
