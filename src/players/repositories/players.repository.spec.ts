import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { PlayersRepository } from "./players.repository";

describe('Players Repository', () => {
  let repository: PlayersRepository;

  beforeEach(async () => {
    const mockModel = {};

    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayersRepository, { provide: getModelToken('Player'), useFactory: () => mockModel }],
    }).compile();

    repository = module.get<PlayersRepository>(PlayersRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });
})