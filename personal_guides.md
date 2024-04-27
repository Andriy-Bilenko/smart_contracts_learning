"yarn init" in empty dir
and click everywhere enter
"yarn add --dev hardhat"
"yarn hardhat"

"yarn hardhat accounts" - to see all fake accounts
"yarn hardhat compile" - to compile the contract
can do "yarn hardhat clean" - to clean

"yarn hardhat run ignition/modules/deploy.js "
or
"yarn hardhat run ignition/modules/deploy.js --network hardhat"

for verify function
"yarn add --dev @nomicfoundation/hardhat-verify" from internet guide

can create and run my own tasks
"yarn hardhat block-number --network sepolia"

to run hardhat node locally
"yarn hardhat node"
31337 is chainId of hardhat
"yarn hardhat run ignition/modules/deploy.js --network localhost"
it's like a real network but locally

sometimes we want just to play around without writing real scripts, there's hardhat console for that:
"yarn hardhat console --network localhost"

tests: "yarn hardhat test"
(also outputs gas reports)

for how much solidity code is covered with tests
"yarn add --dev solidity-coverage"
"yarn hardhat coverage"

for all that but with ts:

1. can do new ts project instead
2. "yarn add @typechain/ethers-v5 @typechain/hardhat @types/chai @types/node @types/mocha ts-node typechain typescript --dev"
