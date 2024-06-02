const { expect } = require("chai");

describe("Layer1Chain", function () {
    it("Should deploy the Layer1Chain contract", async function () {
        const AI_RollupOperator = await ethers.getContractFactory("AI_RollupOperator");
        const aiRollupOperator = await AI_RollupOperator.deploy();
        await aiRollupOperator.deployed();

        const Layer1Chain = await ethers.getContractFactory("Layer1Chain");
        const layer1Chain = await Layer1Chain.deploy(aiRollupOperator.address);
        await layer1Chain.deployed();
        expect(layer1Chain.address).to.properAddress;
    });

    it("Should request gas limit calculation correctly", async function () {
        const AI_RollupOperator = await ethers.getContractFactory("AI_RollupOperator");
        const aiRollupOperator = await AI_RollupOperator.deploy();
        await aiRollupOperator.deployed();

        await aiRollupOperator.setNodeResources(1, 80, 70, 90, 60);
        await aiRollupOperator.setNodeResources(2, 60, 80, 70, 50);

        const Layer1Chain = await ethers.getContractFactory("Layer1Chain");
        const layer1Chain = await Layer1Chain.deploy(aiRollupOperator.address);
        await layer1Chain.deployed();

        const finalGasLimit = await layer1Chain.requestGasLimit(30000, 25, 25, 25, 25);
        expect(finalGasLimit).to.equal(18750);
    });
});
