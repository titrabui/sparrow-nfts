import { Injectable, Logger } from "@nestjs/common";
import { WebRedisService } from "src/connections/redis/web.redis.provider";
import { BaseModel } from 'src/models/base.model';
import { IWsClient, IWsClients } from "./ws.client.interface";

const DATABASE_NAME = 'ws_clients';

@Injectable()
export class WsClientReposity extends BaseModel {
  public logger: Logger = new Logger(WsClientReposity.name);

  constructor(
    private readonly redisService: WebRedisService
  ) {
    super();
  }

  async getAll(): Promise<IWsClients> {
    try {
      const queryData = await this.redisService.hgetall(DATABASE_NAME) as Array<IWsClients>;
      if (!queryData) return {};

      // Convert client item value from string to object
      let convertedData = {};
      const keys = Object.keys(queryData);
      keys.forEach(key => {
        convertedData[key] = this.convertToObject(queryData[key])
      });

      return convertedData;
    } catch (error) {
      this.logger.error(error);
      return {};
    }
  }

  async syncByClientId(clientId: string, data: IWsClient) {
    try {
      this.redisService.hset(DATABASE_NAME, clientId, this.convertToJSON(data));
    } catch (error) {
      this.logger.error(error);
    }
  }

  async deleteByClientId(clientId: string) {
    try {
      this.redisService.hdel(DATABASE_NAME, clientId);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async deleteAll() {
    try {
      this.redisService.del(DATABASE_NAME);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
