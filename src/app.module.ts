import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [ProductModule, UserModule,CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
