import { IsString } from '@nestjs/class-validator';
import { IsNumber, Length } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  @Length(1, 255)
  name: string;

  @IsString()
  @Length(1, 255)
  description: string;

  @IsNumber()
  is_active: number;
}
