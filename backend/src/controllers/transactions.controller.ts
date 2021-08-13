import { Controller, Get, Param } from '@nestjs/common';
import { ITransactionHistory } from 'src/models/transactionHistory/transaction.history.interface';
import { TransactionHistoryService } from 'src/services/transactionHistory/transaction.history.service';

@Controller('transactions')
export class TransactionsController {

  constructor(
    private readonly transactionHistoryService: TransactionHistoryService
  ) { }

  @Get('space/:id')
  async getBySpace(@Param('id') spaceId: string): Promise<ITransactionHistory[]> {
    return this.transactionHistoryService.getTransactionBySpaceId(spaceId);
  }

  @Get('recent')
  async getRecentTransactions(): Promise<ITransactionHistory[]> {
    return this.transactionHistoryService.getRecentTransactions();
  }
}
