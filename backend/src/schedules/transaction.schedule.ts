import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import config from "src/config";
import { TransactionHistoryService } from "src/services/transactionHistory/transaction.history.service";
import { WsClientService } from "src/services/wsClient/ws.client.service";
import { SocketGateway } from "src/socket-gateways/socket.gateway";
import { Web3Event } from "src/web3/web3.event";

@Injectable()
export class TransactionSchedule {

  private readonly logger = new Logger(TransactionSchedule.name);

  constructor(
    private readonly web3Event: Web3Event,
    private readonly wsClientService: WsClientService,
    private readonly transactionHistoryService: TransactionHistoryService,
    private readonly socketGateway: SocketGateway
  ) { }

  // Because listening for transaction events in Hardhat is problematic
  // for the development environment, event data is only obtained at
  // the first application startup. So we will call event every 1 second
  // to get event data in development environment
  @Cron(CronExpression.EVERY_SECOND)
  async getTransactionHistory() {
    if (config.ENV.NODE_ENV !== 'development') return;
    this.web3Event.setupEventListeners();
  }

  @Cron(CronExpression.EVERY_SECOND)
  async sendSocketTransactionHistory() {
    const clientSpaces = await this.wsClientService.getDetailPageClients();
    if (Object.keys(clientSpaces).length === 0) return;

    const spaceIds = Object.keys(clientSpaces);
    for (const spaceId of spaceIds) {
      const transactions = await this.transactionHistoryService.getTransactionBySpaceId(spaceId);
      if (transactions.length === 0) continue;

      // Send socket to every clients
      const clientIds = Object.values(clientSpaces);
      clientIds.forEach(id => {
        this.socketGateway.emitMessageToClient(id.toString(), transactions);
      });
    }
  }
}
