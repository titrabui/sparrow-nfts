import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { SC_EVENT_MAPPER } from 'src/constants';
import { TransactionHistoryMap } from 'src/models/transactionHistory/transaction.history.map';
import { TransactionHistoryService } from 'src/services/transactionHistory/transaction.history.service';
import { SocketGateway } from 'src/socket-gateways/socket.gateway';
import { Web3Config } from './web3.config';

@Injectable()
export class Web3Event implements OnApplicationBootstrap {
  private readonly logger: Logger = new Logger(Web3Event.name);
  private web3;
  private contract;
  private latestBlock;

  constructor(
    private readonly wed3Config: Web3Config,
    private readonly transactionHistoryService: TransactionHistoryService,
    private readonly socketGateway: SocketGateway
  ) { }

  async onApplicationBootstrap() {
    const { web3, contract, latestBlock } = await this.wed3Config.init();
    this.web3 = web3;
    this.contract = contract;
    this.latestBlock = latestBlock;

    this.setupEventListeners();
  }

  async setupEventListeners() {
    try {
      const events = await this.contract.getPastEvents(
        'allEvents',
        { filter: {}, fromBlock: this.latestBlock, toBlock: 'latest' },
        (_err, _event) => { }
      )

      if (!events || events.length === 0) return;
      if (events[0].blockNumber < this.latestBlock) return;
      this.latestBlock = this.latestBlock + 1;

      for (const event of events) {
        if (Object.keys(event).length === 0) continue;
        if (!SC_EVENT_MAPPER[event.event]) continue;

        const transactionData = await this.web3.eth.getTransaction(
          event.transactionHash
        );

        const historyData = TransactionHistoryMap.createDTO(
          event,
          transactionData
        );

        await this.transactionHistoryService.createTransactionHistory(historyData);
        await this.socketGateway.emitMessage(historyData);
      }

    } catch (error) {
      this.logger.error(error);
    }
  }
}
