---
title: "Assembly Language Basics"
order: 6
moduleTitle: "COMP1030 - Systems & Architecture"
tags: ["assembly", "instruction-set", "stack", "subroutines", "ARM"]
---

## Assembly vs Machine Code

:::eli10

Assembly language is a human-readable way to write instructions the CPU understands. Instead of writing "1110 0000 1000..." (machine code), you write "ADD R0, R1, R2" which means "add what's in R1 and R2 and put the answer in R0." An assembler translates your readable text into the binary the CPU actually runs.

:::

:::eli15

Assembly is a low-level language with a near 1-to-1 mapping to machine code. Each mnemonic (ADD, SUB, LDR) corresponds to one machine instruction. The assembler translates mnemonics to binary. Assembly gives direct control over hardware (registers, memory, flags) with no abstraction overhead. It's used for performance-critical code, device drivers, and understanding how high-level code actually executes on hardware.

:::

:::eli20

| Level | Representation | Example |
|-------|---------------|---------|
| High-level | Human-readable | `x = a + b` |
| Assembly | Mnemonic instructions | `ADD R0, R1, R2` |
| Machine code | Binary encoding | `1110 0000 1000 ...` |

**Assembler:** Translates assembly → machine code (1-to-1 mapping).

:::

---

## Instruction Categories

:::eli10

Assembly instructions come in groups: arithmetic (add, subtract, multiply), logic (AND, OR), data movement (load from memory, store to memory), comparisons (is A bigger than B?), and jumps (go to a different line of code if some condition is true).

:::

:::eli15

ARM-style assembly instructions fall into categories: arithmetic (ADD, SUB, MUL), logic (AND, ORR, EOR, shifts), data transfer (LDR loads from memory, STR stores to memory, MOV copies between registers), comparison (CMP sets flags without storing result), and branch (B for unconditional jump, BEQ/BNE etc. for conditional jumps based on flags). The CMP instruction is key -- it sets the condition flags that branches then check.

:::

:::eli20

| Category | Operations | Examples |
|----------|-----------|----------|
| Arithmetic | Add, subtract, multiply | `ADD`, `SUB`, `MUL` |
| Logic | AND, OR, XOR, NOT, shifts | `AND`, `ORR`, `EOR`, `LSL` |
| Data transfer | Load/Store, Move | `LDR`, `STR`, `MOV` |
| Branch/Control | Jump, conditional branch | `B`, `BEQ`, `BNE`, `BL` |
| Comparison | Compare, test | `CMP`, `TST` |
| Stack | Push, pop | `PUSH`, `POP` |

:::

---

## ARM-style Assembly (Common in COMP1030)

:::eli10

In ARM assembly, R0, R1, R2 etc. are registers (little storage boxes in the CPU). ADD R0, R1, R2 means "R0 = R1 + R2". LDR loads a value from memory into a register. STR saves a register's value to memory. CMP compares two values and sets invisible flags that branches then check.

:::

:::eli15

ARM instructions typically have format: `OPERATION Destination, Source1, Source2`. Data processing instructions (ADD, SUB, AND, ORR) perform operations between registers. Memory access uses LDR (load register from memory) and STR (store register to memory) with various offset modes. CMP sets flags without storing a result, and conditional branches (BEQ, BNE, BGT, BLT) jump based on these flags. Shifts (LSL, LSR, ASR) multiply/divide by powers of 2.

:::

:::eli20

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

:::

---

## Condition Flags

:::eli10

After a comparison (CMP), the CPU sets invisible "flags" that remember the result. Z (Zero) means the values were equal. N (Negative) means the result was negative. Branches like BEQ (branch if equal) check these flags to decide whether to jump.

:::

:::eli15

Condition flags are set by CMP, TST, or instructions with the S suffix. Z (Zero): result was 0. N (Negative): result MSB was 1. C (Carry): unsigned overflow occurred. V (Overflow): signed overflow occurred. Conditional branches check combinations of these flags: EQ checks Z=1, GT checks Z=0 AND N=V (positive non-zero result from signed comparison), LT checks N!=V.

:::

:::eli20

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

:::

---

## Stack Operations

:::eli10

The stack is like a pile of plates -- you add to the top (push) and take from the top (pop). The CPU uses it to save and restore values, especially when calling functions. The Stack Pointer (SP) keeps track of where the top of the pile is.

:::

:::eli15

The stack grows downward (toward lower addresses). PUSH saves a register's value to the stack (decrement SP, store to memory). POP restores it (load from memory, increment SP). The stack is essential for function calls: save the return address (LR) and any registers the function will overwrite, so they can be restored when the function returns. Multiple registers can be pushed/popped in one instruction.

:::

:::eli20

The stack grows **downward** (toward lower addresses) in most architectures.

| Operation | Effect |
|-----------|--------|
| `PUSH {Rn}` | SP = SP - 4; Mem[SP] = Rn |
| `POP {Rn}` | Rn = Mem[SP]; SP = SP + 4 |
| `PUSH {R4-R7, LR}` | Save multiple registers |
| `POP {R4-R7, PC}` | Restore registers and return |

:::

---

## Subroutines (Functions)

:::eli10

A subroutine is a reusable chunk of code -- like a recipe you can follow from different parts of your program. When you "call" it (BL), the CPU remembers where to come back to. When the subroutine is done, it "returns" to where it was called from. Arguments go in R0-R3, and the answer comes back in R0.

:::

:::eli15

Subroutines are called with BL (Branch with Link), which saves the return address in LR (Link Register). The calling convention: arguments passed in R0-R3, return value in R0. The callee must save/restore any registers it modifies (using PUSH/POP). Nested calls require saving LR to the stack (since BL overwrites LR). The stack frame holds saved registers, local variables, and return address for each active function.

:::

:::eli20

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

:::

---

## Common Patterns

:::eli10

Loops in assembly use a counter register, a comparison, and a branch back to the start. If-else uses a comparison followed by a branch that skips over one block of code. Accessing array elements uses a base address plus an offset (the index times the element size).

:::

:::eli15

Common assembly patterns: loops use CMP + conditional branch (BGE/BLT to exit, B to repeat). If-else uses CMP then a conditional branch to skip one path. Array access calculates the offset (index x element size) and adds it to the base address. Shifts substitute for multiplication/division by powers of 2 (LSL #1 = multiply by 2, LSR #1 = divide by 2). These patterns directly mirror high-level constructs.

:::

:::eli20

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

:::

---

## Shifts as Multiplication/Division

:::eli10

Shifting bits left is the same as multiplying by 2 (each shift doubles the number). Shifting right divides by 2. So shifting left by 3 positions multiplies by 8 (2x2x2). This is much faster than actual multiplication in hardware.

:::

:::eli15

Logical shift left (LSL) by n positions multiplies by 2^n (fills with zeros). Logical shift right (LSR) divides unsigned values by 2^n. Arithmetic shift right (ASR) divides signed values by 2^n (preserves the sign bit). Compilers use shifts instead of multiplication/division by powers of 2 because shifts execute in one cycle while multiply may take several.

:::

:::eli20

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

:::
