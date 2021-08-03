import { Module } from '@nestjs/common';
import { ConnectionsModule } from 'src/connections/connections.module';
import { WsClientReposity } from './ws_client/ws-client.reposity';

@Module({
  imports: [
    ConnectionsModule
  ],
  providers: [
    WsClientReposity
  ],
  exports: [
    WsClientReposity
  ]
})
export class ModelsModule { }
