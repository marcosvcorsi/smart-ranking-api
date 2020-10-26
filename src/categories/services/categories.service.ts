import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { Category } from '../models/category.schema';
import { CategoriesRepository } from '../repositories/categories.repository';

@Injectable()
export class CategoriesService {

  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const findCategoryByName = await this.categoriesRepository.findByName(createCategoryDto.name);

    if(findCategoryByName) {
      throw new BadRequestException('Category already exists')
    }

    return this.categoriesRepository.create(createCategoryDto);
  }
}
