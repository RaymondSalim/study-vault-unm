---
title: "Flashcards"
order: 92
moduleTitle: "COMP1030 - Systems & Architecture"
tags: ["flashcards", "revision", "quick-review"]
---

# Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | What is the formula for two's complement negation? | Invert all bits then add 1. |
| 2 | What is the bias in IEEE 754 single-precision? | 127 (calculated as $2^{k-1} - 1$ where k=8 exponent bits). |
| 3 | What does the Von Neumann bottleneck refer to? | The limited bandwidth between CPU and memory when both data and instructions share a single bus. |
| 4 | What are the two types of hazards in pipelining? | Data hazards (dependencies between instructions) and control hazards (branch decisions not yet resolved). |
| 5 | What is the difference between SRAM and DRAM? | SRAM uses flip-flops (fast, expensive, no refresh needed); DRAM uses capacitors (slower, cheaper, needs periodic refresh). |
| 6 | What is spatial locality? | Programs tend to access memory addresses near recently accessed addresses. |
| 7 | What is temporal locality? | Programs tend to access the same memory addresses repeatedly within a short time period. |
| 8 | In the HACK computer, what does the A-instruction do? | Loads a 15-bit value into the A register (sets address or constant). |
| 9 | What is a full adder's carry-out expression? | $C_{out} = AB + C_{in}(A \oplus B)$. |
| 10 | What is the purpose of the ALU? | Performs arithmetic and logical operations on binary inputs as directed by control signals. |
| 11 | How is signed overflow detected in addition? | When two operands of the same sign produce a result of the opposite sign. |
| 12 | What is the range of an n-bit two's complement number? | $-2^{n-1}$ to $2^{n-1} - 1$. |
| 13 | What is a multiplexer (MUX)? | A combinational circuit that selects one of several inputs based on select lines and forwards it to output. |
| 14 | What is a D flip-flop? | A sequential circuit that stores 1 bit; output Q takes the value of input D on the clock edge. |
| 15 | What is the fetch-decode-execute cycle? | CPU fetches instruction from memory, decodes the opcode, executes the operation, then repeats. |
| 16 | What is a cache hit vs. cache miss? | Hit: requested data found in cache. Miss: data not in cache, must fetch from slower memory level. |
| 17 | What does De Morgan's theorem state? | $\overline{A+B} = \overline{A} \cdot \overline{B}$ and $\overline{A \cdot B} = \overline{A} + \overline{B}$. |
| 18 | What is the purpose of a K-map? | To simplify Boolean expressions by visually grouping adjacent 1s into power-of-2 sized groups. |
| 19 | What is direct-mapped cache? | Each memory block maps to exactly one cache line (determined by block address mod number of lines). |
| 20 | What is the role of the Program Counter (PC)? | Holds the address of the next instruction to be fetched from memory. |
| 21 | What is an SR latch? | A basic memory element with Set and Reset inputs; stores 1 bit but has an invalid state when both inputs are active. |
| 22 | What is the HACK C-instruction format? | `dest = comp ; jump` -- specifies computation, destination register, and jump condition. |
| 23 | Convert decimal -5 to 8-bit two's complement. | 5 = 00000101, invert = 11111010, add 1 = 11111011. |
| 24 | What is write-back vs. write-through cache policy? | Write-back: writes only to cache, updates memory on eviction. Write-through: writes to both cache and memory simultaneously. |
| 25 | What is the purpose of the control unit? | Generates control signals that coordinate the operations of the ALU, registers, and memory based on the decoded instruction. |
