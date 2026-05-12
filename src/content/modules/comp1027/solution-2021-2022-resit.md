---
title: "Exam Solution 2021-2022 (Resit)"
order: 99
moduleTitle: "COMP1027 - Computer Fundamentals"
tags: ["past-papers", "solutions", "exam"]
---

## Question 1: Number Representation & Binary Arithmetic [18 marks]

### (a) Convert from 8-bit two's complement to decimal

#### (i) 0111 1001 [3 marks]

The most significant bit (MSB) is 0, so the number is **positive**.

Simply convert the binary to decimal:

```
0111 1001
= 0×128 + 1×64 + 1×32 + 1×16 + 1×8 + 0×4 + 0×2 + 1×1
= 64 + 32 + 16 + 8 + 1
= 121
```

**Answer: +121**

#### (ii) 1001 1001 [3 marks]

The MSB is 1, so the number is **negative**. To find the magnitude, invert all bits and add 1:

```
Original:  1001 1001
Invert:    0110 0110
Add 1:     0110 0111
```

Convert to decimal:
```
0110 0111
= 64 + 32 + 4 + 2 + 1
= 103
```

**Answer: -103**

### (b) Convert from decimal to 8-bit two's complement

#### (i) 125 [3 marks]

125 is positive, so convert directly to binary:

```
125 ÷ 2 = 62 remainder 1
62 ÷ 2  = 31 remainder 0
31 ÷ 2  = 15 remainder 1
15 ÷ 2  = 7  remainder 1
7 ÷ 2   = 3  remainder 1
3 ÷ 2   = 1  remainder 1
1 ÷ 2   = 0  remainder 1
```

Reading remainders bottom to top: 1111101

Pad to 8 bits: **0111 1101**

#### (ii) -125 [3 marks]

First, represent +125 in binary: `0111 1101`

Then apply two's complement (invert and add 1):

```
Original:  0111 1101
Invert:    1000 0010
Add 1:     1000 0011
```

**Answer: 1000 0011**

### (c) Using 8-bit two's complement, calculate:

#### (i) 125 + (-125) [3 marks]

```
  125 = 0111 1101
 -125 = 1000 0011
```

Addition:
```
  0111 1101
+ 1000 0011
-----------
1 0000 0000
```

The carry out of the 8th bit is discarded (it falls outside the 8-bit range).

Result: `0000 0000` = **0**

This is correct: 125 + (-125) = 0.

#### (ii) 0111 1001 + 1001 1001 [3 marks]

From part (a): 0111 1001 = +121 and 1001 1001 = -103

```
  0111 1001
+ 1001 1001
-----------
1 0001 0010
```

The carry out of the 8th bit is discarded.

Result: `0001 0010`

Convert to decimal:
```
0001 0010 = 16 + 2 = 18
```

**Answer: 0001 0010 = +18**

Check: 121 + (-103) = 18. Correct.

### (d) Explain Overflow with reference to two specific additions [Remaining marks]

**Overflow** occurs in two's complement arithmetic when the result of an addition exceeds the representable range of the number system. For 8-bit two's complement, the range is -128 to +127.

Overflow is detected when:
- Two **positive** numbers are added and the result appears **negative** (the MSB becomes 1), OR
- Two **negative** numbers are added and the result appears **positive** (the MSB becomes 0).

Equivalently, overflow occurs when the carry into the MSB differs from the carry out of the MSB.

**Example 1: Positive overflow**

Add 125 + 121:
```
  0111 1101   (+125)
+ 0111 1001   (+121)
-----------
  1111 0110   (-10 in two's complement — WRONG!)
```

