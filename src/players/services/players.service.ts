import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { Player } from '../models/player.schema';
import { PlayersRepository } from '../repositories/players.repository';

@Injectable()
export class PlayersService {

  constructor(private readonly playersRepository: PlayersRepository) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playersRepository.create(createPlayerDto);
  }

  async findAll(): Promise<Player[]> {
    return this.playersRepository.findAll();
  }

  async findByEmail(email: string): Promise<Player> {
    return this.playersRepository.findByEmail(email);
  }

  async deleteByEmail(email: string) {
    return this.playersRepository.delete(email);
  }

  async update(email: string, createPlayerDto: CreatePlayerDto) {
    return this.playersRepository.update(email, createPlayerDto);
  }
}
