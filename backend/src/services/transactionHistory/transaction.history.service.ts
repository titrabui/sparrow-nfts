import { Injectable } from '@nestjs/common';
import { ITransactionHistory } from 'src/models/transactionHistory/transaction.history.interface';
import { TransactionHistoryReposity } from 'src/models/transactionHistory/transaction.history.reposity';

const LIMIT_RECENTS_NUMBER = 12;

@Injectable()
export class TransactionHistoryService {

  constructor(
    private readonly transactionHistoryRepo: TransactionHistoryReposity
  ) { }

  async createTransactionHistory(historyData: ITransactionHistory) {
    this.transactionHistoryRepo.create(historyData);
  }

  async getTransactionBySpaceId(spaceId: string): Promise<Array<ITransactionHistory>> {
    if (!spaceId || spaceId === '') return [];
    const transactions = await this.transactionHistoryRepo.getBySpaceId(spaceId);
    return transactions.sort((a, b) => b.createdAt - a.createdAt);
  }

  async getRecentTransactions(): Promise<Array<ITransactionHistory>> {
    const transactions = await this.transactionHistoryRepo.getAll();

    // Sort transaction newest to oldest
    const sortedTransactions = transactions.sort((a, b) => b.createdAt - a.createdAt);

    if (sortedTransactions.length > LIMIT_RECENTS_NUMBER) {
      return sortedTransactions.slice(0, LIMIT_RECENTS_NUMBER);
    }

    return sortedTransactions;
  }
}
