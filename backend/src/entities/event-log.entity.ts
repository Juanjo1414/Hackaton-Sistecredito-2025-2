import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Person } from './person.entity';

@Entity()
export class EventLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Person, p => p.event_logs, { nullable: true })
  person: Person;

  @Column()
  type: string;

  @Column({ type: 'jsonb', nullable: true })
  payload: any;

  @CreateDateColumn()
  created_at: Date;
}