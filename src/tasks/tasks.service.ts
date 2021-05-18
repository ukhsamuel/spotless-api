import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {TaskModel} from './entities';

@Injectable()
export class TasksService {
   
    constructor(
        @InjectModel(TaskModel) private readonly _taskModel: typeof TaskModel,
       ) { }
    

       async create( task:TaskModel): Promise<TaskModel>{
           console.log('task',task)
           const saved = await this._taskModel.create(task);
   
           return saved;
       }
       
       async findAll(): Promise<TaskModel[]>{
           return await this._taskModel.findAll();
       }

       async delete(id:string){
           const softDeleted = await this._taskModel.destroy({
               where: { id: id },
             });
   
             return "successfully deleted";
       }
   
       async update(id:string,task:TaskModel): Promise<TaskModel>{   
           let updated = await this._taskModel.update(task, { where: { id } });
           if (updated) {
               let res = await this._taskModel.findOne({ where: { id } });
               return res;
           }
   
       }
   

}
