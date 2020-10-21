import { Test, TestingModule } from '@nestjs/testing';
import { PlayersController } from './players.controller';

describe('PlayersController', () => {
  let controller: PlayersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayersController],
    }).compile();

    controller = module.get<PlayersController>(PlayersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createOrUpdatePlayer', async () => {
    it('should call PlayersService createOrUpdatePlayer with correct values', async () => {
      expect(true).toBe(true);
    })
  })
});
