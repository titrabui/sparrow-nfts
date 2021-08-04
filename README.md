# sparrow-nfts

#### Start development

From a command line terminal :

1. Install dependencies for smart contract
      ```cd sc && npm i```
2. Compile smart contracts
      ```cd sc && npx hardhat compile```
3. Run local blockchain node 
      ```cd sc && npx hardhat node```
4. Deploy contract on node 
      ```cd sc && npx hardhat run --network localhost scripts/deploy.js```
5. Run task to get accounts list 
      ```cd sc && npx hardhat accounts```
6. Install dependencies for front end
      ```cd frontend && npm i```
7. Run front end
      ```npm start```
#### Folder Structure
- sc: Using **Hardhat** to write, compile, debug smart contracts.
- frontend: Using **React** to write front end code.
~ Happy Coding ~