import { IsNotEmpty } from 'class-validator';
import { Player } from '../../players/models/player.schema';
import { Result } from '../models/match.schema';

export class AddChallengeMatchDto {

  @IsNotEmpty()
  def: Player

  @IsNotEmpty()
  results: Array<Result>
}