import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Player } from "../../players/models/player.schema";

export type Result = {
  set: string;
}

export type MatchDocument = Match & Document;

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

export const MatchSchema = SchemaFactory.createForClass(Match);