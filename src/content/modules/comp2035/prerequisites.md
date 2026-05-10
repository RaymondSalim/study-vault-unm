---
title: "Prerequisites"
order: 96
moduleTitle: "COMP2035 - Operating Systems & Concurrency"
tags: ["prerequisites", "preparation", "self-assessment"]
---

# Prerequisites

## Required Background Knowledge

| Area | Topics Needed | Why |
|------|---------------|-----|
| Computer Architecture | CPU, registers, memory hierarchy, instruction cycle | OS manages hardware resources directly |
| Programming (C/Java) | Pointers, memory allocation, basic I/O | Code examples use low-level constructs |
| Data Structures | Queues, linked lists, trees | Scheduling queues, page tables, directory trees |
| Basic Maths | Binary arithmetic, logarithms, modular arithmetic | Address translation, page calculations |

## Helpful Prior Modules

- **COMP1011 - Computer Fundamentals** -- CPU architecture, memory hierarchy, binary representation
- **COMP1013 - Algorithms & Data Structures** -- Queues, linked lists, trees (used extensively in OS internals)
- **COMP1012 - Programming** -- C/Java programming, pointers, memory management concepts
- **Any Systems module** -- General understanding of how software interacts with hardware

## Key Concepts You Should Already Know

1. How a CPU executes instructions (fetch-decode-execute cycle)
2. Difference between RAM and disk storage
3. What a pointer is and how dynamic memory allocation works
4. FIFO and priority queue data structures
5. Binary to decimal conversion and basic address arithmetic

## Self-Assessment Test

Answer these before starting the module. If you struggle with more than 2, review the prerequisites first.

| # | Question | Expected Answer |
|---|----------|-----------------|
| 1 | What is the purpose of the program counter (PC) register? | It holds the address of the next instruction to execute |
| 2 | If a system has 32-bit addresses, what is the maximum addressable memory? | 2^32 = 4 GB |
| 3 | What data structure would you use to implement a "first come, first served" queue? | A FIFO queue (linked list or circular buffer) |
| 4 | In C, what does `malloc(100)` do? | Allocates 100 bytes of heap memory and returns a pointer to it |
| 5 | Convert the binary address 1010 0000 to decimal. | 160 |
