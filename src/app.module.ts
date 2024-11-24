import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { StoryOrdersModule } from './story-orders/story-orders.module';

@Module({
  imports: [ProductModule, CategoryModule, StoryOrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
