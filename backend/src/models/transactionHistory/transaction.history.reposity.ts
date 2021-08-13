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
    data.createdAt = new Date().getTime();

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

  async getAll() {
    try {
      const hashes = await this.redisService.keys(`${DATABASE_NAME}:*`);
      if (hashes.length === 0) return [];

      let results = [] as ITransactionHistory[];
      for (const hash of hashes) {
        const queriedData = await this.redisService.hgetall(hash);
        const data = Object.values(queriedData);
        results = results.concat(data.map(item => this.convertToObject(item)));
      }

      return results;
    } catch (error) {
      this.logger.error(error);
      return [];
    }
  }

  async getBySpaceId(spaceId: string): Promise<Array<ITransactionHistory>> {
    try {
      const queriedData = await this.redisService.hgetall(`${DATABASE_NAME}:${spaceId}`);
      if (!queriedData) return [];

      const data = Object.values(queriedData);
      return data.map(item => this.convertToObject(item));
    } catch (error) {
      this.logger.error(error);
      return [];
    }
  }
}
