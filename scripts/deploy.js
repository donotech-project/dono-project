import {ethers} from "hardhat";

async function main() {
    const AI_RollupOperator = await ethers.getContractFactory("AI_RollupOperator");
    const aiRollupOperator = await AI_RollupOperator.deploy();
    await aiRollupOperator.deployed();

    const Layer1Chain = await ethers.getContractFactory("Layer1Chain");
    const layer1Chain = await Layer1Chain.deploy(aiRollupOperator.address);
    await layer1Chain.deployed();

    const Layer2Chain = await ethers.getContractFactory("Layer2Chain");
    const layer2Chain = await Layer2Chain.deploy(aiRollupOperator.address);
    await layer2Chain.deployed();

    console.log("AI Rollup Operator deployed to:", aiRollupOperator.address);
    console.log("Layer 1 Chain deployed to:", layer1Chain.address);
    console.log("Layer 2 Chain deployed to:", layer2Chain.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
