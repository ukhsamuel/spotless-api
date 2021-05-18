import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {OrderModel} from './entities';

@Injectable()
export class OrdersService {
    
    constructor(
         @InjectModel(OrderModel) private readonly _orderModel: typeof OrderModel,
        ) { }

        async findAll(): Promise<OrderModel[]>{
            return await this._orderModel.findAll();
        }
        
        async create(order:OrderModel): Promise<OrderModel>{
            console.log('order',order)
            const saved = await this._orderModel.create(order);
    
            return saved;
        }

}
