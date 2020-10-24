import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
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

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Player> {
    return this.playersService.findById(id);
  }
  
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playersService.create(createPlayerDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.update(id, createPlayerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.playersService.deleteById(id);
  }
}
