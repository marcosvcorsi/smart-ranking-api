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
      create: jest.fn()
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
    it('should call PlayersService create with correct values', async () => {
      await controller.create(mockCreatePlayer);

      expect(service.create).toBeCalledWith(mockCreatePlayer);
    })

    it('should throw if PlayersService createOrUpdatePlayer throws', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(new BadRequestException());

      await expect(controller.create(mockCreatePlayer)).rejects.toThrow();
    })
  })
});
