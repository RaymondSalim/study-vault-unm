---
title: "Study Order"
order: 94
moduleTitle: "COMP1030 - Systems & Architecture"
tags: ["study-plan", "dependencies", "learning-path"]
---

# Study Order

## Recommended Learning Path

| # | Topic | Why this order | Estimated time |
|---|-------|---------------|----------------|
| 1 | Number Systems | Foundation for everything -- binary, hex, two's complement, IEEE 754 are used throughout | 4-5 hours |
| 2 | Boolean Logic | Builds directly on binary; needed to understand gates and circuits | 3-4 hours |
| 3 | Combinational Circuits | Applies Boolean logic to build MUX, adders, ALU | 4-5 hours |
| 4 | Sequential Circuits | Adds state/memory to combinational logic; flip-flops, counters, FSMs | 4-5 hours |
| 5 | CPU Architecture | Combines combinational + sequential to form the datapath and control unit | 5-6 hours |
| 6 | Assembly (HACK) | Now that you understand the hardware, learn to program it | 4-5 hours |
| 7 | Memory Hierarchy | Builds on CPU knowledge; explains caches, RAM, and performance | 3-4 hours |

## Rationale

The module follows a strict bottom-up approach: each layer depends on the one below it. Number systems underpin Boolean logic, which underpins circuits, which combine into processors, which you then program and optimise with memory hierarchy knowledge.

## Dependencies Diagram

```
Number Systems
    |
    v
Boolean Logic
    |
    v
Combinational Circuits
    |
    v
Sequential Circuits
    |
    v
CPU Architecture
   / \
  v   v
Assembly   Memory Hierarchy
```
