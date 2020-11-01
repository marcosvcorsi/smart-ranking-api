import { Injectable } from '@nestjs/common';
import { CreateChallengeDto } from '../dtos/create-challenge.dto';
import { ChallengesRepository } from '../repositories/challenges.repository';

@Injectable()
export class ChallengesService {

  constructor(private readonly challengesRepository: ChallengesRepository) {}

  async create(createChallengeDto: CreateChallengeDto): Promise<void> {
    return this.challengesRepository.create(createChallengeDto);
  }
}
