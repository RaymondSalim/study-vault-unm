---
title: "Sequential Circuits"
order: 3
moduleTitle: "COMP1027 - Computer Fundamentals"
tags: ["sequential", "flip-flop", "register", "counter", "RAM"]
---

## Key Principle

:::eli10

A sequential circuit is different from a combinational one because it has memory -- it remembers what happened before. Its output depends on the current input AND what it stored from the past. It is like a combination lock that keeps track of which numbers you have already entered.

:::

:::eli15

Sequential circuits have memory: their outputs depend on both current inputs and previous state. This memory is implemented using feedback loops in latches and flip-flops. A clock signal synchronises when state changes occur. Sequential circuits enable storage (registers, RAM), counting, and state machines -- all the things that require "remembering" past events.

:::

:::eli20

Output depends on current inputs **and previous state** (has memory).

:::

## Latches vs Flip-Flops

:::eli10

Both latches and flip-flops store one bit of data. The difference is WHEN they can change. A latch can change whenever the enable signal is high (like a door that is open the whole time). A flip-flop only changes at the exact moment of a clock tick (like a camera that takes a snapshot at a precise instant).

:::

:::eli15

Latches and flip-flops are both 1-bit storage elements, but they differ in timing. Latches are level-sensitive: they can change their stored value any time the enable signal is at the active level. Flip-flops are edge-triggered: they only capture input at the precise rising (or falling) edge of the clock. Flip-flops are preferred in synchronous circuits because they change state at predictable, controlled moments.

:::

:::eli20

| Property | Latch | Flip-Flop |
|----------|-------|-----------|
| Triggering | Level-sensitive | Edge-triggered |
| When changes | While enable/clock is HIGH | Only at clock edge (rising/falling) |
| Use case | Simple storage | Synchronous circuits |

:::

## SR Latch (NOR-based)

:::eli10

An SR latch has two inputs: Set and Reset. Set turns the output to 1, Reset turns it to 0, and when both are 0 it holds its current value. But if you set both to 1 at the same time, it gets confused -- that is the "invalid" state that we must avoid.

:::

:::eli15

The SR latch is the simplest storage element. S=1 sets the output Q to 1, R=1 resets Q to 0, and S=R=0 holds the current state. The S=R=1 combination is invalid because it produces unpredictable behaviour (both outputs become 0, but the state is indeterminate when both return to 0). The D latch and D flip-flop solve this problem by ensuring S and R are never both 1.

:::

:::eli20

| S | R | Q | Q' | State |
|---|---|---|---|-------|
| 0 | 0 | Q | Q' | Hold (no change) |
| 0 | 1 | 0 | 1 | Reset |
| 1 | 0 | 1 | 0 | Set |
| 1 | 1 | ? | ? | **Invalid** (both 0) |

:::

## D Flip-Flop (most common)

:::eli10

A D flip-flop is the most commonly used memory element. At each clock tick, it captures whatever value is on its D input and holds it until the next tick. It is like taking a photo once per second -- whatever the D input shows at that moment gets "frozen" until the next photo.

:::

:::eli15

The D flip-flop is the standard building block for registers and memory. It captures the value of input D at the rising clock edge and holds that value until the next rising edge, regardless of how D changes in between. It eliminates the SR latch's invalid state by using a single data input. Chaining n D flip-flops with a shared clock creates an n-bit register.

:::

:::eli20

| Clock edge | D | Q(next) |
|-----------|---|---------|
| Rising ↑ | 0 | 0 |
| Rising ↑ | 1 | 1 |
| No edge | X | Q (hold) |

- Captures D at clock edge; holds value otherwise
- Eliminates invalid state of SR
- **Building block of registers and RAM**

:::

## JK Flip-Flop

:::eli10

A JK flip-flop is like an improved SR latch. J means "set" and K means "reset," but when both J and K are 1, instead of an error it toggles (flips the stored bit). This makes it more versatile -- it can hold, set, reset, or toggle.

:::

:::eli15

The JK flip-flop fixes the SR latch's invalid state problem differently from the D flip-flop. J=1,K=0 sets; J=0,K=1 resets; J=K=0 holds; and J=K=1 toggles (inverts the current output). This toggle behaviour is useful for building counters. A T (toggle) flip-flop is a JK with J and K tied together -- it either holds (T=0) or toggles (T=1).

