// src/invoices/invoices.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { User } from '../users/user.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepo: Repository<Invoice>,
  ) {}

  async createInvoice(
    description: string,
    amount: number,
    user: User,        // <-- accept a real User entity
  ): Promise<Invoice> {
    const invoice = this.invoiceRepo.create({ description, amount, user });
    return this.invoiceRepo.save(invoice);
  }

  async findAllForUser(userId: number): Promise<Invoice[]> {
    return this.invoiceRepo.find({
      where: { user: { id: userId } },
      order: { id: 'DESC' },
    });
  }
}