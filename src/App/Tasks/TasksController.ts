import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
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
import {UpdateTaskDto, updateTaskValidationSchema} from "./Dto/UpdateTaskDto";

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
  async find(@Param('id') id: number) {
    const task = await this.tasksService.find(id);
    return this.formatter.formatOne(task);
  }

  @Get()
  @UsePipes(new JoiValidator(filterTasksValidationSchema, 'query'))
  @HttpCode(HttpStatus.OK)
  async getAll(@Query() filters: FilterTasksDto) {
    const tasks = await this.tasksService.getByFilters(filters);
    return this.formatter.formatMany(tasks);
  }

  @Put(':id')
  @UsePipes(new JoiValidator(updateTaskValidationSchema))
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: number, @Body() dto: UpdateTaskDto) {
    const task = await this.tasksService.updateById(id, dto);
    return this.formatter.formatOne(task);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number) {
    await this.tasksService.delete(id);
  }
}
