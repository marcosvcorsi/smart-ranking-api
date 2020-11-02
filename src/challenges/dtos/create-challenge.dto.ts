import { IsNotEmpty, IsArray, ArrayMinSize, ArrayMaxSize, IsDateString } from 'class-validator';

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
