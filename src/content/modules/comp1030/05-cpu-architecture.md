---
title: "CPU Architecture"
order: 5
moduleTitle: "COMP1030 - Systems & Architecture"
tags: ["CPU", "von-neumann", "fetch-decode-execute", "pipelining", "instruction-formats"]
---

## Von Neumann Architecture

| Component | Role |
|-----------|------|
| CPU (Control Unit + ALU) | Executes instructions |
| Memory | Stores instructions **and** data (shared) |
| Input/Output | Communicates with external devices |
| System Bus | Address bus + Data bus + Control bus |

**Key principle:** Instructions and data share the same memory (Von Neumann bottleneck).

### Harvard Architecture (contrast)

| Feature | Von Neumann | Harvard |
|---------|-------------|---------|
| Memory | Shared for code & data | Separate for code & data |
| Buses | Single set | Separate buses |
| Bottleneck | Yes | Reduced |
| Use | General-purpose CPUs | DSPs, microcontrollers |

---

## CPU Registers

| Register | Purpose |
|----------|---------|
| PC (Program Counter) | Address of next instruction |
| IR (Instruction Register) | Current instruction being decoded |
| MAR (Memory Address Register) | Address to read/write in memory |
| MDR (Memory Data Register) | Data read from / to write to memory |
| ACC (Accumulator) | Stores ALU result |
| SP (Stack Pointer) | Top of stack address |
| SR / Flags | Status flags (Z, N, C, V) |
| General Purpose (R0-Rn) | Operand storage |

---

## Fetch-Decode-Execute Cycle

### Fetch

1. $\text{MAR} \leftarrow \text{PC}$
2. Memory read: $\text{MDR} \leftarrow \text{Mem}[\text{MAR}]$
3. $\text{IR} \leftarrow \text{MDR}$
4. $\text{PC} \leftarrow \text{PC} + 1$ (or + instruction size)

### Decode

- Control Unit interprets opcode in IR
- Identifies operands and addressing mode
- Generates control signals

### Execute

- ALU performs operation / memory access / branch taken
- Result stored to register or memory
- Flags updated

---

## Instruction Formats

### Fixed-Length (RISC)

```
| Opcode | Rd | Rs1 | Rs2/Immediate |
|  6 bits | 5  |  5  |    16 bits    |
```

### Variable-Length (CISC)

Instructions can be 1-15 bytes (e.g., x86).

### Instruction Types

| Type | Examples | Description |
|------|----------|-------------|
| Data processing | ADD, SUB, AND, OR | ALU operations |
| Data transfer | LOAD, STORE, MOV | Move data between register/memory |
| Control flow | JUMP, BRANCH, CALL, RET | Change PC |
| I/O | IN, OUT | Device communication |

---

## Addressing Modes

| Mode | Operand is... | Example | Effective Address |
|------|---------------|---------|-------------------|
| Immediate | The value itself | `ADD R1, #5` | — (value in instruction) |
| Register | In a register | `ADD R1, R2` | — (value in register) |
| Direct | At a memory address | `LOAD R1, [0x100]` | 0x100 |
| Indirect | At address stored in register | `LOAD R1, [R2]` | Contents of R2 |
| Indexed | Base + offset | `LOAD R1, [R2 + #4]` | R2 + 4 |
| PC-relative | PC + offset | `BRA #offset` | PC + offset |

---

## Pipelining

Break instruction execution into stages; overlap multiple instructions.

### Classic 5-Stage Pipeline

| Stage | Abbreviation | Action |
|-------|-------------|--------|
| 1 | IF | Instruction Fetch |
| 2 | ID | Instruction Decode / Register Read |
| 3 | EX | Execute / ALU |
| 4 | MEM | Memory Access |
| 5 | WB | Write Back to register |

### Pipeline Timing

| Cycle | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|-------|---|---|---|---|---|---|---|
| Instr 1 | IF | ID | EX | MEM | WB | | |
| Instr 2 | | IF | ID | EX | MEM | WB | |
| Instr 3 | | | IF | ID | EX | MEM | WB |

**Throughput:** Ideally 1 instruction completed per cycle (after pipeline fills).

**Speedup (ideal):** $S = \frac{n \cdot k}{n + k - 1} \approx k$ for large $n$

where $n$ = number of instructions, $k$ = pipeline stages.

### Pipeline Hazards

| Hazard | Cause | Solution |
|--------|-------|----------|
| **Structural** | Hardware resource conflict | Duplicate hardware; stall |
| **Data** | Instruction needs result not yet available | Forwarding/bypassing; stalling; reordering |
| **Control** | Branch changes PC, pipeline has wrong instructions | Branch prediction; delayed branch; flush |

### Data Hazard Types

| Type | Description | Example |
|------|-------------|---------|
| RAW (Read After Write) | Read before write completes | `ADD R1,R2,R3` then `SUB R4,R1,R5` |
| WAR (Write After Read) | Write before read completes | Rare in simple pipelines |
| WAW (Write After Write) | Two writes to same location | Out-of-order execution |

### Forwarding (Bypassing)

Route ALU result directly to next instruction's input (bypasses register file write/read).

---

## Performance Metrics

| Metric | Formula |
|--------|---------|
| CPI (Cycles Per Instruction) | $\text{CPI} = \frac{\text{Total cycles}}{\text{Instruction count}}$ |
| Execution time | $T = \text{IC} \times \text{CPI} \times T_{cycle}$ |
| MIPS | $\frac{\text{IC}}{T \times 10^6}$ |
| Speedup (Amdahl's Law) | $S = \frac{1}{(1-f) + \frac{f}{p}}$ |

where $f$ = fraction improved, $p$ = improvement factor.

---

## RISC vs CISC

| Feature | RISC | CISC |
|---------|------|------|
| Instructions | Simple, fixed-length | Complex, variable-length |
| Addressing modes | Few | Many |
| Registers | Many | Fewer |
| Pipelining | Easy | Harder |
| Memory access | Load/Store only | Any instruction can access memory |
| Examples | ARM, MIPS, RISC-V | x86, VAX |

---

## Practice

<details>
<summary>In a 5-stage pipeline, how many cycles to execute 100 instructions?</summary>

$$\text{Cycles} = n + k - 1 = 100 + 5 - 1 = 104 \text{ cycles}$$

Without pipelining: $100 \times 5 = 500$ cycles.
Speedup: $500 / 104 \approx 4.8\times$
</details>

<details>
<summary>Identify the data hazard:
```
ADD R1, R2, R3
SUB R4, R1, R5
```
</summary>

**RAW (Read After Write)** hazard: SUB reads R1, which ADD hasn't written back yet.

Solution: Forward the ALU result from ADD's EX stage to SUB's EX stage input.
</details>

<details>
<summary>A program is 40% parallelisable. What is the max speedup with 8 processors? (Amdahl's Law)</summary>

$$S = \frac{1}{(1 - 0.4) + \frac{0.4}{8}} = \frac{1}{0.6 + 0.05} = \frac{1}{0.65} \approx 1.54\times$$

Even with infinite processors: $S_{max} = \frac{1}{0.6} = 1.67\times$
</details>

<details>
<summary>What is the Von Neumann bottleneck?</summary>

The shared bus between CPU and memory limits throughput — instructions and data compete for the same path. The CPU often idles waiting for memory transfers.

Mitigations: caches, wider buses, Harvard-style split caches (separate I-cache and D-cache).
</details>
