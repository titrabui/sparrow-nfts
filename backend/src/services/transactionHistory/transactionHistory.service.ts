import { Injectable } from '@nestjs/common';
import { SC_EVENT_MAPPER } from 'src/constants';
import { ITransactionHistory } from 'src/models/transactionHistory/transaction.history.interface';
import { TransactionHistoryReposity } from 'src/models/transactionHistory/transaction.history.reposity';

@Injectable()
export class TransactionHistoryService {

  constructor(
    private readonly transactionHistoryRepo: TransactionHistoryReposity
  ) { }

  async createTransactionHistory(event, transactionData) {
    const eventValues = event.returnValues
    const historyData = {
      type: SC_EVENT_MAPPER[event.event],
      spaceIndex: eventValues.spaceIndex,
      from: transactionData.from
    } as ITransactionHistory;

    console.log(event);
    console.log(transactionData);
    switch (event.event) {
      case 'Assign':
      case 'SpaceTransfer':
        historyData.to = eventValues.to;
        break;

      case 'SpaceOffered':
        historyData.amount = eventValues.minValue;
        historyData.to = eventValues.toAddress;
        break;

      case 'SpaceBidEntered':
      case 'SpaceBidWithdrawn':
        historyData.amount = eventValues.value;
        break;

      case 'SpaceBought':
        historyData.amount = eventValues.value;
        historyData.from = eventValues.fromAddress;
        historyData.to = eventValues.toAddress;
        break;

      default:
        break;
    }

    await this.transactionHistoryRepo.create(historyData);
  }
}
