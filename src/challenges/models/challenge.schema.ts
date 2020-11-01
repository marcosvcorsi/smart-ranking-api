import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Player } from "../../players/models/player.schema";
import { Match } from "./match.schema";

export enum StatusChallenge {
  DONE = 'DONE',
  WAITING = 'WAITING',
  ACCEPTED = 'ACCEPTED',
  DENIED = 'DENIED',
  CANCEL = 'CANCEL'
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
  challenger: Types.ObjectId;

  @Prop({type: Types.ObjectId, ref: 'Player'})
  players: Types.ObjectId[]

  @Prop({type: Types.ObjectId, ref: 'Match'})
  match: Types.ObjectId;
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);

