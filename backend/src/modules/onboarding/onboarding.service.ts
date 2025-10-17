import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../../entities/person.entity';
import { EventLog } from '../../entities/event-log.entity';

@Injectable()
export class OnboardingService {
  constructor(
    @InjectRepository(Person) private personRepo: Repository<Person>,
    @InjectRepository(EventLog) private eventRepo: Repository<EventLog>,
  ) {}

  async startOnboarding(phone: string) {
    let person = await this.personRepo.findOne({ where: { phone } });
    
    if (!person) {
      person = this.personRepo.create({ phone });
      await this.personRepo.save(person);
    }

    await this.eventRepo.save({
      person,
      type: 'onboarding_started',
      payload: { phone },
    });

    return {
      success: true,
      personId: person.id,
      message: 'Onboarding iniciado. Por favor envía tus documentos por WhatsApp.',
    };
  }
}