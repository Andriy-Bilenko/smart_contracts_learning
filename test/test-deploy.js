const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
    let SimpleStorageFactory
    let simpleStorage
    beforeEach(async function () {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await SimpleStorageFactory.deploy()
        await simpleStorage.waitForDeployment()
    })
    it("should start with the favourite number 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const exprectedValue = "0"
        assert.equal(currentValue.toString(), exprectedValue)
    })
    it("should update after we call store()", async function () {
        const exprectedValue = "7"
        const transactionResponse = await simpleStorage.store("7")
        await transactionResponse.wait(1)
        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue, exprectedValue)
    })
    it("should update after we call addPerson()", async function () {
        const name = "me"
        const favouriteNumber = "7"
        const transactionResponse = await simpleStorage.addPerson(
            name,
            favouriteNumber,
        )
        await transactionResponse.wait(1)
        const people = await simpleStorage.people(0)
        currentFavouriteNumber = people[0]
        currentName = people[1]
        assert.equal(name, currentName)
        assert.equal(favouriteNumber, currentFavouriteNumber)
    })
})
