import { Module } from '@nestjs/common';
import { ConnectionsModule } from 'src/connections/connections.module';
import { TransactionHistoryReposity } from './transactionHistory/transaction.history.reposity';
import { WsClientReposity } from './wsClient/ws.client.reposity';

@Module({
  imports: [
    ConnectionsModule
  ],
  providers: [
    WsClientReposity,
    TransactionHistoryReposity
  ],
  exports: [
    WsClientReposity,
    TransactionHistoryReposity
  ]
})
export class ModelsModule { }
