import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../../entities/person.entity';
import { KycEvent } from '../../entities/kyc-event.entity';
import { DeviceProfile } from '../../entities/device-profile.entity';
import { UploadKycDto } from './dto/upload-kyc.dto';

@Injectable()
export class KycService {
  constructor(
    @InjectRepository(Person) private personRepo: Repository<Person>,
    @InjectRepository(KycEvent) private kycRepo: Repository<KycEvent>,
    @InjectRepository(DeviceProfile) private deviceRepo: Repository<DeviceProfile>,
  ) {}

  async uploadDocuments(dto: UploadKycDto) {
    const person = await this.personRepo.findOne({ where: { id: dto.personId } });
    if (!person) throw new Error('Persona no encontrada');

    // Mock OCR
    const ocrName = 'Juan Perez Demo';
    const ocrId = '1234567890';
    const livenessScore = 0.85 + Math.random() * 0.1;
    const confidence = 0.9 + Math.random() * 0.05;

    const kyc = this.kycRepo.create({
      person,
      id_photo_base64: dto.idPhoto,
      selfie_photo_base64: dto.selfie,
      utility_bill_base64: dto.utilityBill,
      geohash: dto.geohash,
      ocr_name: ocrName,
      ocr_id: ocrId,
      liveness_score: livenessScore,
      confidence,
      status: 'uploaded',
    });

    await this.kycRepo.save(kyc);

    // Track device
    const deviceHash = dto.deviceHash || `device_${Date.now()}`;
    await this.deviceRepo.save({
      person,
      device_hash: deviceHash,
      last_seen: new Date(),
    });

    return {
      success: true,
      kycId: kyc.id,
      message: 'Documentos cargados. Verificando...',
    };
  }

  async verifyKyc(personId: number) {
    const kyc = await this.kycRepo.findOne({
      where: { person: { id: personId } },
      order: { created_at: 'DESC' },
    });

    if (!kyc) throw new Error('KYC no encontrado');

    kyc.status = 'verified';
    await this.kycRepo.save(kyc);

    return {
      success: true,
      message: 'KYC verificado correctamente',
      data: {
        ocrName: kyc.ocr_name,
        ocrId: kyc.ocr_id,
        livenessScore: kyc.liveness_score,
        confidence: kyc.confidence,
      },
    };
  }
}