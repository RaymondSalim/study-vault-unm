---
title: "Combinational Circuits"
order: 3
moduleTitle: "COMP1030 - Systems & Architecture"
tags: ["combinational-circuits", "adders", "multiplexers", "decoders", "ALU"]
---

## Overview

:::eli10

Combinational circuits are like calculators -- they take inputs and immediately produce an output without remembering anything. They have no memory. An adder adds numbers, a multiplexer picks one input from many (like a TV channel selector), and a decoder activates one specific output (like pressing a floor button in an elevator).

:::

:::eli15

Combinational circuits produce outputs based solely on current inputs (no memory or state). Key circuits: adders (binary addition), multiplexers (select one of many inputs using control signals), decoders (activate one output line based on a binary input), and the ALU (combines arithmetic and logic operations). These build up from basic logic gates and form the computational core of a CPU.

:::

:::eli20

Combinational circuits: output depends **only** on current inputs (no memory/state).

| Circuit | Function |
|---------|----------|
| Adder | Binary addition |
| Multiplexer | Select one of $2^n$ inputs |
| Decoder | Activate one of $2^n$ outputs |
| Encoder | Encode $2^n$ inputs into $n$-bit code |
| ALU | Arithmetic & logic operations |

:::

---

## Half Adder

:::eli10

A half adder adds two single bits together. 0+0=0, 0+1=1, 1+0=1, and 1+1=10 (which is 0 with a carry of 1). It uses an XOR gate for the sum and an AND gate for the carry.

:::

:::eli15

A half adder adds two 1-bit inputs producing a sum and a carry. Sum = A XOR B (is 1 when inputs differ), Carry = A AND B (is 1 only when both inputs are 1). It cannot handle a carry-in from a previous stage, which is why the full adder is needed for multi-bit addition.

:::

:::eli20

Adds two 1-bit numbers. No carry-in.

| $A$ | $B$ | Sum ($S$) | Carry ($C$) |
|-----|-----|-----------|-------------|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

$$S = A \oplus B$$
$$C = A \cdot B$$

:::

---

## Full Adder

:::eli10

A full adder is like a half adder but it can also handle a carry from the previous column -- just like how you carry the 1 when adding 7+5 in decimal. It has three inputs (two bits plus carry-in) and two outputs (sum and carry-out).

:::

:::eli15

A full adder extends the half adder by accepting a carry-in from a previous stage. Sum = A XOR B XOR Cin (odd number of 1s), Carry-out = AB + Cin(A XOR B) (carry generated or propagated). A full adder can be built from two half adders plus an OR gate. Chaining n full adders creates an n-bit ripple carry adder.

:::

:::eli20

Adds two 1-bit numbers plus carry-in ($C_{in}$).

| $A$ | $B$ | $C_{in}$ | Sum ($S$) | $C_{out}$ |
|-----|-----|----------|-----------|-----------|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 | 1 |

$$S = A \oplus B \oplus C_{in}$$
$$C_{out} = AB + C_{in}(A \oplus B)$$

A full adder = 2 half adders + 1 OR gate.

:::

---

## Ripple Carry Adder

:::eli10

A ripple carry adder chains full adders together, like a row of dominoes. The carry from one column "ripples" to the next. Simple but slow for big numbers because each column waits for the previous carry. Faster adders (like carry lookahead) calculate all carries at once.

:::

:::eli15

A ripple carry adder chains n full adders, connecting each carry-out to the next carry-in. Simple but slow: O(n) delay because the carry must propagate through all stages serially. The critical path is 2n gate delays. Faster alternatives include carry lookahead (O(log n) delay, precomputes carries in parallel using Generate and Propagate signals) and carry select (O(sqrt(n)), computes both carry assumptions in parallel).

:::

:::eli20

Chain $n$ full adders: $C_{out}$ of stage $i$ feeds $C_{in}$ of stage $i+1$.

| Property | Value |
|----------|-------|
| Width | $n$ bits |
| Gate delay | $O(n)$ — carry ripples through all stages |
| Critical path | $2n$ gate delays (2 per full adder for carry) |

**Limitation:** Slow for large $n$ due to carry propagation.

### Faster Alternatives

