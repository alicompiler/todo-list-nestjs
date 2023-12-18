import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../Dto/CreateTaskDto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskModel } from '../Data/TaskModel';
import { Repository } from 'typeorm';
import { FindTaskDto } from '../Dto/FindTaskDto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskModel)
    private readonly tasksRepository: Repository<TaskModel>,
  ) {}

  async create(dto: CreateTaskDto, createdById: number): Promise<TaskModel> {
    const task = this.tasksRepository.create({
      ...dto,
      createdBy: createdById,
    });
    return this.tasksRepository.save(task);
  }

  async find(dto: FindTaskDto) {
    return this.tasksRepository.findOneBy({ id: dto.id });
  }
}
