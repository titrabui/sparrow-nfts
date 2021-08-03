import { Module } from '@nestjs/common';
import { ConnectionsModule } from 'src/connections/connections.module';
import { ModelsModule } from 'src/models/models.module';
import { WsClientService } from './ws-client.service';

@Module({
  imports: [
    ConnectionsModule,
    ModelsModule
  ],
  providers: [
    WsClientService
  ],
  exports: [
    WsClientService
  ]
})
export class WsClientServiceModule { }
