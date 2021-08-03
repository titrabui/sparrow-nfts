import { Module } from '@nestjs/common';
import { ConnectionsModule } from './connections/connections.module';
import { ServicesModule } from './services/services.module';
import { SocketGatewaysModule } from './socket-gateways/socket.gateways.module';

@Module({
  imports: [
    ConnectionsModule,
    ServicesModule,
    SocketGatewaysModule
  ],
  providers: [
    ConnectionsModule,
    ServicesModule
  ],
})
export class AppModule {}
