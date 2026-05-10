---
title: "Sequential Circuits"
order: 3
moduleTitle: "COMP1027 - Computer Fundamentals"
tags: ["sequential", "flip-flop", "register", "counter", "RAM"]
---

## Key Principle

Output depends on current inputs **and previous state** (has memory).

## Latches vs Flip-Flops

| Property | Latch | Flip-Flop |
|----------|-------|-----------|
| Triggering | Level-sensitive | Edge-triggered |
| When changes | While enable/clock is HIGH | Only at clock edge (rising/falling) |
| Use case | Simple storage | Synchronous circuits |

## SR Latch (NOR-based)

| S | R | Q | Q' | State |
|---|---|---|---|-------|
| 0 | 0 | Q | Q' | Hold (no change) |
| 0 | 1 | 0 | 1 | Reset |
| 1 | 0 | 1 | 0 | Set |
| 1 | 1 | ? | ? | **Invalid** (both 0) |

## D Flip-Flop (most common)

| Clock edge | D | Q(next) |
|-----------|---|---------|
| Rising ↑ | 0 | 0 |
| Rising ↑ | 1 | 1 |
| No edge | X | Q (hold) |

- Captures D at clock edge; holds value otherwise
- Eliminates invalid state of SR
- **Building block of registers and RAM**

## JK Flip-Flop

| J | K | Q(next) | Action |
|---|---|---------|--------|
| 0 | 0 | Q | Hold |
| 0 | 1 | 0 | Reset |
| 1 | 0 | 1 | Set |
| 1 | 1 | Q' | Toggle |

- Solves SR invalid state (J=K=1 toggles)
- T flip-flop = JK with J=K tied together

## Registers

| Type | Function |
|------|----------|
| Parallel load | All bits loaded simultaneously on clock edge |
| Shift register | Bits shift left/right each clock cycle |
| PISO | Parallel-In, Serial-Out |
| SIPO | Serial-In, Parallel-Out |

An n-bit register = n D flip-flops sharing a clock signal.

## Counters

| Type | Sequence | Clock |
|------|----------|-------|
| Ripple (async) | Binary up/down | Each FF clocked by previous FF output |
| Synchronous | Binary up/down | All FFs share same clock |
| Ring | One-hot (0001→0010→0100→1000) | Shift register with feedback |
| Johnson | Twisted ring | Inverted feedback |

**Mod-N counter**: counts 0 to N-1, then resets. Requires ceil(log2(N)) flip-flops.

## RAM (Random Access Memory)

- Built from D flip-flops (SRAM) or capacitors (DRAM)
- Address decoder selects which word (row) to read/write
- Structure: 2^n words x m bits requires n address lines, m data lines

| Type | Speed | Cost | Refresh needed |
|------|-------|------|---------------|
| SRAM | Fast | High | No |
| DRAM | Slower | Low | Yes |

## Finite State Machines (FSM)

| Component | Role |
|-----------|------|
| States | Stored in flip-flops |
| Next-state logic | Combinational circuit |
| Output logic | Mealy (depends on state+input) or Moore (state only) |

Design steps: State diagram -> State table -> State assignment -> K-maps -> Circuit

<details>
<summary>Practice: Design a mod-6 synchronous counter</summary>

Need ceil(log2(6)) = 3 flip-flops (Q2, Q1, Q0).

Count: 000→001→010→011→100→101→000...

When Q2Q1Q0 = 101 (5), next state = 000 (reset).

Use JK flip-flops and derive J/K inputs from state table and K-maps for each flip-flop.
</details>

<details>
<summary>Practice: How many D flip-flops to store a 32-bit word?</summary>

**32 D flip-flops** -- one per bit. They share a common clock and load-enable signal.
</details>

<details>
<summary>Practice: Convert SR latch to D latch</summary>

Add an inverter: connect D to S, and D' (NOT D) to R.

This ensures S and R are never both 1 (eliminates invalid state).
When D=1: S=1, R=0 → Set.
When D=0: S=0, R=1 → Reset.
</details>
