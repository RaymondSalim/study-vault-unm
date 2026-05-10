---
title: "Computer Architecture"
order: 4
moduleTitle: "COMP1027 - Computer Fundamentals"
tags: ["architecture", "von-neumann", "CPU", "fetch-decode-execute"]
---

## Von Neumann vs Harvard Architecture

| Feature | Von Neumann | Harvard |
|---------|-------------|---------|
| Memory | Single memory for data & instructions | Separate memories |
| Bus | Shared bus (bottleneck) | Separate buses |
| Speed | Slower (bus contention) | Faster (parallel access) |
| Complexity | Simpler | More complex |
| Example | General PCs | DSPs, microcontrollers |

**Von Neumann bottleneck**: CPU speed limited by single bus bandwidth between CPU and memory.

## CPU Components

| Component | Function |
|-----------|----------|
| ALU | Arithmetic & logic operations |
| Control Unit (CU) | Decodes instructions, generates control signals |
| Registers | Fast temporary storage inside CPU |
| Program Counter (PC) | Address of next instruction |
| Instruction Register (IR) | Holds current instruction |
| MAR | Memory Address Register -- address to read/write |
| MDR/MBR | Memory Data Register -- data being transferred |
| Accumulator (A) | Stores ALU result |
| Status/Flag Register | Z, N, C, V flags |

## Fetch-Decode-Execute Cycle

| Phase | Steps |
|-------|-------|
| **Fetch** | 1. MAR ← PC; 2. Memory[MAR] → MDR; 3. MDR → IR; 4. PC ← PC + 1 |
| **Decode** | CU interprets opcode in IR; identifies operands |
| **Execute** | ALU performs operation; result stored; flags updated |

The cycle repeats indefinitely (until HALT).

## Bus System

| Bus | Direction | Carries |
|-----|-----------|---------|
| Address bus | CPU → Memory | Memory addresses (unidirectional) |
| Data bus | Bidirectional | Data/instructions |
| Control bus | Bidirectional | Read/Write signals, clock, interrupt |

**Bus width**: n-bit address bus can address 2^n memory locations.

## Memory Hierarchy

| Level | Speed | Size | Cost/bit |
|-------|-------|------|----------|
| Registers | Fastest | Bytes | Highest |
| Cache (L1/L2/L3) | Very fast | KB-MB | High |
| RAM | Fast | GB | Medium |
| SSD/HDD | Slow | TB | Low |

## Instruction Format (generic)

```
| Opcode | Operand(s) |
```

| Field | Purpose |
|-------|---------|
| Opcode | What operation to perform |
| Operand | Data or address of data |

## Interrupts

| Type | Source | Example |
|------|--------|---------|
| Hardware | External device | Keyboard press, timer |
| Software | Program instruction | System call, trap |
| Exception | CPU error | Division by zero, page fault |

Interrupt handling: Save state → Jump to ISR → Execute ISR → Restore state → Resume

<details>
<summary>Practice: Trace fetch-decode-execute for instruction at address 5</summary>

**Fetch:**
1. MAR ← 5 (from PC)
2. Read Memory[5] → MDR (e.g., MDR = "ADD R1, R2")
3. IR ← MDR ("ADD R1, R2")
4. PC ← 6

**Decode:**
- CU reads opcode "ADD"
- Identifies operands R1, R2

**Execute:**
- ALU computes R1 + R2
- Result stored in R1
- Flags updated (Z=0 if result non-zero, etc.)
</details>

<details>
<summary>Practice: 16-bit address bus -- how much memory addressable?</summary>

2^16 = 65,536 bytes = 64 KB

(Assuming each address points to 1 byte.)
</details>

<details>
<summary>Practice: Why can't Von Neumann fetch instruction and data simultaneously?</summary>

Both instructions and data share the **same memory** and **same bus**. The CPU can only perform one memory access per clock cycle -- either fetching an instruction OR reading/writing data, not both at once. This is the Von Neumann bottleneck.
</details>
