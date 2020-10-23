import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersController } from './controllers/players.controller';
import { Player, PlayerSchema } from './models/player.schema';
import { PlayersRepository } from './repositories/players.repository';
import { PlayersService } from './services/players.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Player.name,
        schema: PlayerSchema
      }
    ])
  ],
  controllers: [PlayersController],
  providers: [PlayersService, PlayersRepository]
})
export class PlayersModule {}
