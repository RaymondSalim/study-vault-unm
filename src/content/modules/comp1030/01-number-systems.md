---
title: "Number Systems & Representations"
order: 1
moduleTitle: "COMP1030 - Systems & Architecture"
tags: ["binary", "hexadecimal", "twos-complement", "IEEE-754", "number-systems"]
---

## Base Conversions

:::eli10

Computers use binary (just 0s and 1s) instead of our decimal system (0-9). Converting between them is like translating between languages. To go from decimal to binary, you keep dividing by 2 and write down the remainders. Hexadecimal (0-9 plus A-F) is a shorthand for binary -- every 4 binary digits become one hex digit.

:::

:::eli15

Computers represent all data in binary (base 2). Converting between bases: decimal to binary uses repeated division by 2 (read remainders bottom-up), binary to decimal sums each bit times its power of 2, and binary to hex groups bits in 4s (since 16 = 2^4). Hexadecimal is a compact human-readable representation of binary. Memorizing powers of 2 up to 2^10 (1024) helps with quick conversions.

:::

:::eli20

| From | To | Method |
|------|------|--------|
| Decimal → Binary | Repeated division by 2, read remainders bottom-up |
| Binary → Decimal | Sum of $b_i \times 2^i$ |
| Binary → Hex | Group bits in 4s from right |
| Hex → Binary | Expand each hex digit to 4 bits |
| Decimal → Hex | Repeated division by 16 |
| Octal → Binary | Expand each octal digit to 3 bits |

### Quick Reference: Powers of 2

| $2^0$ | $2^1$ | $2^2$ | $2^3$ | $2^4$ | $2^5$ | $2^6$ | $2^7$ | $2^8$ | $2^9$ | $2^{10}$ |
|-------|-------|-------|-------|-------|-------|-------|-------|-------|-------|---------|
| 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 |

:::

---

## Unsigned Binary

:::eli10

Unsigned binary is like counting with only 0s and 1s. With 8 switches (bits), you can count from 0 to 255. Each switch represents a power of 2 -- the rightmost is 1, then 2, then 4, then 8, and so on up to 128 for the leftmost.

:::

:::eli15

An n-bit unsigned integer stores values from 0 to 2^n - 1 (no negative numbers). Each bit position represents a power of 2. To convert decimal to binary, repeatedly divide by 2 and collect remainders (least significant first). To convert back, multiply each bit by its positional power of 2 and sum. 8 bits gives range 0-255, 16 bits gives 0-65535.

:::

:::eli20

An $n$-bit unsigned integer represents values $0$ to $2^n - 1$.

**Example:** Convert $156_{10}$ to 8-bit binary:

$$156 \div 2 = 78\ r\ 0,\quad 78 \div 2 = 39\ r\ 0,\quad 39 \div 2 = 19\ r\ 1$$
$$19 \div 2 = 9\ r\ 1,\quad 9 \div 2 = 4\ r\ 1,\quad 4 \div 2 = 2\ r\ 0$$
$$2 \div 2 = 1\ r\ 0,\quad 1 \div 2 = 0\ r\ 1$$

Read remainders bottom-up: $10011100_2$

:::

---

## Signed Representations

:::eli10

To represent negative numbers with just 0s and 1s, computers use a trick called "two's complement." The leftmost bit tells you if the number is negative (1) or positive (0). To make a number negative, you flip all the bits and add 1. This makes math with negative numbers work naturally in hardware.

:::

:::eli15

Three methods exist for representing negative integers in binary. Two's complement is used universally in modern hardware because it has only one zero (no +0/-0 issue) and makes addition/subtraction work the same regardless of sign. To negate in two's complement: invert all bits and add 1. The MSB is the sign bit (1 = negative). Range for n bits: -2^(n-1) to +2^(n-1)-1. Sign extension (replicating the MSB) preserves the value when widening.

:::

:::eli20

| Method | Range ($n$ bits) | Notes |
|--------|-----------------|-------|
| Sign-magnitude | $-(2^{n-1}-1)$ to $+(2^{n-1}-1)$ | Two zeros (+0, -0) |
| One's complement | $-(2^{n-1}-1)$ to $+(2^{n-1}-1)$ | Invert all bits for negation; two zeros |
| **Two's complement** | $-2^{n-1}$ to $+2^{n-1}-1$ | One zero; used in modern hardware |

### Two's Complement

**To negate:** Invert all bits, add 1.

$$-x = \overline{x} + 1$$

**Value of an $n$-bit two's complement number:**

$$V = -b_{n-1} \cdot 2^{n-1} + \sum_{i=0}^{n-2} b_i \cdot 2^i$$

**Example (8-bit):**

