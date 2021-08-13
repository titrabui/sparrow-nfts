import { Module } from '@nestjs/common';
import { ConnectionsModule } from 'src/connections/connections.module';
import { TransactionHistoryReposity } from './transactionHistory/transaction.history.reposity';

@Module({
  imports: [
    ConnectionsModule
  ],
  providers: [
    TransactionHistoryReposity
  ],
  exports: [
    TransactionHistoryReposity
  ]
})
export class ModelsModule { }
