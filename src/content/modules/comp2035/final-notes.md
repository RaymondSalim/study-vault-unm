---
title: "Final Notes (Cheat Sheet)"
order: 97
moduleTitle: "COMP2035 - OS & Concurrency"
tags: ["exam", "cheat-sheet", "final-notes"]
---

<style>
@media print {
  .print-btn, .prev-next, .module-nav, .global-nav, nav, .mobile-menu-btn, .sidebar-overlay, .search-modal {
    display: none !important;
  }
  .module-wrapper {
    display: block !important;
  }
  .module-content {
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    columns: 2;
    column-gap: 1.5em;
    font-size: 8pt;
    line-height: 1.25;
    color: #000;
  }
  .module-content h2 {
    font-size: 11pt;
    margin: 0.3em 0 0.15em;
    border-bottom: 1.5px solid #000;
    column-span: all;
    break-after: avoid;
  }
  .module-content h3 {
    font-size: 9pt;
    margin: 0.3em 0 0.1em;
    break-after: avoid;
  }
  .module-content table {
    border-collapse: collapse;
    width: 100%;
    margin: 0.2em 0;
    font-size: 7.5pt;
  }
  .module-content th, .module-content td {
    border: 1px solid #999;
    padding: 1px 3px;
    text-align: left;
  }
  .module-content th {
    background: #eee !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content hr {
    margin: 0.3em 0;
    border: none;
    border-top: 1px dashed #999;
  }
  .module-content ul, .module-content ol {
    margin: 0.15em 0;
    padding-left: 1.1em;
  }
  .module-content li {
    margin: 0.05em 0;
  }
  .module-content p {
    margin: 0.15em 0;
  }
  .module-content code {
    font-size: 7pt;
    background: #f0f0f0;
    padding: 0.5px 2px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content .katex {
    font-size: 0.9em;
  }
  @page {
    size: A4;
    margin: 0.8cm;
  }
}
</style>

<button class="print-btn" onclick="window.print()" style="background:#7aa2f7;color:#1a1b26;border:none;padding:0.5em 1.2em;border-radius:6px;cursor:pointer;font-weight:600;margin-bottom:1em;font-size:0.9rem;">Print Cheat Sheet</button>

## SIDE 1: PROCESSES, SCHEDULING & SYNCHRONISATION

### OS Fundamentals

OS roles: Resource management, Abstraction, Protection.

| Mode | Privilege | Access |
|------|-----------|--------|
| Kernel (Ring 0) | Full | All hardware/memory |
| User (Ring 3) | Restricted | Own address space |

Transitions: System calls (trap), hardware interrupts, exceptions (page fault, div-by-zero).

| OS Structure | Description | Example |
|-------------|-------------|---------|
| Monolithic | All in kernel (fast, less reliable) | Linux |
| Microkernel | Minimal kernel; services in user space | seL4 |
| Hybrid | Mix of both | Windows, macOS |

---

### Processes & Threads

**Process states:** New $\to$ Ready $\to$ Running $\to$ Waiting/Terminated

**PCB:** PID, state, PC, registers, page table, scheduling info, open files.

**Context switch:** Save PCB of current, load PCB of next. Pure overhead (~1-10 $\mu$s). May require TLB flush.

**fork():** Creates copy of parent. Returns 0 to child, child PID to parent. Copy-on-Write (COW).

| Aspect | Process | Thread |
|--------|---------|--------|
| Address space | Own (isolated) | Shared |
| Creation cost | High | Low |
| Context switch | Expensive (TLB flush) | Cheap |
| Communication | IPC (pipes, shared mem) | Direct memory |
| Fault isolation | Crash isolated | One crash kills all |

| Threading Model | Description |
|----------------|-------------|
| Many-to-One | No parallelism; one blocks all |
| One-to-One | Full parallelism (pthreads) |
| Many-to-Many | Best balance |

**Amdahl's Law:** $S(N) = \frac{1}{(1-P)+P/N}$, &nbsp; $S_{\max}=\frac{1}{1-P}$

---

### CPU Scheduling

| Metric | Formula |
|--------|---------|
| Turnaround | $T_{\text{completion}}-T_{\text{arrival}}$ |
| Waiting | $T_{\text{turnaround}}-T_{\text{burst}}$ |
| Response | $T_{\text{first run}}-T_{\text{arrival}}$ |

| Algorithm | Pre? | Starvation? | Optimal for | Weakness |
|-----------|:----:|:-----------:|-------------|----------|
| FCFS | No | No | Simplicity | Convoy effect |
| SJF | No | Yes | Min avg turnaround | Needs prediction |
| SRTF | Yes | Yes | Min avg turnaround | Needs prediction |
| Priority | Both | Yes | Prioritised work | Starvation (fix: aging) |
| Round Robin | Yes | No | Fairness/response | High turnaround if $q$ small |
| MLFQ | Yes | No | General purpose | Complex |

**RR:** Max wait = $(n-1)\times q$. Rule: 80% bursts < $q$.

**MLFQ rules:** New jobs at top queue. Use full quantum $\to$ demote. Give up early $\to$ stay. Periodic boost prevents starvation.

**Burst prediction:** $\tau_{n+1}=\alpha\cdot t_n + (1-\alpha)\cdot\tau_n$

---

### Synchronisation

**Critical Section Requirements:** (1) Mutual Exclusion (2) Progress (3) Bounded Waiting

**Race condition:** Outcome depends on non-deterministic interleaving. E.g., `counter++` = load, modify, store (3 steps).

**Peterson's (2 processes):** `flag[i]=true; turn=j; while(flag[j] && turn==j);` Satisfies all 3. Needs memory barriers on modern CPUs.

| Mechanism | Level | Best for |
|-----------|-------|----------|
| Spinlock | Low | Short CS, multicore |
| Mutex (blocking) | Medium | Long CS |
| Semaphore | Medium | Resource counting |
| Monitor | High | Easiest correctness |

**Semaphore:** `wait(S)`: decrement, block if $\leq 0$. `signal(S)`: increment, wake one.

**Producer-Consumer (Bounded Buffer):**
```
sem mutex=1, empty=N, full=0;
Producer: wait(empty); wait(mutex); add; signal(mutex); signal(full);
Consumer: wait(full); wait(mutex); remove; signal(mutex); signal(empty);
```
**Rule:** Acquire counting semaphore BEFORE mutex (else deadlock).

**Readers-Writers:** First reader locks `rw_mutex`; last reader unlocks it. Writers need exclusive `rw_mutex`.

**Monitors:** Auto mutual exclusion. Condition variables: `wait(c)`, `signal(c)`, `broadcast(c)`.

**Mesa semantics:** After signal, signaller continues. Woken thread must **re-check with while** (not if).

---

## SIDE 2: DEADLOCK, MEMORY & FILE SYSTEMS

### Deadlock

**Coffman Conditions (ALL 4 required):**

| # | Condition |
|---|-----------|
| 1 | Mutual Exclusion |
| 2 | Hold and Wait |
| 3 | No Preemption |
| 4 | Circular Wait |

**RAG:** Single instance + cycle = deadlock. Multi-instance: cycle necessary but not sufficient.

| Strategy | Approach |
|----------|----------|
| Prevention | Negate one Coffman condition |
| Avoidance | Banker's algorithm (safe state) |
| Detection + Recovery | Allow, detect, kill/rollback |
| Ignore (Ostrich) | Linux/Windows approach |

**Prevention methods:** Request all upfront (breaks hold-and-wait). Total ordering on resources (breaks circular wait). Preempt resources (breaks no-preemption).

**Banker's Algorithm:**
- Structures: Available[$m$], Max[$n\times m$], Allocation[$n\times m$], Need = Max - Allocation
- Safety: `Work=Available; find i: Need[i]<=Work; Work+=Allocation[i]; repeat until all finish or stuck`
- Request: Pretend to grant $\to$ check safety $\to$ if safe, grant; else wait

**Detection:** Wait-For Graph (single instance) — cycle = deadlock. Multi-instance: similar to Banker's with Request instead of Need.

**Recovery:** Terminate all/one-at-a-time, preempt resources, rollback to checkpoint.

---

### Memory Management

| Binding Time | Flexibility |
|-------------|-------------|
| Compile time | Must know load address |
| Load time | Can load anywhere |
| Execution time | Full (relocate, swap) via MMU |

**Paging:** Fixed-size pages (logical) $\to$ frames (physical). Typical: 4KB.

Address: $[\underbrace{\text{Page \#}}_{m-n \text{ bits}} | \underbrace{\text{Offset}}_{n \text{ bits}}]$ where page size $=2^n$

Example: 32-bit, 4KB pages $\Rightarrow$ 20-bit page number, 12-bit offset.

| Structure | Use case |
|-----------|----------|
| Single-level | Small address spaces |
| Two-level | 32-bit (10+10+12) |
| Inverted | Large spaces, saves memory |

**TLB:** Fast cache of page table entries. Hit rate >99%.

$$\text{EAT} = h(T_{\text{TLB}}+T_{\text{mem}}) + (1-h)(T_{\text{TLB}}+2T_{\text{mem}})$$

**Segmentation:** Variable-size logical units (code, data, stack, heap). Address: <seg#, offset>. Causes external fragmentation.

| | Paging | Segmentation |
|-|--------|-------------|
| Unit | Fixed | Variable |
| Fragmentation | Internal | External |
| Programmer visible | No | Yes |

---

### Virtual Memory & Page Replacement

**Demand paging:** Load pages only when accessed. Page fault $\to$ trap $\to$ load from disk $\to$ update table $\to$ restart instruction.

**PTE bits:** Valid, Dirty, Referenced, Protection, Frame number.

| Algorithm | Method | Belady's? |
|-----------|--------|:---------:|
| OPT | Replace page not used for longest future time | No |
| FIFO | Replace oldest | Yes |
| LRU | Replace least recently used | No |
| Clock | FIFO + reference bit (second chance) | Yes |

**Belady's anomaly:** FIFO can have MORE faults with MORE frames. Stack algorithms (LRU, OPT) never exhibit this.

**Thrashing:** More time paging than executing. Cause: insufficient frames for working set.

$$W(t,\Delta) = \text{pages referenced in last } \Delta \text{ time units}$$

Fix: Ensure each process has frames $\geq$ working set size. Suspend processes if total > available.

---

### File Systems

| Allocation | Method | Random access | Fragmentation |
|-----------|--------|:------------:|:-------------:|
| Contiguous | Consecutive blocks | Fast | External |
| Linked | Chain via pointers | Slow (traverse) | None |
| Indexed (inode) | Index block with pointers | Fast | None |

**Unix inode (block $B$, ptr 4 bytes):** Pointers/block = $B/4$

| Level | Blocks |
|-------|--------|
| 12 direct | 12 |
| Single indirect | $B/4$ |
| Double indirect | $(B/4)^2$ |
| Triple indirect | $(B/4)^3$ |

4KB blocks: max $\approx$ 4TB. &nbsp; 1KB blocks: max $\approx$ 16GB.

**Links:** Hard link = same inode (no cross-filesystem, survives deletion). Soft link = pathname (can break).

**Free space:** Bitmap (1 bit/block, size = disk/block bits), linked list, counting.

---

### Disk Scheduling

| Algorithm | Strategy | Starvation |
|-----------|----------|:----------:|
| FCFS | Arrival order | No |
| SSTF | Nearest request | Yes |
| SCAN (elevator) | Sweep one direction, reverse | No |
| C-SCAN | One direction only, jump back | No |
| LOOK/C-LOOK | Reverse at last request | No |

**I/O methods:** Polling (CPU busy-waits), Interrupt-driven (general), DMA (minimal CPU, best for disk/network).

---

### Key Formulas & Numbers

| Item | Value/Formula |
|------|--------------|
| Amdahl's Law | $S=1/((1-P)+P/N)$ |
| Context switch | ~1-10 $\mu$s |
| RR max wait | $(n-1)\times q$ |
| EAT (TLB) | $h(T_{TLB}+T_{mem})+(1-h)(T_{TLB}+2T_{mem})$ |
| Page fault EAT | $(1-p)\cdot T_{access}+p\cdot T_{fault}$ |
| Bitmap size | disk_size / block_size bits |
| inode max | $12 + B/4 + (B/4)^2 + (B/4)^3$ blocks |

---

### Key Traps

- fork() twice = 4 processes (each fork doubles)
- Semaphore order matters: counting sem BEFORE mutex
- Mesa semantics: use `while` not `if` for condition check
- Deadlock needs ALL 4 Coffman conditions simultaneously
- FIFO can have Belady's anomaly; LRU/OPT cannot
- TLB miss = extra memory access (not page fault)
- Page fault $\neq$ TLB miss (page fault = page not in RAM)
- Thrashing: more processes can make things worse
- Hard links cannot cross filesystems
- SSTF can starve far requests
