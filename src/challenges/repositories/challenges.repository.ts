import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateChallengeDto } from "../dtos/create-challenge.dto";
import { Challenge, ChallengeDocument } from "../models/challenge.schema";
import { Match, MatchDocument } from "../models/match.schema";

@Injectable()
export class ChallengesRepository {

  constructor(
    @InjectModel(Challenge.name) private readonly challengeModel: Model<ChallengeDocument>,
    @InjectModel(Match.name) private readonly matchModel: Model<MatchDocument>
  ) {}

  async create(createChallengeDto: CreateChallengeDto): Promise<void> {
    return Promise.resolve()
  }

  async findAllByPlayerId(playerId: string): Promise<Challenge[]> {
    return this.challengeModel.find()
                              .where('players')
                              .in([Types.ObjectId(playerId)])
                              .populate('challenger')
                              .populate('players')
                              .populate('match')
  }
}