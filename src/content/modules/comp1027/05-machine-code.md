---
title: "Machine Code & Assembly"
order: 5
moduleTitle: "COMP1027 - Computer Fundamentals"
tags: ["machine-code", "assembly", "HACK", "Nand2Tetris", "instruction-set"]
---

## Abstraction Levels

:::eli10

There are different levels of programming language. High-level languages (like Python) are easy for humans to read. Assembly language uses short codes like "ADD" that are closer to what the machine does. Machine code is the actual 1s and 0s that the computer runs. Each level translates down to the next.

:::

:::eli15

Computer programs exist at multiple levels of abstraction. High-level languages (Java, Python) are human-friendly but must be compiled down. Assembly language uses mnemonics (ADD, MOV, JMP) that map almost 1-to-1 with machine instructions. Machine code is the actual binary that hardware executes. Each level above is just a more human-readable way to express what the hardware ultimately does as logic gate operations.

:::

:::eli20

| Level | Example |
|-------|---------|
| High-level language | x = x + 1 |
| Assembly | @x; M=M+1 |
| Machine code | 1111110111001000 |
| Hardware | Logic gates executing |

:::

## HACK Computer Architecture (Nand2Tetris)

:::eli10

The HACK computer is a simple teaching computer with 16-bit words. It has three important registers: A (for addresses and data), D (for data only), and M (which means "the memory location that A points to"). Programs are stored in ROM and data in RAM.

:::

:::eli15

The HACK computer is a minimal 16-bit architecture used in the Nand2Tetris course. It has a 16-bit word size, 32K ROM for instructions, 32K RAM for data, and three key registers: A (address/data), D (data only), and M (shorthand for RAM[A], the memory word at the address stored in A). The ALU computes on D and A/M. It has only two instruction types: A-instructions (load a constant) and C-instructions (compute and optionally jump).

:::

:::eli20

| Component | Details |
|-----------|---------|
| Word size | 16-bit |
| Memory | 32K RAM (data), 32K ROM (instructions) |
| Registers | A (address/data), D (data only), M (RAM[A]) |
| ALU | Computes on D and A/M |
| PC | Program counter |

:::

## A-Instruction (Address)

:::eli10

An A-instruction starts with a 0 and loads a number into the A register. Writing @21 means "put 21 into the A register." This is used to point to memory locations, load constants, or set up jump targets. The first bit being 0 tells the computer "this is an A-instruction."

:::

:::eli15

The A-instruction loads a 15-bit value (0-32767) into the A register. Its binary format starts with a 0 in bit 15, with the remaining 15 bits encoding the value. Uses include: setting the address for a subsequent M access, loading a constant value, or setting a jump destination. For example, @21 sets A to 21, so M then refers to RAM[21].

:::

:::eli20

Format: `0vvvvvvvvvvvvvvv`

| Bit 15 | Bits 14-0 |
|--------|-----------|
| 0 | 15-bit value (0 to 32767) |

- `@21` → sets A register to 21
- Used to: set address for M, load constant, set jump target

:::

## C-Instruction (Compute)

:::eli10

A C-instruction does the actual computing. It starts with 111 and tells the ALU what calculation to do, where to store the result, and whether to jump somewhere. It is like a three-part command: "calculate this, put the answer there, and maybe jump."

:::

:::eli15

The C-instruction performs computation. It starts with 111 (identifying it as a C-instruction), followed by the computation field (what the ALU should calculate), the destination field (where to store the result: A, D, M, or combinations), and the jump field (whether to jump based on the ALU output being positive, zero, or negative). The 'a' bit selects whether the ALU uses the A register or M (RAM[A]) as its second input.

:::

:::eli20

Format: `111accccccdddjjj`

| Field | Bits | Purpose |
|-------|------|---------|
| 1 1 1 | 15-13 | C-instruction marker |
| a | 12 | 0 = use A; 1 = use M |
| c c c c c c | 11-6 | ALU operation (comp) |
| d d d | 5-3 | Destination |
| j j j | 2-0 | Jump condition |

### Computation (comp) field -- common operations

