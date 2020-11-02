import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateChallengeDto } from "../dtos/create-challenge.dto";
import { Challenge, ChallengeDocument, StatusChallenge } from "../models/challenge.schema";
import { Match, MatchDocument } from "../models/match.schema";

@Injectable()
export class ChallengesRepository {

  constructor(
    @InjectModel(Challenge.name) private readonly challengeModel: Model<ChallengeDocument>,
    @InjectModel(Match.name) private readonly matchModel: Model<MatchDocument>
  ) {}

  async create(createChallengeDto: CreateChallengeDto, category: string): Promise<void> {
    const challenge = new this.challengeModel(createChallengeDto);
    
    challenge.dateTimeRequest = new Date();
    challenge.category = category;
    challenge.status = StatusChallenge.WAITING
    challenge.challenger = Types.ObjectId(createChallengeDto.challenger)
    
    challenge.players = [];

    createChallengeDto.players.forEach(player => {
      challenge.players.push(Types.ObjectId(player))
    })
    
    await challenge.save()
  }

  async findAllByPlayerId(playerId: string): Promise<Challenge[]> {
    return this.challengeModel.find({ players: Types.ObjectId(playerId) })
                              .populate('challenger')
                              .populate('players')
                              .populate('match')
  }

  async findById(id: string): Promise<Challenge> {
    return this.challengeModel.findById(id);
  }

  async update(id: string, challenge: Challenge): Promise<void> {
    await this.challengeModel.update({_id: id}, {$set: challenge})
  }
}