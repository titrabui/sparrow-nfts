import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Web3Config } from './web3.config';

@Injectable()
export class Web3Event implements OnModuleInit {
  private readonly logger: Logger = new Logger(Web3Event.name);

  constructor(
    private readonly wed3Config: Web3Config
  ) { }

  onModuleInit() {
    this.setUpAssignListener();
  }

  async setUpAssignListener() {
    try {
      const { contract, latestBlock } = await this.wed3Config.init();

      contract.events
        .Assign({ filter: {}, fromBlock: 0 }, (_err, _event) => { })
        .on('data', async (event) => {
          if (!event || event.blockNumber < latestBlock) return;
          if (Object.keys(event).length === 0) return;

          console.log(event.returnValues);
        })
        .on('changed', changed => console.log('changed', changed))
        .on('error', err => console.log('error', err))
        .on('connected', str => console.log('connected', str));
    } catch (error) {
      this.logger.error(error);
    }
  }
}
