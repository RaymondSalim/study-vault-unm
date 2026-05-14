---
title: "Operating Systems"
order: 6
moduleTitle: "COMP1027 - Computer Fundamentals"
tags: ["OS", "process", "memory-management", "file-system"]
---

## OS Functions

:::eli10

An operating system (like Windows, macOS, or Linux) is the manager of your computer. It decides which program gets to use the CPU, gives programs memory to work in, organises your files, talks to hardware devices, and keeps things secure. Without it, programs would fight over resources.

:::

:::eli15

The operating system manages all hardware resources and provides services to applications. Its core functions include process management (creating, scheduling, and terminating programs), memory management (allocating RAM and implementing virtual memory), file system management (organising persistent storage), I/O management (interfacing with hardware devices), security (access control), and providing a user interface (command line or graphical shell).

:::

:::eli20

| Function | Role |
|----------|------|
| Process management | Create, schedule, terminate processes |
| Memory management | Allocate/deallocate, virtual memory |
| File system | Organise, store, retrieve files |
| I/O management | Interface with hardware devices |
| Security | Access control, authentication |
| User interface | CLI / GUI shell |

:::

## Process Management

:::eli10

A process is a program that is running. The OS juggles many processes at once by giving each one a short turn on the CPU. A process can be in different states: waiting for its turn (ready), currently running, waiting for something like a file to load (blocked), or finished (terminated).

:::

:::eli15

A process is an instance of a running program. It transitions through states: New (being created), Ready (waiting for CPU), Running (executing on CPU), Waiting/Blocked (waiting for I/O or an event), and Terminated (done). The OS scheduler decides which ready process gets the CPU next, using algorithms like FCFS, Shortest Job First, Round Robin (which gives each process a fixed time slice), or Priority scheduling. Context switching (saving/restoring register state) has overhead.

:::

:::eli20

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

:::

## Memory Management

:::eli10

Memory management is how the OS shares RAM between programs. Paging divides memory into equal-sized blocks (pages) so programs can use non-contiguous chunks of RAM. Virtual memory lets programs think they have more RAM than physically exists by swapping unused pages to the hard drive.

:::

:::eli15

The OS manages how physical memory is shared among processes. Paging divides both logical memory (into pages) and physical memory (into frames) into fixed-size blocks. A page table maps each process's logical pages to physical frames. Virtual memory extends RAM by using disk as overflow: pages not currently needed are stored on disk, loaded on demand (causing page faults). Page replacement algorithms (FIFO, LRU, Optimal) decide which page to evict when memory is full.

:::

:::eli20

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

:::

## File Systems

:::eli10

A file system is how the computer organises your files on a hard drive -- like a filing cabinet with folders and documents. Each file has a name, a location, and extra info (like when it was created). There are different ways to store files physically on the disk, each with trade-offs.

:::

:::eli15

The file system provides an organised way to store and retrieve data persistently. Files are named collections of data; directories organise files hierarchically. Metadata includes name, size, permissions, and timestamps. Storage allocation methods include contiguous (fast sequential access but fragmentation), linked (no fragmentation but slow random access), and indexed/i-node (fast random access with some overhead).

:::

:::eli20

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

:::

## Kernel vs User Mode

:::eli10

The computer has two modes: kernel mode (the OS has full power over everything) and user mode (regular programs run with restrictions to keep them safe). When a program needs to do something privileged (like accessing hardware), it asks the OS through a system call, which temporarily switches to kernel mode.

:::

:::eli15

Modern CPUs have two privilege levels. Kernel mode gives full hardware access and is used by the OS kernel for critical operations. User mode restricts what programs can do, preventing them from directly accessing hardware or other processes' memory. When a user program needs OS services (file access, network, etc.), it makes a system call (trap instruction) which switches to kernel mode. After the OS handles the request, control returns to user mode.

:::

:::eli20

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

:::
