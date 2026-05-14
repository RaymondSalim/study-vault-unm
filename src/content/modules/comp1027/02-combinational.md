---
title: "Combinational Circuits"
order: 2
moduleTitle: "COMP1027 - Computer Fundamentals"
tags: ["combinational", "adder", "ALU", "multiplexer", "decoder"]
---

## Key Principle

:::eli10

A combinational circuit is like a simple calculator: the answer depends only on what you type in right now. It has no memory of what you typed before. Press the same buttons, get the same answer every time.

:::

:::eli15

Combinational circuits produce outputs that depend solely on the current inputs -- they have no memory or state. Given the same inputs at any time, the output will always be the same. This contrasts with sequential circuits which have memory. Examples include adders, multiplexers, decoders, and ALUs.

:::

:::eli20

Output depends **only on current inputs** (no memory/state).

:::

## Half Adder

:::eli10

A half adder adds two single bits together. Just like adding two single-digit numbers: 0+0=0, 0+1=1, 1+0=1, but 1+1=10 in binary (which is 0 with a carry of 1). It uses XOR for the sum and AND for the carry.

:::

:::eli15

A half adder adds two 1-bit inputs (A, B) and produces a sum bit and a carry bit. The sum is A XOR B (1 when inputs differ) and the carry is A AND B (1 only when both inputs are 1). It is called "half" because it cannot handle an incoming carry from a previous addition -- that requires a full adder.

:::

:::eli20

| A | B | Sum | Carry |
|---|---|-----|-------|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

- **Sum = A XOR B**
- **Carry = A AND B**

:::

## Full Adder

:::eli10

A full adder is like a half adder but it can also handle a carry coming in from adding the previous column. It is like adding three single-digit numbers: two bits plus a carry-in. This is needed to chain adders together for multi-digit addition.

:::

:::eli15

A full adder adds three 1-bit inputs: A, B, and a carry-in (Cin) from a previous stage. It produces a sum (A XOR B XOR Cin) and a carry-out (Cout). The carry-out formula is (A AND B) OR (Cin AND (A XOR B)). Full adders can be chained to create n-bit adders by connecting each Cout to the next stage's Cin.

:::

:::eli20

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

:::

## Ripple-Carry Adder (n-bit)

:::eli10

A ripple-carry adder chains multiple full adders together, like doing long addition column by column. The carry "ripples" from the first column to the last. It is simple but slow for big numbers because each column has to wait for the previous carry.

:::

:::eli15

A ripple-carry adder connects n full adders in series to add two n-bit numbers. The carry-out of each stage feeds into the carry-in of the next stage. Setting the initial carry-in to 0 performs addition; setting it to 1 (with B inverted) performs subtraction via 2's complement. The main drawback is O(n) delay since each stage must wait for the previous carry to propagate.

:::

:::eli20

- Chain n full adders; Cout of bit i feeds Cin of bit i+1
- Cin of bit 0 = 0 (for addition) or 1 (for subtraction via 2's complement)
- **Delay**: O(n) -- each stage waits for previous carry

:::

## Arithmetic Logic Unit (ALU)

:::eli10

The ALU is the part of a computer that does math and logic. It can add, subtract, AND, and OR, depending on which operation you select. It also produces flags to say things like "the result was zero" or "the result was negative."

:::

:::eli15

The ALU is the computational core of a processor. Control bits select which operation to perform (typically AND, OR, ADD, SUB). It takes two data inputs and produces a result plus status flags: Zero (result is 0), Negative (result is negative), Overflow (signed overflow occurred), and Carry (unsigned overflow). Subtraction is implemented as addition with the second operand inverted and carry-in set to 1 (2's complement negation).

:::

:::eli20

| Control bits | Operation |
|-------------|-----------|
| 00 | AND |
| 01 | OR |
| 10 | ADD |
| 11 | SUB (add with inverted B, Cin=1) |

Flags produced: **Zero (Z)**, **Negative (N)**, **Overflow (V)**, **Carry (C)**

:::

## Multiplexer (MUX)

:::eli10

A multiplexer is like a TV channel selector. You have many channels (inputs) but only one screen (output). You use a selector to choose which channel to show. A 4-to-1 MUX picks one of 4 inputs using 2 select bits.

:::

:::eli15

A multiplexer selects one of several inputs and forwards it to a single output, controlled by select lines. With n select lines, you can choose from 2^n inputs. A 2:1 MUX uses 1 select line; a 4:1 MUX uses 2. Any boolean function of n variables can be implemented with a 2^n:1 MUX by connecting the function's truth table values to the data inputs and the variables to the select lines.

:::

:::eli20

Selects one of 2^n inputs using n select lines.

| Select lines | Inputs | Function |
|-------------|--------|----------|
| 1 (s) | 2 (I0, I1) | Out = s'.I0 + s.I1 |
| 2 (s1,s0) | 4 | Out = s1's0'.I0 + s1's0.I1 + s1.s0'.I2 + s1.s0.I3 |
| n | 2^n | General selection |

**Any Boolean function** of n variables can be implemented with a 2^n:1 MUX.

:::

## Demultiplexer (DEMUX)

:::eli10

A demultiplexer is the opposite of a multiplexer. Instead of choosing which input to show on one output, it takes one input and sends it to one of many outputs. It is like a mail sorter that directs a letter to one of many mailboxes.

:::

:::eli15

A demultiplexer routes a single input to one of 2^n outputs based on select lines. Only the selected output receives the input signal; all others are inactive. It is the inverse operation of a multiplexer and is often used for data distribution or addressing.

:::

:::eli20

Routes single input to one of 2^n outputs based on select lines.

:::

## Decoder

:::eli10

A decoder takes a binary number as input and turns on exactly one output wire. A 2-bit input can activate one of 4 outputs. It is like pressing a floor button in a lift -- only that specific floor lights up. Decoders are used to select memory locations.

:::

:::eli15

A decoder converts an n-bit binary input into exactly one active output out of 2^n possible outputs. For example, a 2-to-4 decoder takes 2 input bits and activates one of 4 output lines. Decoders are used for memory address decoding (selecting which memory chip to access), instruction decoding in CPUs, and can implement any boolean function when combined with OR gates.

:::

:::eli20

- n inputs -> 2^n outputs (exactly one output high at a time)
- **2-to-4 decoder**: outputs D0=A'B', D1=A'B, D2=AB', D3=AB
- Used for memory address decoding, instruction decoding

:::

## Encoder

:::eli10

An encoder does the opposite of a decoder: it takes many input lines (where only one should be active) and produces a binary number telling you which one is on. A priority encoder handles the case when multiple inputs are on by reporting the most important one.

:::

:::eli15

An encoder converts 2^n inputs to n output bits -- the reverse of a decoder. It assumes only one input is active and outputs its binary index. A priority encoder handles multiple active inputs by outputting the index of the highest-priority one (usually the highest-numbered active input). This is used in interrupt controllers and keyboard encoders.

:::

:::eli20

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

:::
