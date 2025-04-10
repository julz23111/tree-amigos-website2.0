// src/invoices/invoices.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InvoicesService } from './invoices.service';
import { UsersService } from '../users/users.service'; // <-- import UsersService

@Controller('invoices')
export class InvoicesController {
  constructor(
    private readonly invoicesService: InvoicesService,
    private readonly usersService: UsersService, // <-- inject here
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getMyInvoices(@Req() req) {
    const userId = req.user.userId; // from JWT
    return this.invoicesService.findAllForUser(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createInvoice(
    @Req() req,
    @Body() body: { description: string; amount: number },
  ) {
    // 1) Get the real user entity from DB
    const userEntity = await this.usersService.findById(req.user.userId);
    if (!userEntity) {
      throw new UnauthorizedException('User not found');
    }

    // 2) Pass the full user entity to createInvoice
    return this.invoicesService.createInvoice(body.description, body.amount, userEntity);
  }
}