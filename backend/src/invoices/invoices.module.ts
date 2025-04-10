import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './invoice.entity';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { UsersModule } from '../users/users.module'; // <-- import the UsersModule
@Module({
  imports: [TypeOrmModule.forFeature([Invoice]),
   UsersModule], // <-- add the UsersModule to the imports
  providers: [InvoicesService],
  controllers: [InvoicesController],
  exports: [InvoicesService],
})
export class InvoicesModule {}