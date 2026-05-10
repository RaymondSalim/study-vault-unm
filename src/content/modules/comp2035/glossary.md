---
title: "Glossary"
order: 95
moduleTitle: "COMP2035 - OS & Concurrency"
tags: ["glossary", "definitions", "terminology"]
---

# Glossary

## A-C

| Term | Definition |
|------|------------|
| **Address Space** | The set of all logical addresses a process can reference |
| **Aging** | Gradually increasing the priority of waiting processes to prevent starvation |
| **Amdahl's Law** | $S(N) = \frac{1}{(1-P) + P/N}$ -- max speedup with $N$ processors |
| **Atomic Operation** | An operation that completes entirely or not at all; cannot be interrupted |
| **Banker's Algorithm** | Deadlock avoidance algorithm that checks for safe states before granting resources |
| **Belady's Anomaly** | Phenomenon where increasing page frames increases page faults (affects FIFO) |
| **Bounded Buffer** | A shared buffer with finite capacity used in producer-consumer problems |
| **Busy Waiting (Spinning)** | Repeatedly testing a condition in a loop; wastes CPU cycles |
| **Context Switch** | Saving state of current process and loading state of the next process |
| **Coffman Conditions** | Four necessary conditions for deadlock: mutual exclusion, hold and wait, no preemption, circular wait |
| **Condition Variable** | Synchronisation primitive used in monitors for wait/signal on a condition |
| **Convoy Effect** | Short processes queued behind a long one in FCFS scheduling |
| **Copy-on-Write (COW)** | Optimisation where forked pages are shared until modified |
| **Critical Section** | Code segment accessing shared resources that requires mutual exclusion |

## D-F

| Term | Definition |
|------|------------|
| **Deadlock** | A state where processes are permanently blocked waiting for each other |
| **Demand Paging** | Loading pages into memory only when accessed (lazy loading) |
| **DMA (Direct Memory Access)** | Hardware transfers data between I/O and memory without CPU involvement |
| **Dirty Bit** | Flag indicating a page has been modified since loaded into memory |
| **External Fragmentation** | Free memory exists but is non-contiguous; cannot satisfy a request |
| **FAT (File Allocation Table)** | Table storing linked-list pointers for file blocks; kept in memory |
| **FCFS (First-Come First-Served)** | Scheduling/disk algorithm that serves requests in arrival order |
| **Frame** | A fixed-size block of physical memory (counterpart of a page) |
| **Fork** | System call that creates a child process as a copy of the parent |

## G-L

| Term | Definition |
|------|------------|
| **Gantt Chart** | Timeline diagram showing which process runs when |
| **Hold and Wait** | A Coffman condition: process holds resources while requesting others |
| **Interrupt** | Signal to CPU that an event requires attention (hardware or software) |
| **Interrupt Vector Table (IVT)** | Array of pointers to interrupt service routines |
| **Internal Fragmentation** | Wasted space within an allocated block (e.g., partially filled last page) |
| **inode** | Unix data structure storing file metadata and block pointers |
| **ISR (Interrupt Service Routine)** | Kernel function that handles a specific interrupt |
| **Kernel** | The core of the OS running in privileged mode |
| **Kernel Thread** | Thread managed and scheduled by the OS kernel |
| **LRU (Least Recently Used)** | Page replacement that evicts the page unused for the longest past time |
| **Livelock** | Processes actively change state but make no progress (contrast with deadlock) |

## M-P

| Term | Definition |
|------|------------|
| **MLFQ (Multilevel Feedback Queue)** | Scheduler with multiple priority queues and feedback-based demotion/promotion |
| **MMU (Memory Management Unit)** | Hardware that translates virtual addresses to physical addresses |
| **Monitor** | High-level synchronisation construct that encapsulates shared data and operations |
| **Multiprogramming** | Multiple processes loaded in memory to maximise CPU utilisation |
| **Mutex** | A lock providing mutual exclusion with ownership semantics |
| **Mutual Exclusion** | Only one process/thread may be in the critical section at a time |
| **Page** | A fixed-size block of logical (virtual) memory |
| **Page Fault** | Exception when a referenced page is not in physical memory |
| **Page Table** | Data structure mapping virtual page numbers to physical frame numbers |
| **PCB (Process Control Block)** | Kernel data structure storing all information about a process |
| **PID (Process ID)** | Unique integer identifying a process |
| **Preemption** | Forcibly removing a resource (e.g., CPU) from a process |
| **Priority Inversion** | High-priority process blocked by low-priority process holding a needed resource |
| **Process** | A program in execution with its own address space and resources |

## R-S

| Term | Definition |
|------|------------|
| **Race Condition** | Bug where outcome depends on non-deterministic timing of concurrent operations |
| **Ready Queue** | Set of processes in memory, ready and waiting for CPU |
| **Resource Allocation Graph (RAG)** | Directed graph showing resource assignments and requests |
| **Response Time** | Time from request submission to first output/execution |
| **Round Robin** | Scheduling with fixed time quantum; preempts after quantum expires |
| **Safe State** | A state where there exists a sequence to complete all processes without deadlock |
| **Segmentation** | Memory division into variable-size logical units (code, data, stack) |
| **Semaphore** | Integer-based synchronisation primitive with atomic wait (P) and signal (V) |
| **SJF (Shortest Job First)** | Non-preemptive scheduling that picks the shortest burst next |
| **SRTF (Shortest Remaining Time First)** | Preemptive SJF; switches if a new arrival has less remaining time |
| **Spinlock** | Lock implemented via busy-waiting loop |
| **Starvation** | A process waits indefinitely because others always get priority |
| **Swap Space** | Disk area used to store pages evicted from physical memory |
| **System Call** | Interface for user programs to request OS kernel services |

## T-Z

| Term | Definition |
|------|------------|
| **Thread** | Lightweight unit of execution sharing address space with other threads in same process |
| **Thrashing** | System spends more time paging than doing useful work |
| **Time Quantum** | Fixed time slice allocated to a process in Round Robin scheduling |
| **TLB (Translation Lookaside Buffer)** | Fast hardware cache of recent page table entries |
| **Trap** | Software-generated interrupt (e.g., system call, exception) |
| **Turnaround Time** | Total time from process arrival to completion |
| **User Thread** | Thread managed by user-space library without kernel awareness |
| **Virtual Memory** | Technique allowing execution of processes larger than physical memory |
| **Waiting Time** | Time a process spends in the ready queue (not executing) |
| **Working Set** | Set of pages referenced by a process in a recent time window |
