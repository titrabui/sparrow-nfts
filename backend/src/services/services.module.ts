import { Module } from '@nestjs/common';
import { TransactionHistoryServiceModule } from './transactionHistory/transaction.history.service.module';
import { WsClientServiceModule } from './wsClient/ws.client.service.module';

@Module({
  imports: [
    WsClientServiceModule,
    TransactionHistoryServiceModule
  ],
  exports: [
    WsClientServiceModule,
    TransactionHistoryServiceModule
  ]
})
export class ServicesModule { }
