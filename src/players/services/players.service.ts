import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { Player } from '../models/player.model';

import { v4 as uuid } from 'uuid';

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  async createOrUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    this.create(createPlayerDto);
  }

  create(createPlayerDto: CreatePlayerDto): void {
    const player: Player = {
      _id: uuid(),
      ranking: 'any',
      rankingPosition: 1,
      imgUrl: 'any',
      ...createPlayerDto,
    }

    this.players.push(player);
  }
}
