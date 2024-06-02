// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AI_RollupOperator.sol";

contract Layer1Chain {
    AI_RollupOperator public aiRollupOperator;

    event GasLimitRequested(uint256 baseGasLimit, uint256 finalGasLimit);

    constructor(address _aiRollupOperator) {
        aiRollupOperator = AI_RollupOperator(_aiRollupOperator);
    }

    function requestGasLimit(
        uint256 baseGasLimit,
        uint256 cpuPercentage,
        uint256 memoryPercentage,
        uint256 diskPercentage,
        uint256 networkPercentage
    ) public returns (uint256) {
        uint256 finalGasLimit = aiRollupOperator.calculateFinalGasLimit(
            baseGasLimit,
            cpuPercentage,
            memoryPercentage,
            diskPercentage,
            networkPercentage
        );
        emit GasLimitRequested(baseGasLimit, finalGasLimit);
        return finalGasLimit;
    }
}
