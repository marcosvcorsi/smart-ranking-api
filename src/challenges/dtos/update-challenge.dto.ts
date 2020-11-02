import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { StatusChallenge } from '../models/challenge.schema';

export class UpdateChallengeDto {
  
  @IsOptional()
  @IsDateString()
  dateTimeChallenge: Date;

  @IsOptional()
  @IsEnum(StatusChallenge)
  status: StatusChallenge;
}
