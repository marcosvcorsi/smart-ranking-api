import { IsNotEmpty } from 'class-validator';
import { Result } from '../models/match.schema';

export class AddChallengeMatchDto {

  @IsNotEmpty()
  def: string

  @IsNotEmpty()
  results: Array<Result>
}