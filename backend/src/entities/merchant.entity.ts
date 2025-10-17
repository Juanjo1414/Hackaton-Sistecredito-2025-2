import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Purchase } from './purchase.entity';

@Entity()
export class Merchant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  location: string;

  @Column({ unique: true })
  owner_phone: string;

  @OneToMany(() => Purchase, p => p.merchant)
  purchases: Purchase[];
}