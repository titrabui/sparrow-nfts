import { Injectable, Logger } from "@nestjs/common";
import { WebRedisService } from "src/connections/redis/web.redis.provider";
import { BaseModel } from 'src/models/base.model';
import { ITransactionHistory } from "./transaction.history.interface";

const DATABASE_NAME = 'transaction_histories';

@Injectable()
export class TransactionHistoryReposity extends BaseModel {
  private readonly logger: Logger = new Logger(TransactionHistoryReposity.name);

  constructor(
    private readonly redisService: WebRedisService
  ) {
    super();
  }

  async create(data: ITransactionHistory) {
    try {
      await this.redisService.hset(
        `${DATABASE_NAME}:${data.spaceIndex}`,
        this.generateUniqueId(),
        this.convertToJSON(data)
      );
    } catch (error) {
      this.logger.error(error);
    }
  }
}
