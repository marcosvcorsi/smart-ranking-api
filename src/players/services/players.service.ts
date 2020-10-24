import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { Player } from '../models/player.schema';
import { PlayersRepository } from '../repositories/players.repository';

@Injectable()
export class PlayersService {

  constructor(private readonly playersRepository: PlayersRepository) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const findByEmail = await this.playersRepository.findByEmail(createPlayerDto.email);

    if (findByEmail) {
      throw new BadRequestException('e-mail already in use');
    }

    return this.playersRepository.create(createPlayerDto);
  }

  async findAll(): Promise<Player[]> {
    return this.playersRepository.findAll();
  }

  async findById(id: string): Promise<Player> {
    const player = await this.playersRepository.findById(id);

    if (!player) {
      throw new NotFoundException();
    }

    return player;
  }

  async deleteById(id: string) {
    const player = this.playersRepository.findById(id);

    if (!player) {
      throw new NotFoundException();
    }

    return this.playersRepository.delete(id);
  }

  async update(id: string, createPlayerDto: CreatePlayerDto) {
    return this.playersRepository.update(id, createPlayerDto);
  }
}