| Adder Type | Delay | Trade-off |
|------------|-------|-----------|
| Ripple Carry | $O(n)$ | Simple, small area |
| Carry Lookahead | $O(\log n)$ | Faster, more hardware |
| Carry Select | $O(\sqrt{n})$ | Moderate speed/area |

### Carry Lookahead

Generate: $G_i = A_i \cdot B_i$ (carry generated at stage $i$)
Propagate: $P_i = A_i \oplus B_i$ (carry propagated through stage $i$)

$$C_{i+1} = G_i + P_i \cdot C_i$$

Expanded (no ripple):
$$C_1 = G_0 + P_0 C_0$$
$$C_2 = G_1 + P_1 G_0 + P_1 P_0 C_0$$
$$C_3 = G_2 + P_2 G_1 + P_2 P_1 G_0 + P_2 P_1 P_0 C_0$$

:::

---

## Subtractor

:::eli10

To subtract in binary, you don't need a separate subtractor circuit. You just flip the bits of the number you're subtracting (invert them), add 1, and then add normally. That's the two's complement trick -- subtraction becomes addition.

:::

:::eli15

Hardware subtraction uses the two's complement identity: A - B = A + NOT(B) + 1. The same adder circuit can subtract by XOR-ing the B inputs with a control signal (to invert them) and setting carry-in to 1. This means one adder/subtractor circuit handles both operations, controlled by a single signal.

:::

:::eli20

Subtraction via two's complement addition:

$$A - B = A + \overline{B} + 1$$

Use an adder with:
- $B$ inputs inverted (XOR with control signal)
- $C_{in} = 1$

:::

---

## Multiplexer (MUX)

:::eli10

A multiplexer is like a TV remote with a channel selector. You have many channels (inputs) but only watch one at a time. The select buttons (select lines) choose which input comes through to the output. A 4-to-1 MUX picks one of 4 inputs using 2 select lines.

:::

:::eli15

A multiplexer (MUX) routes one of 2^n data inputs to a single output, controlled by n select lines. A 2-to-1 MUX uses 1 select bit, a 4-to-1 uses 2, an 8-to-1 uses 3, etc. Key insight: any boolean function of n variables can be implemented with a 2^n-to-1 MUX by connecting the data inputs to 0 or 1 according to the truth table. Larger MUXes are built from trees of smaller ones.

:::

:::eli20

A $2^n$-to-1 MUX selects one of $2^n$ data inputs using $n$ select lines.

### 2-to-1 MUX

$$Y = \overline{S} \cdot I_0 + S \cdot I_1$$

| $S$ | $Y$ |
|-----|-----|
| 0 | $I_0$ |
| 1 | $I_1$ |

### 4-to-1 MUX

$$Y = \overline{S_1}\,\overline{S_0} \cdot I_0 + \overline{S_1}\,S_0 \cdot I_1 + S_1\,\overline{S_0} \cdot I_2 + S_1\,S_0 \cdot I_3$$

**Key insight:** Any Boolean function of $n$ variables can be implemented with a $2^n$-to-1 MUX by connecting inputs to 0 or 1 appropriately.

:::

---

## Decoder

:::eli10

A decoder is like an elevator button panel. You press a binary number (the input), and exactly one floor lights up (one output becomes active). A 2-to-4 decoder takes a 2-bit number (0-3) and activates one of four output lines.

:::

:::eli15

A decoder converts an n-bit binary input into 2^n output lines, activating exactly one (the one corresponding to the input value). A 2-to-4 decoder activates output D0 for input 00, D1 for 01, D2 for 10, D3 for 11. Decoders can implement any SOP function: connect the decoder outputs corresponding to minterms to an OR gate. Decoders are used in memory address selection and instruction decoding.

:::

:::eli20

An $n$-to-$2^n$ decoder activates exactly one output line.

### 2-to-4 Decoder

| $A_1$ | $A_0$ | $D_0$ | $D_1$ | $D_2$ | $D_3$ |
|-------|-------|-------|-------|-------|-------|
| 0 | 0 | 1 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 0 | 0 |
| 1 | 0 | 0 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 | 0 | 1 |

$$D_i = 1 \text{ when input} = i$$

**Application:** A decoder + OR gates can implement any SOP function (each minterm is one decoder output).

