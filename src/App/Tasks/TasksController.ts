import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  UsePipes,
} from '@nestjs/common';
import { JoiValidator } from '../../Core/JoiValidator';
import { CreateTaskDto, createTaskValidationSchema } from './Dto/CreateTaskDto';
import { TasksService } from './Service/TasksService';
import { TaskFormatter } from './Service/TaskFormatter';
import { FindTaskDto, findTaskValidationSchema } from './Dto/FindTaskDto';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly formatter: TaskFormatter,
  ) {}

  @Post()
  @UsePipes(new JoiValidator(createTaskValidationSchema))
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateTaskDto) {
    const createdById = 1; // TODO: get id from token
    const task = await this.tasksService.create(dto, createdById);
    return this.formatter.formatOne(task);
  }

  @Get(':id')
  @UsePipes(new JoiValidator(findTaskValidationSchema))
  @HttpCode(HttpStatus.OK)
  async find(@Body() dto: FindTaskDto) {
    const task = await this.tasksService.find(dto);
    return this.formatter.formatOne(task);
  }
}
