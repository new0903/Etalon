import { Module } from '@nestjs/common';
import { UserOrderController } from './user-order.controller';
import { UserOrderService } from './user-order.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserOrderController],
  providers: [UserOrderService],
})
export class UserOrderModule {}
