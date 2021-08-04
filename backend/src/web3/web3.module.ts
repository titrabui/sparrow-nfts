import { Module } from '@nestjs/common';
import { Web3Config } from './web3.config';
import { Web3Event } from './web3.event';

@Module({
  imports: [
    Web3Event
  ],
  providers: [
    Web3Config
  ],
  exports: [
    Web3Event
  ]
})
export class Web3Module { }
