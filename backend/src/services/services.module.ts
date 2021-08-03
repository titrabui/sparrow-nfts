import { Module } from '@nestjs/common';
import { WsClientServiceModule } from './ws_client/ws-client.service.module';

@Module({
  imports: [
    WsClientServiceModule
  ],
  exports: [
    WsClientServiceModule
  ]
})
export class ServicesModule { }
