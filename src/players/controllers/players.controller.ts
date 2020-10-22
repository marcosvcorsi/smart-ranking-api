import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { Player } from '../models/player.model';
import { PlayersService } from '../services/players.service';

@Controller('api/v1/players')
export class PlayersController {

  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async findAll(): Promise<Player[]> {
    return this.playersService.findAll();
  }

  @Get(':email')
  async findByEmail(@Param('email') email: string): Promise<Player> {
    return this.playersService.findByEmail(email);
  }
  
  @Post()
  async createOrUpdatePlayer(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.createOrUpdatePlayer(createPlayerDto);
  }

  @Delete(':email')
  async delete(@Param('email') email: string): Promise<void> {
    return this.playersService.deleteByEmail(email);
  }
}
