---
title: "Quick Reference"
order: 90
moduleTitle: "COMP1030 - Systems & Architecture"
tags: ["reference", "conversion-tables", "formulas", "cheat-sheet"]
---

## Number Conversion Tables

### Hex ↔ Binary ↔ Decimal

| Hex | Binary | Decimal |
|-----|--------|---------|
| 0 | 0000 | 0 |
| 1 | 0001 | 1 |
| 2 | 0010 | 2 |
| 3 | 0011 | 3 |
| 4 | 0100 | 4 |
| 5 | 0101 | 5 |
| 6 | 0110 | 6 |
| 7 | 0111 | 7 |
| 8 | 1000 | 8 |
| 9 | 1001 | 9 |
| A | 1010 | 10 |
| B | 1011 | 11 |
| C | 1100 | 12 |
| D | 1101 | 13 |
| E | 1110 | 14 |
| F | 1111 | 15 |

### Powers of 2

| $n$ | $2^n$ | $n$ | $2^n$ |
|-----|-------|-----|-------|
| 0 | 1 | 8 | 256 |
| 1 | 2 | 9 | 512 |
| 2 | 4 | 10 | 1,024 |
| 3 | 8 | 11 | 2,048 |
| 4 | 16 | 12 | 4,096 |
| 5 | 32 | 16 | 65,536 |
| 6 | 64 | 20 | 1,048,576 |
| 7 | 128 | 32 | 4,294,967,296 |

---

## Two's Complement Ranges

| Bits | Min | Max |
|------|-----|-----|
| 4 | -8 | +7 |
| 8 | -128 | +127 |
| 16 | -32,768 | +32,767 |
| 32 | -2,147,483,648 | +2,147,483,647 |

---

## Boolean Algebra Quick Reference

| Law | Expression |
|-----|-----------|
| De Morgan's | $\overline{AB} = \overline{A}+\overline{B}$ ; $\overline{A+B} = \overline{A}\cdot\overline{B}$ |
| Absorption | $A + AB = A$ ; $A(A+B) = A$ |
| Consensus | $AB + \overline{A}C + BC = AB + \overline{A}C$ |
| XOR | $A \oplus B = A\overline{B} + \overline{A}B$ |
| XNOR | $\overline{A \oplus B} = AB + \overline{A}\,\overline{B}$ |

---

## Gate Symbols (Text Representation)

```
AND:    A ──┐
            ├──D──── Y = A·B
        B ──┘

OR:     A ──┐
            ├──)──── Y = A+B
        B ──┘

NOT:    A ───>o──── Y = A'

NAND:   A ──┐
            ├──D>o── Y = (A·B)'
        B ──┘

NOR:    A ──┐
            ├──)>o── Y = (A+B)'
        B ──┘

XOR:    A ──┐
            ├=)──── Y = A⊕B
        B ──┘
```

---

## Adder Equations

| Circuit | Sum | Carry |
|---------|-----|-------|
| Half Adder | $S = A \oplus B$ | $C = AB$ |
| Full Adder | $S = A \oplus B \oplus C_{in}$ | $C_{out} = AB + C_{in}(A \oplus B)$ |

---

## Flip-Flop Characteristic Equations

| Type | $Q_{next}$ |
|------|-----------|
| D | $D$ |
| SR | $S + \overline{R}Q$ (constraint: $SR=0$) |
| JK | $J\overline{Q} + \overline{K}Q$ |
| T | $T \oplus Q$ |

---

## Pipeline Formulas

| Metric | Formula |
|--------|---------|
| Cycles (ideal) | $n + k - 1$ |
| Speedup (ideal) | $\frac{nk}{n+k-1}$ |
| Max speedup | $k$ (as $n \rightarrow \infty$) |
| Max clock freq | $\frac{1}{t_{clk-to-q} + t_{prop} + t_{setup}}$ |

---

## Memory Formulas

| Metric | Formula |
|--------|---------|
| AMAT | $t_{hit} + (\text{miss rate} \times t_{penalty})$ |
| Address bits: offset | $\log_2(\text{block size})$ |
| Address bits: index | $\log_2(\text{number of sets})$ |
| Address bits: tag | $\text{addr bits} - \text{index} - \text{offset}$ |
| Number of sets | $\frac{\text{cache size}}{\text{block size} \times \text{associativity}}$ |
| Page table entries | $2^{\text{VPN bits}}$ |

---

## Performance Formulas

| Metric | Formula |
|--------|---------|
| CPU Time | $\text{IC} \times \text{CPI} \times T_{cycle}$ |
| CPI | $\frac{\text{Cycles}}{\text{Instructions}}$ |
| MIPS | $\frac{f_{clock}}{\text{CPI} \times 10^6}$ |
| Amdahl's Law | $S = \frac{1}{(1-f) + \frac{f}{p}}$ |

---

## IEEE 754 Summary

| | Single (32-bit) | Double (64-bit) |
|---|----------------|-----------------|
| Sign | 1 bit | 1 bit |
| Exponent | 8 bits, bias 127 | 11 bits, bias 1023 |
| Mantissa | 23 bits | 52 bits |
| Formula | $(-1)^s \times 1.M \times 2^{E-127}$ | $(-1)^s \times 1.M \times 2^{E-1023}$ |

---

## ARM Assembly Quick Reference

| Instruction | Meaning |
|------------|---------|
| `MOV Rd, Op2` | Rd = Op2 |
| `ADD Rd, Rn, Op2` | Rd = Rn + Op2 |
| `SUB Rd, Rn, Op2` | Rd = Rn - Op2 |
| `CMP Rn, Op2` | Set flags for Rn - Op2 |
| `LDR Rd, [Rn]` | Rd = Mem[Rn] |
| `STR Rd, [Rn]` | Mem[Rn] = Rd |
| `B label` | Branch always |
| `BEQ label` | Branch if Z=1 |
| `BNE label` | Branch if Z=0 |
| `BL label` | Branch with Link |
| `PUSH {regs}` | Save to stack |
| `POP {regs}` | Restore from stack |

---

## Condition Codes

| Code | Meaning | Flags |
|------|---------|-------|
| EQ | Equal | Z=1 |
| NE | Not equal | Z=0 |
| GT | Signed > | Z=0, N=V |
| LT | Signed < | N$\neq$V |
| GE | Signed >= | N=V |
| LE | Signed <= | Z=1 or N$\neq$V |
| HI | Unsigned > | C=1, Z=0 |
| LO/CC | Unsigned < | C=0 |
| HS/CS | Unsigned >= | C=1 |
