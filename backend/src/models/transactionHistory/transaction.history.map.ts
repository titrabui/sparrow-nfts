import { SC_EVENT_MAPPER } from "src/constants";
import { ITransactionHistory } from "./transaction.history.interface";

export class TransactionHistoryMap {
  static createDTO(event, transactionData) {
    const eventValues = event.returnValues
    const historyData = {
      type: SC_EVENT_MAPPER[event.event],
      spaceIndex: eventValues.spaceIndex,
      from: transactionData.from,
      txn: event.transactionHash
    } as ITransactionHistory;

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

    return historyData;
  }
}
