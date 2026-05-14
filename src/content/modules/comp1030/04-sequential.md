---
title: "Sequential Circuits"
order: 4
moduleTitle: "COMP1030 - Systems & Architecture"
tags: ["sequential-circuits", "flip-flops", "registers", "counters", "state-machines"]
---

## Combinational vs Sequential

:::eli10

Combinational circuits are like calculators that forget everything after each answer. Sequential circuits are like notebooks that remember what happened before. They have memory (flip-flops) that stores information, so their output depends on both the current input AND what happened previously. Counters, registers, and state machines are all sequential.

:::

:::eli15

Sequential circuits differ from combinational by having memory -- their output depends on current inputs AND stored state. This is achieved through feedback (outputs looped back as inputs). Latches are level-triggered (transparent while enabled), flip-flops are edge-triggered (sample only at clock edges -- more predictable). Sequential circuits enable counters, registers, memory, and finite state machines.

:::

:::eli20

| Property | Combinational | Sequential |
|----------|--------------|-----------|
| Memory | No | Yes (state) |
| Output depends on | Current inputs only | Current inputs + previous state |
| Feedback | No | Yes |
| Examples | Adders, MUX | Flip-flops, counters |

:::

---

## Latches (Level-Triggered)

:::eli10

A latch is the simplest memory element -- it remembers one bit. An SR latch can be set (make it remember 1), reset (make it remember 0), or hold (keep its current value). A D latch is simpler: when enabled, it copies its input; when disabled, it holds the last value.

:::

:::eli15

Latches are level-triggered storage elements. SR latch: Set (S=1) forces output to 1, Reset (R=1) forces output to 0, both low holds state. S=R=1 is invalid (race condition). D latch: when enable is high, output follows D input (transparent); when enable is low, output holds its last value. The problem with latches is transparency -- they pass changes throughout the enable period, which complicates timing. Flip-flops solve this.

:::

:::eli20

### SR Latch (NOR-based)

| $S$ | $R$ | $Q_{next}$ | Action |
|-----|-----|------------|--------|
| 0 | 0 | $Q$ | Hold (no change) |
| 0 | 1 | 0 | Reset |
| 1 | 0 | 1 | Set |
| 1 | 1 | **Invalid** | Both outputs 0 (race condition) |

**Characteristic equation:** $Q_{next} = S + \overline{R} \cdot Q$, with constraint $SR = 0$

### D Latch (Gated)

| Enable | $D$ | $Q_{next}$ |
|--------|-----|------------|
| 0 | x | $Q$ (hold) |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

When enabled: $Q$ follows $D$ (transparent).

:::

---

## Flip-Flops (Edge-Triggered)

:::eli10

Flip-flops are like cameras that take a snapshot only at one specific moment (the clock edge). A D flip-flop captures whatever value D has at the exact instant the clock ticks, then holds that value until the next tick. This makes everything synchronised and predictable, like musicians following a conductor's beat.

:::

:::eli15

Flip-flops sample input only at a clock edge (rising or falling), not throughout a level. This eliminates transparency issues and provides predictable timing. D flip-flop (most common): Q becomes D at the clock edge. JK flip-flop: versatile (hold, set, reset, toggle). T flip-flop: toggles on each clock edge when T=1 (used in counters). Timing parameters (setup, hold, clk-to-q) determine maximum clock frequency.

:::

:::eli20

Flip-flops sample input only at the clock edge (rising or falling).

### D Flip-Flop

| $D$ | $Q_{next}$ |
|-----|------------|
| 0 | 0 |
| 1 | 1 |

$$Q_{next} = D$$

Most common flip-flop in modern designs. Samples $D$ at the active clock edge.

### SR Flip-Flop

| $S$ | $R$ | $Q_{next}$ |
|-----|-----|------------|
| 0 | 0 | $Q$ (hold) |
| 0 | 1 | 0 (reset) |
| 1 | 0 | 1 (set) |
| 1 | 1 | Invalid |

$$Q_{next} = S + \overline{R} \cdot Q$$

### JK Flip-Flop

| $J$ | $K$ | $Q_{next}$ |
|-----|-----|------------|
| 0 | 0 | $Q$ (hold) |
| 0 | 1 | 0 (reset) |
| 1 | 0 | 1 (set) |
| 1 | 1 | $\overline{Q}$ (toggle) |

