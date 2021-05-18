import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {WorkerModel} from './entities';
import Sequelize from 'sequelize';

@Injectable()
export class WorkersService {
   
    constructor(
        @InjectModel(WorkerModel) private readonly _taskModel: typeof WorkerModel,
       ) { }

       async create(photo, worker:WorkerModel): Promise<WorkerModel>{
            worker.photo = photo.Location;
           const saved = await this._taskModel.create(worker);
   
           return saved;
       }

       async findAll(): Promise<WorkerModel[]>{
           return await this._taskModel.findAll();
       }

  
       async pairWorker(): Promise<WorkerModel>{
        return await this._taskModel.findOne(
            {order: [Sequelize.fn( 'RAND' )] }
            );
        }

        async delete(id:string){
            const softDeleted = await this._taskModel.destroy({
                where: { id: id },
            });

            return "deleted";
        }


        async update(id:string, photo, brand:WorkerModel): Promise<WorkerModel>{   
            if(photo){
                brand.photo = photo.Location;  
            }     
            let updated = await this._taskModel.update(brand, { where: { id } });
            if (updated) {
                let product = await this._taskModel.findOne({ where: { id } });
                return product;
            }

        }     
}
