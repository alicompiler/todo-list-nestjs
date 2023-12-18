import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TasksService } from './todos.service';
import { Todo } from './todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Todo> {
    return this.todosService.findOne(id);
  }

  @Post()
  async createTask(@Body() todo: Todo): Promise<Todo> {
    return this.todosService.create(todo);
  }

  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() todo: Todo): Promise<Todo> {
    return this.todosService.update(id, todo);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return this.todosService.remove(id);
  }
}
