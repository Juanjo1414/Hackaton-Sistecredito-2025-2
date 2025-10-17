import { IsString, Matches } from 'class-validator';

export class StartOnboardingDto {
  @IsString()
  @Matches(/^\+?[1-9]\d{1,14}$/)
  phone: string;
}