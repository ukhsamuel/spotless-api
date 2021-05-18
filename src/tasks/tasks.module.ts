import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { 
  TaskModel,
} from './entities';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([
    TaskModel
  ])],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
