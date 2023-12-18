import * as Joi from 'joi';

export interface FindTaskDto {
  id: number;
}

export const findTaskValidationSchema = Joi.object({
  id: Joi.number().required()
});
