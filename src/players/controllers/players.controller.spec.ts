import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { UpdatePlayerDto } from '../dtos/update-player.dto';
import { Player } from '../models/player.schema';
import { PlayersService } from '../services/players.service';
import { PlayersController } from './players.controller';

describe('PlayersController', () => {
  let controller: PlayersController;
  let service: PlayersService;
  let mockCreatePlayer: CreatePlayerDto;
  let mockUpdatePlayer: UpdatePlayerDto;
  let mockPlayer: Player;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      deleteById: jest.fn()
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

    mockUpdatePlayer = {
      name: 'anyname',
      phoneNumber: '0000000'
    }

    mockCreatePlayer = {
      ...mockUpdatePlayer,
      email: 'anymail@mail.com',
    }

    mockPlayer = {
      ...mockCreatePlayer,
      ranking: 'a',
      rankingPosition: 1,
      imgUrl: 'any'
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should call PlayersService create with correct values', async () => {
      await controller.create(mockCreatePlayer);

      expect(service.create).toBeCalledWith(mockCreatePlayer);
    })

    it('should throw if PlayersService create throws', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(new BadRequestException());

      await expect(controller.create(mockCreatePlayer)).rejects.toThrow();
    })

    it('should return a player on success', async () => {
      jest.spyOn(service, 'create').mockReturnValueOnce(Promise.resolve(mockPlayer));

      const response = await controller.create(mockPlayer);

      expect(response).toEqual(mockPlayer);
    })
  })

  describe('update()', () => {
    it('should call PlayersService update with correct values', async () => {
      await controller.update('anyid', mockUpdatePlayer);

      expect(service.update).toBeCalledWith('anyid', mockUpdatePlayer);
    })

    it('should throw if PlayersService update throws', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(new BadRequestException());

      await expect(controller.update('anyid', mockUpdatePlayer)).rejects.toThrow();
    })

    it('should return a player on success', async () => {
      jest.spyOn(service, 'update').mockReturnValueOnce(Promise.resolve(mockPlayer));

      const response = await controller.update('anyid', mockUpdatePlayer);

      expect(response).toEqual(mockPlayer);
    })
  })

  describe('findAll()', () => {
    it('should call PlayersService findAll', async () => {
      const findAllSpy = jest.spyOn(service, 'findAll');

      await controller.findAll();

      expect(findAllSpy).toHaveBeenCalled();
    })

    it('should throw if PlayersService findAll throws', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValue(new BadRequestException());

      await expect(controller.findAll()).rejects.toThrow();
    })

    it('should return a list of players on success', async () => {
      const mockPlayerList = [mockPlayer];

      jest.spyOn(service, 'findAll').mockReturnValueOnce(Promise.resolve(mockPlayerList))

      const response = await controller.findAll();

      expect(response).toEqual(mockPlayerList);
    })
  })

  describe('findById()', () => {
    it('should call PlayersService findById with correct value', async () => {
      const findSpy = jest.spyOn(service, 'findById');

      await controller.findById('anyid');

      expect(findSpy).toHaveBeenCalledWith('anyid');
    })

    it('should throw if PlayersService findById throws', async () => {
      jest.spyOn(service, 'findById').mockRejectedValue(new BadRequestException());

      await expect(controller.findById('anyid')).rejects.toThrow();
    })

    it('should return a player on success', async () => {
      jest.spyOn(service, 'findById').mockReturnValueOnce(Promise.resolve(mockPlayer))

      const response = await controller.findById('anyid');

      expect(response).toEqual(mockPlayer);
    })
  })

  describe('deleteById()', () => {
    it('should call PlayersService deleteById with correct value', async () => {
      const deleteSpy = jest.spyOn(service, 'deleteById');

      await controller.delete('anyid');

      expect(deleteSpy).toHaveBeenCalledWith('anyid');
    })

    it('should throw if PlayersService deleteById throws', async () => {
      jest.spyOn(service, 'deleteById').mockRejectedValue(new BadRequestException());

      await expect(controller.delete('anyid')).rejects.toThrow();
    })
  })
});