:::

:::eli20

| J | K | Q(next) | Action |
|---|---|---------|--------|
| 0 | 0 | Q | Hold |
| 0 | 1 | 0 | Reset |
| 1 | 0 | 1 | Set |
| 1 | 1 | Q' | Toggle |

- Solves SR invalid state (J=K=1 toggles)
- T flip-flop = JK with J=K tied together

:::

## Registers

:::eli10

A register is a group of flip-flops that store a whole number (multiple bits) together. An 8-bit register uses 8 D flip-flops all sharing the same clock. Shift registers can slide bits left or right, like a conveyor belt for data.

:::

:::eli15

A register is a collection of n flip-flops that stores an n-bit value. All flip-flops share a common clock so they update simultaneously. Parallel-load registers accept all bits at once. Shift registers move bits one position per clock cycle (left or right), useful for serial communication and multiplication/division by 2. PISO (parallel-in, serial-out) and SIPO (serial-in, parallel-out) are common configurations.

:::

:::eli20

| Type | Function |
|------|----------|
| Parallel load | All bits loaded simultaneously on clock edge |
| Shift register | Bits shift left/right each clock cycle |
| PISO | Parallel-In, Serial-Out |
| SIPO | Serial-In, Parallel-Out |

An n-bit register = n D flip-flops sharing a clock signal.

:::

## Counters

:::eli10

A counter is a circuit that counts up (or down) by one each clock tick. A 3-bit counter counts 0, 1, 2, 3, 4, 5, 6, 7, then back to 0. It is like a digital odometer that rolls over after reaching its maximum.

:::

:::eli15

Counters are sequential circuits that cycle through a sequence of states, typically counting in binary. Ripple (asynchronous) counters chain flip-flops where each output clocks the next, making them simple but slow due to propagation delay. Synchronous counters share a single clock for all flip-flops, making them faster. Special counters include ring counters (one-hot encoding) and Johnson counters (twisted ring). A mod-N counter counts from 0 to N-1 and requires ceil(log2(N)) flip-flops.

:::

:::eli20

| Type | Sequence | Clock |
|------|----------|-------|
| Ripple (async) | Binary up/down | Each FF clocked by previous FF output |
| Synchronous | Binary up/down | All FFs share same clock |
| Ring | One-hot (0001→0010→0100→1000) | Shift register with feedback |
| Johnson | Twisted ring | Inverted feedback |

**Mod-N counter**: counts 0 to N-1, then resets. Requires ceil(log2(N)) flip-flops.

:::

## RAM (Random Access Memory)

:::eli10

RAM is like a big grid of tiny storage boxes, each holding one bit. You use an address to pick which row of boxes to read or write. SRAM (fast but expensive) uses flip-flops; DRAM (slower but cheaper) uses tiny capacitors that need refreshing.

:::

:::eli15

RAM provides read/write storage organised as an array of words. An address decoder selects which word (row) to access. SRAM uses flip-flops for each bit (fast, no refresh needed, but expensive). DRAM uses capacitors (slower, cheaper, but needs periodic refresh because charge leaks). A RAM with n address lines has 2^n addressable words, each m bits wide.

:::

:::eli20

- Built from D flip-flops (SRAM) or capacitors (DRAM)
- Address decoder selects which word (row) to read/write
- Structure: 2^n words x m bits requires n address lines, m data lines

| Type | Speed | Cost | Refresh needed |
|------|-------|------|---------------|
| SRAM | Fast | High | No |
| DRAM | Slower | Low | Yes |

:::

## Finite State Machines (FSM)

:::eli10

A finite state machine is like a simple board game where you move between a fixed number of squares based on rules. Which square you are on (your state) plus what happens next (input) determines where you move. It is how things like traffic lights and vending machines work.

:::

:::eli15

A finite state machine (FSM) has a fixed set of states stored in flip-flops, combinational logic for computing the next state (based on current state + inputs), and output logic. Moore machines produce outputs based only on the current state; Mealy machines also consider current inputs. Design follows: state diagram -> state table -> state assignment -> K-maps for next-state logic -> circuit implementation.

:::

:::eli20

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

:::
