import { Controller, Get, Param } from '@nestjs/common';
import { ITransaction } from 'src/models/transaction/transaction.interface';
import { TransactionService } from 'src/services/transaction/transaction.service';

@Controller('transactions')
export class TransactionsController {

  constructor(
    private readonly transactionService: TransactionService
  ) { }

  @Get('space/:id')
  async getBySpace(@Param('id') spaceId: string): Promise<ITransaction[]> {
    return this.transactionService.getTransactionBySpaceId(spaceId);
  }

  @Get('recent')
  async getRecentTransactions(): Promise<ITransaction[]> {
    return this.transactionService.getRecentTransactions();
  }
}
