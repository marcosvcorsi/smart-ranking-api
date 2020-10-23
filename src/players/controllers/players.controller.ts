import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { CreatePlayerDto } from '../dtos/create-player.dto';
import { Player } from '../models/player.schema';
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
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Delete(':email')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('email') email: string): Promise<void> {
    return this.playersService.deleteByEmail(email);
  }
}
