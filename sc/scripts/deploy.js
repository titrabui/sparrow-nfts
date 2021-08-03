async function main() {
    // We get the contract to deploy
    const NapaCryptoSpaceMarket = await ethers.getContractFactory("NapaCryptoSpaceMarket");
    const CryptoSpace = await NapaCryptoSpaceMarket.deploy();
  
    console.log("CryptoSpace deployed to:", CryptoSpace.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });