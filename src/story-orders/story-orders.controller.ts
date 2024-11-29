import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { StoryOrdersService } from './story-orders.service';
import { CreateStoryOrderDTO } from './dto/create.story-order.tdo';
import { UpdateStoryOrderDTO } from './dto/update.story-order.tdo';


import { CurrentUser } from 'src/customDecorators/current-user.decorator';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';

@Controller('story-orders')
export class StoryOrdersController {
    constructor(private readonly storyOrderService: StoryOrdersService){}

    @Post('create')
    async CreateStoryOrdersController(@Body() data: CreateStoryOrderDTO, @CurrentUser() jwtPayload: JwtPayload ) {
        return this.storyOrderService.CreateStoryOrder(data)
    }
    
    @Put('update')
    async UpdateStoryOrdersController(@Body() data: UpdateStoryOrderDTO, @CurrentUser() jwtPayload: JwtPayload) {
        return this.storyOrderService.UpdateStoryOrder(data)
    }

    @Delete('delete:/id')
    async DeleteStoryOrdersController(@Param('id') id: string, @CurrentUser() jwtPayload: JwtPayload) {
        return this.storyOrderService.DeleteStoryOrder(id)
    }

    @Get(':storyOrderId')
    async GetStoryOrdersController(@Query('storyOrderId') storyOrderId: string) {
        return this.storyOrderService.GetOneStoryOrderOfAll(storyOrderId)
    }
}