| comp | c-bits (a=0) | comp | c-bits (a=1) |
|------|-------------|------|-------------|
| 0 | 101010 | | |
| 1 | 111111 | | |
| -1 | 111010 | | |
| D | 001100 | | |
| A | 110000 | M | 110000 |
| !D | 001101 | | |
| !A | 110001 | !M | 110001 |
| -D | 001111 | | |
| -A | 110011 | -M | 110011 |
| D+1 | 011111 | | |
| A+1 | 110111 | M+1 | 110111 |
| D-1 | 001110 | | |
| A-1 | 110010 | M-1 | 110010 |
| D+A | 000010 | D+M | 000010 |
| D-A | 010011 | D-M | 010011 |
| A-D | 000111 | M-D | 000111 |
| D&A | 000000 | D&M | 000000 |
| D\|A | 010101 | D\|M | 010101 |

### Destination (dest) field

| d1 d2 d3 | Destination |
|-----------|-------------|
| 0 0 0 | null (no store) |
| 0 0 1 | M |
| 0 1 0 | D |
| 0 1 1 | MD |
| 1 0 0 | A |
| 1 0 1 | AM |
| 1 1 0 | AD |
| 1 1 1 | AMD |

### Jump (jmp) field

| j1 j2 j3 | Mnemonic | Condition |
|-----------|----------|-----------|
| 0 0 0 | null | No jump |
| 0 0 1 | JGT | out > 0 |
| 0 1 0 | JEQ | out = 0 |
| 0 1 1 | JGE | out >= 0 |
| 1 0 0 | JLT | out < 0 |
| 1 0 1 | JNE | out != 0 |
| 1 1 0 | JLE | out <= 0 |
| 1 1 1 | JMP | Always |

:::

## Addressing Modes (General)

:::eli10

Addressing modes are different ways to tell the computer WHERE to find the data it needs. You can give it the data directly ("add 5"), point to a memory address ("add what is at location 100"), or use a register ("add what is in register R1"). Each mode is useful in different situations.

:::

:::eli15

Addressing modes define how the operand field of an instruction is interpreted to locate the actual data. Immediate mode uses the value directly (fastest, but limited to constants). Direct mode specifies a memory address. Indirect mode uses a pointer (the address holds another address). Register mode uses a CPU register. Indexed mode adds a register value to a base address (useful for arrays). Different modes offer trade-offs between flexibility, speed, and instruction size.

:::

:::eli20

| Mode | Example | Meaning |
|------|---------|---------|
| Immediate | ADD #5 | Operand is the value itself |
| Direct | ADD 100 | Operand is at memory address 100 |
| Indirect | ADD (100) | Address of operand is stored at address 100 |
| Register | ADD R1 | Operand is in register R1 |
| Indexed | ADD 100(R1) | Address = 100 + R1 |

:::

## Common Assembly Patterns (HACK)

:::eli10

Here are common patterns in HACK assembly: loading a value into memory (set the address, put the value in D, then store D to M), infinite loops (jump back to the same label forever), conditional jumps (check a value and jump if the condition is met), and adding two memory values together.

:::

:::eli15

HACK assembly follows patterns. To store a constant: load the constant into A, copy to D (D=A), load the target address into A, then store D to M (M=D). Infinite loops use a label and unconditional jump (0;JMP). Conditionals load a value and jump based on its sign (D;JGT, D;JEQ, etc.). Arithmetic on memory values requires loading each value into D one at a time since the ALU only operates on D and A/M.

:::

:::eli20

```
// Set RAM[0] = 10
@10
D=A
@0
M=D

// Infinite loop
(LOOP)
@LOOP
0;JMP

// If D>0 goto POSITIVE
@POSITIVE
D;JGT

// RAM[1] = RAM[0] + RAM[1]
@0
D=M
@1
M=D+M
```

<details>
<summary>Practice: Translate @17 to binary</summary>

@17 is an A-instruction: bit 15 = 0, bits 14-0 = 17 in binary.

17 = 10001 in binary.

Pad to 15 bits: 000000000010001

Full instruction: **0000000000010001**
</details>

<details>
<summary>Practice: Translate D=D+M to binary</summary>

C-instruction: starts with 111

- a = 1 (using M)
- comp for D+M: 000010
- dest for D: 010
- jump: 000 (no jump)

Full: **1111000010010000**
</details>

<details>
<summary>Practice: Write HACK assembly to compute RAM[2] = RAM[0] - RAM[1]</summary>

```
@0
D=M      // D = RAM[0]
@1
D=D-M    // D = RAM[0] - RAM[1]
@2
M=D      // RAM[2] = D
```
</details>

:::
