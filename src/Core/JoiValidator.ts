import {
  ArgumentMetadata,
  BadRequestException,
  Paramtype,
  PipeTransform,
} from '@nestjs/common';
import { Schema } from 'joi';

export class JoiValidator implements PipeTransform<unknown> {
  private readonly paramType: Paramtype;

  constructor(private joiSchema: Schema, type?: Paramtype) {
    this.paramType = type || 'body';
  }

  transform(value: unknown, meta: ArgumentMetadata) {
    if (meta.type !== this.paramType) {
      return value;
    }
    const result = this.joiSchema.validate(value);
    if (result.error) {
      throw new BadRequestException(result.error);
    }

    return result.value;
  }
}
