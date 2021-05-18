import { Body, Controller, Get, Param, Post,Delete,Put, UploadedFile,  HttpException, HttpStatus,UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './interfaces/order.interface';
import { OrdersService } from './orders.service';
import {OrderModel} from './entities';
import { BaseController, ApiUserDto } from '../utils/api.response';

@Controller('orders')
export class OrdersController {
    sendResponse = BaseController.sendResponse;

    constructor(
      private readonly ordersService: OrdersService
      ){}

    /**
     * Get all Orders
     */
     @Get()
     findAll(): Promise<OrderModel[]> {
         return this.ordersService.findAll();
     }

    /**
     * Create Category
     * @param {string} data.Category.name the Category title
     *
     * @returns {[Promise<any> | null]} saved Category data
     */
    
     @Post()
     @ApiResponse({status: 201, description: 'success'})
     @ApiResponse({status: 401, description: 'Unauthorized'})
     @ApiResponse({status: 403, description: 'access forbidden'})
     @ApiResponse({status: 500, description: 'server error'})
     @ApiOperation({summary: 'Create Order'})
     async create( @Body() data): Promise<any> {
  
       try {
          const res = await this.ordersService.create(data);
         return this.sendResponse(res, "Order request successfully");
       } catch (error) {
         console.log(error)
           throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
       }
     }  

}
