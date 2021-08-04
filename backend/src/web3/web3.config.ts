import { Injectable, Logger } from '@nestjs/common';
import config from 'src/config';
const Web3 = require('web3');

const CryptoSpaceContract = require('../../../sc/artifacts/contracts/NapaCryptoSpaceMarket.sol/NapaCryptoSpaceMarket.json');

@Injectable()
export class Web3Config {
  private logger: Logger = new Logger(Web3Config.name);

  async listenEvent() {
    const options = {
      timeout: 30000, // ms

      clientConfig: {
        // Useful if requests are large
        maxReceivedFrameSize: 100000000, // bytes - default: 1MiB
        maxReceivedMessageSize: 100000000, // bytes - default: 8MiB

        // Useful to keep a connection alive
        keepalive: true,
        keepaliveInterval: 60000, // ms
      },

      // Enable auto reconnection
      reconnect: {
        auto: true,
        delay: 5000, // ms
        maxAttempts: 10,
        onTimeout: false,
      },
    };

    try {
      const web3 = new Web3(
        new Web3.providers.WebsocketProvider(
          config.ENV.WEB3_WEBSOCKET_URL,
          options,
        ),
      );

      let latestBlock = await web3.eth.getBlockNumber(); //get the latest blocknumber
      const contractAbi: any = CryptoSpaceContract.abi;
      const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
      const contract = new web3.eth.Contract(contractAbi, contractAddress);
      return { contract, latestBlock, web3 };
    } catch (error) {
      this.logger.error(error);
    }
  }
}
