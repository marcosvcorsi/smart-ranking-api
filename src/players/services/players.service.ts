import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { Player } from '../models/player.model';

import { v4 as uuid } from 'uuid';

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  async createOrUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    const {email, name} = createPlayerDto;

    const findPlayer = this.players.find(p => p.email === email);

    if (!findPlayer) {
      this.create(createPlayerDto);
    } else  {
      this.update(findPlayer._id, name);
    }
  }

  async findAll(): Promise<Player[]> {
    return this.players;
  }

  async findByEmail(email: string): Promise<Player> {
    const player = this.players.find(p => p.email === email);

    if(!player) {
      throw new NotFoundException('Player not found')
    }

    return player;
  }

  async deleteByEmail(email: string) {
    const player = this.players.find(p => p.email === email);

    if(!player) {
      throw new NotFoundException('Player not found')
    }

    this.players = this.players.filter(p => p._id !== player._id);
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

  update(id: string, name: string) {
    this.players = this.players.map(player => {
      if(player._id === id) {
        player.name = name;
      }

      return player;
    })
  }
}
