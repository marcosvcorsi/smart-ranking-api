import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from 'src/categories/categories.module';
import { PlayersModule } from 'src/players/players.module';
import { ChallengesController } from './controllers/challenges.controller';
import { Challenge, ChallengeSchema } from './models/challenge.schema';
import { Match, MatchSchema } from './models/match.schema';
import { ChallengesRepository } from './repositories/challenges.repository';
import { ChallengesService } from './services/challenges.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Challenge.name,
        schema: ChallengeSchema
      },
      {
        name: Match.name,
        schema: MatchSchema
      }
    ]),
    PlayersModule,
    CategoriesModule
  ],
  controllers: [ChallengesController],
  providers: [ChallengesService, ChallengesRepository]
})
export class ChallengesModule {}
