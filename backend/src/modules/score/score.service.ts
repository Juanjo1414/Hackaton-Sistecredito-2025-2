import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../../entities/person.entity';
import { KycEvent } from '../../entities/kyc-event.entity';
import { CreditProfile } from '../../entities/credit-profile.entity';
import { DeviceProfile } from '../../entities/device-profile.entity';
import { RiskService } from '../../services/risk.service';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Person) private personRepo: Repository<Person>,
    @InjectRepository(KycEvent) private kycRepo: Repository<KycEvent>,
    @InjectRepository(CreditProfile) private creditRepo: Repository<CreditProfile>,
    @InjectRepository(DeviceProfile) private deviceRepo: Repository<DeviceProfile>,
    private riskService: RiskService,
  ) {}

  async calculateScore(personId: number) {
    const person = await this.personRepo.findOne({ where: { id: personId } });
    if (!person) throw new Error('Persona no encontrada');

    const kyc = await this.kycRepo.findOne({
      where: { person: { id: personId }, status: 'verified' },
      order: { created_at: 'DESC' },
    });

    if (!kyc) {
      return { success: false, message: 'KYC no verificado' };
    }

    // Score alternativo (explicable)
    const liveness = kyc.liveness_score;
    const billMatch = kyc.utility_bill_base64 ? 0.8 : 0.3;
    const deviceTrust = await this.getDeviceTrust(personId);
    const merchantRef = 0.7; // Mock
    const geoConsistency = kyc.geohash ? 0.85 : 0.5;
    const phoneAge = this.getPhoneAge(person.created_at);

    const score = 100 * (
      0.25 * liveness +
      0.20 * billMatch +
      0.15 * deviceTrust +
      0.15 * merchantRef +
      0.15 * geoConsistency +
      0.10 * phoneAge
    );

    const { band, limit } = this.getBandAndLimit(score);

    // Check device risk
    const deviceRisk = await this.riskService.checkDeviceRisk(personId);
    let finalLimit = limit;
    if (deviceRisk) {
      finalLimit = Math.floor(limit * 0.5);
    }

    let profile = await this.creditRepo.findOne({ where: { person: { id: personId } } });
    
    if (!profile) {
      profile = this.creditRepo.create({
        person,
        alt_score: score,
        risk_band: band,
        credit_limit: finalLimit,
        available_limit: finalLimit,
        state: band === 'D' ? 'rejected' : 'active',
      });
    } else {
      profile.alt_score = score;
      profile.risk_band = band;
      profile.credit_limit = finalLimit;
      profile.available_limit = finalLimit;
      profile.state = band === 'D' ? 'rejected' : 'active';
      profile.last_update = new Date();
    }

    await this.creditRepo.save(profile);

    return {
      success: true,
      personId,
      score: Math.round(score),
      band,
      creditLimit: finalLimit,
      availableLimit: finalLimit,
      state: profile.state,
      factors: {
        liveness: Math.round(liveness * 100),
        billMatch: Math.round(billMatch * 100),
        deviceTrust: Math.round(deviceTrust * 100),
        merchantRef: Math.round(merchantRef * 100),
        geoConsistency: Math.round(geoConsistency * 100),
        phoneAge: Math.round(phoneAge * 100),
      },
    };
  }

  private async getDeviceTrust(personId: number): Promise<number> {
    const devices = await this.deviceRepo.find({ where: { person: { id: personId } } });
    if (devices.length === 0) return 0.5;
    const hasRisk = devices.some(d => d.risk_flag);
    return hasRisk ? 0.3 : 0.9;
  }

  private getPhoneAge(createdAt: Date): number {
    const days = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
    if (days > 180) return 1.0;
    if (days > 90) return 0.8;
    if (days > 30) return 0.6;
    return 0.4;
  }

  private getBandAndLimit(score: number): { band: string; limit: number } {
    if (score >= 80) return { band: 'A', limit: 100000 };
    if (score >= 65) return { band: 'B', limit: 80000 };
    if (score >= 50) return { band: 'C', limit: 60000 };
    return { band: 'D', limit: 0 };
  }
}