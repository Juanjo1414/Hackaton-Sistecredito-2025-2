import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Person } from './person.entity';

@Entity()
export class KycEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Person, p => p.kyc_events)
  person: Person;

  @Column({ type: 'text', nullable: true })
  id_photo_base64: string;

  @Column({ type: 'text', nullable: true })
  selfie_photo_base64: string;

  @Column({ type: 'text', nullable: true })
  utility_bill_base64: string;

  @Column({ nullable: true })
  geohash: string;

  @Column({ nullable: true })
  ocr_name: string;

  @Column({ nullable: true })
  ocr_id: string;

  @Column({ type: 'float', default: 0 })
  liveness_score: number;

  @Column({ type: 'float', default: 0 })
  confidence: number;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  created_at: Date;
}