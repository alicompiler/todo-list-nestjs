import * as Joi from 'joi';

export interface CreateTaskDto {
  title: string;
  description: string;
}

export const createTaskValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
});
