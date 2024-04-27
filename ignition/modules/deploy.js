//imports
const { ethers, run, network } = require("hardhat")
const fs = require("fs-extra")
const { formatUnits } = require("ethers")
require("dotenv").config()

//async main
async function main() {
    const SimpleStorageFactory =
        await ethers.getContractFactory("SimpleStorage")
    console.log("deploying...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.waitForDeployment()
    const contractAddress = await simpleStorage.getAddress()
    console.log(`deployed to ${contractAddress}`)

    //verify only if deploying not on local hardhat
    if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
        console.log("waiting for block confirmations to verify on etherscan")
        await simpleStorage.deploymentTransaction().wait(6) //waiting 6 blocks to give etherscan time to register our deployment
        console.log("verifying on etherscan...")
        await verify(contractAddress, [])
    }

    //set and retrieve fav num from contract
    const currentFavouriteNumber = await simpleStorage.retrieve()
    console.log(
        `current favourite number is ${currentFavouriteNumber.toString()}`,
    )
    const transactionResponse = await simpleStorage.store("7")
    await transactionResponse.wait(1)

    const updatedFavouriteNumber = await simpleStorage.retrieve()
    console.log(
        `updated favourite number is ${updatedFavouriteNumber.toString()}`,
    )
}

//function to verify contract on etherscan
async function verify(contractAddress, args) {
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("already verified")
        } else {
            console.log(`contract verification error: ${e.message}`)
        }
    }
}

//main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
