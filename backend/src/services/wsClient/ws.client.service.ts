import { Injectable } from '@nestjs/common';
import { WsClientReposity } from 'src/models/wsClient/ws.client.reposity';

@Injectable()
export class WsClientService {

  constructor(
    private readonly wsClientsRepo: WsClientReposity
  ) { }

  async initClient(clientId: string) {
    this.syncClientInfo(clientId, null);
  }

  async getDetailPageClients() {
    const clients = await this.wsClientsRepo.getAll();

    const groupBySpace = {};
    Object.values(clients)
      .filter(item => !!item && item.isWatchingSpaceDetail)
      .forEach(item => {
        if (groupBySpace[item.spaceId]) {
          groupBySpace[item.spaceId].push(item.clientId);
        } else {
          groupBySpace[item.spaceId] = [item.clientId];
        }
      });

    return groupBySpace;
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
