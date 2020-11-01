import { IsNotEmpty } from 'class-validator';
import { Player } from 'src/players/models/player.schema';
import { Result } from '../models/challenge.schema';

export class AddChallengeMatchDto {

  @IsNotEmpty()
  def: Player

  @IsNotEmpty()
  results: Array<Result>
}