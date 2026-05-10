---
title: "Operating Systems"
order: 6
moduleTitle: "COMP1027 - Computer Fundamentals"
tags: ["OS", "process", "memory-management", "file-system"]
---

## OS Functions

| Function | Role |
|----------|------|
| Process management | Create, schedule, terminate processes |
| Memory management | Allocate/deallocate, virtual memory |
| File system | Organise, store, retrieve files |
| I/O management | Interface with hardware devices |
| Security | Access control, authentication |
| User interface | CLI / GUI shell |

## Process Management

### Process States

```
New → Ready → Running → Terminated
              ↑    ↓
              Ready ← Waiting (blocked)
```

| State | Description |
|-------|-------------|
| New | Process being created |
| Ready | Waiting for CPU |
| Running | Currently executing |
| Waiting | Blocked on I/O or event |
| Terminated | Finished execution |

### Scheduling Algorithms

| Algorithm | Type | Preemptive? | Starvation? |
|-----------|------|-------------|-------------|
| FCFS (First Come First Served) | Non-preemptive | No | No |
| SJF (Shortest Job First) | Non-preemptive | No | Yes (long jobs) |
| SRTF (Shortest Remaining Time) | Preemptive | Yes | Yes |
| Round Robin | Preemptive | Yes | No |
| Priority | Either | Either | Yes (low priority) |

**Context switch**: Save registers of current process, load registers of next process. Has overhead cost.

## Memory Management

| Technique | Description |
|-----------|-------------|
| Contiguous allocation | Each process gets one block |
| Paging | Memory divided into fixed-size frames; process into pages |
| Segmentation | Logical divisions (code, stack, heap) |
| Virtual memory | Use disk as extension of RAM; page faults trigger swap |

### Paging

| Term | Definition |
|------|-----------|
| Page | Fixed-size block of logical memory |
| Frame | Fixed-size block of physical memory |
| Page table | Maps pages → frames |
| Page fault | Requested page not in RAM; must load from disk |

**Logical address** = (page number, offset)
**Physical address** = (frame number, offset)

### Page Replacement Algorithms

| Algorithm | Strategy | Optimal? |
|-----------|----------|----------|
| FIFO | Replace oldest page | No |
| LRU | Replace least recently used | Near-optimal |
| Optimal | Replace page not needed longest | Yes (theoretical) |

## File Systems

| Concept | Description |
|---------|-------------|
| File | Named collection of related data |
| Directory | Container for files and subdirectories |
| Path | Location specifier (absolute or relative) |
| Metadata | Name, size, permissions, timestamps |

### Allocation Methods

| Method | Pros | Cons |
|--------|------|------|
| Contiguous | Fast sequential access | External fragmentation |
| Linked | No fragmentation | Slow random access |
| Indexed (i-node) | Fast random access | Index block overhead |

## Kernel vs User Mode

| Aspect | Kernel mode | User mode |
|--------|-------------|-----------|
| Privileges | Full hardware access | Restricted |
| Code | OS kernel | Applications |
| Transition | System call (trap) | Return from syscall |

<details>
<summary>Practice: Round Robin with quantum=4, processes P1(6), P2(3), P3(8)</summary>

| Time | Process | Remaining after |
|------|---------|----------------|
| 0-4 | P1 | P1=2, P2=3, P3=8 |
| 4-7 | P2 | P1=2, P2=0, P3=8 |
| 7-11 | P3 | P1=2, P3=4 |
| 11-13 | P1 | P1=0, P3=4 |
| 13-17 | P3 | P3=0 |

Completion: P2=7, P1=13, P3=17
</details>

<details>
<summary>Practice: Logical address 3,100 with page size 256. Which frame?</summary>

Page number = 3, offset = 100.

Look up page table: if page 3 maps to frame 7, then physical address = (7 * 256) + 100 = **1892**.

The offset stays the same; only the page/frame number changes.
</details>

<details>
<summary>Practice: FIFO page replacement with 3 frames, reference string 1,2,3,4,1,2,5</summary>

| Access | Frames | Fault? |
|--------|--------|--------|
| 1 | [1, -, -] | Yes |
| 2 | [1, 2, -] | Yes |
| 3 | [1, 2, 3] | Yes |
| 4 | [4, 2, 3] | Yes (replace 1, oldest) |
| 1 | [4, 1, 3] | Yes (replace 2) |
| 2 | [4, 1, 2] | Yes (replace 3) |
| 5 | [5, 1, 2] | Yes (replace 4) |

Total page faults: **7**
</details>
