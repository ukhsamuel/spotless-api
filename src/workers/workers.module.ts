import { Module } from '@nestjs/common';
import { WorkersController } from './workers.controller';
import { WorkersService } from './workers.service';
import { 
  WorkerModel,
} from './entities';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImageUploadService } from '../utils/uploads';

@Module({
  imports: [SequelizeModule.forFeature([
    WorkerModel
  ])],
  controllers: [WorkersController],
  providers: [
    WorkersService,
    ImageUploadService
  ]
})
export class WorkersModule {}
