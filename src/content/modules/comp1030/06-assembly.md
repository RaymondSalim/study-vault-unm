---
title: "Assembly Language Basics"
order: 6
moduleTitle: "COMP1030 - Systems & Architecture"
tags: ["assembly", "instruction-set", "stack", "subroutines", "ARM"]
---

## Assembly vs Machine Code

| Level | Representation | Example |
|-------|---------------|---------|
| High-level | Human-readable | `x = a + b` |
| Assembly | Mnemonic instructions | `ADD R0, R1, R2` |
| Machine code | Binary encoding | `1110 0000 1000 ...` |

**Assembler:** Translates assembly → machine code (1-to-1 mapping).

---

## Instruction Categories

| Category | Operations | Examples |
|----------|-----------|----------|
| Arithmetic | Add, subtract, multiply | `ADD`, `SUB`, `MUL` |
| Logic | AND, OR, XOR, NOT, shifts | `AND`, `ORR`, `EOR`, `LSL` |
| Data transfer | Load/Store, Move | `LDR`, `STR`, `MOV` |
| Branch/Control | Jump, conditional branch | `B`, `BEQ`, `BNE`, `BL` |
| Comparison | Compare, test | `CMP`, `TST` |
| Stack | Push, pop | `PUSH`, `POP` |

---

## ARM-style Assembly (Common in COMP1030)

### Data Processing

| Instruction | Meaning | Operation |
|------------|---------|-----------|
| `ADD Rd, Rn, Op2` | Add | $Rd = Rn + Op2$ |
| `SUB Rd, Rn, Op2` | Subtract | $Rd = Rn - Op2$ |
| `MUL Rd, Rn, Rm` | Multiply | $Rd = Rn \times Rm$ |
| `AND Rd, Rn, Op2` | Bitwise AND | $Rd = Rn\ \&\ Op2$ |
| `ORR Rd, Rn, Op2` | Bitwise OR | $Rd = Rn\ |\ Op2$ |
| `EOR Rd, Rn, Op2` | Bitwise XOR | $Rd = Rn \oplus Op2$ |
| `MVN Rd, Op2` | Move NOT | $Rd = \sim Op2$ |
| `MOV Rd, Op2` | Move | $Rd = Op2$ |
| `LSL Rd, Rn, #n` | Logical shift left | $Rd = Rn \ll n$ |
| `LSR Rd, Rn, #n` | Logical shift right | $Rd = Rn \gg n$ (zero fill) |
| `ASR Rd, Rn, #n` | Arithmetic shift right | $Rd = Rn \gg n$ (sign extend) |

### Memory Access

| Instruction | Meaning | Operation |
|------------|---------|-----------|
| `LDR Rd, [Rn]` | Load word | $Rd = \text{Mem}[Rn]$ |
| `LDR Rd, [Rn, #offset]` | Load with offset | $Rd = \text{Mem}[Rn + \text{offset}]$ |
| `STR Rd, [Rn]` | Store word | $\text{Mem}[Rn] = Rd$ |
| `STR Rd, [Rn, #offset]` | Store with offset | $\text{Mem}[Rn + \text{offset}] = Rd$ |

### Comparison & Branches

| Instruction | Meaning |
|------------|---------|
| `CMP Rn, Op2` | Set flags based on $Rn - Op2$ (result discarded) |
| `TST Rn, Op2` | Set flags based on $Rn\ \&\ Op2$ |
| `B label` | Unconditional branch |
| `BEQ label` | Branch if Z=1 (equal) |
| `BNE label` | Branch if Z=0 (not equal) |
| `BGT label` | Branch if greater than (signed) |
| `BLT label` | Branch if less than (signed) |
| `BGE label` | Branch if greater or equal |
| `BLE label` | Branch if less or equal |
| `BL label` | Branch with Link (save return address in LR) |

---

## Condition Flags

Set by `CMP`, `TST`, or any instruction with `S` suffix (e.g., `ADDS`).

| Flag | Name | Set when |
|------|------|----------|
| Z | Zero | Result = 0 |
| N | Negative | Result MSB = 1 |
| C | Carry | Unsigned overflow / borrow |
| V | Overflow | Signed overflow |

### Condition Codes for Branches

