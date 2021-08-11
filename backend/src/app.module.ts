import { Module } from '@nestjs/common';
import { ConnectionsModule } from './connections/connections.module';
import { SchedulesModule } from './schedules/schedules.module';
import { ServicesModule } from './services/services.module';
import { SocketGatewaysModule } from './socket-gateways/socket.gateways.module';
import { Web3Module } from './web3/web3.module';

@Module({
  imports: [
    ConnectionsModule,
    ServicesModule,
    SocketGatewaysModule,
    Web3Module,
    SchedulesModule
  ],
  providers: [
    ConnectionsModule,
    ServicesModule,
    SchedulesModule
  ],
})
export class AppModule {}
