import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KycController } from './kyc.controller';
import { KycService } from './kyc.service';
import { Person } from '../../entities/person.entity';
import { KycEvent } from '../../entities/kyc-event.entity';
import { DeviceProfile } from '../../entities/device-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person, KycEvent, DeviceProfile])],
  controllers: [KycController],
  providers: [KycService],
  exports: [KycService],
})
export class KycModule {}