---
title: "Computer Architecture"
order: 4
moduleTitle: "COMP1027 - Computer Fundamentals"
tags: ["architecture", "von-neumann", "CPU", "fetch-decode-execute"]
---

## Von Neumann vs Harvard Architecture

:::eli10

A Von Neumann computer stores programs and data in the same memory (like keeping your homework and textbooks in the same backpack). A Harvard computer keeps them separate (like having two separate backpacks). The Harvard approach is faster because you can grab both at the same time, but the Von Neumann approach is simpler.

:::

:::eli15

The Von Neumann architecture uses a single memory for both instructions and data, connected by one shared bus. This is simple but creates a bottleneck: the CPU cannot fetch an instruction and read data simultaneously. The Harvard architecture uses separate memories and buses for instructions and data, allowing parallel access and higher throughput. Most general-purpose PCs use Von Neumann; DSPs and microcontrollers often use Harvard.

:::

:::eli20

| Feature | Von Neumann | Harvard |
|---------|-------------|---------|
| Memory | Single memory for data & instructions | Separate memories |
| Bus | Shared bus (bottleneck) | Separate buses |
| Speed | Slower (bus contention) | Faster (parallel access) |
| Complexity | Simpler | More complex |
| Example | General PCs | DSPs, microcontrollers |

**Von Neumann bottleneck**: CPU speed limited by single bus bandwidth between CPU and memory.

:::

## CPU Components

:::eli10

The CPU is the brain of the computer. It has a calculator part (ALU) that does math, a control unit that reads instructions and tells everything what to do, and tiny super-fast storage boxes called registers. The program counter keeps track of which instruction to do next.

:::

:::eli15

The CPU consists of the ALU (performs arithmetic and logic), the Control Unit (decodes instructions and generates control signals), and registers (fast temporary storage). Key registers include: PC (program counter, points to next instruction), IR (instruction register, holds current instruction), MAR/MDR (for memory access), accumulator (stores ALU results), and the status register (holds condition flags like zero and negative).

:::

:::eli20

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

:::

## Fetch-Decode-Execute Cycle

:::eli10

The computer repeats three steps over and over. FETCH: go to memory and grab the next instruction. DECODE: figure out what the instruction means. EXECUTE: actually do it (add numbers, store data, etc.). Then go back to Fetch for the next one. It is like reading a recipe: read the next step, understand it, do it, repeat.

:::

:::eli15

The fetch-decode-execute cycle is the fundamental operation of a CPU, repeating endlessly. During Fetch, the CPU reads the instruction at the address in the PC from memory into the IR, then increments the PC. During Decode, the control unit interprets the opcode and identifies operands. During Execute, the ALU performs the operation and stores the result. This cycle continues until a HALT instruction is encountered.

:::

:::eli20

| Phase | Steps |
|-------|-------|
| **Fetch** | 1. MAR ← PC; 2. Memory[MAR] → MDR; 3. MDR → IR; 4. PC ← PC + 1 |
| **Decode** | CU interprets opcode in IR; identifies operands |
| **Execute** | ALU performs operation; result stored; flags updated |

The cycle repeats indefinitely (until HALT).

:::

## Bus System

:::eli10

Buses are like highways that carry information between parts of the computer. The address bus tells memory WHERE to look (like a street address). The data bus carries the actual information back and forth. The control bus sends signals about WHAT to do (read or write).

:::

:::eli15

The bus system connects the CPU to memory and I/O devices. The address bus is unidirectional (CPU to memory) and carries memory addresses -- its width determines how much memory is addressable (n bits = 2^n locations). The data bus is bidirectional and carries data and instructions. The control bus carries signals like read/write, clock, and interrupt lines. Bus width directly impacts system performance and addressing capability.

:::

:::eli20

| Bus | Direction | Carries |
|-----|-----------|---------|
| Address bus | CPU → Memory | Memory addresses (unidirectional) |
| Data bus | Bidirectional | Data/instructions |
| Control bus | Bidirectional | Read/Write signals, clock, interrupt |

**Bus width**: n-bit address bus can address 2^n memory locations.

:::

## Memory Hierarchy

:::eli10

Computer memory comes in layers, like a pyramid. At the top, registers are tiny but super fast. Cache is slightly bigger and still fast. RAM is much bigger but slower. Hard drives and SSDs are huge but much slower. The computer tries to keep the most-used data in the fastest layers.

:::

:::eli15

The memory hierarchy trades off speed, size, and cost. Registers are the fastest (inside the CPU, a few bytes). Cache (L1/L2/L3) is very fast and stores recently used data (KB to MB). RAM provides main storage (GB, moderate speed). SSDs and HDDs offer large persistent storage (TB) but are orders of magnitude slower. The system exploits locality of reference to keep frequently accessed data in faster, smaller memories.

:::

:::eli20

| Level | Speed | Size | Cost/bit |
|-------|-------|------|----------|
| Registers | Fastest | Bytes | Highest |
| Cache (L1/L2/L3) | Very fast | KB-MB | High |
| RAM | Fast | GB | Medium |
| SSD/HDD | Slow | TB | Low |

:::

## Instruction Format (generic)

:::eli10

Every instruction has two parts: the opcode (which tells the computer WHAT to do, like "add" or "store") and the operand (which tells it WHAT DATA to use or WHERE to find it). It is like a recipe instruction: "chop" is the opcode and "onions" is the operand.

:::

:::eli15

Machine instructions consist of an opcode field (specifying the operation: add, subtract, load, store, jump, etc.) and one or more operand fields (specifying the data or addresses involved). The instruction format defines how many bits are allocated to each field, which determines how many operations the CPU supports and how it accesses data.

:::

:::eli20

```
| Opcode | Operand(s) |
```

| Field | Purpose |
|-------|---------|
| Opcode | What operation to perform |
| Operand | Data or address of data |

:::

## Interrupts

:::eli10

An interrupt is like someone tapping you on the shoulder while you are working -- you stop what you are doing, deal with the interruption, then go back to where you left off. The computer saves its place, handles the interrupt (like a key press), then resumes what it was doing.

:::

:::eli15

Interrupts allow external events to break the normal fetch-decode-execute cycle. Hardware interrupts come from devices (keyboard, timer), software interrupts are triggered by programs (system calls), and exceptions come from CPU errors (divide by zero). When an interrupt occurs, the CPU saves its current state (registers, PC), jumps to an interrupt service routine (ISR), executes it, restores the saved state, and resumes the original program.

:::

:::eli20

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

:::
