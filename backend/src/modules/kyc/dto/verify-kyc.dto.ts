import { IsNumber } from 'class-validator';

export class VerifyKycDto {
  @IsNumber()
  personId: number;
}