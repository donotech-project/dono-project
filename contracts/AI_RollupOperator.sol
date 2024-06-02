// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AI_RollupOperator {
    struct NodeResources {
        uint256 cpu;
        uint256 mem;
        uint256 disk;
        uint256 networkBandwidth;
    }

    mapping(uint256 => NodeResources) public nodeResources;
    uint256 public totalNodes;

    event NodeResourceSet(uint256 nodeId, uint256 cpu, uint256 mem, uint256 disk, uint256 networkBandwidth);

    function setNodeResources(uint256 nodeId, uint256 cpu, uint256 mem, uint256 disk, uint256 networkBandwidth) public {
        nodeResources[nodeId] = NodeResources(cpu, mem, disk, networkBandwidth);
        totalNodes++;
        emit NodeResourceSet(nodeId, cpu, mem, disk, networkBandwidth);
    }

    function calculateAverageCPU() public view returns (uint256) {
        uint256 totalCPU;
        for (uint256 i = 1; i <= totalNodes; i++) {
            totalCPU += nodeResources[i].cpu;
        }
        return totalCPU / totalNodes;
    }

    function calculateAverageMemory() public view returns (uint256) {
        uint256 totalMemory;
        for (uint256 i = 1; i <= totalNodes; i++) {
            totalMemory += nodeResources[i].mem;
        }
        return totalMemory / totalNodes;
    }

    function calculateAverageDisk() public view returns (uint256) {
        uint256 totalDisk;
        for (uint256 i = 1; i <= totalNodes; i++) {
            totalDisk += nodeResources[i].disk;
        }
        return totalDisk / totalNodes;
    }

    function calculateAverageNetworkBandwidth() public view returns (uint256) {
        uint256 totalNetworkBandwidth;
        for (uint256 i = 1; i <= totalNodes; i++) {
            totalNetworkBandwidth += nodeResources[i].networkBandwidth;
        }
        return totalNetworkBandwidth / totalNodes;
    }

    function calculateFinalGasLimit(
        uint256 baseGasLimit,
        uint256 cpuPercentage,
        uint256 memoryPercentage,
        uint256 diskPercentage,
        uint256 networkPercentage
    ) public view returns (uint256) {
        uint256 averageCPU = calculateAverageCPU();
        uint256 averageMemory = calculateAverageMemory();
        uint256 averageDisk = calculateAverageDisk();
        uint256 averageNetworkBandwidth = calculateAverageNetworkBandwidth();

        uint256 gasLimitCPU = (baseGasLimit * cpuPercentage * averageCPU) / 10000;
        uint256 gasLimitMemory = (baseGasLimit * memoryPercentage * averageMemory) / 10000;
        uint256 gasLimitDisk = (baseGasLimit * diskPercentage * averageDisk) / 10000;
        uint256 gasLimitNetwork = (baseGasLimit * networkPercentage * averageNetworkBandwidth) / 10000;

        return gasLimitCPU + gasLimitMemory + gasLimitDisk + gasLimitNetwork;
    }
}
