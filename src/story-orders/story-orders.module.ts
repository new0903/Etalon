import { Module } from '@nestjs/common';
import { StoryOrdersController } from './story-orders.controller';
import { StoryOrdersService } from './story-orders.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StoryOrdersController],
  providers: [StoryOrdersService]
})
export class StoryOrdersModule {}
