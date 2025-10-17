import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { DeviceProfile } from './device-profile.entity';
import { KycEvent } from './kyc-event.entity';
import { CreditProfile } from './credit-profile.entity';
import { Purchase } from './purchase.entity';
import { EventLog } from './event-log.entity';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  phone: string;

  @Column({ nullable: true, unique: true })
  national_id: string;

  @Column({ nullable: true })
  full_name: string;

  @Column({ nullable: true, type: 'date' })
  birth_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => DeviceProfile, d => d.person)
  devices: DeviceProfile[];

  @OneToMany(() => KycEvent, k => k.person)
  kyc_events: KycEvent[];

  @OneToOne(() => CreditProfile, c => c.person)
  credit_profile: CreditProfile;

  @OneToMany(() => Purchase, p => p.person)
  purchases: Purchase[];

  @OneToMany(() => EventLog, e => e.person)
  event_logs: EventLog[];
}