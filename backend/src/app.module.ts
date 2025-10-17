import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { OnboardingModule } from './modules/onboarding/onboarding.module';
import { KycModule } from './modules/kyc/kyc.module';
import { ScoreModule } from './modules/score/score.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT ? Number(process.env.DATABASE_PORT) : undefined,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    OnboardingModule,
    KycModule,
    ScoreModule,
    // MerchantModule, WhatsappModule and AdminModule are not present in this
    // workspace. Add them back when their modules are implemented.
  ],
  providers: [],
})
export class AppModule {}