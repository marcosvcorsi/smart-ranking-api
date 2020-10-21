import { Test, TestingModule } from '@nestjs/testing';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { PlayersService } from './players.service';

describe('PlayersService', () => {
  let service: PlayersService;
  let mockCreatePlayer: CreatePlayerDto;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayersService],
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

  describe('createOrUpdatePlayer()', () => {
    it('should call create with correct values', async () => {
      const createSpy = jest.spyOn(service, 'create');

      await service.createOrUpdatePlayer(mockCreatePlayer);

      expect(createSpy).toHaveBeenCalledWith(mockCreatePlayer);
    })

    it('should throw if create throws', async () => {
      jest.spyOn(service, 'create').mockImplementationOnce(() => {
        throw new Error()
      })

      await expect(service.createOrUpdatePlayer(mockCreatePlayer)).rejects.toThrow(new Error());
    })
  })
});
