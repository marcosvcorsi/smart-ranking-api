import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PlayersService } from '../../players/services/players.service';
import { AddCategoryPlayerDto } from '../dtos/add-category-player.dto';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { Category } from '../models/category.schema';
import { CategoriesRepository } from '../repositories/categories.repository';

@Injectable()
export class CategoriesService {

  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly playersService: PlayersService
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.findAll();
  }

  async findById(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findById(id);

    if(!category) {
      throw new NotFoundException();
    }

    return category;
  }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const findCategoryByName = await this.categoriesRepository.findByName(createCategoryDto.name);

    if(findCategoryByName) {
      throw new BadRequestException('Category already exists')
    }

    return this.categoriesRepository.create(createCategoryDto);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<void> {
    const category = await this.categoriesRepository.findById(id);

    if(!category) {
      throw new NotFoundException('Category not found');
    }

    return this.categoriesRepository.update(id, updateCategoryDto);
  }

  async addCategoryPlayer(params: AddCategoryPlayerDto) {
    const {categoryId, playerId} = params;

    const category = await this.categoriesRepository.findById(categoryId);

    if(!category) {
      throw new NotFoundException('Category not found');
    }

    await this.playersService.findById(playerId);

    return this.categoriesRepository.addPlayerToCategory(playerId, categoryId, category);
  }
}
