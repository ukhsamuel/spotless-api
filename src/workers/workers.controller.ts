import { Body, Controller, Get, Param, Post,Delete,Put, UploadedFile,  HttpException, HttpStatus,UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WorkersService } from './workers.service';
import { BaseController, ApiUserDto } from '../utils/api.response';
import { ImageUploadService } from '../utils/uploads';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('workers')
export class WorkersController {
    sendResponse = BaseController.sendResponse;
   
    constructor(
        private readonly workersService: WorkersService,
        private readonly imageUploadService: ImageUploadService
        ) { }

        /**
         * Get all Workers
         */
        @Get()
        async findAll(): Promise<any> {
          try {
              const res = await this.workersService.findAll();
              return this.sendResponse(res, "success");
          } catch (error) {
            console.log(error)
              throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
          }
        }

        /**
         * Get single random Worker
         */
        @Get('get-paired-worker')
        async pairWorker(): Promise<any> {
          try {
              const res = await this.workersService.pairWorker();
              return this.sendResponse(res, "success");
          } catch (error) {
            console.log(error)
              throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
          }
        }
      

  /**
   * Create Brand
   * @param {string} data.name the Worker title
   * @param {string} data.photo the Worker content
   *
   * @returns {[Promise<any> | null]} saved Worker data
   */
  
   @Post()
   @UseInterceptors(FileInterceptor('photo'))
   @ApiConsumes('multipart/form-data')
   // @CreateProductApiBody('photo')
   @ApiResponse({status: 201, description: 'success'})
   @ApiResponse({status: 401, description: 'Unauthorized'})
   @ApiResponse({status: 403, description: 'access forbidden'})
   @ApiResponse({status: 500, description: 'server error'})
   @ApiOperation({summary: 'Create Worker'})
   async create( @UploadedFile() file: Express.Multer.File, @Body() createItemDto): Promise<any> {

     try {
       let photo: any;
        if(file){
           photo =  await this.imageUploadService.assetsPhotoUpload(file);
        }
        const brand = await this.workersService.create(photo, createItemDto);
         return brand;
     } catch (error) {
       console.log(error)
         throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
     }
   }

   
   /**
    * Update Worker
    * @param {string} data.name the Worker title
    * @param {string} data.photo the Worker content
    *
    * @returns {[Promise<any> | null]} saved Worker data
    */
   
    @Put(':id')
    @UseInterceptors(FileInterceptor('photo'))
    @ApiConsumes('multipart/form-data')
    // @CreateProductApiBody('photo')
    @ApiResponse({status: 201, description: 'success'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    @ApiResponse({status: 403, description: 'access forbidden'})
    @ApiResponse({status: 500, description: 'server error'})
    @ApiOperation({summary: 'Create workers'})
    async update( @Param() {id}: any,@UploadedFile() file: Express.Multer.File, @Body() createItemDto): Promise<any> {

      try {
        let photo: any;
         if(file){
            photo =  await this.imageUploadService.assetsPhotoUpload(file);
         }
         const brand = await this.workersService.update(id, photo, createItemDto);
          return brand;
      } catch (error) {
        console.log(error)
          throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

  /**
    * Deletes single Worker 
    *
    * @param {Object} data
    * @param {number} data.brandId the brand to be deleted
    *
    * @returns {[String | null]}
    */
    @Delete(':id')
    delete(@Param() {id}) {
      return this.workersService.delete(id);
    }
    


}
