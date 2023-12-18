import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Query,
  UsePipes,
} from '@nestjs/common';
import { JoiValidator } from '../../Core/JoiValidator';
import { CreateTaskDto, createTaskValidationSchema } from './Dto/CreateTaskDto';
import { TasksService } from './Service/TasksService';
import { TaskFormatter } from './Service/TaskFormatter';
import { FindTaskDto } from './Dto/FindTaskDto';
import {
  FilterTasksDto,
  filterTasksValidationSchema,
} from './Dto/FilterTasksDto';

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
  @HttpCode(HttpStatus.OK)
  async find(@Body() dto: FindTaskDto) {
    const task = await this.tasksService.find(dto);
    return this.formatter.formatOne(task);
  }

  @Get()
  @UsePipes(new JoiValidator(filterTasksValidationSchema, 'query'))
  @HttpCode(HttpStatus.OK)
  async getAll(@Query() filters: FilterTasksDto) {
    const tasks = await this.tasksService.getByFilters(filters);
    return this.formatter.formatMany(tasks);
  }
}
