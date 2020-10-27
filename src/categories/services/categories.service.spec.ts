import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PlayersRepository } from '../../players/repositories/players.repository';
import { CategoriesRepository } from '../repositories/categories.repository';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const mockRepository = {}

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService, 
        { provide: CategoriesRepository, useValue: mockRepository}, 
        { provide: PlayersRepository, useValue: {}},
        { provide: getModelToken('Player'), useValue: {} }
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
