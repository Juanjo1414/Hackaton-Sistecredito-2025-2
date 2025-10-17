import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Person } from './person.entity';

@Entity()
export class CreditProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Person, p => p.credit_profile)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @Column({ type: 'float', default: 0 })
  alt_score: number;

  @Column({ default: 'D' })
  risk_band: string;

  @Column({ type: 'bigint', default: 0 })
  credit_limit: number;

  @Column({ type: 'bigint', default: 0 })
  available_limit: number;

  @Column({ default: 'active' })
  state: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_update: Date;
}