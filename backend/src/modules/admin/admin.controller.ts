import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../../entities/person.entity';
import { CreditProfile } from '../../entities/credit-profile.entity';
import { Purchase } from '../../entities/purchase.entity';

@Controller('admin')
export class AdminController {
  constructor(
    @InjectRepository(Person) private persons: Repository<Person>,
    @InjectRepository(CreditProfile) private credits: Repository<CreditProfile>,
    @InjectRepository(Purchase) private purchases: Repository<Purchase>,
  ){}

  @Get('metrics')
  async metrics(){
    const onboardings = await this.persons.count();
    const active_customers = await this.credits.count({ where: { state: 'active' } });
    const open_purchases = await this.purchases.count({ where: { status: 'open' } });
    const avg = await this.credits.createQueryBuilder('c')
      .select('ROUND(AVG(c.alt_score))','avg').getRawOne();
    const approvals = await this.credits.count();
    return {
      onboardings, approvals, avg_score: Number(avg?.avg ?? 0),
      active_customers, open_purchases, overdue_30: 0
    };
  }
}
