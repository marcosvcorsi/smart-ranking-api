import { BadRequestException, Injectable } from '@nestjs/common';
import { PlayersRepository } from '../../players/repositories/players.repository';
import { CreateChallengeDto } from '../dtos/create-challenge.dto';
import { Challenge } from '../models/challenge.schema';
import { ChallengesRepository } from '../repositories/challenges.repository';

@Injectable()
export class ChallengesService {

  constructor(
    private readonly challengesRepository: ChallengesRepository,
    private readonly playersRepository: PlayersRepository
  ) {}

  async create(createChallengeDto: CreateChallengeDto): Promise<void> {
    return this.challengesRepository.create(createChallengeDto);
  }

  async findAllByPlayerId(playerId: string): Promise<Challenge[]> {
    const player = await this.playersRepository.findById(playerId);

    if(!player) {
      throw new BadRequestException('Id is not a valid player')
    }

    return this.challengesRepository.findAllByPlayerId(playerId);
  }
}
