import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesRepository } from '../../categories/repositories/categories.repository';
import { PlayersRepository } from '../../players/repositories/players.repository';
import { ChallengesRepository } from '../repositories/challenges.repository';
import { ChallengesService } from './challenges.service';

describe('ChallengesService', () => {
  let service: ChallengesService;

  beforeEach(async () => {
    const mockRepository = {};

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChallengesService,
        {
          provide: ChallengesRepository,
          useValue: mockRepository
        },
        {
          provide: PlayersRepository,
          useValue: mockRepository
        },
        {
          provide: CategoriesRepository,
          useValue: mockRepository
        }
      ],
    }).compile();

    service = module.get<ChallengesService>(ChallengesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
