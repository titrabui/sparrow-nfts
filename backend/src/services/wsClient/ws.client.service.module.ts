import { Module } from '@nestjs/common';
import { ModelsModule } from 'src/models/models.module';
import { WsClientService } from './ws.client.service';

@Module({
  imports: [
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
