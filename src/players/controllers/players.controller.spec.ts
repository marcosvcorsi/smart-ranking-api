import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { PlayersService } from '../services/players.service';
import { PlayersController } from './players.controller';

describe('PlayersController', () => {
  let controller: PlayersController;
  let service: PlayersService;
  let mockCreatePlayer: CreatePlayerDto;

  beforeEach(async () => {
    const mockService = {
      createOrUpdatePlayer: jest.fn()
    }

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [{
        provide: PlayersService,
        useFactory: () => mockService
      }]
    }).compile();

    controller = module.get<PlayersController>(PlayersController);
    service = module.get<PlayersService>(PlayersService)

    mockCreatePlayer = {
      email: 'anymail@mail.com',
      name: 'anyname',
      phoneNumber: '0000000'
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createOrUpdatePlayer', () => {
    it('should call PlayersService createOrUpdatePlayer with correct values', async () => {
      await controller.createOrUpdatePlayer(mockCreatePlayer);

      expect(service.createOrUpdatePlayer).toBeCalledWith(mockCreatePlayer);
    })

    it('should throw if PlayersService createOrUpdatePlayer throws', async () => {
      jest.spyOn(service, 'createOrUpdatePlayer').mockRejectedValue(new BadRequestException());

      await expect(controller.createOrUpdatePlayer(mockCreatePlayer)).rejects.toThrow();
    })
  })
});
