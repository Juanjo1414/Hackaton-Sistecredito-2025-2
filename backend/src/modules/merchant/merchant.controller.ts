import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MerchantService } from './merchant.service';

@Controller('merchant') 
export class MerchantController {
  constructor(private svc: MerchantService) {}

  @Post('login')
  login(@Body() { phone }: { phone: string }) {
    // respuesta simple para probar
    return this.svc.login(phone);
  }

  // (Opcional) endpoints que usa el dashboard
  @Get('customer/:id')
  getCustomer(@Param('id') id: string) {
    return this.svc.getCustomer(id);
  }
}
