// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { OnboardingModule } from './modules/onboarding/onboarding.module';
import { KycModule } from './modules/kyc/kyc.module';
import { ScoreModule } from './modules/score/score.module';
import { MerchantModule } from './modules/merchant/merchant.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // opcional, recomendado
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    OnboardingModule,
    KycModule,
    ScoreModule,
    MerchantModule,
  ],
  controllers: [AppController],   // registra el controller raíz
  providers: [AppService],        // registra el service
})
export class AppModule {}
