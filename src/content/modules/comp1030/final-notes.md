---
title: "Final Notes (Cheat Sheet)"
order: 97
moduleTitle: "COMP1030 - Systems & Architecture"
tags: ["exam", "cheat-sheet", "final-notes"]
---

<style>
@media print {
  .print-btn, .prev-next, .module-nav, .global-nav, nav, .mobile-menu-btn, .sidebar-overlay, .search-modal {
    display: none !important;
  }
  .module-wrapper {
    display: block !important;
  }
  .module-content {
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    columns: 2;
    column-gap: 1.5em;
    font-size: 8pt;
    line-height: 1.25;
    color: #000;
  }
  .module-content h2 {
    font-size: 11pt;
    margin: 0.3em 0 0.15em;
    border-bottom: 1.5px solid #000;
    column-span: all;
    break-after: avoid;
  }
  .module-content h3 {
    font-size: 9pt;
    margin: 0.3em 0 0.1em;
    break-after: avoid;
  }
  .module-content table {
    border-collapse: collapse;
    width: 100%;
    margin: 0.2em 0;
    font-size: 7.5pt;
  }
  .module-content th, .module-content td {
    border: 1px solid #999;
    padding: 1px 3px;
    text-align: left;
  }
  .module-content th {
    background: #eee !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content hr {
    margin: 0.3em 0;
    border: none;
    border-top: 1px dashed #999;
  }
  .module-content ul, .module-content ol {
    margin: 0.15em 0;
    padding-left: 1.1em;
  }
  .module-content li {
    margin: 0.05em 0;
  }
  .module-content p {
    margin: 0.15em 0;
  }
  .module-content code {
    font-size: 7pt;
    background: #f0f0f0;
    padding: 0.5px 2px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content .katex {
    font-size: 0.9em;
  }
  @page {
    size: A4;
    margin: 0.8cm;
  }
}
</style>

<button class="print-btn" onclick="window.print()" style="background:#7aa2f7;color:#1a1b26;border:none;padding:0.5em 1.2em;border-radius:6px;cursor:pointer;font-weight:600;margin-bottom:1em;font-size:0.9rem;">Print Cheat Sheet</button>

## SIDE 1: NUMBER SYSTEMS, BOOLEAN ALGEBRA & CIRCUITS

### Number Systems — Base Conversion

| From → To | Method |
|-----------|--------|
| Dec → Bin | Repeated division by 2, read remainders bottom-up |
| Bin → Dec | $\sum b_i \times 2^i$ |
| Bin → Hex | Group 4 bits from right |
| Hex → Bin | Expand each hex digit to 4 bits |

**Powers of 2:** 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024 ($2^0$ to $2^{10}$)

---

### Two's Complement (Signed Integers)

**Range ($n$ bits):** $-2^{n-1}$ to $+2^{n-1}-1$ (8-bit: $-128$ to $+127$)

**Negation:** Invert all bits, add 1: $-x = \overline{x} + 1$

**Value:** $V = -b_{n-1} \cdot 2^{n-1} + \sum_{i=0}^{n-2} b_i \cdot 2^i$

**Sign extension:** Replicate MSB into new positions

**Overflow detection (signed):** Two same-sign operands produce opposite-sign result. Formally: $C_{in} \oplus C_{out}$ at MSB.

**Subtraction:** $A - B = A + \overline{B} + 1$

---

### IEEE 754 Floating Point (Single Precision)

| Sign | Exponent | Mantissa |
|------|----------|----------|
| 1 bit | 8 bits (bias 127) | 23 bits |

$$\text{Value} = (-1)^s \times 1.M \times 2^{E-127}$$

**Special values:** Exp=0, Mant=0 → $\pm 0$ | Exp=255, Mant=0 → $\pm\infty$ | Exp=255, Mant$\neq$0 → NaN | Exp=0, Mant$\neq$0 → denormalised

**Conversion steps:** (1) Sign bit, (2) Convert to binary scientific notation $1.xxx \times 2^n$, (3) Exponent = $n + 127$, (4) Mantissa = fractional bits after the implicit 1

---

### Boolean Algebra Laws

| Law | AND form | OR form |
|-----|----------|---------|
| Identity | $A \cdot 1 = A$ | $A + 0 = A$ |
| Null | $A \cdot 0 = 0$ | $A + 1 = 1$ |
| Complement | $A \cdot \overline{A} = 0$ | $A + \overline{A} = 1$ |
| Idempotent | $A \cdot A = A$ | $A + A = A$ |
| Absorption | $A(A+B) = A$ | $A + AB = A$ |
| **De Morgan's** | $\overline{AB} = \overline{A} + \overline{B}$ | $\overline{A+B} = \overline{A} \cdot \overline{B}$ |
| Distributive | $A(B+C) = AB+AC$ | $A+BC = (A+B)(A+C)$ |

---

### Logic Gates

| Gate | Expression | Output=1 when... |
|------|-----------|------------------|
| AND | $A \cdot B$ | Both 1 |
| OR | $A + B$ | At least one 1 |
| NOT | $\overline{A}$ | Input is 0 |
| NAND | $\overline{AB}$ | Not both 1 (universal gate) |
| NOR | $\overline{A+B}$ | Both 0 (universal gate) |
| XOR | $A \oplus B$ | Inputs differ |

---

### K-Map Rules

- Groups must be powers of 2 (1, 2, 4, 8)
- Groups may wrap around edges
- Column order: Gray code (00, 01, 11, 10)
- Maximise group size; minimise number of groups
- Variables constant in group stay; changing variables eliminated

---

### Combinational Circuits

**Half Adder:** $S = A \oplus B$, $C = A \cdot B$

**Full Adder:** $S = A \oplus B \oplus C_{in}$, $C_{out} = AB + C_{in}(A \oplus B)$

**Ripple Carry Adder:** Chain $n$ full adders; delay $O(n)$. Critical path = $2n$ gate delays.

**Carry Lookahead:** $G_i = A_i B_i$, $P_i = A_i \oplus B_i$, $C_{i+1} = G_i + P_i C_i$. Delay $O(\log n)$.

**MUX:** $2^n$-to-1 MUX uses $n$ select lines. 2-to-1: $Y = \overline{S} \cdot I_0 + S \cdot I_1$

**Decoder:** $n$-to-$2^n$ — activates exactly one output. Can implement any SOP with OR gate on minterm outputs.

**ALU flags:** Z (zero), N (negative), C (carry), V (signed overflow)

---

## SIDE 2: SEQUENTIAL, CPU, ASSEMBLY & MEMORY

### Sequential Circuits

| Type | Trigger | Characteristic Eq. | Use |
|------|---------|-------------------|-----|
| SR Latch | Level | $Q_{next} = S + \overline{R}Q$, $SR=0$ | Basic storage |
| D Flip-Flop | Edge | $Q_{next} = D$ | Registers |
| JK Flip-Flop | Edge | $Q_{next} = J\overline{Q} + \overline{K}Q$ | Versatile |
| T Flip-Flop | Edge | $Q_{next} = T \oplus Q$ | Counters |

**Key:** SR: S=R=1 invalid | JK: J=K=1 toggles | D from T: connect $D = T \oplus Q$

**Timing:** $f_{max} = \frac{1}{t_{clk\text{-}to\text{-}q} + t_{prop} + t_{setup}}$

**Counters:** Ripple (async, delay accumulates) vs Synchronous (shared clock, faster). Binary up: $T_i = Q_0 \cdot Q_1 \cdots Q_{i-1}$.

**FSMs:** Moore (output = f(state)) vs Mealy (output = f(state, input)). Design: state diagram → state table → K-map → flip-flop implementation.

---

### CPU Architecture

**Von Neumann:** Shared memory for instructions & data → bottleneck. Harvard: separate.

**Registers:** PC (next instruction addr), IR (current instruction), MAR/MDR (memory interface), ACC, SP, Flags

**Fetch-Decode-Execute:**
1. Fetch: MAR←PC, MDR←Mem[MAR], IR←MDR, PC←PC+1
2. Decode: Control unit interprets opcode, identifies operands
3. Execute: ALU computes / memory access / branch taken

**RISC vs CISC:** RISC = simple fixed-length, load/store, many registers, easy pipelining. CISC = complex variable-length, memory operands, fewer registers.

**Addressing modes:** Immediate (#5), Register (R2), Direct ([0x100]), Indirect ([R2]), Indexed ([R2+#4]), PC-relative

---

### Pipelining (5-stage: IF → ID → EX → MEM → WB)

**Speedup:** $S = \frac{n \cdot k}{n + k - 1} \approx k$ for large $n$ ($k$ = stages, $n$ = instructions)

| Hazard | Cause | Solution |
|--------|-------|----------|
| Structural | Resource conflict | Duplicate hardware |
| Data (RAW) | Need result not yet written | Forwarding / stall |
| Control | Branch invalidates pipeline | Prediction / flush |

**Amdahl's Law:** $S = \frac{1}{(1-f) + f/p}$ where $f$ = fraction improved, $p$ = speedup factor

---

### ARM Assembly

| Instruction | Operation |
|------------|-----------|
| `ADD Rd, Rn, Op2` | Rd = Rn + Op2 |
| `SUB Rd, Rn, Op2` | Rd = Rn - Op2 |
| `AND/ORR/EOR` | Bitwise logic |
| `LSL/LSR/ASR #n` | Shift (multiply/divide by $2^n$) |
| `MOV Rd, Op2` | Rd = Op2 |
| `LDR Rd, [Rn, #off]` | Load: Rd = Mem[Rn+off] |
| `STR Rd, [Rn, #off]` | Store: Mem[Rn+off] = Rd |
| `CMP Rn, Op2` | Set flags (Rn - Op2, discard result) |
| `B/BEQ/BNE/BGT/BLT` | Branch (conditional on flags) |
| `BL label` | Call subroutine (saves return in LR) |
| `PUSH {regs}` | Save to stack (SP decreases) |
| `POP {regs}` | Restore from stack (SP increases) |

**Condition flags:** Z (zero), N (negative), C (carry), V (overflow)

**Calling convention:** Args in R0-R3, return in R0, save LR if nested, stack grows downward

**Array access:** offset = index $\times$ 4 (for 32-bit words): `LSL R2, R1, #2` then `LDR R3, [R0, R2]`

---

### Memory Hierarchy

| Level | Technology | Size | Speed |
|-------|-----------|------|-------|
| Registers | Flip-flops | ~bytes | < 1 ns |
| L1 Cache | SRAM | 32-64 KB | 1-2 ns |
| L2/L3 Cache | SRAM | 256 KB-32 MB | 3-30 ns |
| Main Memory | DRAM | 4-64 GB | 50-100 ns |
| Disk/SSD | Flash/Magnetic | TB | $\mu$s-ms |

**Locality:** Temporal (reuse soon) + Spatial (nearby reuse)

**AMAT** $= t_{hit} + \text{miss rate} \times t_{miss\ penalty}$

**Cache address:** `| Tag | Index (s bits) | Offset (b bits) |` where sets = $2^s$, block = $2^b$ bytes

| Mapping | Description | Conflict misses |
|---------|-------------|-----------------|
| Direct-mapped | 1 line per set | High |
| $n$-way set-associative | $n$ lines per set | Medium |
| Fully associative | 1 set (all lines) | None |

**3 Cs of misses:** Compulsory (first access), Capacity (cache too small), Conflict (set full)

**Write policies:** Write-through (update memory immediately) vs Write-back (update on eviction, needs dirty bit)

**SRAM:** Fast, expensive, no refresh (cache) | **DRAM:** Slow, cheap, needs refresh (main memory)

**Virtual memory:** Page table maps virtual page → physical frame. TLB caches translations. Page fault = page not in RAM → load from disk.

---

### Key Traps

| Trap | Fix |
|------|-----|
| Two's comp: forget +1 after invert | Always: invert then add 1 |
| IEEE 754 bias = 128 | Bias = $2^{k-1}-1$ = 127 |
| IEEE 754: forget implicit 1 | Value = $1.M$, not $0.M$ |
| De Morgan's: $\overline{A+B} = \overline{A}+\overline{B}$ | Break bar: change op, invert each |
| K-map groups of 3 or 5 | Must be powers of 2 |
| SR latch: S=R=1 valid | It is INVALID |
| CMP stores result | CMP only sets flags |
| LSL #1 = multiply by 1 | LSL #n = multiply by $2^n$ |
| Array offset = index | Offset = index $\times$ element size |
| Overflow = carry out | Only for unsigned; signed uses V flag |
