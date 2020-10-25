import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { UpdatePlayerDto } from '../dtos/update-player.dto';
import { Player } from '../models/player.schema';
import { PlayersRepository } from '../repositories/players.repository';
import { PlayersService } from './players.service';

describe('PlayersService', () => {
  let service: PlayersService;
  let repository: PlayersRepository;
  let mockCreatePlayer: CreatePlayerDto;
  let mockUpdatePlayer: UpdatePlayerDto;
  let mockPlayer: Player;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      findByEmail: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayersService, {provide: PlayersRepository, useFactory: () => mockRepository}],
    }).compile();

    service = module.get<PlayersService>(PlayersService);
    repository = module.get<PlayersRepository>(PlayersRepository);

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
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should call create with correct values', async () => {
      const createSpy = jest.spyOn(repository, 'create');

      await service.create(mockCreatePlayer);

      expect(createSpy).toHaveBeenCalledWith(mockCreatePlayer);
    })

    it('should throw if create throws', async () => {
      jest.spyOn(repository, 'create').mockRejectedValueOnce(new Error())

      await expect(service.create(mockCreatePlayer)).rejects.toThrow(new Error());
    })

    it('should return an error if email already exists', async () => {
      jest.spyOn(repository, 'findByEmail').mockReturnValueOnce(Promise.resolve(mockPlayer))

      await expect(service.create(mockCreatePlayer)).rejects.toBeInstanceOf(BadRequestException);
    })

    it('should return a player on success', async () => {
      jest.spyOn(repository, 'create').mockReturnValueOnce(Promise.resolve(mockPlayer))

      const response = await service.create(mockCreatePlayer);

      expect(response).toEqual(mockPlayer);
    })
  })
});
