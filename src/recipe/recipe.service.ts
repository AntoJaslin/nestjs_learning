import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './entities/recipe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecipeService {
  @InjectRepository(Recipe)
  private readonly recipeRepository: Repository<Recipe>;

  async findAll() {
    return await this.recipeRepository.find();
  }

  async create(data: Recipe) {
    return await this.recipeRepository.save(data);
  }

  async findOne(id: number) {
    return await this.recipeRepository.findOne({ where: { id } });
  }

  async recipeSave(data: Recipe) {
    return await this.recipeRepository.save(data);
  }
}
