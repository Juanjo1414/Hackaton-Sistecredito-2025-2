import { Controller, Post, Body } from '@nestjs/common';
import { KycService } from './kyc.service';
import { UploadKycDto } from './dto/upload-kyc.dto';
import { VerifyKycDto } from './dto/verify-kyc.dto';

@Controller('kyc')
export class KycController {
  constructor(private readonly service: KycService) {}

  @Post('upload')
  async upload(@Body() dto: UploadKycDto) {
    return this.service.uploadDocuments(dto);
  }

  @Post('verify')
  async verify(@Body() dto: VerifyKycDto) {
    return this.service.verifyKyc(dto.personId);
  }
}