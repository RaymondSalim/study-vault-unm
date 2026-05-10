---
title: "Exam Strategy"
order: 93
moduleTitle: "COMP1030 - Systems & Architecture"
tags: ["exam-strategy", "revision", "time-management"]
---

# Exam Strategy

## Time Allocation

| Section | Suggested Time | Notes |
|---------|---------------|-------|
| Number systems & conversions | 20% | Quick calculations -- do these first for confidence |
| Boolean algebra & K-maps | 20% | Methodical; double-check groupings |
| Combinational circuits | 15% | Truth tables, MUX, adders |
| Sequential circuits | 15% | Flip-flops, counters, state diagrams |
| CPU architecture & assembly | 20% | HACK programs, fetch-decode-execute |
| Memory hierarchy | 10% | Cache calculations, locality |

## Topic Weighting

- **High weight:** Number systems (conversions, two's complement, IEEE 754), Boolean simplification, HACK assembly
- **Medium weight:** Combinational circuits (MUX, ALU), sequential circuits (flip-flops, FSMs), CPU datapath
- **Lower weight:** Memory hierarchy concepts (but still examinable)

## Question Types to Expect

1. **Conversion problems** -- decimal to binary, hex, two's complement, IEEE 754
2. **Boolean simplification** -- algebraic or K-map based
3. **Circuit analysis** -- given a circuit diagram, determine outputs or complete a truth table
4. **HACK assembly programming** -- write or trace short programs
5. **Datapath tracing** -- follow an instruction through the CPU components
6. **Cache calculations** -- hit/miss analysis, address breakdown

## Key Formulas to Memorise

- Two's complement range: $-2^{n-1}$ to $2^{n-1} - 1$
- IEEE 754: $(-1)^s \times 1.M \times 2^{E - \text{bias}}$, bias = 127 (single)
- Full adder: $S = A \oplus B \oplus C_{in}$, $C_{out} = AB + C_{in}(A \oplus B)$
- De Morgan's: $\overline{A+B} = \overline{A} \cdot \overline{B}$; $\overline{AB} = \overline{A} + \overline{B}$
- Cache: hit rate = hits / total accesses
- Number of cache lines = cache size / block size

## Night Before Checklist -- Top 10 Things to Review

1. Two's complement: negation process, range formula, overflow detection
2. IEEE 754 encoding and decoding (single precision)
3. De Morgan's theorems and Boolean simplification rules
4. K-map grouping rules (groups must be powers of 2, wrap around edges)
5. Full adder and ripple-carry adder operation
6. D flip-flop behaviour and edge triggering
7. HACK A-instruction and C-instruction formats
8. Fetch-decode-execute cycle steps
9. Cache address breakdown: tag, index, offset bits
10. Signed vs. unsigned overflow detection
