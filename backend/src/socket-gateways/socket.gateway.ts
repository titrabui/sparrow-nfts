import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'socket.io';
import { ITransactionHistory } from 'src/models/transactionHistory/transaction.history.interface';
import { ConfigService } from '@nestjs/config';

const EMIT_EVENT_NAME = 'transaction_history';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true
  }
})
export class SocketGateway {
  @WebSocketServer()
  private wss: Server;

  private readonly logger: Logger = new Logger(SocketGateway.name);

  constructor(
    private readonly config: ConfigService
  ) { }

  afterInit(_server: Server) {
    this.logger.log(`Socket is running on PORT ${this.config.get('SERVER_PORT')}`);
  }

  async emitMessage(data: ITransactionHistory) {
    try {
      this.wss.emit(EMIT_EVENT_NAME, data);
    } catch (error) {
      this.logger.error(`EmitMessage failed: ${JSON.stringify(data)}`, error);
    }
  }
}
