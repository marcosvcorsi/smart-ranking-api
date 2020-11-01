import { IsNotEmpty, IsArray, ArrayMinSize, ArrayMaxSize, IsDateString } from 'class-validator';
import { PlayerDto } from 'src/players/dtos/player.dto';
import { Player } from '../../players/models/player.schema';

export class CreateChallengeDto {
  
  @IsNotEmpty()
  @IsDateString()
  dateTimeChallenge: Date;

  @IsNotEmpty()
  challenger: string;;

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  players: Array<string>
}
