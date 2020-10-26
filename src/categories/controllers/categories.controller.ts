import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Category } from '../models/category.schema';
import { CategoriesService } from '../services/categories.service';

@Controller('api/v1/categories')
export class CategoriesController {
  
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createCategoryDto): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }
}
