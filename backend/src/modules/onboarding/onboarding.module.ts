import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnboardingController } from './onboarding.controller';
import { OnboardingService } from './onboarding.service';
import { Person } from '../../entities/person.entity';
import { EventLog } from '../../entities/event-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person, EventLog])],
  controllers: [OnboardingController],
  providers: [OnboardingService],
})
export class OnboardingModule {}