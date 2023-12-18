import * as Joi from 'joi';

export interface UpdateTaskDto {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
}

export const updateTaskValidationSchema = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().required(),
  description: Joi.string().optional(),
  isCompleted: Joi.boolean().optional(),
});
