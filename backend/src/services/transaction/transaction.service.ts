import { Injectable } from '@nestjs/common';
import { ITransaction } from 'src/models/transaction/transaction.interface';
import { TransactionReposity } from 'src/models/transaction/transaction.reposity';

const LIMIT_RECENTS_NUMBER = 12;
const LIMIT_SOLD_NUMBER = 60;

@Injectable()
export class TransactionService {

  constructor(
    private readonly transactionRepo: TransactionReposity
  ) { }

  async createTransaction(historyData: ITransaction) {
    this.transactionRepo.create(historyData);
  }

  async getTransactionBySpaceId(spaceId: string): Promise<Array<ITransaction>> {
    if (!spaceId || spaceId === '') return [];
    const transactions = await this.transactionRepo.getBySpaceId(spaceId);
    return transactions.sort((a, b) => b.createdAt - a.createdAt);
  }

  async getRecentTransactions(): Promise<Array<ITransaction>> {
    const transactions = await this.transactionRepo.getAll();

    // Sort transaction newest to oldest
    const sortedTransactions = transactions.sort((a, b) => b.createdAt - a.createdAt);

    if (sortedTransactions.length > LIMIT_RECENTS_NUMBER) {
      return sortedTransactions.slice(0, LIMIT_RECENTS_NUMBER);
    }

    return sortedTransactions;
  }

  async getTopSales(): Promise<Array<ITransaction>> {
    const transactions = await this.transactionRepo.getAll();

    const soldTransactions = transactions.filter(item => {
      return item.type === 'Sold';
    });

    // Sort transaction newest to oldest
    const sortedTransactions = soldTransactions.sort((a, b) => b.createdAt - a.createdAt);

    if (sortedTransactions.length > LIMIT_SOLD_NUMBER) {
      return sortedTransactions.slice(0, LIMIT_SOLD_NUMBER);
    }

    return sortedTransactions;
  }

}
