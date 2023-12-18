import { Module } from '@nestjs/common';
import { TasksService } from './Service/TasksService';
import { TasksController } from './TasksController';
import { TaskFormatter } from './Service/TaskFormatter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModel } from './Data/TaskModel';

@Module({
  imports: [TypeOrmModule.forFeature([TaskModel])],
  controllers: [TasksController],
  providers: [TasksService, TaskFormatter],
})
export class TasksModule {}
