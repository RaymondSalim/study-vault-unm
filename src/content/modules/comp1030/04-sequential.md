---
title: "Sequential Circuits"
order: 4
moduleTitle: "COMP1030 - Systems & Architecture"
tags: ["sequential-circuits", "flip-flops", "registers", "counters", "state-machines"]
---

## Combinational vs Sequential

| Property | Combinational | Sequential |
|----------|--------------|-----------|
| Memory | No | Yes (state) |
| Output depends on | Current inputs only | Current inputs + previous state |
| Feedback | No | Yes |
| Examples | Adders, MUX | Flip-flops, counters |

---

## Latches (Level-Triggered)

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

---

## Flip-Flops (Edge-Triggered)

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

---

## Flip-Flop Comparison

| Type | Inputs | Characteristic Eq. | Primary Use |
|------|--------|-------------------|-------------|
| D | D | $Q_{next} = D$ | Registers, data storage |
| SR | S, R | $Q_{next} = S + \overline{R}Q$ | Basic storage |
| JK | J, K | $Q_{next} = J\overline{Q} + \overline{K}Q$ | Versatile (all modes) |
| T | T | $Q_{next} = T \oplus Q$ | Counters |

---

## Timing Parameters

| Parameter | Definition |
|-----------|-----------|
| $t_{setup}$ | Minimum time data must be stable **before** clock edge |
| $t_{hold}$ | Minimum time data must be stable **after** clock edge |
| $t_{clk-to-q}$ | Delay from clock edge to output change |
| $t_{propagation}$ | Time for signal to pass through combinational logic |

**Maximum clock frequency:**

$$f_{max} = \frac{1}{t_{clk-to-q} + t_{propagation} + t_{setup}}$$

---

## Registers

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

---

## Counters

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

---

## Finite State Machines (FSMs)

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
