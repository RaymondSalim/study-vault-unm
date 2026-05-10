---
title: "Exam Traps & Common Mistakes"
order: 91
moduleTitle: "COMP2035 - OS & Concurrency"
tags: ["exam", "mistakes", "pitfalls", "tips"]
---

# Exam Traps & Common Mistakes

## Scheduling

| Trap | Correct Understanding |
|------|----------------------|
| Confusing SJF with SRTF | SJF is non-preemptive (runs to completion); SRTF preempts if a shorter job arrives |
| Forgetting arrival times | A process cannot run before it arrives -- check arrival time at each scheduling decision |
| RR quantum = 0 context switch time | Unless stated, context switch overhead is typically ignored. But if given, add it! |
| FCFS = bad for short jobs | The convoy effect: short processes wait behind long ones |
| MLFQ without boost = starvation | Without periodic priority boost, long-running CPU-bound jobs starve at bottom queue |

## Synchronisation

| Trap | Correct Understanding |
|------|----------------------|
| Semaphore wait/signal order | Order of `wait()` calls matters! Wrong order causes deadlock (e.g., acquiring mutex before counting semaphore in producer-consumer) |
| `if` vs `while` with condition variables | Mesa semantics requires `while` -- condition may no longer hold when thread wakes |
| Mutex ownership | Only the thread that locked a mutex should unlock it. Semaphores have no ownership. |
| Spinlocks on single-core | Never use spinlocks on uniprocessor -- the holder cannot run while spinner spins! |
| Signal vs broadcast | `signal` wakes ONE thread; if multiple threads wait on different conditions with same variable, use `broadcast` |

## Deadlock

| Trap | Correct Understanding |
|------|----------------------|
| Cycle = deadlock (multi-instance) | A cycle in a multi-instance RAG is necessary but NOT sufficient for deadlock |
| Coffman conditions are "causes" | They are necessary conditions. All four must hold simultaneously; removing any one prevents deadlock |
| Banker's: forgetting to check Need <= Work | Always compare the full Need vector, not just one resource type |
| Banker's: multiple safe sequences exist | Finding ANY one valid sequence proves safety -- you don't need to find all of them |
| Prevention vs avoidance | Prevention = static (design-time), Avoidance = dynamic (runtime, like Banker's) |

## Memory Management

| Trap | Correct Understanding |
|------|----------------------|
| Internal vs external fragmentation | Paging has internal (wasted space within last page); Segmentation has external (gaps between segments) |
| Belady's anomaly applies to all algorithms | Only FIFO (and some others) -- stack algorithms (LRU, OPT) are immune |
| TLB miss = page fault | No! TLB miss just means consulting page table in memory. Page fault = page not in RAM at all. |
| EAT formula confusion | TLB hit: 1 memory access. TLB miss: 2 memory accesses (page table + data). Page fault: disk access (~10ms). |
| "Virtual memory = swap space" | Virtual memory is the concept; swap/page file is where evicted pages go |
| Forgetting dirty bit in replacement | If page is dirty (modified), it must be written to disk before replacement -- extra I/O cost |

## File Systems

| Trap | Correct Understanding |
|------|----------------------|
| Contiguous allocation = no fragmentation | It has external fragmentation (gaps between files after deletions) |
| Linked allocation random access | Random access requires traversing the entire chain -- O(n) |
| FAT vs linked list | FAT stores the linked list in memory (fast traversal), basic linked stores pointers in disk blocks |
| inode calculation errors | Remember: indirect blocks themselves take up one block each (not counted in file data) |
| SSTF = optimal disk scheduling | No, SSTF can starve far requests and is not globally optimal (like SJF isn't always best) |

## Process & Thread Mistakes

| Trap | Correct Understanding |
|------|----------------------|
| Thread crash isolation | If one thread crashes (segfault), the ENTIRE process dies (shared address space) |
| fork() creates a thread | No, `fork()` creates a new PROCESS (separate address space, copy-on-write) |
| User threads = true parallelism | Many-to-one model: user threads cannot run on multiple cores simultaneously |
| Context switch between threads of same process | Cheaper than between processes (no TLB flush, no page table switch) but NOT free |

## General Exam Tips

1. **Read the question carefully** -- "preemptive" vs "non-preemptive" changes the entire answer
2. **Show your working** -- Gantt charts, state tables, step-by-step traces earn partial marks
3. **State assumptions** -- if tie-breaking isn't specified, state your assumption (e.g., "break ties by PID")
4. **Draw RAGs** for deadlock questions -- visual > verbal
5. **Units matter** -- ns, us, ms. A page fault is ~10ms, not 10ns!
6. **Verify Banker's** -- after claiming "safe", write out the complete safe sequence
7. **Check boundary conditions** -- what happens when buffer is full/empty, all frames used, etc.
