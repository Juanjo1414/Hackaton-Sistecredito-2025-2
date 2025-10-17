import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeviceProfile } from '../entities/device-profile.entity';
import { Purchase } from '../entities/purchase.entity';

@Injectable()
export class RiskService {
  constructor(
    @InjectRepository(DeviceProfile) private deviceRepo: Repository<DeviceProfile>,
    @InjectRepository(Purchase) private purchaseRepo: Repository<Purchase>,
  ) {}

  async checkDeviceRisk(personId: number): Promise<boolean> {
    const devices = await this.deviceRepo.find({ where: { person: { id: personId } } });
    
    for (const device of devices) {
      const count = await this.deviceRepo.count({ where: { device_hash: device.device_hash } });
      if (count > 3) {
        device.risk_flag = true;
        await this.deviceRepo.save(device);
        return true;
      }
    }
    
    return false;
  }

  async checkOverdueRisk(personId: number): Promise<boolean> {
    const purchases = await this.purchaseRepo.find({
      where: { person: { id: personId }, status: 'pending' },
    });

    const now = new Date();
    for (const purchase of purchases) {
      const dueDate = new Date(purchase.due_date);
      const diffDays = Math.floor((now.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays > 5) {
        return true;
      }
    }

    return false;
  }
}