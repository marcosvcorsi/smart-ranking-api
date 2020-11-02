import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from '../../categories/repositories/categories.repository';
import { PlayersRepository } from '../../players/repositories/players.repository';
import { CreateChallengeDto } from '../dtos/create-challenge.dto';
import { UpdateChallengeDto } from '../dtos/update-challenge.dto';
import { Challenge } from '../models/challenge.schema';
import { ChallengesRepository } from '../repositories/challenges.repository';

@Injectable()
export class ChallengesService {

  constructor(
    private readonly challengesRepository: ChallengesRepository,
    private readonly playersRepository: PlayersRepository,
    private readonly categoriesRepository: CategoriesRepository
  ) {}

  async create(createChallengeDto: CreateChallengeDto): Promise<void> {
    const players = await this.playersRepository.findAll();

    createChallengeDto.players.forEach(player => {
      const isValid = players.some(item => String(item._id) === player)

      if(!isValid) {
        throw new BadRequestException(`Id ${player} is not a player`)
      }
    })

    const challengerIsAPlayer = createChallengeDto.players.find(player => player === createChallengeDto.challenger)

    if(!challengerIsAPlayer) {
      throw new BadRequestException('The challenge shoud be present in players list')
    }

    const categoryPlayer = await this.categoriesRepository.findByPlayerId(createChallengeDto.challenger)

    if(!categoryPlayer) {
      throw new BadRequestException('The challenger should have category')
    }

    return this.challengesRepository.create(createChallengeDto, categoryPlayer.name);
  }

  async findAllByPlayerId(playerId: string): Promise<Challenge[]> {
    const player = await this.playersRepository.findById(playerId);

    if(!player) {
      throw new BadRequestException('Id is not a valid player')
    }

    return this.challengesRepository.findAllByPlayerId(playerId);
  }

  async update(id: string, updateChallengeDto: UpdateChallengeDto): Promise<void> {
    const challenge = await this.challengesRepository.findById(id);

    if(!challenge) {
      throw new NotFoundException('Challenge not found')
    }

    if(updateChallengeDto.status) {
      challenge.dateTimeAnswer = new Date()
    }

    challenge.status = updateChallengeDto.status;
    challenge.dateTimeChallenge = updateChallengeDto.dateTimeChallenge;

    return this.challengesRepository.update(id, challenge);
  }
}
