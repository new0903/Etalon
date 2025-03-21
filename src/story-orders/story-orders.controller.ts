import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { StoryOrdersService } from './story-orders.service';
import { CreateStoryOrderDTO } from './dto/create.story-order.tdo';
import { UpdateStoryOrderDTO } from './dto/update.story-order.tdo';
import { Public } from 'src/customDecorators/public.decorator';
import { CurrentUser } from 'src/customDecorators/current-user.decorator';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';

@Controller('story')
export class StoryOrdersController {
    constructor(private readonly storyOrderService: StoryOrdersService){}

    
    @Post('create')
    async CreateStoryOrdersController(@Body() data: CreateStoryOrderDTO, @CurrentUser() jwtPayload: JwtPayload ) {
        console.log(data)
        return this.storyOrderService.CreateStoryOrder(data,jwtPayload)
    }
    
    @Put('update')
    async UpdateStoryOrdersController(@Body() data: UpdateStoryOrderDTO, @CurrentUser() jwtPayload: JwtPayload) {
        return this.storyOrderService.UpdateStoryOrder(data,jwtPayload)
    }

    @Delete('delete/:id')
    async DeleteStoryOrdersController(@Param('id') id: string, @CurrentUser() jwtPayload: JwtPayload) {
        return this.storyOrderService.DeleteStoryOrder(id)
    }

    @Get('all')
    async GetStoryOrdersController(@Query('Id') Id?: string) {
        return this.storyOrderService.GetOneStoryOrderOfAll(Id)
    }
}
