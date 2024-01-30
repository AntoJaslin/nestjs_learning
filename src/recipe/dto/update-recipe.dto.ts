import { IsString } from '@nestjs/class-validator';
import { IsNumber, Length } from 'class-validator';

export class UpdateRecipeDTO {
  @IsString()
  @Length(1, 255)
  name: string;

  @IsString()
  @Length(1, 255)
  description: string;

  @IsNumber()
  is_active: number;
}
