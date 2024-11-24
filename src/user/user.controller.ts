
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



@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) { }
    @Post('create')
    async CreateUserController(@Body() data: CreateUserDTO) {
        return this.userService.CreateUser(data);
    }
    
    @Put('update')
    async UpdateUserController(@Body() data: UpdateUserDTO ) {
        return this.userService.UpdateUser(data);
    }
    
    @Delete('delete/:id')
    async DeleteUserController(@Param('id') id: string) {
    
        return this.userService.DeleteUser(id);
    }
    
    @Get(':loginUser')
    async GetUserController(
        @Query('loginUser') loginUser ?: string,
    ) {
        return this.userService.GetOneUserOrAll(loginUser);
    }
    
    
}
