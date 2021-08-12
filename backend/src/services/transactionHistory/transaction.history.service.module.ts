import { Module } from '@nestjs/common';
import { ModelsModule } from 'src/models/models.module';
import { TransactionHistoryService } from './transaction.history.service';

@Module({
  imports: [
    ModelsModule
  ],
  providers: [
    TransactionHistoryService
  ],
  exports: [
    TransactionHistoryService
  ]
})
export class TransactionHistoryServiceModule { }
