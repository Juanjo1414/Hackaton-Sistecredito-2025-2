import { IsNumber, IsString } from 'class-validator';

export class UploadKycDto {
  @IsNumber()
  personId: number;

  @IsString()
  idPhoto: string;

  @IsString()
  selfie: string;

  @IsString()
  utilityBill: string;

  @IsString()
  geohash: string;

  @IsString()
  deviceHash?: string;
}