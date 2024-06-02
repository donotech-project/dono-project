const { expect } = require("chai");

describe("AI_RollupOperator", function () {
    it("Should deploy the AI_RollupOperator contract", async function () {
        const AI_RollupOperator = await ethers.getContractFactory("AI_RollupOperator");
        const aiRollupOperator = await AI_RollupOperator.deploy();
        await aiRollupOperator.deployed();
        expect(aiRollupOperator.address).to.properAddress;
    });

    it("Should set and get node resources correctly", async function () {
        const AI_RollupOperator = await ethers.getContractFactory("AI_RollupOperator");
        const aiRollupOperator = await AI_RollupOperator.deploy();
        await aiRollupOperator.deployed();

        await aiRollupOperator.setNodeResources(1, 80, 70, 90, 60);
        const nodeResources = await aiRollupOperator.nodeResources(1);
        expect(nodeResources.cpu).to.equal(80);
        expect(nodeResources.memory).to.equal(70);
        expect(nodeResources.disk).to.equal(90);
        expect(nodeResources.networkBandwidth).to.equal(60);
    });

    it("Should calculate average resource usage correctly", async function () {
        const AI_RollupOperator = await ethers.getContractFactory("AI_RollupOperator");
        const aiRollupOperator = await AI_RollupOperator.deploy();
        await aiRollupOperator.deployed();

        await aiRollupOperator.setNodeResources(1, 80, 70, 90, 60);
        await aiRollupOperator.setNodeResources(2, 60, 80, 70, 50);

        const averageCPU = await aiRollupOperator.calculateAverageCPU();
        const averageMemory = await aiRollupOperator.calculateAverageMemory();
        const averageDisk = await aiRollupOperator.calculateAverageDisk();
        const averageNetworkBandwidth = await aiRollupOperator.calculateAverageNetworkBandwidth();

        expect(averageCPU).to.equal(70);
        expect(averageMemory).to.equal(75);
        expect(averageDisk).to.equal(80);
        expect(averageNetworkBandwidth).to.equal(55);
    });

    it("Should calculate final gas limit correctly", async function () {
        const AI_RollupOperator = await ethers.getContractFactory("AI_RollupOperator");
        const aiRollupOperator = await AI_RollupOperator.deploy();
        await aiRollupOperator.deployed();

        await aiRollupOperator.setNodeResources(1, 80, 70, 90, 60);
        await aiRollupOperator.setNodeResources(2, 60, 80, 70, 50);

        const finalGasLimit = await aiRollupOperator.calculateFinalGasLimit(30000, 25, 25, 25, 25);

        expect(finalGasLimit).to.equal(18750);
    });
});
