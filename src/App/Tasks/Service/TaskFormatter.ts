import { Injectable } from '@nestjs/common';
import { TaskModel } from '../Data/TaskModel';
import { TaskResponse } from '../Dto/TaskResponse';

@Injectable()
export class TaskFormatter {
  formatOne(task: TaskModel): TaskResponse {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      isCompleted: task.isCompleted,
      createdAt: task.createdAt.toISOString(),
    };
  }

  formatMany(tasks: TaskModel[]): TaskResponse[] {
    return tasks.map((task) => this.formatOne(task));
  }
}
