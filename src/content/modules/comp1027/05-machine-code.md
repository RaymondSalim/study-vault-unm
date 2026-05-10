---
title: "Machine Code & Assembly"
order: 5
moduleTitle: "COMP1027 - Computer Fundamentals"
tags: ["machine-code", "assembly", "HACK", "Nand2Tetris", "instruction-set"]
---

## Abstraction Levels

| Level | Example |
|-------|---------|
| High-level language | x = x + 1 |
| Assembly | @x; M=M+1 |
| Machine code | 1111110111001000 |
| Hardware | Logic gates executing |

## HACK Computer Architecture (Nand2Tetris)

| Component | Details |
|-----------|---------|
| Word size | 16-bit |
| Memory | 32K RAM (data), 32K ROM (instructions) |
| Registers | A (address/data), D (data only), M (RAM[A]) |
| ALU | Computes on D and A/M |
| PC | Program counter |

## A-Instruction (Address)

Format: `0vvvvvvvvvvvvvvv`

| Bit 15 | Bits 14-0 |
|--------|-----------|
| 0 | 15-bit value (0 to 32767) |

- `@21` → sets A register to 21
- Used to: set address for M, load constant, set jump target

## C-Instruction (Compute)

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

## Addressing Modes (General)

| Mode | Example | Meaning |
|------|---------|---------|
| Immediate | ADD #5 | Operand is the value itself |
| Direct | ADD 100 | Operand is at memory address 100 |
| Indirect | ADD (100) | Address of operand is stored at address 100 |
| Register | ADD R1 | Operand is in register R1 |
| Indexed | ADD 100(R1) | Address = 100 + R1 |

## Common Assembly Patterns (HACK)

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
