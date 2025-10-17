import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';
import { Person } from '../../entities/person.entity';
import { KycEvent } from '../../entities/kyc-event.entity';
import { CreditProfile } from '../../entities/credit-profile.entity';
import { DeviceProfile } from '../../entities/device-profile.entity';
import { RiskService } from '../../services/risk.service';

@Module({
  imports: [TypeOrmModule.forFeature([Person, KycEvent, CreditProfile, DeviceProfile])],
  controllers: [ScoreController],
  providers: [ScoreService, RiskService],
  exports: [ScoreService],
})
export class ScoreModule {}