---
title: "Exam Strategy"
order: 93
moduleTitle: "COMP2035 - Operating Systems & Concurrency"
tags: ["exam", "strategy", "revision", "tips"]
---

# Exam Strategy

## Time Allocation

| Section | Approx. Weight | Suggested Time (2hr exam) |
|---------|---------------|--------------------------|
| Scheduling calculations | 20% | 24 min |
| Synchronisation & deadlock | 25% | 30 min |
| Memory management & paging | 25% | 30 min |
| File systems & I/O | 15% | 18 min |
| Conceptual/short answer | 15% | 18 min |

## Topic Weighting

1. **Synchronisation & Deadlock** -- Almost always appears; expect Banker's Algorithm or deadlock detection
2. **Memory Management** -- Page table calculations, page replacement traces (LRU, FIFO, Optimal)
3. **CPU Scheduling** -- Gantt chart calculations (FCFS, SJF, SRTF, RR)
4. **Process Management** -- Process states, PCB, fork() behaviour
5. **File Systems** -- Inode calculations, allocation methods

## Common Question Types

- **Calculate average waiting/turnaround time** for a given scheduling algorithm
- **Trace page replacement** through a reference string and count page faults
- **Apply Banker's Algorithm** to determine safe state
- **Identify deadlock** from a resource allocation graph
- **Semaphore/mutex code analysis** -- find race conditions or deadlocks
- **Compare and contrast** (e.g., paging vs segmentation, mutex vs semaphore)

## Key Formulas

| Formula | Description |
|---------|-------------|
| Turnaround Time = Completion - Arrival | Total time from arrival to finish |
| Waiting Time = Turnaround - Burst | Time spent waiting in ready queue |
| Effective Access Time = (1-p) x m + p x (page fault service time) | Where p = page fault rate, m = memory access time |
| Page table size = (virtual address space / page size) x entry size | Number of entries times bytes per entry |
| Internal fragmentation = frame size - (process size mod frame size) | Wasted space in last allocated frame |

## Exam Approach Tips

1. **Read all questions first** -- identify quick wins vs lengthy calculations
2. **Show working clearly** -- partial marks for method even if arithmetic is wrong
3. **Draw Gantt charts** for scheduling -- makes turnaround/waiting calculation systematic
4. **Label page replacement tables** with hit/fault markers at each step
5. **State assumptions** if a question is ambiguous (e.g., "assuming zero context switch overhead")

## Night Before Top 10 Checklist

1. Practice one Banker's Algorithm example end-to-end (Need, Available, Safe sequence)
2. Trace LRU and FIFO page replacement for a 5+ page reference string
3. Draw Gantt charts for RR (quantum=2) and SRTF with 4 processes
4. Write out the four Coffman conditions and one prevention strategy for each
5. Review the three critical section requirements (mutual exclusion, progress, bounded waiting)
6. Know the difference between preemptive and non-preemptive for each algorithm
7. Memorise the effective access time formula with TLB hit ratio
8. Understand fork() -- what is copied, what is shared, return values
9. Review inode structure and how to calculate max file size from direct/indirect blocks
10. Practice identifying deadlock from a resource allocation graph (cycle detection)
