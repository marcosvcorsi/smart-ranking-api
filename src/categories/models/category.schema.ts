import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Player } from "src/players/models/player.schema";

export type CategoryDocument = Category & Document;

export type Event = {
  name: string;
  operation: string;
  value: number;
}

@Schema()
export class Category {

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  events: Array<Event>

  @Prop({ type: Types.ObjectId , ref: 'Player' })
  players: Array<Player>
}

export const CategorySchema = SchemaFactory.createForClass(Category);