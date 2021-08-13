import { Module } from '@nestjs/common';
import { TransactionHistoryServiceModule } from './transactionHistory/transaction.history.service.module';

@Module({
  imports: [
    TransactionHistoryServiceModule
  ],
  exports: [
    TransactionHistoryServiceModule
  ]
})
export class ServicesModule { }
