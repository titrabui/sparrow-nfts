// /* eslint-disable import/prefer-default-export */
// import Web3 from 'web3';

// import contract from 'utils/Contract.json';

// export const getContract = async (connector: any) => {
//   if (!connector) throw Error('No connector found');
//   const walletProvider = await connector.getProvider();
//   const web3 = new Web3(walletProvider);
//   const contractAbi: any = contract.abi;

//   // TODO: Get network address whenever JSON file change
//   // const contractAddress = contract.networks[1622807330980].address;
//   const contractAddress = contract.networks[5777].address;

//   return new web3.eth.Contract(contractAbi, contractAddress);
// };

export const getContract = () => {};
