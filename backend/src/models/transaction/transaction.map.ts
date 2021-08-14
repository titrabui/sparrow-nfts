import { SC_EVENT_MAPPER } from "src/constants";
import { ITransaction } from "./transaction.interface";

export class TransactionMap {
  static createDTO(event, transactionData) {
    const eventValues = event.returnValues;
    const transactionDto = {
      type: SC_EVENT_MAPPER[event.event],
      spaceIndex: eventValues.spaceIndex,
      from: transactionData.from,
      txn: event.transactionHash
    } as ITransaction;

    switch (event.event) {
      case 'Assign':
      case 'SpaceTransfer':
        transactionDto.to = eventValues.to;
        break;

      case 'SpaceOffered':
        transactionDto.amount = eventValues.minValue;
        transactionDto.to = eventValues.toAddress;
        break;

      case 'SpaceBidEntered':
      case 'SpaceBidWithdrawn':
        transactionDto.amount = eventValues.value;
        break;

      case 'SpaceBought':
        transactionDto.amount = eventValues.value;
        transactionDto.from = eventValues.fromAddress;
        transactionDto.to = eventValues.toAddress;
        break;

      default:
        break;
    }

    return transactionDto;
  }
}
