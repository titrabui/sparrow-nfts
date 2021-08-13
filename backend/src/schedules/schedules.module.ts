import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SocketGatewaysModule } from 'src/socket-gateways/socket.gateways.module';
import { ServicesModule } from 'src/services/services.module';
import { ConnectionsModule } from 'src/connections/connections.module';
import { TransactionSchedule } from './transaction.schedule';
import { ModelsModule } from 'src/models/models.module';
import { Web3Module } from 'src/web3/web3.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    SocketGatewaysModule,
    ServicesModule,
    ConnectionsModule,
    ModelsModule,
    Web3Module
  ],
  providers: [
    TransactionSchedule
  ],
  exports: [
    TransactionSchedule
  ]
})
export class SchedulesModule { }
