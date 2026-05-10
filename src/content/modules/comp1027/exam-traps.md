---
title: "Exam Traps & Common Mistakes"
order: 91
moduleTitle: "COMP1027 - Computer Fundamentals"
tags: ["exam", "mistakes", "tips"]
---

## Boolean Algebra Traps

| Trap | Wrong | Correct |
|------|-------|---------|
| Distributing OR over AND | A+(B.C) = (A+B).(A+C) ← actually correct! | People forget OR distributes over AND too |
| De Morgan's applied partially | (A+BC)' = A'.(BC)' = A'.(B'+C') | Must apply to entire expression; don't stop at first level |
| Forgetting double complement | (A')' = A | NOT of NOT cancels |
| XOR not associative? | It IS associative | A⊕B⊕C = parity function |
| K-map wrapping | Groups can wrap top↔bottom, left↔right | Don't forget edge adjacency |

## Combinational Circuit Traps

| Trap | Explanation |
|------|-------------|
| Half adder vs Full adder | Half adder has NO carry input -- only use for LSB |
| Forgetting Cin=1 for subtraction | 2's complement subtraction requires Cin=1 with inverted B |
| MUX select line count | 2^n:1 MUX needs exactly n select lines, not n inputs |
| Decoder output count | n-to-2^n, not n-to-n |

## Sequential Circuit Traps

| Trap | Explanation |
|------|-------------|
| SR latch S=R=1 | **Invalid/forbidden** -- output is undefined |
| Edge vs Level triggering | Flip-flop changes only at edge; latch changes while enable is HIGH |
| Async vs Sync counter | Ripple counter: each FF clocked by PREVIOUS FF (not main clock) |
| Mod-N counter flip-flop count | Need ceil(log2(N)) FFs, not N flip-flops |
| Register bit count | n-bit register = n flip-flops, not 2^n |

## Architecture Traps

| Trap | Explanation |
|------|-------------|
| PC increment timing | PC incremented during FETCH, not execute |
| MAR vs MDR confusion | MAR = address (where), MDR = data (what) |
| Address bus direction | Address bus is UNIDIRECTIONAL (CPU→memory only) |
| Bus width = addressable space | n-bit address bus → 2^n addresses, NOT n addresses |
| Harvard vs Von Neumann | Harvard has SEPARATE buses for data and instructions |

## Machine Code / Assembly Traps

| Trap | Explanation |
|------|-------------|
| A-instruction bit 15 | Always 0 for A-instruction; if bit 15 is 1, it's C-instruction |
| @value loads A, not M | @17 sets A=17; to access RAM[17], use M after @17 |
| D=A vs D=M | D=A puts the address value in D; D=M puts memory CONTENTS in D |
| Jump uses ALU output | Jump condition checks the COMPUTED value, not D register |
| Forgetting @label before jump | Must set A to jump target before the jump instruction |

## Operating Systems Traps

| Trap | Explanation |
|------|-------------|
| FCFS vs SJF starvation | FCFS = no starvation; SJF = long processes starve |
| Page size vs frame size | They are ALWAYS equal |
| Usable hosts formula | 2^h - 2 (subtract network + broadcast), not 2^h |
| Virtual address vs physical | Same offset, different page/frame number |
| Context switch overhead | Saving/restoring ALL registers takes time -- it's not free |

## Networking Traps

| Trap | Explanation |
|------|-------------|
| OSI layer numbering | Physical = 1 (bottom), Application = 7 (top) |
| TCP vs UDP default | TCP = reliable but slower; DNS uses UDP (not TCP) for queries |
| 127.x.x.x | Loopback, NOT Class A usable address |
| Subnet broadcast | All host bits = 1 is broadcast, NOT usable host |
| CIDR /31 and /32 | /31 = 0 usable hosts (point-to-point link); /32 = single host |
| Switch vs Router | Switch = Layer 2 (MAC); Router = Layer 3 (IP) |
| Hub broadcasts everything | Hub = Layer 1, no intelligence, all ports receive all traffic |

## General Exam Tips

1. **Show working** -- partial marks come from method, not just answer
2. **Label everything** -- gates, signals, registers in diagrams
3. **Check bit widths** -- ensure binary numbers have correct number of bits
4. **Verify with test case** -- substitute known values to check Boolean simplification
5. **Read the question** -- "design using NAND only" means NO other gates
6. **State assumptions** -- e.g., "assuming rising-edge triggered"
