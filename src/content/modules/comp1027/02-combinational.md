---
title: "Combinational Circuits"
order: 2
moduleTitle: "COMP1027 - Computer Fundamentals"
tags: ["combinational", "adder", "ALU", "multiplexer", "decoder"]
---

## Key Principle

Output depends **only on current inputs** (no memory/state).

## Half Adder

| A | B | Sum | Carry |
|---|---|-----|-------|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

- **Sum = A XOR B**
- **Carry = A AND B**

## Full Adder

| A | B | Cin | Sum | Cout |
|---|---|-----|-----|------|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 | 1 |

- **Sum = A XOR B XOR Cin**
- **Cout = (A AND B) OR (Cin AND (A XOR B))**

## Ripple-Carry Adder (n-bit)

- Chain n full adders; Cout of bit i feeds Cin of bit i+1
- Cin of bit 0 = 0 (for addition) or 1 (for subtraction via 2's complement)
- **Delay**: O(n) -- each stage waits for previous carry

## Arithmetic Logic Unit (ALU)

| Control bits | Operation |
|-------------|-----------|
| 00 | AND |
| 01 | OR |
| 10 | ADD |
| 11 | SUB (add with inverted B, Cin=1) |

Flags produced: **Zero (Z)**, **Negative (N)**, **Overflow (V)**, **Carry (C)**

## Multiplexer (MUX)

Selects one of 2^n inputs using n select lines.

| Select lines | Inputs | Function |
|-------------|--------|----------|
| 1 (s) | 2 (I0, I1) | Out = s'.I0 + s.I1 |
| 2 (s1,s0) | 4 | Out = s1's0'.I0 + s1's0.I1 + s1.s0'.I2 + s1.s0.I3 |
| n | 2^n | General selection |

**Any Boolean function** of n variables can be implemented with a 2^n:1 MUX.

## Demultiplexer (DEMUX)

Routes single input to one of 2^n outputs based on select lines.

## Decoder

- n inputs -> 2^n outputs (exactly one output high at a time)
- **2-to-4 decoder**: outputs D0=A'B', D1=A'B, D2=AB', D3=AB
- Used for memory address decoding, instruction decoding

## Encoder

- 2^n inputs -> n outputs (inverse of decoder)
- Priority encoder: handles multiple active inputs, outputs highest priority

<details>
<summary>Practice: Build a 4-bit subtractor from full adders</summary>

To compute A - B:
1. Invert all bits of B (using NOT gates)
2. Chain 4 full adders as a ripple-carry adder
3. Set Cin of the least significant bit to 1

This computes A + B' + 1 = A + (-B) in 2's complement.
</details>

<details>
<summary>Practice: Implement F(A,B,C) = Σm(1,2,6,7) using an 8:1 MUX</summary>

Connect A, B, C to select lines s2, s1, s0 respectively.

Tie inputs: I0=0, I1=1, I2=1, I3=0, I4=0, I5=0, I6=1, I7=1

Each Ii corresponds to minterm i. Set Ii=1 if minterm i is in the function.
</details>

<details>
<summary>Practice: How many 2:4 decoders needed for a 4:16 decoder?</summary>

Use a **tree structure**: 1 decoder for the 2 MSBs (generates 4 enable signals) + 4 decoders for 2 LSBs (one enabled at a time).

Total: **5** decoders (1 + 4).
</details>