| Decimal | Binary (2's comp) |
|---------|-------------------|
| +127 | `0111 1111` |
| +1 | `0000 0001` |
| 0 | `0000 0000` |
| -1 | `1111 1111` |
| -128 | `1000 0000` |

### Sign Extension

To extend an $n$-bit value to $m$ bits ($m > n$): replicate the MSB (sign bit) into all new positions.

$$\text{8-bit } -5 = \texttt{1111\,1011} \rightarrow \text{16-bit } \texttt{1111\,1111\,1111\,1011}$$

:::

---

## Binary Arithmetic

:::eli10

Adding binary numbers works just like adding decimal -- you go column by column and carry. The only difference is that 1+1 = 10 in binary (like how 9+1 = 10 in decimal). Subtraction uses a clever trick: instead of subtracting, you add the negative (two's complement) version.

:::

:::eli15

Binary addition works column-by-column with carries (0+0=0, 0+1=1, 1+1=10). Subtraction is performed by adding the two's complement of the subtrahend (A - B = A + NOT(B) + 1). Overflow in signed arithmetic occurs when two operands of the same sign produce a result of the opposite sign. Overflow is detected when the carry into the MSB differs from the carry out of the MSB.

:::

:::eli20

| Operation | Rule |
|-----------|------|
| Addition | Column-by-column with carry |
| Subtraction | Add the two's complement of subtrahend |
| Overflow (signed) | Two positive operands give negative result (or vice versa) |
| Overflow detection | $C_{in} \oplus C_{out}$ of the MSB |

:::

---

## IEEE 754 Floating Point

:::eli10

Floating point is how computers store decimal numbers like 3.14. It works like scientific notation: a number is stored as a sign (positive/negative), a significand (the digits), and an exponent (where to put the decimal point). Special codes represent infinity and "not a number" (NaN).

:::

:::eli15

IEEE 754 represents real numbers using three components: sign bit (0=positive, 1=negative), exponent (biased -- stored value minus a bias gives the actual power of 2), and mantissa/significand (fractional bits with an implicit leading 1). Single precision uses 32 bits (8-bit exponent, 23-bit mantissa, bias 127). Special values: all-zero exponent with zero mantissa = 0, all-one exponent with zero mantissa = infinity, all-one exponent with non-zero mantissa = NaN.

:::

:::eli20

### Format

| Component | Single (32-bit) | Double (64-bit) |
|-----------|----------------|-----------------|
| Sign | 1 bit | 1 bit |
| Exponent | 8 bits (bias 127) | 11 bits (bias 1023) |
| Mantissa | 23 bits | 52 bits |

### Formula

$$(-1)^{s} \times 1.M \times 2^{E - \text{bias}}$$

where $s$ = sign bit, $E$ = stored exponent, $M$ = mantissa bits (implicit leading 1).

### Special Values

| Exponent | Mantissa | Meaning |
|----------|----------|---------|
| All 0s | All 0s | $\pm 0$ |
| All 0s | Non-zero | Denormalised (no implicit 1) |
| All 1s | All 0s | $\pm \infty$ |
| All 1s | Non-zero | NaN |

### Conversion Example

Convert $-6.5_{10}$ to IEEE 754 single precision:

1. Sign: $s = 1$ (negative)
2. $6.5 = 110.1_2 = 1.101 \times 2^2$
3. Exponent: $E = 2 + 127 = 129 = 10000001_2$
4. Mantissa: $10100000000000000000000$
5. Result: `1 10000001 10100000000000000000000`

:::

---

## Practice

:::eli10

Try converting numbers between decimal and binary, and practice negating numbers using two's complement. The key steps for two's complement negation are: write the positive number in binary, flip all the bits, then add 1.

:::

:::eli15

Practice these key skills: decimal-to-binary conversion (repeated division by 2), two's complement negation (invert + add 1), interpreting two's complement values (MSB has negative weight), detecting overflow in signed addition, and IEEE 754 encoding (convert to binary scientific notation, add bias to exponent).

:::

:::eli20

<details>
<summary>Convert $-45_{10}$ to 8-bit two's complement</summary>

1. $45 = 00101101_2$
2. Invert: $11010010$
3. Add 1: $11010011$

Answer: `1101 0011`
</details>

<details>
<summary>What decimal does the 8-bit two's complement <code>1001 0110</code> represent?</summary>

$$V = -1 \cdot 128 + 0 \cdot 64 + 0 \cdot 32 + 1 \cdot 16 + 0 \cdot 8 + 1 \cdot 4 + 1 \cdot 2 + 0 \cdot 1$$
$$= -128 + 16 + 4 + 2 = -106$$
</details>

<details>
<summary>Convert $0.375_{10}$ to binary</summary>

$0.375 \times 2 = 0.75 \rightarrow 0$
$0.75 \times 2 = 1.5 \rightarrow 1$
$0.5 \times 2 = 1.0 \rightarrow 1$

Answer: $0.011_2$
</details>

<details>
<summary>Add $01101001$ and $01010110$ in 8-bit two's complement. Is there overflow?</summary>

$$01101001 + 01010110 = 10111111$$

Both operands are positive (MSB=0) but the result is negative (MSB=1).
**Overflow has occurred.** The true result ($105 + 86 = 191$) exceeds the 8-bit signed range.
</details>

:::
