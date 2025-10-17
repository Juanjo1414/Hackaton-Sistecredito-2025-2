import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Purchase } from './purchase.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Purchase, p => p.payments)
  purchase: Purchase;

  @Column({ type: 'bigint' })
  amount: number;

  @CreateDateColumn()
  paid_at: Date;

  @Column({ default: 'cash' })
  channel: string;
}