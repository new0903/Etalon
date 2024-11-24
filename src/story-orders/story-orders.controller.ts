import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { StoryOrdersService } from './story-orders.service';
import { CreateStoryOrderDTO } from './dto/create.story-order.tdo';
import { UpdateStoryOrderDTO } from './dto/update.story-order.tdo';

@Controller('story-orders')
export class StoryOrdersController {
    constructor(private readonly storyOrderService: StoryOrdersService){}

    @Post('create')
    async CreateStoryOrdersController(@Body() data: CreateStoryOrderDTO) {
        return this.storyOrderService.CreateStoryOrder(data)
    }
    
    @Put('update')
    async UpdateStoryOrdersController(@Body() data: UpdateStoryOrderDTO) {
        return this.storyOrderService.UpdateStoryOrder(data)
    }

    @Delete('delete:/id')
    async DeleteStoryOrdersController(@Param('id') id: string) {
        return this.storyOrderService.DeleteStoryOrder(id)
    }

    @Get(':storyOrderId')
    async GetStoryOrdersController(@Query('storyOrderId') storyOrderId: string) {
        return this.storyOrderService.GetOneStoryOrderOfAll(storyOrderId)
    }
}
