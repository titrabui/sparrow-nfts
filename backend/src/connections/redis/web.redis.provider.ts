import config from '../../config';
import { Injectable } from '@nestjs/common';
import { RedisService } from './redis.provider';

@Injectable()
export class WebRedisService extends RedisService {
  constructor() {
    super({
      host: config.ENV.REDIS_WEB_HOST,
      port: config.ENV.REDIS_WEB_PORT,
      password: config.ENV.REDIS_WEB_PASS,
      family: config.ENV.REDIS_WEB_FAMILY,
      db: config.ENV.REDIS_WEB_DB
    })
  }
}
