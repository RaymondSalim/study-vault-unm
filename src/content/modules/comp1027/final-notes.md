---
title: "Final Notes (Cheat Sheet)"
order: 97
moduleTitle: "COMP1027 - Computer Fundamentals"
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

## SIDE 1: DIGITAL LOGIC & CIRCUITS

### Boolean Algebra Laws

| Law | AND form | OR form |
|-----|----------|---------|
| Identity | $A \cdot 1 = A$ | $A + 0 = A$ |
| Null | $A \cdot 0 = 0$ | $A + 1 = 1$ |
| Idempotent | $A \cdot A = A$ | $A + A = A$ |
| Complement | $A \cdot A' = 0$ | $A + A' = 1$ |
| Commutative | $A \cdot B = B \cdot A$ | $A + B = B + A$ |
| Associative | $(A \cdot B) \cdot C = A \cdot (B \cdot C)$ | $(A+B)+C = A+(B+C)$ |
| Distributive | $A \cdot (B+C) = AB+AC$ | $A+(BC) = (A+B)(A+C)$ |
| Absorption | $A \cdot (A+B) = A$ | $A + AB = A$ |
| De Morgan's | $(AB)' = A'+B'$ | $(A+B)' = A' \cdot B'$ |

---

### Logic Gates

| Gate | Expression | 00 | 01 | 10 | 11 |
|------|-----------|----|----|----|----|
| AND | $A \cdot B$ | 0 | 0 | 0 | 1 |
| OR | $A + B$ | 0 | 1 | 1 | 1 |
| NOT | $A'$ | 1 | 0 | - | - |
| NAND | $(AB)'$ | 1 | 1 | 1 | 0 |
| NOR | $(A+B)'$ | 1 | 0 | 0 | 0 |
| XOR | $A \oplus B$ | 0 | 1 | 1 | 0 |
| XNOR | $(A \oplus B)'$ | 1 | 0 | 0 | 1 |

**NAND universality** -- build any gate from NAND only:
- NOT A = NAND(A, A)
- A AND B = NAND(NAND(A,B), NAND(A,B))
- A OR B = NAND(NAND(A,A), NAND(B,B))

**K-Map rules:** Groups must be rectangular, power-of-2 size. Larger groups = simpler expression. Groups can wrap edges. Every 1 must be covered. Overlapping allowed.

---

### Combinational Circuits

**Half Adder:** Sum = $A \oplus B$, Carry = $A \cdot B$ (2 inputs, no carry-in)

**Full Adder:** Sum = $A \oplus B \oplus C_{in}$, $C_{out} = AB + C_{in}(A \oplus B)$ (3 inputs)

**Ripple-Carry Adder:** Chain $n$ full adders. $C_{out}$ of bit $i$ feeds $C_{in}$ of bit $i+1$. Delay: $O(n)$.

