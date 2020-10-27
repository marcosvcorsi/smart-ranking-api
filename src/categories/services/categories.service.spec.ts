import { Test, TestingModule } from '@nestjs/testing';
import { PlayersService } from '../../players/services/players.service';
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
        { provide: PlayersService, useValue: {}},
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
