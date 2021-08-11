import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Web3Event } from "src/web3/web3.event";

@Injectable()
export class TransactionSchedule {

  private readonly logger = new Logger(TransactionSchedule.name);

  constructor(
    private readonly web3Event: Web3Event
  ) { }

  @Cron(CronExpression.EVERY_SECOND)
  async getTransactionHistory() {
    this.web3Event.setupEventListeners();
  }

  @Cron(CronExpression.EVERY_SECOND)
  async sendSocketTransactionHistory() {

  }
}
