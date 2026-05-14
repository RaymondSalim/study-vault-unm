---
title: "CPU Architecture"
order: 5
moduleTitle: "COMP1030 - Systems & Architecture"
tags: ["CPU", "von-neumann", "fetch-decode-execute", "pipelining", "instruction-formats"]
---

## Von Neumann Architecture

:::eli10

A computer has a brain (CPU), memory (where it stores instructions and data), and input/output (keyboard, screen). The CPU fetches instructions from memory one by one, figures out what they mean, and carries them out. This fetch-decode-execute cycle repeats billions of times per second.

:::

:::eli15

The Von Neumann architecture has a CPU (with control unit and ALU), shared memory (for both instructions and data), and I/O, connected by buses. The key principle is stored-program: instructions live in the same memory as data. This creates the "Von Neumann bottleneck" -- the single bus between CPU and memory limits throughput. Harvard architecture separates instruction and data memory/buses to reduce this bottleneck (used in caches and embedded systems).

:::

:::eli20

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

:::

---

## CPU Registers

:::eli10

Registers are tiny, super-fast storage spaces inside the CPU. The Program Counter (PC) remembers which instruction to do next. The Instruction Register (IR) holds the current instruction being worked on. The Accumulator stores the result of calculations. Think of them as sticky notes the CPU keeps right on its desk.

:::

:::eli15

Registers are the fastest storage in a computer, built into the CPU itself. Key special-purpose registers: PC (Program Counter -- address of next instruction), IR (Instruction Register -- current instruction being decoded), MAR/MDR (interface to memory), ACC (accumulator for ALU results), SP (Stack Pointer -- top of stack), and status flags (Z, N, C, V). General-purpose registers (R0-Rn) hold operands for computation.

:::

:::eli20

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

:::

---

## Fetch-Decode-Execute Cycle

:::eli10

The CPU repeats three steps forever: (1) Fetch -- grab the next instruction from memory, (2) Decode -- figure out what the instruction means, (3) Execute -- do it (like add two numbers or jump to a different instruction). Then it moves to the next instruction and starts over.

:::

:::eli15

The CPU executes instructions in a cycle: Fetch (load instruction from memory at address in PC, advance PC), Decode (control unit interprets the opcode and identifies operands/addressing mode), Execute (ALU performs the operation, result stored, flags updated). For memory operations, additional cycles access data. For branches, the PC is modified to jump to a new address. This cycle repeats indefinitely.

:::

:::eli20

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

:::

---

## Instruction Formats

:::eli10

Instructions are coded in binary. Each instruction has an "opcode" (what to do, like ADD or LOAD) and "operands" (what to do it with, like which registers). RISC computers keep all instructions the same size (simple and fast). CISC computers have variable-size instructions (more powerful but complex).

:::

:::eli15

Instructions encode an operation and its operands in binary. Fixed-length formats (RISC -- like ARM) have uniform instruction sizes for simple decoding and predictable pipelining. Variable-length formats (CISC -- like x86) can be 1-15 bytes, allowing compact code but complex decoding. Instructions fall into categories: data processing (ALU operations), data transfer (load/store), control flow (branch/jump), and I/O.

:::

:::eli20

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

:::

---

## Addressing Modes

:::eli10

Addressing modes are different ways to tell the CPU where to find data. "Immediate" means the value is right there in the instruction. "Register" means look in a register. "Direct" means go to a specific memory address. "Indirect" means a register holds the address to go to -- like following a treasure map.

:::

:::eli15

Addressing modes specify how to find an operand. Immediate: value is in the instruction itself (fast, but limited size). Register: value is in a register (fast). Direct: instruction contains the memory address. Indirect: a register holds the memory address (enables pointers/arrays). Indexed: base address + offset (for array access). PC-relative: offset from current position (for branches, enables position-independent code).

:::

:::eli20

| Mode | Operand is... | Example | Effective Address |
|------|---------------|---------|-------------------|
| Immediate | The value itself | `ADD R1, #5` | — (value in instruction) |
| Register | In a register | `ADD R1, R2` | — (value in register) |
| Direct | At a memory address | `LOAD R1, [0x100]` | 0x100 |
| Indirect | At address stored in register | `LOAD R1, [R2]` | Contents of R2 |
| Indexed | Base + offset | `LOAD R1, [R2 + #4]` | R2 + 4 |
| PC-relative | PC + offset | `BRA #offset` | PC + offset |

:::

---

## Pipelining

:::eli10

Pipelining is like a car wash with multiple stages (soap, rinse, dry). Instead of one car going through all stages before the next starts, multiple cars are in different stages at the same time. The CPU works the same way -- while one instruction is being executed, the next one is being decoded, and the one after that is being fetched.

:::

:::eli15

Pipelining overlaps instruction execution by breaking it into stages (typically 5: IF, ID, EX, MEM, WB). While one instruction executes, the next is being decoded, and another is being fetched -- achieving near 1 instruction per cycle throughput. Hazards disrupt this: structural (hardware conflicts), data (result not yet available -- solved by forwarding), and control (branches invalidate fetched instructions -- solved by prediction). Ideal speedup approaches the number of pipeline stages.

:::

:::eli20

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

:::

---

## Performance Metrics

:::eli10

We measure CPU speed by how many instructions it completes per second. "CPI" (Cycles Per Instruction) tells you how many clock ticks each instruction takes on average. Amdahl's Law says that speeding up only part of a program gives diminishing returns -- the un-improved part becomes the bottleneck.

:::

:::eli15

Key performance metrics: CPI (Cycles Per Instruction) -- average clock cycles per instruction. Execution time = Instruction Count x CPI x Clock Period. Amdahl's Law limits speedup: if only fraction f of a program benefits from improvement p, the maximum speedup is 1/((1-f) + f/p). Even with infinite improvement to the parallelizable portion, speedup is limited by the serial fraction. This explains why diminishing returns occur when optimizing one component.

:::

:::eli20

| Metric | Formula |
|--------|---------|
| CPI (Cycles Per Instruction) | $\text{CPI} = \frac{\text{Total cycles}}{\text{Instruction count}}$ |
| Execution time | $T = \text{IC} \times \text{CPI} \times T_{cycle}$ |
| MIPS | $\frac{\text{IC}}{T \times 10^6}$ |
| Speedup (Amdahl's Law) | $S = \frac{1}{(1-f) + \frac{f}{p}}$ |

where $f$ = fraction improved, $p$ = improvement factor.

:::

---

## RISC vs CISC

:::eli10

RISC and CISC are two philosophies for designing CPUs. RISC (like ARM in phones) uses many simple instructions -- easier to make fast with pipelining. CISC (like x86 in PCs) uses fewer, more powerful instructions -- each one does more work but is harder to pipeline. Most modern chips use RISC ideas internally even if they accept CISC instructions.

:::

:::eli15

RISC (Reduced Instruction Set Computer) uses simple, fixed-length instructions with few addressing modes and load/store architecture (only load/store access memory). This simplifies pipelining and enables high clock speeds. CISC (Complex Instruction Set Computer) has variable-length instructions with many addressing modes -- any instruction can access memory. Modern x86 CPUs internally decode CISC instructions into RISC-like micro-ops for efficient execution.

:::

:::eli20

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

:::
