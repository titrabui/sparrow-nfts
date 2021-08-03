import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import config from './config';

const logger = new Logger('NestApplication');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(config.ENV.SERVER_PORT, () => {
    logger.log(`=========== 🎉 Server️ running on PORT ${config.ENV.SERVER_PORT} 🎉 ===========‍`);
  });
}
bootstrap();
