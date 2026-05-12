---
title: "Exam Solution 2022-2023 (Resit)"
order: 101
moduleTitle: "COMP1027 - Computer Fundamentals"
tags: ["past-papers", "solutions", "exam"]
---

## Question 1: Number Representation, Binary Arithmetic, Digital Logic & Boolean Algebra [30%]

### (a) Calculate values a-f from Table 1 (8-bit representations) [12 marks]

**Row 1: Binary = 1111**

The binary value given is `1111`. In 8-bit representation, this is padded with leading zeros:

```
Binary (8-bit) = 0000 1111
```

**Finding a (Decimal):**

```
0000 1111 = 0 + 0 + 0 + 0 + 8 + 4 + 2 + 1 = 15
```

**a = 15**

**Finding b (1's Complement):**

Since the number is positive (MSB = 0), the 1's complement representation is the same as the unsigned binary:

```
b = 0000 1111
```

**Finding c (2's Complement):**

Since the number is positive (MSB = 0), the 2's complement representation is the same as the unsigned binary:

```
c = 0000 1111
```

---

**Row 2: 1's Complement = 0111 1010**

**Finding f (Decimal):**

The 1's complement value is `0111 1010`. Since the MSB = 0, this is a positive number. For positive numbers, 1's complement is the same as the standard binary representation:

```
0111 1010 = 64 + 32 + 16 + 8 + 0 + 2 + 0 = 122
```

**f = 122**

**Finding e (Binary):**

Since the number is positive, the binary representation is identical to the 1's complement representation:

```
e = 0111 1010
```

**Finding d (2's Complement):**

Since the number is positive (MSB = 0), the 2's complement representation is the same as the binary:

```
d = 0111 1010
```

---

**Summary of all values:**

| Value | Answer |
|-------|--------|
| a | 15 |
| b | 0000 1111 |
| c | 0000 1111 |
| d | 0111 1010 |
| e | 0111 1010 |
| f | 122 |

---

### (b) Convert x=110, y=89, z=126 to 8-bit 2's complement [6 marks]

**Converting x = 110 to 8-bit 2's complement:**

110 is positive and within the 8-bit signed range (-128 to +127).

```
110 = 64 + 32 + 8 + 4 + 2
110 = 0110 1110
```

Verification: 64 + 32 + 8 + 4 + 2 = 110

**x = 0110 1110**

---

**Converting y = 89 to 8-bit 2's complement:**

89 is positive and within range.

```
89 = 64 + 16 + 8 + 1
89 = 0101 1001
```

Verification: 64 + 16 + 8 + 1 = 89

**y = 0101 1001**

---

**Converting z = 126 to 8-bit 2's complement:**

126 is positive and within range.

```
126 = 64 + 32 + 16 + 8 + 4 + 2
126 = 0111 1110
```

Verification: 64 + 32 + 16 + 8 + 4 + 2 = 126

**z = 0111 1110**

---

### (c) 8-bit two's complement arithmetic [6 marks]

#### (i) x - y = 110 - 89

To compute x - y, we add x to the 2's complement of y (i.e., x + (-y)):

```
Step 1: Find -y (negate y)
  y      = 0101 1001
  Flip   = 1010 0110
  Add 1  = 1010 0111  (-89 in 2's complement)

Step 2: Add x + (-y)
    0110 1110   (110)
  + 1010 0111   (-89)
  -----------
  1 0001 0101

Step 3: Discard the carry-out (9th bit)
  Result = 0001 0101
```

Verification: 0001 0101 = 16 + 4 + 1 = 21

**x - y = 21 (0001 0101)**

---

#### (ii) y - z = 89 - 126

To compute y - z, we add y to the 2's complement of z (i.e., y + (-z)):

```
Step 1: Find -z (negate z)
  z      = 0111 1110
  Flip   = 1000 0001
  Add 1  = 1000 0010  (-126 in 2's complement)

Step 2: Add y + (-z)
    0101 1001   (89)
  + 1000 0010   (-126)
  -----------
    1101 1011

Step 3: No carry-out, result is negative (MSB = 1)
```

Verification (convert back): Flip 1101 1011 = 0010 0100, Add 1 = 0010 0101 = 32 + 4 + 1 = 37. So the result is -37.

**y - z = -37 (1101 1011)**

---

#### (iii) z - x = 126 - 110

To compute z - x, we add z to the 2's complement of x (i.e., z + (-x)):

```
Step 1: Find -x (negate x)
  x      = 0110 1110
  Flip   = 1001 0001
  Add 1  = 1001 0010  (-110 in 2's complement)

Step 2: Add z + (-x)
    0111 1110   (126)
  + 1001 0010   (-110)
  -----------
  1 0001 0000

Step 3: Discard the carry-out (9th bit)
  Result = 0001 0000
```

Verification: 0001 0000 = 16

**z - x = 16 (0001 0000)**

---

### (d) Boolean Algebra and Logic Circuit

#### (i) Simplified Boolean expression [4 marks]

Given the truth table where F = 1 only for the following input combinations:

| A | B | C | F |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 |

From the truth table, F = 1 when:
- A = 1, B = 1, C = 0 (minterm: ABC')
- A = 1, B = 1, C = 1 (minterm: ABC)

Writing the Sum of Products (SOP):

```
F = ABC' + ABC
F = AB(C' + C)
F = AB(1)
F = AB
```

**Simplified expression: F = AB**

---

#### (ii) Logic circuit diagram [2 marks]

The circuit consists of a single 2-input AND gate:

```
A ──────┐
        │ AND
        ├──────── F
B ──────┘
```

The output F is produced by feeding inputs A and B into a single AND gate.

---

## Question 2: Adders and ALU [40%]

### (a) Full Adder Truth Table [16 marks]

A full adder takes three inputs (A, B, Carry-in) and produces two outputs (Carry-out, Sum).

The logic is:
- **Sum (S)** = A XOR B XOR Cin
- **Carry-out (Cout)** = (A AND B) OR (Cin AND (A XOR B))

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

**Explanation of each row:**

- **Row 1:** 0 + 0 + 0 = 0, no carry. S=0, Cout=0
- **Row 2:** 0 + 0 + 1 = 1, no carry. S=1, Cout=0
- **Row 3:** 0 + 1 + 0 = 1, no carry. S=1, Cout=0
- **Row 4:** 0 + 1 + 1 = 2 (binary 10). S=0, Cout=1
- **Row 5:** 1 + 0 + 0 = 1, no carry. S=1, Cout=0
- **Row 6:** 1 + 0 + 1 = 2 (binary 10). S=0, Cout=1
- **Row 7:** 1 + 1 + 0 = 2 (binary 10). S=0, Cout=1
- **Row 8:** 1 + 1 + 1 = 3 (binary 11). S=1, Cout=1

---

### (b) Full Adder Circuitry [7 marks]

A full adder is constructed from **two half adders** and an **OR gate**:

```
        ┌─────────────┐
A ──────┤             │
        │ Half Adder 1├──── S1 (A XOR B) ──────┐
B ──────┤             │                         │
        │             ├──── C1 (A AND B) ──┐    │
        └─────────────┘                    │    │
                                           │    │
        ┌─────────────┐                    │    │
S1 ─────┤             │                    │    │
        │ Half Adder 2├──── S (Sum Output) │    │
Cin ────┤             │                    │    │
        │             ├──── C2 ────────┐   │    │
        └─────────────┘                │   │    │
                                       │   │    │
        ┌─────────────┐               │   │    │
C1 ─────┤             │               │   │    │
        │   OR Gate   ├──── Cout       │   │    │
C2 ─────┤             │               │   │    │
        └─────────────┘               │   │    │
```

**How it works:**

1. **Half Adder 1** takes inputs A and B:
   - Produces S1 = A XOR B
   - Produces C1 = A AND B

2. **Half Adder 2** takes S1 and Cin:
   - Produces S = S1 XOR Cin = A XOR B XOR Cin (final Sum)
   - Produces C2 = S1 AND Cin = (A XOR B) AND Cin

3. **OR Gate** combines the carries:
   - Cout = C1 OR C2 = (A AND B) OR ((A XOR B) AND Cin)

---

### (c) Name the type of adder [1 mark]

This is a **Full Adder**.

A full adder differs from a half adder in that it accepts a carry-in (Cin) input in addition to the two binary digits being added. This allows full adders to be cascaded (chained together) to form a ripple-carry adder for multi-bit addition.

---

### (d) Difference between Data Selector and Data Distributor [3 marks]

**Data Selector (Multiplexer / MUX):**
- Selects **one** of many input lines and routes it to a **single** output line
- Uses select/control lines to determine which input is passed to the output
- Many-to-one device
- Example: A 4-to-1 MUX has 4 data inputs, 2 select lines, and 1 output

**Data Distributor (Demultiplexer / DEMUX):**
- Takes a **single** input and routes it to **one** of many output lines
- Uses select/control lines to determine which output receives the input
- One-to-many device
- Example: A 1-to-4 DEMUX has 1 data input, 2 select lines, and 4 outputs

**Key difference:** A multiplexer funnels multiple inputs into one output (selection), while a demultiplexer distributes one input to one of multiple outputs (distribution). They perform inverse operations.

---

### (e) Missing ALU Components A-K (Hack Computer ALU) [13 marks]

The Hack ALU processes two 16-bit inputs (x and y) and produces one 16-bit output, controlled by six control bits (zx, nx, zy, ny, f, no).

| Component | Identity | Function |
|-----------|----------|----------|
| **A** | MUX (Multiplexer) | Selects between x input and 0 (zero constant), controlled by **zx** (zero x). If zx=1, output is 0; if zx=0, output is x. |
| **B** | MUX (Multiplexer) | Selects between y input and 0 (zero constant), controlled by **zy** (zero y). If zy=1, output is 0; if zy=0, output is y. |
| **C** | NOT gate | Bitwise negation of x1 (the output after the zx MUX). Produces NOT(x1). |
| **D** | NOT gate | Bitwise negation of y1 (the output after the zy MUX). Produces NOT(y1). |
| **E** | MUX (Multiplexer) | Selects between x1 and NOT(x1), controlled by **nx** (negate x). If nx=1, output is NOT(x1); if nx=0, output is x1. Produces x2. |
| **F** | MUX (Multiplexer) | Selects between y1 and NOT(y1), controlled by **ny** (negate y). If ny=1, output is NOT(y1); if ny=0, output is y1. Produces y2. |
| **G** | Adder (ADD) | Performs arithmetic addition of x2 + y2. Produces result K1. |
| **H** | AND gate | Performs bitwise AND of x2 and y2. Produces result K2. |
| **I** | MUX (Multiplexer) | Selects between AND output (K2) and Adder output (K1), controlled by **f** (function select). If f=1, output is x2+y2; if f=0, output is x2 AND y2. Produces Out1. |
| **J** | NOT gate | Bitwise negation of Out1. Produces NOT(Out1). |
| **K** | MUX (Multiplexer) | Selects between Out1 and NOT(Out1), controlled by **no** (negate output). If no=1, output is NOT(Out1); if no=0, output is Out1. Produces the final ALU output. |

**ALU Processing Pipeline:**

```
x ──→ [A: MUX(zx)] ──→ x1 ──→ [C: NOT] ──→ [E: MUX(nx)] ──→ x2 ──┐
                                                                      ├──→ [G: ADD] ──→ K1 ──┐
                                                                      ├──→ [H: AND] ──→ K2 ──┤
y ──→ [B: MUX(zy)] ──→ y1 ──→ [D: NOT] ──→ [F: MUX(ny)] ──→ y2 ──┘                        │
                                                                                              │
                                                              [I: MUX(f)] ←──────────────────┘
                                                                   │
                                                                   ▼
                                                                 Out1 ──→ [J: NOT] ──→ [K: MUX(no)] ──→ Output
```

---

## Question 3: Machine Code & Networks [30%]

### (a) Five Fundamental Elements of the Hack Computer [10 marks]

The Hack Computer is a 16-bit Von Neumann-style machine consisting of the following five fundamental elements:

**1. CPU (Central Processing Unit)**
- **ALU (Arithmetic Logic Unit):** Performs all arithmetic and logical operations (addition, subtraction, AND, OR, NOT, etc.)
- **A Register:** Holds addresses for data memory access or values for computation; also used to specify jump destinations
- **D Register:** General-purpose data register that holds values for computation
- **Program Counter (PC):** Keeps track of the address of the next instruction to be fetched from ROM

**2. Memory (RAM / Data Memory)**
- **Data Memory (16K words):** General-purpose RAM for storing variables and data (addresses 0-16383)
- **Screen Memory Map (8K words):** Memory-mapped region that controls the display output (addresses 16384-24575)
- **Keyboard Memory Map (1 word):** Memory-mapped register that reflects the currently pressed key (address 24576)

**3. ROM (Instruction Memory)**
- Stores the program as a sequence of 16-bit machine instructions
- Read-only during execution; pre-loaded with the program before execution begins
- Addressed by the Program Counter

**4. Screen (Output Device)**
- Memory-mapped display (256 rows x 512 columns, black and white)
- Controlled by writing to the screen memory map in RAM
- Each bit in the screen memory map corresponds to one pixel

**5. Keyboard (Input Device)**
- Memory-mapped input device
- The scan code of the currently pressed key appears at RAM address 24576
- When no key is pressed, the value is 0

---

### (b) OSI Network Model - Layers and Protocol Data Units [14 marks]

The OSI (Open Systems Interconnection) model defines seven layers of network communication:

| Layer | Name | Protocol Data Unit (PDU) | Function |
|-------|------|--------------------------|----------|
| **7** | Application | Data | Provides network services directly to end-user applications (HTTP, FTP, SMTP, DNS) |
| **6** | Presentation | Data | Data translation, encryption/decryption, compression/decompression (SSL/TLS, JPEG, ASCII) |
| **5** | Session | Data | Establishes, manages, and terminates sessions between applications (NetBIOS, RPC) |
| **4** | Transport | Segment | End-to-end delivery, flow control, error recovery, segmentation (TCP, UDP) |
| **3** | Network | Packet | Logical addressing and routing between networks (IP, ICMP, routers) |
| **2** | Data Link | Frame | Physical addressing (MAC), error detection, frame synchronisation (Ethernet, switches) |
| **1** | Physical | Bits | Transmission of raw bit stream over physical medium (cables, hubs, electrical signals) |

**Mnemonic (top to bottom):** All People Seem To Need Data Processing

**Mnemonic (bottom to top):** Please Do Not Throw Sausage Pizza Away

---

### (c) Significant Differences between TCP/IP Model and OSI Model [6 marks]

| Aspect | TCP/IP Model | OSI Model |
|--------|-------------|-----------|
| **Number of Layers** | 4 layers (Application, Transport, Internet, Network Access) | 7 layers (Application, Presentation, Session, Transport, Network, Data Link, Physical) |
| **Approach** | Protocol-oriented / practical model. Developed based on real-world protocols that were already in use (TCP, IP, etc.). It is a practical, implementation-first model. | Model-oriented / theoretical reference model. Developed as a conceptual framework before protocols were defined. It is a theoretical, design-first model. |
| **Delivery** | The Transport layer supports both **connection-oriented** (TCP) and **connectionless** (UDP) communication within the same layer. | The Transport layer is strictly **connection-oriented**. The Network layer supports both connection-oriented and connectionless delivery. |

**Additional distinctions:**

- **TCP/IP** combines OSI Layers 5, 6, and 7 into a single Application layer
- **TCP/IP** combines OSI Layers 1 and 2 into a single Network Access (Link) layer
- **TCP/IP** was developed by the US Department of Defense (DARPA); OSI was developed by the International Organisation for Standardisation (ISO)
- **TCP/IP** is the model actually used on the internet today; OSI remains primarily a teaching and reference tool
