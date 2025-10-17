import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { Person } from '../../entities/person.entity';
import { CreditProfile } from '../../entities/credit-profile.entity';
import { Purchase } from '../../entities/purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Person, CreditProfile, Purchase])],
  controllers: [AdminController],
})
export class AdminModule {}
