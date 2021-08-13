import { Module } from '@nestjs/common';
import { TransactionHistoryServiceModule } from 'src/services/transactionHistory/transaction.history.service.module';
import { Web3Config } from './web3.config';
import { Web3Event } from './web3.event';

@Module({
  imports: [
    TransactionHistoryServiceModule
  ],
  providers: [
    Web3Config,
    Web3Event
  ],
  exports: [
    Web3Event
  ]
})
export class Web3Module { }
