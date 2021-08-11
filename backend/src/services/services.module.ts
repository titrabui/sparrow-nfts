import { Module } from '@nestjs/common';
import { ModelsModule } from 'src/models/models.module';
import { TransactionHistoryServiceModule } from './transactionHistory/transactionHistory.service.module';
import { WsClientServiceModule } from './ws_client/ws-client.service.module';

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
