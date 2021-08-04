import { Module } from '@nestjs/common';
import { Web3Config } from './web3.config';
import { Web3Event } from './web3.event';

@Module({
  providers: [
    Web3Config,
    Web3Event
  ],
  exports: [
    Web3Event
  ]
})
export class Web3Module { }
