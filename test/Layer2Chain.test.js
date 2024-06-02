const { expect } = require("chai");

describe("Layer2Chain", function () {
    it("Should deploy the Layer2Chain contract", async function () {
        const AI_RollupOperator = await ethers.getContractFactory("AI_RollupOperator");
        const aiRollupOperator = await AI_RollupOperator.deploy();
        await aiRollupOperator.deployed();

        const Layer2Chain = await ethers.getContractFactory("Layer2Chain");
        const layer2Chain = await Layer2Chain.deploy(aiRollupOperator.address);
        await layer2Chain.deployed();
        expect(layer2Chain.address).to.properAddress;
    });

    it("Should set node resources correctly", async function () {
        const AI_RollupOperator = await ethers.getContractFactory("AI_RollupOperator");
        const aiRollupOperator = await AI_RollupOperator.deploy();
        await aiRollupOperator.deployed();

        const Layer2Chain = await ethers.getContractFactory("Layer2Chain");
        const layer2Chain = await Layer2Chain.deploy(aiRollupOperator.address);
        await layer2Chain.deployed();

        await layer2Chain.setNodeResources(1, 80, 70, 90, 60);
        const nodeResources = await aiRollupOperator.nodeResources(1);
        expect(nodeResources.cpu).to.equal(80);
        expect(nodeResources.memory).to.equal(70);
        expect(nodeResources.disk).to.equal(90);
        expect(nodeResources.networkBandwidth).to.equal(60);
    });

    it("Should provide estimated resources correctly", async function () {
        const AI_RollupOperator = await ethers.getContractFactory("AI_RollupOperator");
        const aiRollupOperator = await AI_RollupOperator.deploy();
        await aiRollupOperator.deployed();

        const Layer2Chain = await ethers.getContractFactory("Layer2Chain");
        const layer2Chain = await Layer2Chain.deploy(aiRollupOperator.address);
        await layer2Chain.deployed();

        await layer2Chain.setNodeResources(1, 80, 70, 90, 60);
        await layer2Chain.setNodeResources(2, 60, 80, 70, 50);

        const [cpu, memory, disk, networkBandwidth] = await layer2Chain.getEstimatedResources();

        expect(cpu).to.equal(70);
        expect(memory).to.equal(75);
        expect(disk).to.equal(80);
        expect(networkBandwidth).to.equal(55);
    });
});
