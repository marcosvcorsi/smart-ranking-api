import { Body, Controller, Get, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddCategoryPlayerDto } from '../dtos/add-category-player.dto';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
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
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, updateCategoryDto: UpdateCategoryDto): Promise<void> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Patch(':categoryId/players/:playerId')
  async patch(@Param() params: AddCategoryPlayerDto): Promise<void> {
    return this.categoriesService.addCategoryPlayer(params);
  }
}