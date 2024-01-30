import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { sendData, sendError } from 'src/utils/helper';
import { Request, Response } from 'express';
import { UpdateRecipeDTO } from './dto/update-recipe.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  @Post('create')
  async create(
    @Body() body: CreateRecipeDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const payload = new Recipe().bind({ ...body });
      const data = await this.recipeService.create(payload);

      return sendData(res, data, 'Recipe Created Successfully!', 201);
    } catch (err) {
      return sendError(res, err);
    }
  }

  @Patch('update/:id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateRecipeDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const { name, description, is_active } = new Recipe().bind({ ...body });
      const data = await this.recipeService.findOne(+id);
      if (!data)
        return sendError(res, 'Recipe Not Found!', HttpStatus?.NOT_FOUND);
      if (name) data.name = name;
      if (description) data.description = description;
      if (is_active) data.is_active = is_active;

      this.recipeService.recipeSave(data);

      return sendData(res, data, 'Recipe Updated Successfully!', 201);
    } catch (err) {
      return sendError(res, err);
    }
  }
}
