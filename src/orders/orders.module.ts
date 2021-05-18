import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { 
  OrderModel,
} from './entities';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([
    OrderModel
  ])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
