import { Injectable } from '@nestjs/common';

@Injectable()
export class MerchantService {
  async login(phone: string) {
    return { otp: '123456', phone };
  }

  async getCustomer(id: string) {
    // placeholder de prueba para que no rompa
    return { name: id, band: 'A', available: 100000, state: 'active', personId: '1' };
  }
}