$$Q_{next} = J\overline{Q} + \overline{K}Q$$

Resolves SR's invalid state by toggling.

### T Flip-Flop

| $T$ | $Q_{next}$ |
|-----|------------|
| 0 | $Q$ (hold) |
| 1 | $\overline{Q}$ (toggle) |

$$Q_{next} = T \oplus Q$$

JK with $J = K = T$. Used in counters.

:::

---

## Flip-Flop Comparison

:::eli10

Different flip-flops are good for different jobs. D flip-flops are best for storing data (like registers). T flip-flops are best for counting (they flip between 0 and 1). JK flip-flops can do everything but are more complex.

:::

:::eli15

D flip-flops are simplest and most common -- used for registers and general storage. T flip-flops naturally implement counters (toggle on each clock cycle). JK is the most versatile (can emulate D, T, or SR) but requires more complex input logic. Converting between types: a D flip-flop becomes a T by connecting D = T XOR Q.

:::

:::eli20

| Type | Inputs | Characteristic Eq. | Primary Use |
|------|--------|-------------------|-------------|
| D | D | $Q_{next} = D$ | Registers, data storage |
| SR | S, R | $Q_{next} = S + \overline{R}Q$ | Basic storage |
| JK | J, K | $Q_{next} = J\overline{Q} + \overline{K}Q$ | Versatile (all modes) |
| T | T | $Q_{next} = T \oplus Q$ | Counters |

:::

---

## Timing Parameters

:::eli10

Flip-flops need time to "see" their input properly. The setup time is how long the input must be steady BEFORE the clock tick. The hold time is how long it must stay steady AFTER. These limits determine how fast your clock can run.

:::

:::eli15

Critical timing constraints: setup time (data must be stable before clock edge), hold time (data must remain stable after clock edge), and clock-to-q delay (time from clock edge to output change). The maximum clock frequency is limited by the slowest path through combinational logic between two flip-flops: f_max = 1 / (t_clk-to-q + t_propagation + t_setup). Violating setup/hold causes metastability (unpredictable output).

:::

:::eli20

| Parameter | Definition |
|-----------|-----------|
| $t_{setup}$ | Minimum time data must be stable **before** clock edge |
| $t_{hold}$ | Minimum time data must be stable **after** clock edge |
| $t_{clk-to-q}$ | Delay from clock edge to output change |
| $t_{propagation}$ | Time for signal to pass through combinational logic |

**Maximum clock frequency:**

$$f_{max} = \frac{1}{t_{clk-to-q} + t_{propagation} + t_{setup}}$$

:::

---

## Registers

:::eli10

A register is a group of flip-flops working together to store a multi-bit number. They all share the same clock so they all update at the same time. A shift register passes data along like a bucket brigade -- each flip-flop passes its value to the next one on every clock tick.

:::

:::eli15

Registers are groups of flip-flops sharing a clock, storing multi-bit values. Types: parallel-in/parallel-out (PIPO -- load and read all bits at once), serial-in/serial-out (SISO -- shift one bit per clock), and combinations. Shift registers move data one position per clock cycle, useful for serial-to-parallel conversion, multiplication/division by 2, and creating time delays.

:::

:::eli20

A register = group of flip-flops sharing a common clock.

| Type | Behaviour |
|------|-----------|
| Parallel-in, parallel-out (PIPO) | Load/read all bits simultaneously |
| Serial-in, serial-out (SISO) | Shift data one bit per clock |
| Serial-in, parallel-out (SIPO) | Serial load, read all bits |
| Parallel-in, serial-out (PISO) | Parallel load, shift out |

### Shift Register

Data shifts one position per clock cycle. Direction: left or right.

**Applications:** Serial-to-parallel conversion, delay lines, multiplication/division by 2.

:::

---

## Counters

:::eli10

Counters are circuits that count up (or down) by one each clock tick. Like a tally counter that clicks up each time you press it. Some counters count in binary (0,1,2,3...), others count in special patterns. They use T or D flip-flops that toggle in sequence.

:::

:::eli15

Counters increment (or decrement) their stored value on each clock edge. Asynchronous (ripple) counters: each flip-flop's output clocks the next -- simple but accumulates delay. Synchronous counters: all flip-flops share one clock -- faster but need more logic. An n-bit binary counter counts 0 to 2^n-1 using T flip-flops. Special counters: BCD (resets at 10), ring (one-hot rotating), Johnson (complemented feedback).

