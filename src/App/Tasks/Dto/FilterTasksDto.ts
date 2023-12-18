import * as Joi from 'joi';

export interface FilterTasksDto {
  isCompleted?: boolean;
  createdBy?: number;
  orderBy?: 'createdAt' | 'title';
  order?: 'ASC' | 'DESC';
}

export const filterTasksValidationSchema = Joi.object({
  isCompleted: Joi.boolean().optional(),
  createdBy: Joi.number().optional(),
  orderBy: Joi.string()
    .valid('createdAt', 'title')
    .optional()
    .default('createdAt'),
  order: Joi.string().valid('ASC', 'DESC').optional().default('DESC'),
});
