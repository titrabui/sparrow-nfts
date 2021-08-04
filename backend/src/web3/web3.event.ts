import { OnModuleInit } from '@nestjs/common';
import { Web3Config } from './web3.config';
import config from 'src/config';
const Web3 = require('web3');

const CryptoSpaceContract = require('../../../sc/artifacts/contracts/NapaCryptoSpaceMarket.sol/NapaCryptoSpaceMarket.json');

export class Web3Event implements OnModuleInit {

  onModuleInit() {
    this.setUpMarketListener();
  }

  async setUpMarketListener() {
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


    contract.events
      .Assign({ filter:{}, fromBlock: 0 }, (error, event) => {
        console.log(error, event)
      })
      .on('data', async (event) => {
        console.log('AAAAAAAAAAAAAAAAAAAAA')
        if (!event || event.blockNumber === latestBlock) return;

        latestBlock = latestBlock + 1;
        if (Object.keys(event).length === 0) return;

        // Executed trade market
        const returnValues = event.returnValues;
        console.log('AAAAAAAAAAAAAAAAAAAAA', returnValues)

      })
      .on('changed', changed => console.log('changed', changed))
      .on('error', err => console.log('error', err))
      .on('connected', str => console.log('connected', str));

    contract.getPastEvents('allEvents', {
      fromBlock: 0,
      toBlock: 'latest'
    }, function(error, events){ console.log(events); })
    .then(function(events){
        console.log(events) // same results as the optional callback above
    });


  }
}
