import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { Person } from './person.entity';
import { Merchant } from './merchant.entity';
import { Payment } from './payment.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Person, p => p.purchases)
  person: Person;

  @ManyToOne(() => Merchant, m => m.purchases)
  merchant: Merchant;

  @Column({ type: 'bigint' })
  amount: number;

  @Column({ type: 'date' })
  due_date: Date;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Payment, p => p.purchase)
  payments: Payment[];
}