:::

:::eli20

### Asynchronous (Ripple) Counter

- Each flip-flop triggered by the output of the previous one
- Simple but slow (ripple delay accumulates)
- $n$-bit counter counts $0$ to $2^n - 1$

### Synchronous Counter

- All flip-flops share the same clock
- Faster (no ripple delay)
- Requires more complex logic for state transitions

### Common Counter Types

| Type | Sequence | Flip-flops needed |
|------|----------|------------------|
| Binary up | 000 → 001 → 010 → ... → 111 | $n$ T flip-flops |
| Binary down | 111 → 110 → ... → 000 | $n$ T flip-flops |
| BCD (mod-10) | 0000 → ... → 1001 → 0000 | 4 flip-flops + reset logic |
| Ring | 1000 → 0100 → 0010 → 0001 | $n$ D flip-flops |
| Johnson | 0000 → 1000 → 1100 → ... | $n$ D flip-flops |

:::

---

## Finite State Machines (FSMs)

:::eli10

A state machine is like a vending machine. It remembers what "state" it's in (how many coins you've inserted) and reacts to inputs (more coins, pressing a button) by changing state and producing outputs (dispensing a drink). You design them by drawing circles (states) and arrows (transitions).

:::

:::eli15

Finite State Machines model systems with a fixed number of states, transitioning between them based on inputs. Moore machines output based on state only (simpler, glitch-free). Mealy machines output based on state AND input (fewer states, faster response). Design process: define states and transitions (state diagram), assign binary codes, derive next-state logic using truth tables/K-maps, implement with flip-flops and combinational logic.

:::

:::eli20

| Component | Role |
|-----------|------|
| States | Set of possible configurations |
| Inputs | Signals driving transitions |
| Outputs | Signals produced |
| Transition function | Next state = $f$(current state, inputs) |
| Output function | Depends on FSM type |

### Moore vs Mealy

| Property | Moore | Mealy |
|----------|-------|-------|
| Output depends on | State only | State + inputs |
| Output changes | At clock edge | Between clock edges (asynchronous) |
| States needed | Generally more | Generally fewer |
| Output timing | Synchronous, glitch-free | Can be faster, may glitch |

### FSM Design Steps

1. Define states and transitions (state diagram)
2. Assign binary codes to states (state encoding)
3. Derive next-state logic (truth table / K-map)
4. Derive output logic
5. Implement with flip-flops + combinational logic

---

## Practice

<details>
<summary>A 3-bit synchronous up-counter uses T flip-flops. What are the T inputs for each flip-flop?</summary>

For a binary up-counter:
- $T_0 = 1$ (LSB always toggles)
- $T_1 = Q_0$ (toggles when $Q_0 = 1$)
- $T_2 = Q_0 \cdot Q_1$ (toggles when both lower bits are 1)

General pattern: $T_i = Q_0 \cdot Q_1 \cdots Q_{i-1}$
</details>

<details>
<summary>Convert a D flip-flop to a T flip-flop</summary>

A T flip-flop toggles when $T=1$:
$$Q_{next} = T \oplus Q$$

Connect $D = T \oplus Q$ (XOR the T input with the current Q output and feed to D).
</details>

<details>
<summary>Given setup time = 2ns, propagation delay = 5ns, clk-to-q = 1ns, what is the max clock frequency?</summary>

$$f_{max} = \frac{1}{t_{clk-to-q} + t_{prop} + t_{setup}} = \frac{1}{1 + 5 + 2} = \frac{1}{8\text{ns}} = 125\text{ MHz}$$
</details>

<details>
<summary>Design a Moore FSM that detects the sequence "101" in a serial bit stream</summary>

**States:**
- $S_0$: Initial / no match
- $S_1$: Seen "1"
- $S_2$: Seen "10"
- $S_3$: Seen "101" → output = 1

**Transitions:**

| Current | Input=0 | Input=1 |
|---------|---------|---------|
| $S_0$ | $S_0$ | $S_1$ |
| $S_1$ | $S_2$ | $S_1$ |
| $S_2$ | $S_0$ | $S_3$ |
| $S_3$ | $S_2$ | $S_1$ |

Output = 1 only in $S_3$.
</details>

:::
