import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatePlayerDto } from "../dtos/create-player.dto";
import { Player, PlayerDocument } from "../models/player.schema";

@Injectable()
export class PlayersRepository {

  constructor(@InjectModel(Player.name) private playerModel: Model<PlayerDocument>) {}

  async findAll(): Promise<Player[]> {
    return this.playerModel.find(); 
  }

  async findByEmail(email: string): Promise<Player> {
    return this.playerModel.findOne({
      email
    })
  }

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const player = new this.playerModel(createPlayerDto);

    await player.save();

    return player;
  }

  async update(email: string, createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.playerModel.findOneAndUpdate({
      email,
    }, {
      $set: createPlayerDto
    })
  }

  async delete(email: string): Promise<any> {
    return this.playerModel.deleteOne({
      email
    })
  }
}