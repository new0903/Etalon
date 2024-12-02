
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
import { UpdateUserDTO } from './dto/update.user.dto';
import { CreateUserDTO } from './dto/create.user.dto';
import { UserService } from './user.service';
import { CurrentUser } from 'src/customDecorators/current-user.decorator';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';


@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }
    @Post('create')
    async CreateUserController(@Body() data: CreateUserDTO, @CurrentUser() jwtPayload: JwtPayload) {
        return this.userService.CreateUser(data,jwtPayload);
    }
    
    @Put('update')
    async UpdateUserController(@Body() data: UpdateUserDTO, @CurrentUser() jwtPayload: JwtPayload ) {
        return this.userService.UpdateUser(data,jwtPayload);
    }
    
    @Delete('delete/:id')
    async DeleteUserController(@Param('id') id: string, @CurrentUser() jwtPayload: JwtPayload) {
    
        return this.userService.DeleteUser(id,jwtPayload);
    }
    
    @Get('users')
    async GetUserController(
        @Query('login') login ?: string,
    ) {
        return this.userService.GetOneUserOrAll(login);
    }
    
    
}
