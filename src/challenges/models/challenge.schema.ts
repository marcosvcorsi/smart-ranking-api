import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Player } from "src/players/models/player.schema";

export enum StatusChallenge {
  DONE = 'DONE',
  WAITING = 'WAITING',
  ACCEPTED = 'ACCEPTED',
  DENIED = 'DENIED',
  CANCEL = 'CANCEL'
}

export type Result = {
  set: string;
}

export type ChallengeDocument = Challenge & Document;

@Schema()
export class Challenge {

  @Prop()
  status: StatusChallenge;

  @Prop({type: Date})
  dateTimeChallenge: Date;

  @Prop({type: Date})
  dateTimeRequest: Date;

  @Prop({type: Date})
  dateTimeAnswer: Date;

  @Prop()
  category: string;

  @Prop({type: Types.ObjectId, ref: 'Player'})
  challenger: Player;

  @Prop({type: Types.ObjectId, ref: 'Player'})
  players: Array<Player>
}

@Schema()
export class Match {

  @Prop()
  category: string;

  @Prop({type: Types.ObjectId, ref: 'Player'})
  players: Array<Player>

  @Prop({type: Types.ObjectId, ref: 'Player'})
  def: Player;

  @Prop({set: String})
  results: Array<Result>
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);

export const MatchSchema = SchemaFactory.createForClass(Match);