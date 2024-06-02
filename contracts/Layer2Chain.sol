// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AI_RollupOperator.sol";

contract Layer2Chain {
    AI_RollupOperator public aiRollupOperator;

    event NodeResourcesUpdated(uint256 nodeId, uint256 cpu, uint256 mem, uint256 disk, uint256 networkBandwidth);

    constructor(address _aiRollupOperator) {
        aiRollupOperator = AI_RollupOperator(_aiRollupOperator);
    }

    function setNodeResources(uint256 nodeId, uint256 cpu, uint256 memory, uint256 disk, uint256 networkBandwidth) public {
        aiRollupOperator.setNodeResources(nodeId, cpu, mem, disk, networkBandwidth);
        emit NodeResourcesUpdated(nodeId, cpu, mem, disk, networkBandwidth);
    }

    function getEstimatedResources() public view returns (uint256, uint256, uint256, uint256) {
        return (
        aiRollupOperator.calculateAverageCPU(),
        aiRollupOperator.calculateAverageMemory(),
        aiRollupOperator.calculateAverageDisk(),
        aiRollupOperator.calculateAverageNetworkBandwidth()
        );
    }
}