The true answer is +246, which exceeds +127 (the maximum for 8-bit two's complement). Both operands are positive but the result has MSB = 1, indicating a negative number. This is **overflow**.

**Example 2: Negative overflow**

Add -103 + (-103):
```
  1001 1001   (-103)
+ 1001 1001   (-103)
-----------
1 0011 0010   (+50 in two's complement — WRONG!)
```

The true answer is -206, which is below -128 (the minimum for 8-bit two's complement). Both operands are negative but the result (after discarding the carry) has MSB = 0, indicating a positive number. This is **overflow**.

**Note:** Overflow **cannot** occur when adding a positive and a negative number (as in parts (c)(i) and (c)(ii)), because the result is always between the two operands and thus within range.

---

## Question 2: Boolean Algebra & Digital Logic [27 marks]

### (a) Write the Sum of Products (SoP) expression from the truth table [9 marks]

The truth table is:

| A | B | C | F |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 |

F = 1 for rows where (A=1, B=0, C=0), (A=1, B=1, C=0), and (A=1, B=1, C=1).

Write a minterm for each row where F = 1:

- Row 4 (A=1, B=0, C=0): A.B'.C'
- Row 6 (A=1, B=1, C=0): A.B.C'
- Row 7 (A=1, B=1, C=1): A.B.C

**SoP Expression:**

**F = A.B'.C' + A.B.C' + A.B.C**

### (b) Simplify using Boolean Algebra — show laws used [9 marks]

Starting expression:
```
F = A.B'.C' + A.B.C' + A.B.C
```

**Step 1:** Factor out A from all terms (Distributive Law):
```
F = A.(B'.C' + B.C' + B.C)
```

**Step 2:** Factor out C' from the first two terms inside the bracket (Distributive Law):
```
F = A.(C'.(B' + B) + B.C)
```

**Step 3:** Apply Complement Law: B' + B = 1:
```
F = A.(C'.1 + B.C)
```

**Step 4:** Apply Identity Law: C'.1 = C':
```
F = A.(C' + B.C)
```

**Step 5:** Apply Absorption Law (X + X'.Y = X + Y, where X = C' and Y = B):

Note that C' + B.C = C' + B (by the Absorption/Simplification theorem, since C' + C.B = C' + B).

Proof: C' + B.C = (C' + B).(C' + C) [Distributive Law] = (C' + B).1 [Complement Law] = C' + B [Identity Law]

```
F = A.(C' + B)
```

**Step 6:** Apply Distributive Law to expand (optional, or leave in factored form):
```
F = A.C' + A.B
```

**Simplified Expression: F = A.C' + A.B**

(Equivalently: F = A.(B + C'))

### (c) Draw the logic circuit diagram [9 marks]

The simplified expression is: **F = A.C' + A.B**

The circuit requires the following basic gates:

```
        ┌─────┐
C ──────┤ NOT ├──── C'
        └─────┘
                     ┌──────┐
A ───────────────┬───┤      │
                 │   │ AND  ├──── (A.C')───┐
C' ──────────────┼───┤      │              │   ┌─────┐
                 │   └──────┘              ├───┤     │
                 │                         │   │ OR  ├──── F
                 │   ┌──────┐              ├───┤     │
                 └───┤      │              │   └─────┘
                     │ AND  ├──── (A.B) ───┘
B ───────────────────┤      │
                     └──────┘
```

**Components used:**
1. **1 NOT gate** — to invert C to produce C'
2. **2 AND gates** — one computes A.C', the other computes A.B
3. **1 OR gate** — combines the two AND gate outputs to produce F = A.C' + A.B

---

## Question 3: Adders, MUX and ALU [30 marks]

### (a) Truth table for Half Adder [4 marks]

A half adder has two inputs (A, B) and two outputs (Cout = carry, S = sum).

| A | B | Cout | S |
|---|---|------|---|
| 0 | 0 |  0   | 0 |
| 0 | 1 |  0   | 1 |
| 1 | 0 |  0   | 1 |
| 1 | 1 |  1   | 0 |

**Logic:**
- S = A XOR B
- Cout = A AND B

### (b) Illustrate circuitry of half adder [4 marks]

```
          ┌──────┐
A ────┬───┤      │
      │   │ XOR  ├──── S (Sum)
B ──┬─┼───┤      │
    │ │   └──────┘
    │ │
    │ │   ┌──────┐
    │ └───┤      │
    │     │ AND  ├──── Cout (Carry)
    └─────┤      │
          └──────┘
```

The half adder consists of:
- **1 XOR gate** producing the Sum output: S = A XOR B
- **1 AND gate** producing the Carry output: Cout = A AND B

### (c) Truth table for Full Adder [8 marks]

A full adder has three inputs (A, B, Cin) and two outputs (Cout, S).

| A | B | Cin | Cout | S |
|---|---|-----|------|---|
| 0 | 0 |  0  |  0   | 0 |
| 0 | 0 |  1  |  0   | 1 |
| 0 | 1 |  0  |  0   | 1 |
| 0 | 1 |  1  |  1   | 0 |
| 1 | 0 |  0  |  0   | 1 |
| 1 | 0 |  1  |  1   | 0 |
| 1 | 1 |  0  |  1   | 0 |
| 1 | 1 |  1  |  1   | 1 |

**Logic:**
- S = A XOR B XOR Cin
- Cout = (A AND B) OR (Cin AND (A XOR B))

### (d) Illustrate circuitry of Full Adder [8 marks]

A full adder is constructed from two half adders and an OR gate:

```
         Half Adder 1                Half Adder 2
        ┌───────────┐              ┌───────────┐
A ──┬───┤ XOR       ├─── (A⊕B) ───┤ XOR       ├──── S
    │   │           │        ┌─────┤           │
B ──┼─┬─┤           │        │     │           │
    │ │ └───────────┘        │     └───────────┘
    │ │                      │
    │ │ ┌───────────┐    Cin─┘     ┌───────────┐
    │ └─┤ AND       ├── C1 ───────┤           │
    └───┤           │              │   OR      ├──── Cout
        └───────────┘    ┌────────┤           │
                         │        └───────────┘
        ┌───────────┐   │
(A⊕B)──┤ AND       ├── C2
   Cin──┤           │
        └───────────┘
```

**Explanation:**
1. **Half Adder 1:** Computes A XOR B (partial sum) and A AND B (carry C1)
2. **Half Adder 2:** Computes (A XOR B) XOR Cin = S (final sum) and (A XOR B) AND Cin (carry C2)
3. **OR gate:** Computes Cout = C1 OR C2 = (A AND B) OR ((A XOR B) AND Cin)

### (e) Identify missing components A-K in the ALU diagram [6 marks]

The Hack computer ALU processes two 16-bit inputs (x, y) using 6 control bits (zx, nx, zy, ny, f, no) to produce an output. The components in the signal path are:

| Label | Component | Function |
|-------|-----------|----------|
| **A** | MUX (controlled by zx) | Selects between x input and 0. If zx=1, output is 0 (zeros x). |
| **B** | MUX (controlled by zy) | Selects between y input and 0. If zy=1, output is 0 (zeros y). |
| **C** | NOT gate | Bitwise negation of x1 (the output after zeroing stage). Produces NOT(x1). |
| **D** | NOT gate | Bitwise negation of y1 (the output after zeroing stage). Produces NOT(y1). |
| **E** | MUX (controlled by nx) | Selects between x1 and NOT(x1). If nx=1, negates x. |
| **F** | MUX (controlled by ny) | Selects between y1 and NOT(y1). If ny=1, negates y. |
| **G** | Adder (16-bit) | Computes x + y (arithmetic addition of the two processed inputs). |
| **H** | AND gate (16-bit) | Computes x AND y (bitwise AND of the two processed inputs). |
| **I** | MUX (controlled by f) | Selects between AND output and Adder output. If f=1, selects addition; if f=0, selects AND. |
| **J** | NOT gate | Bitwise negation of the output (out1). Produces NOT(out1). |
| **K** | MUX (controlled by no) | Selects between out1 and NOT(out1). If no=1, negates the output. |

**Signal flow summary:**
```
x → [A: MUX zx] → x1 → [C: NOT] → not-x1
                    x1 ──┐
              not-x1 ──┤ [E: MUX nx] → x2 ─┐
                                              ├→ [G: ADD] → add-out ─┐
                                              ├→ [H: AND] → and-out ─┤
y → [B: MUX zy] → y1 → [D: NOT] → not-y1   │                       │
                    y1 ──┐                    │  [I: MUX f] ←────────┘
              not-y1 ──┤ [F: MUX ny] → y2 ─┘         │
                                                      ↓ out1
                                              [J: NOT] → not-out1
                                                      │
                                              [K: MUX no] → final output
```

---

## Question 4: CPU Instructions and Networks [25 marks]

### (a) Explain direct, indirect, and indexed addressing modes [9 marks]

#### Direct Addressing [3 marks]

In **direct addressing**, the address field of the instruction contains the **actual memory address** of the operand. The CPU fetches the data directly from the specified memory location.

**Example:**
```
LOAD 200
```
This instruction loads the value stored at memory address 200 into the accumulator. The operand address is explicitly stated in the instruction.

**Advantage:** Simple, requires only one memory access to retrieve the operand.
**Disadvantage:** Limited address range (restricted by the size of the address field).

#### Indirect Addressing [3 marks]

In **indirect addressing**, the address field of the instruction contains a memory address that **points to another memory address** where the actual operand is stored. The CPU must perform two memory accesses: first to get the pointer, then to get the actual data.

**Example:**
```
LOAD (200)
```
This instruction first reads memory address 200, which contains (say) the value 500. Then it loads the value stored at memory address 500 into the accumulator.

**Advantage:** Allows access to a much larger address space; enables dynamic memory referencing (pointers).
**Disadvantage:** Slower due to the extra memory access (two memory reads required).

#### Indexed Addressing [3 marks]

In **indexed addressing**, the effective address of the operand is calculated by **adding a constant (offset)** in the instruction to the contents of an **index register**. This is particularly useful for accessing elements in arrays or data structures.

**Example:**
```
LOAD 100, X
```
If the index register X contains the value 5, the effective address is 100 + 5 = 105. The CPU loads the value at memory address 105.

**Advantage:** Efficient for iterating through arrays and sequential data structures; the index register can be incremented in a loop.
**Disadvantage:** Requires additional hardware (index register) and an addition operation to compute the effective address.

**Scenario:** Consider a program that processes an array of 10 student marks stored starting at address 100. Using indexed addressing with a base address of 100 and an index register that increments from 0 to 9, the program can access each element (addresses 100-109) without changing the instruction itself — only the index register value changes.

### (b) Explain 4 layers of the OSI model [8 marks]

The OSI (Open Systems Interconnection) model has 7 layers. Four key layers are:

#### Layer 1: Physical Layer [2 marks]

The **Physical Layer** is responsible for the transmission of raw binary data (bits) over a physical medium. It defines the electrical, optical, and mechanical specifications for the communication channel.

- Deals with voltages, signal timing, cable types, pin layouts, frequencies
- Converts bits into electrical/optical/radio signals
- Examples: Ethernet cables (Cat5/Cat6), fibre optic, Wi-Fi radio frequencies, USB
- Defines data rates, transmission distances, and physical connectors

#### Layer 3: Network Layer [2 marks]

The **Network Layer** is responsible for **routing** packets from source to destination across multiple networks (internetworking). It handles logical addressing and path determination.

- Assigns logical addresses (IP addresses) to devices
- Determines the best path for data to travel through the network (routing)
- Handles packet forwarding, fragmentation, and reassembly
- Key protocols: IP (IPv4, IPv6), ICMP, routing protocols (OSPF, BGP)
- Devices: Routers operate at this layer

#### Layer 4: Transport Layer [2 marks]

The **Transport Layer** provides reliable (or unreliable) end-to-end data delivery between applications on different hosts. It handles segmentation, flow control, and error recovery.

- Segments data from the session layer into smaller units
- Provides port numbers to identify specific applications/services
- TCP: Connection-oriented, reliable, ordered delivery with error checking and flow control
- UDP: Connectionless, fast but unreliable (no guarantee of delivery or order)
- Handles multiplexing (multiple applications sharing the network)

#### Layer 7: Application Layer [2 marks]

The **Application Layer** is the closest layer to the end user. It provides network services directly to user applications and handles high-level protocols for data representation and communication.

- Provides interfaces for applications to access network services
- Handles data formatting, encryption/decryption at the application level
- Key protocols: HTTP/HTTPS (web), SMTP/IMAP (email), FTP (file transfer), DNS (name resolution), SSH (secure shell)
- Users interact with this layer through software like web browsers and email clients

### (c) Explain 2 differences between IPv4 and IPv6 [8 marks]

#### Difference 1: Address Size and Format [4 marks]

**IPv4** uses **32-bit addresses**, written as four decimal octets separated by dots (dotted-decimal notation).
- Example: 192.168.1.1
- Provides approximately 4.3 billion unique addresses (2^32)
- Address space is now exhausted due to the growth of the internet

**IPv6** uses **128-bit addresses**, written as eight groups of four hexadecimal digits separated by colons.
- Example: 2001:0db8:85a3:0000:0000:8a2e:0370:7334
- Provides approximately 3.4 x 10^38 unique addresses (2^128)
- Virtually unlimited address space, solving the IPv4 exhaustion problem
- Every device can have a globally unique address without NAT

#### Difference 2: Header Simplification and Built-in Features [4 marks]

**IPv4** has a **variable-length header** (20-60 bytes) with 12+ fields, including a checksum field that must be recalculated at every router hop. The header includes optional fields that add complexity to processing.
- Requires NAT (Network Address Translation) for address conservation
- Security (IPsec) is optional and added externally
- Fragmentation can be performed by both the sender and intermediate routers

**IPv6** has a **simplified fixed-length header** (40 bytes) with only 8 fields, removing the checksum (relying on lower-layer and upper-layer checks instead). This makes router processing faster and more efficient.
- IPsec (security) is built into the protocol specification as mandatory
- Fragmentation is handled only by the source host, not by routers (improving router efficiency)
- Includes built-in support for auto-configuration (SLAAC — Stateless Address Autoconfiguration), reducing reliance on DHCP
- Improved support for Quality of Service (QoS) through the Flow Label field
