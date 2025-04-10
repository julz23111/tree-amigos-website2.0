// src/invoices/invoice.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column('decimal')
  amount: number;

  @Column({ default: 'Unpaid' })
  status: string;

  @ManyToOne(() => User, user => user.invoices, { onDelete: 'CASCADE' })
  user: User;
}