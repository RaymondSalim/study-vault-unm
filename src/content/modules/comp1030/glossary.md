---
title: "Glossary"
order: 95
moduleTitle: "COMP1030 - Systems & Architecture"
tags: ["glossary", "definitions", "key-terms"]
---

## Number Systems & Data Representation

| Term | Definition |
|------|-----------|
| **Binary** | Base-2 number system using digits 0 and 1 |
| **Hexadecimal** | Base-16 number system using digits 0-9 and A-F |
| **Octal** | Base-8 number system using digits 0-7 |
| **MSB** | Most Significant Bit — leftmost bit; determines sign in signed numbers |
| **LSB** | Least Significant Bit — rightmost bit; determines odd/even |
| **Two's complement** | Signed integer representation: negate by inverting bits and adding 1 |
| **Sign extension** | Extending a value to more bits by replicating the sign bit |
| **Overflow** | Result exceeds the representable range for the given bit width |
| **IEEE 754** | Standard for floating-point representation (sign, exponent, mantissa) |
| **Mantissa (significand)** | Fractional part of a floating-point number (with implicit leading 1) |
| **Bias** | Constant added to exponent to allow unsigned storage ($2^{k-1}-1$) |
| **Denormalised number** | IEEE 754 value with all-zero exponent (no implicit leading 1) |
| **NaN** | Not a Number — result of undefined operations (e.g., $0/0$) |

---

## Boolean Algebra & Logic

| Term | Definition |
|------|-----------|
| **Boolean algebra** | Mathematical system for manipulating binary variables (0/1, true/false) |
| **Logic gate** | Hardware component implementing a basic Boolean function |
| **Truth table** | Table listing all input combinations and corresponding outputs |
| **Sum of Products (SOP)** | Expression as OR of AND terms (minterms) |
| **Product of Sums (POS)** | Expression as AND of OR terms (maxterms) |
| **Minterm** | AND term where every variable appears (complemented or not) |
| **Maxterm** | OR term where every variable appears (complemented or not) |
| **Karnaugh map (K-map)** | Visual method for simplifying Boolean expressions using adjacency |
| **Don't care** | Input combination that will never occur or whose output doesn't matter |
| **Universal gate** | Gate that can implement any function alone (NAND or NOR) |
| **De Morgan's theorem** | $\overline{AB}=\overline{A}+\overline{B}$ and $\overline{A+B}=\overline{A}\cdot\overline{B}$ |
| **Fan-out** | Number of gate inputs that a single output can drive |
| **Propagation delay** | Time for a signal change to pass through a gate |

---

## Combinational Circuits

| Term | Definition |
|------|-----------|
| **Combinational circuit** | Output depends only on current inputs (no memory) |
| **Half adder** | Adds two 1-bit inputs; produces sum and carry |
| **Full adder** | Adds two 1-bit inputs plus carry-in; produces sum and carry-out |
| **Ripple carry adder** | Chain of full adders; carry propagates sequentially |
| **Carry lookahead** | Computes carries in parallel using generate/propagate signals |
| **Generate (G)** | $G_i = A_i B_i$ — carry produced regardless of carry-in |
| **Propagate (P)** | $P_i = A_i \oplus B_i$ — incoming carry passed through |
| **Multiplexer (MUX)** | Selects one of $2^n$ inputs based on $n$ select lines |
| **Decoder** | Converts $n$-bit input to one active output among $2^n$ |
| **Encoder** | Converts $2^n$ inputs to $n$-bit binary output |
| **Priority encoder** | Encoder that selects the highest-priority active input |
| **ALU** | Arithmetic Logic Unit — performs arithmetic and logic operations |

---

## Sequential Circuits

| Term | Definition |
|------|-----------|
| **Sequential circuit** | Output depends on current inputs AND stored state |
| **Latch** | Level-triggered storage element (transparent when enabled) |
| **Flip-flop** | Edge-triggered storage element (samples at clock edge) |
| **Clock** | Periodic signal that synchronises sequential circuit operations |
| **Rising edge** | Clock transition from 0 to 1 (positive edge) |
| **Falling edge** | Clock transition from 1 to 0 (negative edge) |
| **Setup time ($t_{setup}$)** | Minimum time input must be stable before the clock edge |
| **Hold time ($t_{hold}$)** | Minimum time input must be stable after the clock edge |
| **Clock-to-Q ($t_{clk-q}$)** | Delay from clock edge to output change |
| **Register** | Group of flip-flops sharing a common clock |
| **Shift register** | Register that shifts data one position per clock cycle |
| **Counter** | Sequential circuit that cycles through a sequence of states |
| **Synchronous** | All flip-flops triggered by the same clock |
| **Asynchronous (ripple)** | Each flip-flop triggered by the previous one's output |
| **FSM (Finite State Machine)** | Circuit with defined states and transition rules |
| **Moore machine** | FSM whose output depends only on current state |
| **Mealy machine** | FSM whose output depends on state and current inputs |

