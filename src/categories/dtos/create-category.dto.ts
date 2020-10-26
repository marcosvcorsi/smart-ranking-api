import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";
import { Event } from "../models/category.schema";

export class CreateCategoryDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Array<Event>
}