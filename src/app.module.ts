import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';

import { AuthModule } from './auth/auth.module';

import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { StoryOrdersModule } from './story-orders/story-orders.module';

@Module({
  imports: [ProductModule,StoryOrdersModule, UserModule,CategoryModule, AuthModule,PrismaModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },],
})
export class AppModule {}
