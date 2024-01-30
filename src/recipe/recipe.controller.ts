import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { sendData, sendError } from 'src/utils/helper';
import { Request, Response } from 'express';

@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  @Post()
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
}