**Subtraction:** Invert B + set $C_{in} = 1$ (2's complement: $A - B = A + \overline{B} + 1$)

**ALU:** Control bits select operation (00=AND, 01=OR, 10=ADD, 11=SUB). Flags: Zero (Z), Negative (N), Overflow (V), Carry (C).

**Multiplexer (MUX):** $n$ select lines choose 1 of $2^n$ inputs. 2:1 MUX: $Out = s' \cdot I_0 + s \cdot I_1$. Any Boolean function implementable with $2^n$:1 MUX.

**Decoder:** $n$ inputs -> $2^n$ outputs (exactly one high). 2-to-4: $D_0=A'B'$, $D_1=A'B$, $D_2=AB'$, $D_3=AB$.

---

### Sequential Circuits

**Key difference:** Output depends on current inputs AND previous state (has memory).

**Latch vs Flip-Flop:**

| | Latch | Flip-Flop |
|---|-------|-----------|
| Triggering | Level-sensitive | Edge-triggered |
| Changes when | Enable HIGH | Clock edge only |

**SR Latch:** S=1 sets Q=1; R=1 resets Q=0; S=R=0 holds; **S=R=1 INVALID**

**D Flip-Flop:** Captures D at rising clock edge, holds otherwise. Building block of registers/RAM. Eliminates SR invalid state.

**JK Flip-Flop:** J=1,K=0: set | J=0,K=1: reset | J=K=0: hold | **J=K=1: toggle**

**Registers:** $n$-bit register = $n$ D flip-flops sharing clock. Types: parallel load, shift register (PISO/SIPO).

**Counters:** Ripple (async, each FF clocked by previous -- simple but slow) | Synchronous (shared clock -- faster). Mod-N counter needs $\lceil \log_2 N \rceil$ flip-flops.

**RAM:** SRAM (flip-flops, fast, no refresh) vs DRAM (capacitors, slower, cheap, needs refresh). Structure: $2^n$ words $\times$ $m$ bits, needs $n$ address lines.

**FSM:** States (flip-flops) + Next-state logic (combinational) + Output logic. Moore (output = f(state)) vs Mealy (output = f(state, input)).

---

## SIDE 2: ARCHITECTURE, ASSEMBLY, OS & NETWORKING

### Computer Architecture

| Feature | Von Neumann | Harvard |
|---------|-------------|---------|
| Memory | Single (data + instructions) | Separate |
| Bus | Shared (bottleneck) | Separate buses |
| Speed | Slower | Faster (parallel access) |
| Example | General PCs | DSPs, microcontrollers |

**CPU Components:** ALU (arithmetic/logic) | Control Unit (decode, control signals) | Registers (fast storage) | PC (next instruction address) | IR (current instruction) | MAR (address to access) | MDR (data being transferred) | Status register (Z, N, C, V flags)

**Fetch-Decode-Execute:**
1. **Fetch:** MAR <- PC; Memory[MAR] -> MDR; MDR -> IR; PC <- PC+1
2. **Decode:** CU interprets opcode, identifies operands
3. **Execute:** ALU operates; result stored; flags updated

**Buses:** Address bus (unidirectional, CPU->Memory, $n$ bits = $2^n$ addresses) | Data bus (bidirectional) | Control bus (read/write signals)

**Memory Hierarchy:** Registers (fastest, bytes) > Cache L1/L2/L3 (KB-MB) > RAM (GB) > SSD/HDD (TB, slowest)

**Interrupts:** Hardware (keyboard, timer) | Software (syscall) | Exception (div by zero). Handling: Save state -> ISR -> Restore state -> Resume.

---

### HACK Assembly (Nand2Tetris)

**Registers:** A (address/data), D (data only), M = RAM[A]

**A-instruction:** `@value` -> format: `0vvvvvvvvvvvvvvv` (bit 15=0, bits 14-0 = value)

**C-instruction:** format: `111accccccdddjjj`
- a=0: ALU uses A; a=1: ALU uses M
- dest: d1d2d3 -> A,D,M (e.g., 010=D, 011=MD, 001=M)
- jump: 000=none, 001=JGT, 010=JEQ, 011=JGE, 100=JLT, 101=JNE, 110=JLE, 111=JMP

**Common patterns:**
```
@10; D=A; @0; M=D     // RAM[0] = 10
@LOOP; 0;JMP          // infinite loop
@0; D=M; @1; M=D+M    // RAM[1] = RAM[0]+RAM[1]
```

**Addressing Modes:** Immediate (ADD #5, value itself) | Direct (ADD 100, at address 100) | Indirect (ADD (100), pointer) | Register (ADD R1) | Indexed (ADD 100(R1), base+offset)

**Traps:** @value loads A, NOT M. D=A gives address value; D=M gives memory contents. Jump checks ALU output, not D.

---

### Operating Systems

**Functions:** Process management | Memory management | File system | I/O management | Security | User interface

**Process States:** New -> Ready -> Running -> Terminated; Running -> Waiting (blocked) -> Ready

**Scheduling Algorithms:**

| Algorithm | Preemptive? | Starvation? |
|-----------|-------------|-------------|
| FCFS | No | No |
| SJF | No | Yes (long jobs) |
| SRTF | Yes | Yes |
| Round Robin | Yes | No |
| Priority | Either | Yes (low priority) |

**Context switch:** Save/restore all registers -- has overhead cost.

**Paging:** Logical memory -> pages; Physical memory -> frames (same size!). Page table maps pages to frames. Logical address = (page number, offset). Physical address = (frame number, same offset).

**Page Replacement:** FIFO (oldest out) | LRU (least recently used, near-optimal) | Optimal (theoretical, future knowledge)

**Usable hosts** = $2^h - 2$ (subtract network + broadcast addresses)

**Kernel vs User mode:** Kernel = full hardware access (OS); User = restricted (apps). Transition via system call (trap).

---

### Networking

**OSI Model (top to bottom):** Application (7, HTTP/DNS) | Presentation (6, SSL) | Session (5) | Transport (4, TCP/UDP) | Network (3, IP, Router) | Data Link (2, Ethernet, Switch) | Physical (1, bits, Hub)

**Mnemonic:** All People Seem To Need Data Processing

**TCP vs UDP:**

| | TCP | UDP |
|---|-----|-----|
| Connection | 3-way handshake | Connectionless |
| Reliability | Guaranteed, ordered | No guarantee |
| Speed | Slower (overhead) | Faster |
| Use | Web, email, FTP | Streaming, DNS, gaming |

**TCP 3-way handshake:** SYN -> SYN-ACK -> ACK

**IPv4 Classes:**

| Class | First octet | Mask | Hosts/network |
|-------|-------------|------|---------------|
| A | 1-126 | /8 | ~16M |
| B | 128-191 | /16 | 65,534 |
| C | 192-223 | /24 | 254 |

**Private ranges:** 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16

**Subnetting:** Network addr = host bits all 0; Broadcast = host bits all 1. /26 = 62 hosts, /27 = 30 hosts, /28 = 14 hosts.

**Key Protocols:** HTTP(80) | HTTPS(443) | DNS(53) | DHCP(67/68) | FTP(20/21) | SMTP(25) | SSH(22)

**DHCP (DORA):** Discover -> Offer -> Request -> Acknowledge

**DNS Resolution:** Local cache -> Recursive resolver -> Root server -> TLD server -> Authoritative server

**Devices:** Hub (L1, broadcasts all) | Switch (L2, forwards by MAC) | Router (L3, routes by IP) | Firewall (L3-7, filters)

**Traps:** 127.x.x.x = loopback (not usable Class A). DNS primarily uses UDP. Switch != Router (L2 vs L3). Address bus is UNIDIRECTIONAL.
