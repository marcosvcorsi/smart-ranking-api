import { Test, TestingModule } from '@nestjs/testing';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { PlayersRepository } from '../repositories/players.repository';
import { PlayersService } from './players.service';

describe('PlayersService', () => {
  let service: PlayersService;
  let mockCreatePlayer: CreatePlayerDto;


  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      findByEmail: jest.fn(),
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayersService, {provide: PlayersRepository, useFactory: () => mockRepository}],
    }).compile();

    service = module.get<PlayersService>(PlayersService);

    mockCreatePlayer = {
      email: 'anymail@mail.com',
      name: 'anyname',
      phoneNumber: '0000000'
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should call create with correct values', async () => {
      const createSpy = jest.spyOn(service, 'create');

      await service.create(mockCreatePlayer);

      expect(createSpy).toHaveBeenCalledWith(mockCreatePlayer);
    })

    it('should throw if create throws', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error())

      await expect(service.create(mockCreatePlayer)).rejects.toThrow(new Error());
    })
  })
});
