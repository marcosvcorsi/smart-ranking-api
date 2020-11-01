import { Test, TestingModule } from '@nestjs/testing';
import { ChallengesService } from '../services/challenges.service';
import { ChallengesController } from './challenges.controller';

describe('ChallengesController', () => {
  let controller: ChallengesController;

  beforeEach(async () => {
    const mockService = {}

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChallengesController],
      providers: [
        {
          provide: ChallengesService,
          useValue: mockService
        }
      ],
    }).compile();

    controller = module.get<ChallengesController>(ChallengesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
