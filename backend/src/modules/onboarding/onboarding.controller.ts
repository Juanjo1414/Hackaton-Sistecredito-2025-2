import { Controller, Post, Body } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { StartOnboardingDto } from './dto/start-onboarding.dto';

@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly service: OnboardingService) {}

  @Post('start')
  async start(@Body() dto: StartOnboardingDto) {
    return this.service.startOnboarding(dto.phone);
  }
}