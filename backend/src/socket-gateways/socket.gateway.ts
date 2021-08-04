import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger, OnModuleInit } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { WsClientService } from 'src/services/ws_client/ws-client.service';
import config from 'src/config';

@WebSocketGateway(config.ENV.SOCKET_PORT, {
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class SocketGateway
  implements
  OnModuleInit,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect {
  @WebSocketServer() wss: Server;

  constructor(
    private readonly wsClientService: WsClientService
  ) { }

  private logger: Logger = new Logger('SocketGateway');

  onModuleInit() {
    this.wsClientService.removeAllClients();
  }

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  handleDisconnect(client: Socket) {
    this.wsClientService.removeClient(client.id);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.wsClientService.initClient(client.id);

    // join to room that named by the id of client
    client.join(client.id);
  }

  @SubscribeMessage('sync_client_info')
  async handleMessage(client: Socket, data: any) {
    try {
      await this.wsClientService.syncClientInfo(client.id, data);
    } catch (error) {
      this.logger.error(
        `SubscribeMessage failed: ${client.id} | ${data}`,
        error
      );
    }
  }

  async emitMessage(data: any) {
    try {
      this.wss.emit('transaction_history', data);
    } catch (error) {
      this.logger.error(`EmitMessage failed: ${JSON.stringify(data)}`, error);
    }
  }

  async emitMessageToClient(room: string, data: any) {
    try {
      this.wss.to(room).emit('transaction_history', data);
    } catch (error) {
      this.logger.error(
        `emitMessageToClient ${room} failed: ${JSON.stringify(data)}`,
        error,
      );
    }
  }
}
