import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreController } from './score.controller';
import { ScoreService } from './score.service';

// Entidades
import { Person } from '../../entities/person.entity';
import { KycEvent } from '../../entities/kyc-event.entity';
import { CreditProfile } from '../../entities/credit-profile.entity';
import { DeviceProfile } from '../../entities/device-profile.entity';
import { Purchase } from '../../entities/purchase.entity';
import { Payment } from '../../entities/payment.entity'; // <-- sólo si RiskService lo inyecta

// Servicios
import { RiskService } from '../../services/risk.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Person,
      KycEvent,
      CreditProfile,
      DeviceProfile,
      Purchase,   // <-- ¡CLAVE! agrega Purchase
      Payment,    // <-- agrega si lo inyectas en RiskService
    ]),
  ],
  controllers: [ScoreController],
  providers: [ScoreService, RiskService],
  exports: [ScoreService, RiskService], // exporta RiskService si lo usas fuera
})
export class ScoreModule {}