:::

---

## Encoder

:::eli10

An encoder does the opposite of a decoder. If one of many buttons is pressed, the encoder tells you WHICH one by outputting its number in binary. A priority encoder handles the case when multiple buttons are pressed at once -- the highest-numbered one wins.

:::

:::eli15

An encoder is the inverse of a decoder: it converts 2^n input lines into an n-bit binary output indicating which input is active. A priority encoder handles multiple active inputs by encoding the highest-priority one, with a "valid" output indicating whether any input is active at all. Used in interrupt controllers and keyboard encoders.

:::

:::eli20

Inverse of decoder: $2^n$ inputs → $n$-bit output (encodes which input is active).

### Priority Encoder

When multiple inputs are active, the highest-priority input wins.

| Inputs ($I_3 I_2 I_1 I_0$) | Output ($A_1 A_0$) | Valid |
|---------------------------|-------------------|-------|
| 0001 | 00 | 1 |
| 001x | 01 | 1 |
| 01xx | 10 | 1 |
| 1xxx | 11 | 1 |
| 0000 | xx | 0 |

:::

---

## Arithmetic Logic Unit (ALU)

:::eli10

The ALU is the brain of the CPU -- it does all the math and logic. It takes two numbers and a control code that says what operation to perform (add, subtract, AND, OR, etc.). It also raises flags like "the answer is zero" or "there was an overflow."

:::

:::eli15

The ALU combines multiple operations (addition, subtraction, AND, OR, comparison) into one circuit, selected by control signals. It takes two operands and produces a result plus status flags: Zero (result is 0), Negative (MSB is 1), Carry (unsigned overflow), and Overflow (signed overflow). The CPU's control unit sets the ALU's operation code based on the current instruction.

:::

:::eli20

Combines arithmetic and logic operations, selected by control signals.

| Control ($F$) | Operation | Description |
|--------------|-----------|-------------|
| 000 | $A$ AND $B$ | Bitwise AND |
| 001 | $A$ OR $B$ | Bitwise OR |
| 010 | $A + B$ | Addition |
| 011 | — | (unused) |
| 100 | $A$ AND $\overline{B}$ | — |
| 101 | $A$ OR $\overline{B}$ | — |
| 110 | $A - B$ | Subtraction |
| 111 | SLT | Set on less than |

**Status flags:**

| Flag | Meaning |
|------|---------|
| Z (Zero) | Result is 0 |
| N (Negative) | Result MSB is 1 |
| C (Carry) | Carry out of MSB |
| V (Overflow) | Signed overflow detected |

---

## Practice

<details>
<summary>Design a 4-bit ripple carry adder: how many full adders needed? What is the worst-case delay?</summary>

- **4 full adders** chained together
- Worst-case delay: carry propagates through all 4 stages
- If each full adder carry delay = 2 gate delays → worst case = $2 \times 4 = 8$ gate delays for carry, plus 1 XOR for final sum = 9 gate delays total
</details>

<details>
<summary>Implement $F(A,B,C) = \sum m(1,2,6,7)$ using a 3-to-8 decoder and OR gate</summary>

1. Use a 3-to-8 decoder with inputs $A, B, C$
2. Connect outputs $D_1, D_2, D_6, D_7$ to a 4-input OR gate
3. $F = D_1 + D_2 + D_6 + D_7$
</details>

<details>
<summary>How would you implement a 4-to-1 MUX using 2-to-1 MUXes?</summary>

Use 3 MUXes in a tree:
1. MUX1: selects between $I_0$ and $I_1$ using $S_0$ → output $W_0$
2. MUX2: selects between $I_2$ and $I_3$ using $S_0$ → output $W_1$
3. MUX3: selects between $W_0$ and $W_1$ using $S_1$ → final output $Y$
</details>

<details>
<summary>Compute the Generate and Propagate signals for bit position where $A_i=1, B_i=1$</summary>

- $G_i = A_i \cdot B_i = 1 \cdot 1 = 1$ (carry generated regardless of $C_i$)
- $P_i = A_i \oplus B_i = 1 \oplus 1 = 0$ (carry not propagated)

Since $G_i = 1$, a carry-out is guaranteed at this position.
</details>

:::
