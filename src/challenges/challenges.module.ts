import { Module } from '@nestjs/common';
import { ChallengesController } from './controllers/challenges.controller';
import { ChallengesService } from './challenges.service';

@Module({
  controllers: [ChallengesController],
  providers: [ChallengesService]
})
export class ChallengesModule {}
