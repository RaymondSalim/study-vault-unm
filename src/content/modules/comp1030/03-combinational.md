---
title: "Combinational Circuits"
order: 3
moduleTitle: "COMP1030 - Systems & Architecture"
tags: ["combinational-circuits", "adders", "multiplexers", "decoders", "ALU"]
---

## Overview

Combinational circuits: output depends **only** on current inputs (no memory/state).

| Circuit | Function |
|---------|----------|
| Adder | Binary addition |
| Multiplexer | Select one of $2^n$ inputs |
| Decoder | Activate one of $2^n$ outputs |
| Encoder | Encode $2^n$ inputs into $n$-bit code |
| ALU | Arithmetic & logic operations |

---

## Half Adder

Adds two 1-bit numbers. No carry-in.

| $A$ | $B$ | Sum ($S$) | Carry ($C$) |
|-----|-----|-----------|-------------|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

$$S = A \oplus B$$
$$C = A \cdot B$$

---

## Full Adder

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

---

## Ripple Carry Adder

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

---

## Subtractor

Subtraction via two's complement addition:

$$A - B = A + \overline{B} + 1$$

Use an adder with:
- $B$ inputs inverted (XOR with control signal)
- $C_{in} = 1$

---

## Multiplexer (MUX)

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

---

## Decoder

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

---

## Encoder

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

---

## Arithmetic Logic Unit (ALU)

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