---

## CPU Architecture

| Term | Definition |
|------|-----------|
| **Von Neumann architecture** | Shared memory for instructions and data; sequential fetch-execute |
| **Harvard architecture** | Separate memory/buses for instructions and data |
| **Program Counter (PC)** | Register holding address of next instruction to fetch |
| **Instruction Register (IR)** | Holds the current instruction being decoded |
| **MAR** | Memory Address Register — address for memory access |
| **MDR** | Memory Data Register — data read from or written to memory |
| **ALU** | Executes arithmetic and logic operations |
| **Control Unit (CU)** | Decodes instructions and generates control signals |
| **Fetch-Decode-Execute** | The fundamental CPU operation cycle |
| **Opcode** | Part of instruction specifying the operation |
| **Operand** | Data on which an instruction operates |
| **Addressing mode** | Method of specifying operand location |
| **RISC** | Reduced Instruction Set Computer — simple, fixed-length instructions |
| **CISC** | Complex Instruction Set Computer — variable-length, powerful instructions |

---

## Pipelining

| Term | Definition |
|------|-----------|
| **Pipeline** | Overlapping execution of multiple instructions in stages |
| **Pipeline stage** | One phase of instruction execution (IF, ID, EX, MEM, WB) |
| **Throughput** | Number of instructions completed per unit time |
| **Latency** | Time to complete a single instruction |
| **Hazard** | Condition preventing the next instruction from executing in its scheduled cycle |
| **Structural hazard** | Two instructions need the same hardware resource simultaneously |
| **Data hazard** | Instruction depends on result of a prior, unfinished instruction |
| **Control hazard** | Branch instruction invalidates already-fetched instructions |
| **RAW** | Read After Write — most common data hazard |
| **Forwarding (bypassing)** | Routing result directly to dependent instruction without waiting for write-back |
| **Stall (bubble)** | Inserting idle cycle to resolve a hazard |
| **Branch prediction** | Guessing branch outcome to avoid pipeline flush |
| **Pipeline flush** | Discarding incorrectly fetched instructions after misprediction |

---

## Assembly Language

| Term | Definition |
|------|-----------|
| **Assembly language** | Low-level language with mnemonic instructions (1:1 with machine code) |
| **Assembler** | Program that translates assembly into machine code |
| **Instruction set (ISA)** | Complete set of instructions a CPU can execute |
| **Register** | Small, fast storage inside the CPU |
| **Immediate value** | Constant encoded directly in the instruction |
| **Label** | Named location in code (resolved to address by assembler) |
| **Branch** | Instruction that changes the PC (conditional or unconditional) |
| **Link Register (LR)** | Stores return address when calling a subroutine |
| **Stack Pointer (SP)** | Points to the top of the call stack |
| **Subroutine/Function** | Reusable code block called with BL and returned from via LR |
| **Calling convention** | Rules for passing arguments and preserving registers |

---

## Memory

| Term | Definition |
|------|-----------|
| **Memory hierarchy** | Layers of storage from fast/small (registers) to slow/large (disk) |
| **Temporal locality** | Recently accessed data likely to be accessed again soon |
| **Spatial locality** | Data near recently accessed locations likely accessed soon |
| **Cache** | Small fast memory storing copies of frequently used data |
| **Cache line/block** | Unit of data transfer between cache and memory |
| **Hit** | Requested data found in cache |
| **Miss** | Requested data not in cache |
| **AMAT** | Average Memory Access Time |
| **Direct-mapped cache** | Each memory block maps to exactly one cache line |
| **Set-associative cache** | Each block maps to a set; can occupy any line within the set |
| **Fully associative cache** | Any block can go in any cache line |
| **Tag** | Address bits identifying which block is in a cache line |
| **Write-through** | Every write updates both cache and memory |
| **Write-back** | Writes update cache only; memory updated on eviction |
| **Dirty bit** | Indicates a cache line has been modified (write-back) |
| **LRU** | Least Recently Used — replacement policy |
| **SRAM** | Static RAM — fast, no refresh, used for caches |
| **DRAM** | Dynamic RAM — slower, needs refresh, used for main memory |
| **Virtual memory** | Abstraction giving each process its own address space |
| **Page** | Fixed-size block of virtual memory (typically 4 KB) |
| **Page table** | Data structure mapping virtual pages to physical frames |
| **TLB** | Translation Lookaside Buffer — cache for page table entries |
| **Page fault** | Accessed page not in physical memory; must load from disk |