| Code | Meaning | Flags |
|------|---------|-------|
| EQ | Equal | Z=1 |
| NE | Not equal | Z=0 |
| GT | Greater than (signed) | Z=0 and N=V |
| LT | Less than (signed) | N$\neq$V |
| GE | Greater or equal | N=V |
| LE | Less or equal | Z=1 or N$\neq$V |
| HI | Higher (unsigned >) | C=1 and Z=0 |
| LO | Lower (unsigned <) | C=0 |

---

## Stack Operations

The stack grows **downward** (toward lower addresses) in most architectures.

| Operation | Effect |
|-----------|--------|
| `PUSH {Rn}` | SP = SP - 4; Mem[SP] = Rn |
| `POP {Rn}` | Rn = Mem[SP]; SP = SP + 4 |
| `PUSH {R4-R7, LR}` | Save multiple registers |
| `POP {R4-R7, PC}` | Restore registers and return |

---

## Subroutines (Functions)

### Calling Convention

1. **Caller:** Place arguments in R0-R3 (or stack for more)
2. **Caller:** `BL subroutine` (saves return address in LR)
3. **Callee:** Push used registers to stack (preserve caller's state)
4. **Callee:** Execute function body
5. **Callee:** Place return value in R0
6. **Callee:** Pop saved registers
7. **Callee:** `BX LR` or `MOV PC, LR` (return)

### Stack Frame

```
High address
+-----------+
| Arguments |  (passed by caller via stack)
+-----------+
| Return LR |  (saved by callee)
+-----------+
| Saved regs|  (R4-R11 as needed)
+-----------+
| Local vars|  (callee's local variables)
+-----------+  ← SP
Low address
```

---

## Common Patterns

### Loop (for i = 0 to 9)

```arm
    MOV R0, #0          @ i = 0
loop:
    CMP R0, #10         @ compare i with 10
    BGE end             @ if i >= 10, exit
    @ ... loop body ...
    ADD R0, R0, #1      @ i++
    B loop              @ repeat
end:
```

### If-Else

```arm
    CMP R0, R1          @ compare a and b
    BGT greater         @ if a > b, go to greater
    @ else branch
    MOV R2, R1          @ result = b
    B done
greater:
    MOV R2, R0          @ result = a
done:
```

### Array Access (a[i])

```arm
    LDR R0, =array      @ R0 = base address of array
    MOV R1, #3          @ i = 3
    LSL R2, R1, #2      @ R2 = i * 4 (word offset)
    LDR R3, [R0, R2]    @ R3 = array[3]
```

---

## Shifts as Multiplication/Division

| Operation | Equivalent | Example |
|-----------|-----------|---------|
| `LSL #n` | Multiply by $2^n$ | `LSL R0, R0, #3` → R0 * 8 |
| `LSR #n` | Unsigned divide by $2^n$ | `LSR R0, R0, #1` → R0 / 2 |
| `ASR #n` | Signed divide by $2^n$ | `ASR R0, R0, #2` → R0 / 4 |

---

## Practice

<details>
<summary>Write assembly to compute $R0 = R1^2 - R2$ (assume MUL available)</summary>

```arm
MUL R0, R1, R1       @ R0 = R1 * R1
SUB R0, R0, R2       @ R0 = R0 - R2
```
</details>

<details>
<summary>Translate this C to assembly: <code>if (x == 0) y = 1; else y = 0;</code> (x in R0, y in R1)</summary>

```arm
    CMP R0, #0
    BNE else
    MOV R1, #1        @ y = 1
    B done
else:
    MOV R1, #0        @ y = 0
done:
```
</details>

<details>
<summary>What does this code do?
```
    MOV R0, #0
    MOV R1, #1
loop:
    CMP R1, #10
    BGT end
    ADD R0, R0, R1
    ADD R1, R1, #1
    B loop
end:
```
</summary>

Computes $R0 = \sum_{i=1}^{10} i = 1+2+3+\ldots+10 = 55$

It's a loop that adds R1 to R0, incrementing R1 from 1 to 10.
</details>

<details>
<summary>Why do we save LR when calling nested subroutines?</summary>

`BL` overwrites LR with the return address. If a subroutine calls another subroutine (via `BL`), the original return address is lost.

Solution: `PUSH {LR}` at the start of any function that calls other functions, and `POP {PC}` to return.
</details>
