---
title: "Exam Traps & Common Mistakes"
order: 91
moduleTitle: "COMP1030 - Systems & Architecture"
tags: ["exam-tips", "common-mistakes", "pitfalls"]
---

## Number Systems

| Trap | Why it's wrong | Correct approach |
|------|---------------|-----------------|
| Forgetting +1 in two's complement negation | Invert alone gives one's complement | Invert ALL bits, THEN add 1 |
| Sign-extending with 0s for negative numbers | Loses the sign information | Replicate the MSB (sign bit) |
| Treating two's complement MSB as $+2^{n-1}$ | MSB has weight $-2^{n-1}$ | $V = -b_{n-1} \cdot 2^{n-1} + \ldots$ |
| Overflow = carry out | Carry out doesn't always mean overflow (for signed) | Overflow = $C_{in} \oplus C_{out}$ at MSB |
| Confusing unsigned overflow with signed | Different detection mechanisms | Unsigned: carry out. Signed: sign change |
| Wrong IEEE 754 bias | Using 128 instead of 127 for single | Bias = $2^{k-1} - 1$ (127 for 8-bit exponent) |
| Forgetting the implicit 1 in IEEE 754 | Mantissa stored without leading 1 | Value = $1.M$ (except denormals) |
| Reading binary remainders top-down | Gives reversed result | Read remainders **bottom-up** |

---

## Boolean Algebra

| Trap | Why it's wrong | Correct approach |
|------|---------------|-----------------|
| $\overline{A+B} = \overline{A} + \overline{B}$ | Wrong De Morgan's | $\overline{A+B} = \overline{A} \cdot \overline{B}$ |
| $\overline{AB} = \overline{A} \cdot \overline{B}$ | Wrong De Morgan's | $\overline{AB} = \overline{A} + \overline{B}$ |
| Distributing OR over AND incorrectly | $A + BC \neq (A+B) \cdot C$ | $A + BC = (A+B)(A+C)$ |
| K-map: non-power-of-2 groups | Groups of 3, 5, 6 are invalid | Groups must be 1, 2, 4, 8, 16... |
| K-map: forgetting wrap-around | Miss valid larger groups | Top↔Bottom and Left↔Right wrap |
| K-map: Gray code column order | Using 00, 01, 10, 11 | Must use 00, 01, 11, 10 (1-bit change) |
| Simplifying XOR to OR | $A \oplus B \neq A + B$ | $A \oplus B = A\overline{B} + \overline{A}B$ |

---

## Combinational Circuits

| Trap | Why it's wrong | Correct approach |
|------|---------------|-----------------|
| Full adder carry: $C_{out} = AB + AC_{in}$ | Missing a term | $C_{out} = AB + C_{in}(A \oplus B)$ or $AB + AC_{in} + BC_{in}$ |
| MUX select lines = data inputs | Confusing control with data | $n$ select lines → $2^n$ data inputs |
| Decoder: active-low outputs | Assuming all decoders are active-high | Check whether outputs are inverted |
| Forgetting propagation delay in ripple adder | Treating result as instant | Critical path = carry through all $n$ stages |

---

## Sequential Circuits

| Trap | Why it's wrong | Correct approach |
|------|---------------|-----------------|
| Latch vs flip-flop | Latch = level-triggered ≠ flip-flop = edge-triggered | Flip-flops only change at clock edge |
| SR: $S=R=1$ is valid | It's an **invalid/forbidden** state | Must ensure $SR = 0$ |
| JK: $J=K=1$ is invalid | Actually toggles (that's its advantage) | JK resolves SR's forbidden state |
| Ignoring setup/hold time | Data can change at any time | Data must be stable within the setup/hold window |
| $f_{max}$: forgetting $t_{setup}$ | Only counting propagation delay | $f_{max} = 1/(t_{clk-q} + t_{prop} + t_{setup})$ |
| Ripple counter: all bits change simultaneously | Bits change sequentially with delay | Ripple delay accumulates; use synchronous for speed |
| Moore output changes between clock edges | Moore outputs depend only on state | Moore outputs change only at clock edge |

---

## CPU & Pipelining

| Trap | Why it's wrong | Correct approach |
|------|---------------|-----------------|
| Pipeline speedup = number of stages always | Only true for infinite instructions | Speedup = $\frac{nk}{n+k-1}$ |
| Ignoring pipeline flush on branch | Instructions in pipeline are wrong | Branches cause 2-3 cycle penalty (flush or stall) |
| RAW hazard: no forwarding needed | Without forwarding, must stall | Check if EX result needed by next instruction's EX |
| PC increments after execute | PC increments during fetch | PC ← PC+4 happens in fetch stage |
| CPI = 1 for pipelined CPU always | Hazards increase CPI above 1 | Actual CPI = 1 + stall cycles per instruction |
| Confusing structural and data hazards | Both cause stalls but for different reasons | Structural = resource conflict; Data = dependency |

---

## Assembly

| Trap | Why it's wrong | Correct approach |
|------|---------------|-----------------|
| `CMP` stores result in register | CMP only sets flags | Result of $Rn - Op2$ is **discarded** |
| `BL` = unconditional jump | BL also saves return address in LR | Use `B` for plain jump, `BL` for subroutine call |
| Forgetting to save LR in nested calls | Inner `BL` overwrites LR | `PUSH {LR}` at function entry if calling other functions |
| Array offset = index | Each word is 4 bytes | Offset = index $\times$ 4 (for 32-bit words) |
| `LSL #1` = multiply by 1 | Shift left by 1 = multiply by 2 | `LSL #n` = multiply by $2^n$ |
| Stack grows upward | ARM stack grows **downward** | PUSH decreases SP; POP increases SP |
| `STR` loads from memory | STR = Store (register → memory) | LDR = Load (memory → register) |

---

## Memory

| Trap | Why it's wrong | Correct approach |
|------|---------------|-----------------|
| Direct-mapped = no misses for small working sets | Conflict misses occur even with free lines | Two addresses mapping to same line → thrashing |
| Higher associativity always better | More associativity = more comparison hardware + slower | Balance between hit rate and access time |
| AMAT = miss penalty | Must account for hit time | AMAT = $t_{hit} + \text{miss rate} \times t_{penalty}$ |
| Cache size = number of lines | Cache size = lines $\times$ block size | Don't forget to multiply by block size |
| Write-through is always slower | Only slower per-write; simpler consistency | Write-back has eviction penalty; depends on workload |
| Page size = frame size in TLB | They ARE the same | Page size always equals frame size |
| TLB miss = page fault | TLB miss → check page table. Page fault only if not in RAM | TLB miss just means translation not cached |

---

## General Exam Tips

1. **Show your working** - partial credit requires visible steps
2. **State your assumptions** - especially for ambiguous questions
3. **Check bit widths** - don't mix 8-bit and 16-bit values without sign extension
4. **Verify with extreme cases** - test your answer with 0, max positive, most negative
5. **Draw timing diagrams** - for sequential circuit questions, trace clock by clock
6. **Label everything** - signals, bits, directions in diagrams
7. **Read the question format** - binary, hex, or decimal answer expected?
8. **Double-check De Morgan's** - the most commonly mis-applied rule
