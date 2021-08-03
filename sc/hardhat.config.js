require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
  },
  solidity: "0.8.4",
};
