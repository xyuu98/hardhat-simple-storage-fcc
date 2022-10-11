const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
    let SimpleStorage, SimpleStorageFactory
    beforeEach(async function () {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        SimpleStorage = await SimpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await SimpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(currentValue.toString(), expectedValue)
    })

    it("It should update when we call store", async function () {
        const expectedValue = "6"
        const transactionResponse = await SimpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await SimpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })
})
