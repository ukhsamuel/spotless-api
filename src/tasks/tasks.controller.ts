import { Body, Controller, Get, Param, Post,Delete,Put, UploadedFile,  HttpException, HttpStatus,UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { BaseController, ApiUserDto } from '../utils/api.response';

@Controller('tasks')
export class TasksController {
    sendResponse = BaseController.sendResponse;

    constructor(
      private readonly tasksService: TasksService
      ){}

      /**
       * Get all Tasks
       */
      @Get()
      async findAll(): Promise<any> {
        try {
           const res = await this.tasksService.findAll();
           return this.sendResponse(res, "success");
        } catch (error) {
          console.log(error)
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    
      /**
       * Create Task
       * @param {string} data.name the Task title
       *
       * @returns {[Promise<any> | null]} saved Task data
       */
      
       @Post()
       @ApiResponse({status: 201, description: 'success'})
       @ApiResponse({status: 401, description: 'Unauthorized'})
       @ApiResponse({status: 403, description: 'access forbidden'})
       @ApiResponse({status: 500, description: 'server error'})
       @ApiOperation({summary: 'Create task'})
       async create( @Body() data): Promise<any> {
    
         try {
             console.log(data)
            const res = await this.tasksService.create(data);

            return this.sendResponse(res, "success");
         } catch (error) {
           console.log(error)
             throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
         }
       }  

  
       /**
        * Update Category
        * @param {string} data.name the Task title
        *
        * @returns {[Promise<any> | null]} saved Task data
        */
       
        @Put(':id')
        @ApiResponse({status: 201, description: 'success'})
        @ApiResponse({status: 401, description: 'Unauthorized'})
        @ApiResponse({status: 403, description: 'access forbidden'})
        @ApiResponse({status: 500, description: 'server error'})
        @ApiOperation({summary: 'Update task'})
        async update(@Param() {id}: any, @Body() data): Promise<any> {
     
          try {
             const brand = await this.tasksService.update(id,data);
              return brand;
          } catch (error) {
            console.log(error)
              throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
          }
        }  
       
     
       /**
        * Deletes single Category 
        *
        * @param {Object} data
        * @param {number} data.Id the Task to be deleted
        *
        * @returns {[String | null]}
        */
        @Delete(':id')
        delete(@Param() {id}) {
          return this.tasksService.delete(id);
        }
  


}
