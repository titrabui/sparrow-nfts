import { Injectable } from '@nestjs/common';
import { WsClientReposity } from 'src/models/ws_client/ws-client.reposity';

@Injectable()
export class WsClientService {

  constructor(
    private readonly wsClientsRepo: WsClientReposity
  ) { }

  async initClient(clientId: string) {
    this.syncClientInfo(clientId, null);
  }

  async syncClientInfo(clientId: string, data: any) {
    this.wsClientsRepo.syncByClientId(clientId, data);
  }

  async removeClient(clientId: string) {
    this.wsClientsRepo.deleteByClientId(clientId);
  }

  async removeAllClients() {
    this.wsClientsRepo.deleteAll();
  }
}
