import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Category } from '../models/category.schema';
import { CategoriesService } from '../services/categories.service';

@Controller('api/v1/categories')
export class CategoriesController {
  
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.findById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createCategoryDto): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }
}
