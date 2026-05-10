---
title: "Quick Reference"
order: 90
moduleTitle: "COMP2035 - OS & Concurrency"
tags: ["reference", "algorithms", "comparison", "cheat-sheet"]
---

# Quick Reference

## Scheduling Algorithms

| Algorithm | Preemptive | Starvation | Optimal For | Key Weakness |
|-----------|:----------:|:----------:|-------------|--------------|
| FCFS | No | No | Simplicity | Convoy effect |
| SJF | No | Yes | Avg turnaround | Needs burst prediction |
| SRTF | Yes | Yes | Avg turnaround | Needs burst prediction |
| Priority | Both | Yes | Priority workloads | Starvation (fix: aging) |
| Round Robin | Yes | No | Response time | Context switch overhead |
| MLFQ | Yes | No (w/ boost) | General purpose | Complex tuning |

## Page Replacement Algorithms

| Algorithm | Belady's Anomaly | Complexity | Notes |
|-----------|:----------------:|:----------:|-------|
| OPT | No | - | Theoretical best (not implementable) |
| FIFO | Yes | O(1) | Simple but suboptimal |
| LRU | No | O(n) or hw | Best practical, expensive to implement exactly |
| Clock | Yes (approx) | O(1) amortised | Approximation of LRU |
| LFU | No | O(log n) | Frequency-based |

## Disk Scheduling Algorithms

| Algorithm | Starvation | Fairness | Best For |
|-----------|:----------:|:--------:|----------|
| FCFS | No | High | Light load |
| SSTF | Yes | Low | Throughput |
| SCAN | No | Medium | General use |
| C-SCAN | No | High | Uniform response |
| LOOK/C-LOOK | No | High | Practical default |

## Synchronisation Primitives

| Primitive | Type | Key Property |
|-----------|------|--------------|
| Spinlock | Busy-wait | Good for short CS on multicore |
| Mutex | Blocking | Binary lock with ownership |
| Binary Semaphore | Blocking | Like mutex, no ownership |
| Counting Semaphore | Blocking | Allows up to N concurrent |
| Monitor | Blocking | Encapsulates data + sync |
| Condition Variable | Blocking | Used inside monitors for wait/signal |

## Deadlock at a Glance

| Strategy | Summary |
|----------|---------|
| Prevention | Break a Coffman condition at design time |
| Avoidance | Banker's algorithm -- check safety before granting |
| Detection | Periodically check for cycles / unsafe states |
| Recovery | Kill processes or preempt resources |

### Coffman Conditions Mnemonic: **MHNC**
- **M**utual exclusion
- **H**old and wait
- **N**o preemption
- **C**ircular wait

## Memory Formulas

| Formula | Meaning |
|---------|---------|
| $\text{Page \#} = \lfloor \text{addr} / \text{page\_size} \rfloor$ | Extract page number |
| $\text{Offset} = \text{addr} \mod \text{page\_size}$ | Extract offset |
| $\text{EAT} = h(T_{\text{TLB}}+T_m) + (1-h)(T_{\text{TLB}}+2T_m)$ | Effective access time |
| $\text{EAT}_{\text{pf}} = (1-p) \cdot T_m + p \cdot T_{\text{pf}}$ | With page faults |
| $\text{Pages} = 2^{m-n}$ | Number of pages ($m$ = addr bits, $n$ = offset bits) |

## Process Scheduling Formulas

| Metric | Formula |
|--------|---------|
| Turnaround | $T_{\text{completion}} - T_{\text{arrival}}$ |
| Waiting | $T_{\text{turnaround}} - T_{\text{burst}}$ |
| Response | $T_{\text{first\_run}} - T_{\text{arrival}}$ |
| Throughput | $\frac{\text{\# completed}}{\text{total time}}$ |
| CPU Utilisation | $1 - p^n$ ($p$ = I/O fraction, $n$ = degree of multiprogramming) |

## inode File Size

For block size $B$, pointer size $P$, entries per block $k = B/P$:

$$\text{Max Size} = (d + k + k^2 + k^3) \times B$$

Where $d$ = number of direct pointers.

## Key Numbers

| Quantity | Typical Value |
|----------|--------------|
| Page size | 4 KB |
| TLB entries | 64 -- 1024 |
| TLB hit rate | > 99% |
| Context switch time | 1-10 us |
| Disk seek time | 3-15 ms |
| Page fault penalty | ~10 ms |
| Memory access | ~100 ns |
