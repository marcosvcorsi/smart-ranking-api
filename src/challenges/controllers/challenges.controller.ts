import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddChallengeMatchDto } from '../dtos/add-challenge-match.dto';
import { CreateChallengeDto } from '../dtos/create-challenge.dto';
import { UpdateChallengeDto } from '../dtos/update-challenge.dto';
import { Challenge } from '../models/challenge.schema';
import { ChallengesService } from '../services/challenges.service';

@Controller('api/v1/challenges')
export class ChallengesController {

  constructor(private readonly challengesService: ChallengesService) {}

  @Get()
  async findAll(@Query('player') id: string): Promise<Challenge[]> {
    return Promise.resolve([]);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createChallengeDto: CreateChallengeDto): Promise<void> {
    return this.challengesService.create(createChallengeDto);
  }

  @Post(':id/match')
  async addMatch(@Param('challenge') id: string, @Body() addChallengeMatchDto: AddChallengeMatchDto): Promise<void> {
    return Promise.resolve()
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateChallengeDto: UpdateChallengeDto): Promise<void> {
    return Promise.resolve();
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return Promise.resolve();
  }
}
