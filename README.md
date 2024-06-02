# DONO Layer 2 Chain Project

## Project Description
The DONO Layer 2 Chain Project aims to implement an efficient layered blockchain architecture utilizing Layer 2 offloading and resource management. This project includes smart contracts for Layer 1 and Layer 2 chains, as well as an AI Rollup Operator that manages node resources and calculates gas limits based on actual resource usage.

## Calculating the Gas Limit for a Layer 2 Chain with 3 Nodes

### 1. Given Default Resource Percentages
- **CPU**: \( P_{CPU} \% \)
- **Memory**: \( P_{Mem} \% \)
- **Disk**: \( P_{Disk} \% \)
- **Network Bandwidth**: \( P_{Net} \% \)

### 2. Resource Usage for Each Node
- CPU usage for node \( i \): \( CPU_i \)
- Memory usage for node \( i \): \( Mem_i \)
- Disk usage for node \( i \): \( Disk_i \)
- Network bandwidth usage for node \( i \): \( Net_i \)

### 3. Number of Nodes
- Total number of nodes: \( N \)

### 4. Calculating Average Resource Usage
The average resource usage is calculated as follows:

1. **Average CPU Usage**:
   \[
   \overline{CPU} = \frac{1}{N} \sum_{i=1}^{N} CPU_i
   \]

2. **Average Memory Usage**:
   \[
   \overline{Mem} = \frac{1}{N} \sum_{i=1}^{N} Mem_i
   \]

3. **Average Disk Usage**:
   \[
   \overline{Disk} = \frac{1}{N} \sum_{i=1}^{N} Disk_i
   \]

4. **Average Network Bandwidth Usage**:
   \[
   \overline{Net} = \frac{1}{N} \sum_{i=1}^{N} Net_i
   \]

### 5. Calculating the Final Gas Limit
The final gas limit is calculated based on the average resource usage and predefined percentages for each resource type. Given the default maximum gas limit \( GL_{max} \) of 30,000:

1. **CPU-based Gas Limit**:
   \[
   GL_{CPU} = GL_{max} \times \frac{P_{CPU}}{100} \times \frac{\overline{CPU}}{100}
   \]

2. **Memory-based Gas Limit**:
   \[
   GL_{Mem} = GL_{max} \times \frac{P_{Mem}}{100} \times \frac{\overline{Mem}}{100}
   \]

3. **Disk-based Gas Limit**:
   \[
   GL_{Disk} = GL_{max} \times \frac{P_{Disk}}{100} \times \frac{\overline{Disk}}{100}
   \]

4. **Network Bandwidth-based Gas Limit**:
   \[
   GL_{Net} = GL_{max} \times \frac{P_{Net}}{100} \times \frac{\overline{Net}}{100}
   \]

5. **Final Gas Limit**:
   \[
   GL_{total} = GL_{CPU} + GL_{Mem} + GL_{Disk} + GL_{Net}
   \]

### 6. Example Calculation
Consider three nodes with the following resource usage:
- Node 1: \( CPU_1 = 50 \), \( Mem_1 = 40 \), \( Disk_1 = 30 \), \( Net_1 = 60 \)
- Node 2: \( CPU_2 = 60 \), \( Mem_2 = 50 \), \( Disk_2 = 20 \), \( Net_2 = 70 \)
- Node 3: \( CPU_3 = 70 \), \( Mem_3 = 60 \), \( Disk_3 = 25 \), \( Net_3 = 80 \)

The average resource usage is calculated as follows:
\[
\overline{CPU} = \frac{50 + 60 + 70}{3} = 60
\]
\[
\overline{Mem} = \frac{40 + 50 + 60}{3} = 50
\]
\[
\overline{Disk} = \frac{30 + 20 + 25}{3} = 25
\]
\[
\overline{Net} = \frac{60 + 70 + 80}{3} = 70
\]

Given the default resource percentages: \( P_{CPU} = 0.25 \), \( P_{Mem} = 0.20 \), \( P_{Disk} = 0.10 \), \( P_{Net} = 0.45 \)

The final gas limit is calculated as follows:
\[
GL_{CPU} = 30000 \times 0.25 \times \frac{60}{100} = 4500
\]
\[
GL_{Mem} = 30000 \times 0.20 \times \frac{50}{100} = 3000
\]
\[
GL_{Disk} = 30000 \times 0.10 \times \frac{25}{100} = 750
\]
\[
GL_{Net} = 30000 \times 0.45 \times \frac{70}{100} = 9450
\]

Thus, the final gas limit based on resource usage is:
\[
GL_{total} = 4500 + 3000 + 750 + 9450 = 17700
\]

Therefore, the final gas limit based on resource usage is 17,700.
