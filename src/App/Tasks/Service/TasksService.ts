import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../Dto/CreateTaskDto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskModel } from '../Data/TaskModel';
import { FindTaskDto } from '../Dto/FindTaskDto';
import { FindOptionsWhere, Repository } from 'typeorm';
import { FilterTasksDto } from '../Dto/FilterTasksDto';

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
  async getByFilters(filters: FilterTasksDto) {
    const where: FindOptionsWhere<TaskModel> = {};
    if (filters.isCompleted) {
      where.isCompleted = filters.isCompleted;
    }
    if (filters.createdBy) {
      where.createdBy = filters.createdBy;
    }
    const orderBy = filters.orderBy || 'createdAt';
    const order = filters.order || 'DESC';
    return this.tasksRepository.find({
      where,
      order: {
        [orderBy]: order,
      },
    });
  }
}
