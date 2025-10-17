import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Person } from './person.entity';

@Entity()
export class DeviceProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Person, p => p.devices)
  person: Person;

  @Column()
  device_hash: string;

  @CreateDateColumn()
  first_seen: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_seen: Date;

  @Column({ default: false })
  risk_flag: boolean;
}