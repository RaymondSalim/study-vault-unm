---
title: "Memory Hierarchy"
order: 7
moduleTitle: "COMP1030 - Systems & Architecture"
tags: ["memory", "cache", "RAM", "virtual-memory", "memory-hierarchy"]
---

## Memory Hierarchy

:::eli10

Computer memory is like a pyramid. At the top are tiny, super-fast registers (like your pocket). Below that is cache (like your desk drawer -- small but quick to access). Then main memory (RAM -- like a filing cabinet). At the bottom is disk storage (like a warehouse -- huge but slow). The trick is keeping the stuff you use most in the fast places.

:::

:::eli15

The memory hierarchy exploits the speed/cost/size trade-off: faster memory is smaller and more expensive. Registers (nanoseconds) sit at the top, followed by L1/L2/L3 cache (SRAM, 1-30ns), main memory (DRAM, 50-100ns), and disk (milliseconds). The hierarchy works because of locality: temporal (recently used data is likely used again soon) and spatial (nearby data is likely used soon). Caches automatically keep frequently-used data close to the CPU.

:::

:::eli20

| Level | Technology | Typical Size | Access Time | Cost/bit |
|-------|-----------|-------------|-------------|----------|
| Registers | Flip-flops | ~100s bytes | < 1 ns | Highest |
| L1 Cache | SRAM | 32-64 KB | 1-2 ns | Very high |
| L2 Cache | SRAM | 256 KB - 1 MB | 3-10 ns | High |
| L3 Cache | SRAM | 2-32 MB | 10-30 ns | Medium |
| Main Memory | DRAM | 4-64 GB | 50-100 ns | Low |
| SSD | Flash | 256 GB - 4 TB | 25-100 $\mu$s | Very low |
| HDD | Magnetic | 1-20 TB | 5-10 ms | Lowest |

**Principle of locality** makes the hierarchy effective:

| Type | Definition | Example |
|------|-----------|---------|
| **Temporal** | Recently accessed data likely accessed again soon | Loop variables |
| **Spatial** | Data near recently accessed data likely accessed soon | Array elements |

:::

---

## Cache Basics

:::eli10

A cache is a small, fast memory that keeps copies of your most-used data. When the CPU needs data and finds it in the cache, that's a "hit" (fast!). If it's not there, that's a "miss" (slow -- has to go to main memory). A good cache has lots of hits and few misses.

:::

:::eli15

Caches store copies of frequently-used memory blocks close to the CPU. A hit means the data is found in cache (fast access). A miss means it must be fetched from slower memory (expensive). Average Memory Access Time (AMAT) = hit time + (miss rate x miss penalty). Even a small miss rate hurts performance significantly because the miss penalty is large (e.g., 5% miss rate with 100ns penalty adds 5ns to every access on average).

:::

:::eli20

### Terminology

| Term | Meaning |
|------|---------|
| Hit | Data found in cache |
| Miss | Data not in cache; must fetch from lower level |
| Hit rate | Fraction of accesses that hit |
| Miss rate | $1 - \text{hit rate}$ |
| Hit time | Time to access cache |
| Miss penalty | Additional time to fetch from lower level |

### Average Memory Access Time (AMAT)

$$\text{AMAT} = t_{hit} + (\text{miss rate} \times t_{miss\ penalty})$$

For multi-level:
$$\text{AMAT} = t_{L1} + m_1 \times (t_{L2} + m_2 \times t_{mem})$$

:::

---

## Cache Organisation

:::eli10

Each memory address is split into three parts: the "tag" (which piece of memory is this?), the "index" (which slot in the cache to look in), and the "offset" (which byte within that block). It's like a library -- the tag is the book title, the index is the shelf number, and the offset is the page.

:::

:::eli15

Cache addresses are decomposed into three fields. Offset (b bits) identifies the byte within a cache block/line. Index (s bits) selects which set to search. Tag (remaining bits) identifies which memory block occupies that cache line. For a cache with 2^s sets and 2^b byte blocks: offset = b bits, index = s bits, tag = address bits - s - b. The tag must match to confirm a hit.

:::

:::eli20

A cache line/block typically holds multiple words (e.g., 64 bytes).

### Address Decomposition

For a cache with $2^s$ sets and block size $2^b$ bytes:

```
| Tag (remaining bits) | Index (s bits) | Offset (b bits) |
```

| Field | Purpose |
|-------|---------|
| Offset | Which byte within the block |
| Index | Which set/line to check |
| Tag | Identifies which memory block is cached |

:::

---

## Cache Mapping Strategies

:::eli10

There are three ways to organize where memory blocks go in a cache. Direct-mapped: each block has one specific spot (fast but inflexible). Fully associative: a block can go anywhere (flexible but expensive to search). Set-associative: a compromise -- each block maps to a small group of spots (good balance).

:::

:::eli15

Three mapping strategies trade off between simplicity, flexibility, and cost. Direct-mapped: each memory block maps to exactly one cache line (simple hardware, but conflict misses occur when two blocks compete for the same line). Fully associative: any block can go anywhere (best hit rate, but requires comparing tags against all lines -- expensive). N-way set-associative: divides cache into sets of n lines -- a block maps to one set but can use any line within it (practical compromise, 2-way or 4-way common).

:::

:::eli20

### 1. Direct-Mapped

Each memory block maps to exactly one cache line.

$$\text{Cache line} = (\text{Block address}) \mod (\text{Number of lines})$$

| Pros | Cons |
|------|------|
| Simple, fast lookup | Conflict misses (two blocks compete for same line) |
| Only 1 comparator needed | Lower hit rate |

### 2. Fully Associative

A block can go in **any** cache line.

| Pros | Cons |
|------|------|
| No conflict misses | Expensive (compare tag with every line) |
| Best hit rate | Slow for large caches |

### 3. Set-Associative ($n$-way)

Cache divided into sets; each set has $n$ lines. A block maps to one set but can occupy any line within it.

$$\text{Set} = (\text{Block address}) \mod (\text{Number of sets})$$

| Associativity | Lines per set | Comparison |
|--------------|--------------|-----------|
| 1-way | 1 | = Direct-mapped |
| $n$-way | $n$ | Middle ground |
| Fully associative | All lines | All lines = 1 set |

:::

---

## Replacement Policies

:::eli10

When the cache is full and needs to load something new, it must kick something out. LRU (Least Recently Used) kicks out whatever hasn't been used for the longest time. FIFO kicks out whatever was loaded first. Random picks something randomly to remove.

:::

:::eli15

When a cache set is full, a replacement policy decides which line to evict. LRU (Least Recently Used): evicts the line that hasn't been accessed for the longest time -- good hit rate but expensive to track (needs access history). FIFO: evicts the oldest line -- simpler than LRU but can evict frequently-used data. Random: surprisingly competitive with LRU for larger caches and requires no tracking overhead.

:::

:::eli20

When a cache set is full, which line to evict?

| Policy | Description | Notes |
|--------|-------------|-------|
| LRU (Least Recently Used) | Evict the line unused longest | Good but expensive to track |
| FIFO | Evict oldest loaded line | Simpler than LRU |
| Random | Evict a random line | Surprisingly effective |

:::

---

## Write Policies

:::eli10

When you change data in the cache, you need to update main memory eventually. Write-through updates memory immediately every time (simple but slow). Write-back only updates memory when the cached block gets kicked out (faster because many writes stay local). Most computers use write-back.

:::

:::eli15

Write policies handle keeping cache and memory consistent. Write-through: every write updates both cache and memory (simple, always consistent, but slow -- every write hits memory). Write-back: writes only update the cache (faster); memory is updated only when the block is evicted (needs a dirty bit to track modified blocks). Write-back + write-allocate is the common pairing: on a miss, load the block into cache then write (exploits temporal locality for subsequent writes).

:::

:::eli20

### On Write Hit

| Policy | Action | Consistency |
|--------|--------|-------------|
| Write-through | Write to cache AND memory | Always consistent; slower |
| Write-back | Write to cache only; write to memory on eviction | Faster; needs dirty bit |

### On Write Miss

| Policy | Action |
|--------|--------|
| Write-allocate | Load block into cache, then write (pairs with write-back) |
| No-write-allocate | Write directly to memory (pairs with write-through) |

:::

---

## Types of Cache Misses (The 3 Cs)

:::eli10

Cache misses happen for three reasons: Cold misses (you've never loaded this data before -- unavoidable the first time), Capacity misses (the cache is too small to hold everything you need), and Conflict misses (two pieces of data are fighting over the same spot).

:::

:::eli15

The "three Cs" classify cache misses by cause. Compulsory (cold): first access to any block always misses -- reduced by prefetching or larger blocks. Capacity: the working set exceeds cache size -- fixed by bigger caches. Conflict: multiple blocks map to the same set and evict each other -- fixed by higher associativity. Understanding the dominant miss type guides cache design decisions.

:::

:::eli20

| Type | Cause | Fix |
|------|-------|-----|
| **Compulsory** (Cold) | First access to a block | Prefetching; larger blocks |
| **Capacity** | Cache too small for working set | Bigger cache |
| **Conflict** | Multiple blocks compete for same set | Higher associativity |

:::

---

## RAM Types

:::eli10

SRAM (Static RAM) is fast but expensive -- used for caches. It holds data using flip-flops and doesn't need refreshing. DRAM (Dynamic RAM) is slower but cheap -- used for main memory. It stores bits as electric charge that leaks away, so it needs constant refreshing (like a leaky bucket that needs refilling).

:::

:::eli15

SRAM (Static RAM): stores bits using flip-flop circuits -- fast, no refresh needed, but expensive and larger per bit. Used for caches. DRAM (Dynamic RAM): stores bits as charge in capacitors -- cheaper, denser, but slower and requires periodic refresh (every ~64ms) because charge leaks. Used for main memory. DDR (Double Data Rate) DRAM transfers data on both clock edges, with each generation (DDR2-DDR5) increasing speed and reducing voltage.

:::

:::eli20

| Type | Full Name | Properties |
|------|-----------|-----------|
| **SRAM** | Static RAM | Fast, expensive, no refresh, used for caches |
| **DRAM** | Dynamic RAM | Slower, cheaper, needs refresh, used for main memory |

### DRAM Refresh

DRAM stores bits as charge in capacitors; charge leaks, requiring periodic refresh (every ~64 ms).

### DRAM Variants

| Variant | Feature |
|---------|---------|
| SDRAM | Synchronous with system clock |
| DDR | Double Data Rate (transfers on both clock edges) |
| DDR2/3/4/5 | Higher speeds, lower voltage per generation |

:::

---

## Virtual Memory (Overview)

:::eli10

Virtual memory lets each program think it has all the memory to itself, even though they share physical RAM. The program uses "virtual" addresses that get translated to real ("physical") addresses by a page table. If a piece of the program hasn't been used in a while, it can be moved to disk to make room -- and brought back when needed.

:::

:::eli15

Virtual memory gives each process its own private address space, mapped to physical RAM by the OS via page tables. Memory is divided into fixed-size pages (typically 4KB). The page table translates virtual page numbers to physical frame numbers. The TLB (Translation Lookaside Buffer) caches recent translations for speed. A page fault occurs when an accessed page isn't in RAM -- the OS loads it from disk (very slow, ~10ms). Virtual memory enables memory protection, process isolation, and using more memory than physically available.

:::

:::eli20

| Concept | Description |
|---------|-------------|
| Virtual address | Address used by program |
| Physical address | Actual address in RAM |
| Page | Fixed-size block of virtual memory (e.g., 4 KB) |
| Frame | Physical memory slot for a page |
| Page table | Maps virtual pages → physical frames |
| TLB | Cache for page table entries (Translation Lookaside Buffer) |
| Page fault | Accessed page not in RAM → load from disk |

### Address Translation

$$\text{Virtual Address} = [\text{Virtual Page Number} | \text{Offset}]$$
$$\text{Physical Address} = [\text{Physical Frame Number} | \text{Offset}]$$

The offset remains unchanged; only the page/frame number is translated.

### Page Table Entry (PTE)

| Field | Purpose |
|-------|---------|
| Frame number | Physical location |
| Valid bit | Page in memory? |
| Dirty bit | Page modified? |
| Reference bit | Page recently accessed? |
| Protection | Read/Write/Execute permissions |

---

## Practice

<details>
<summary>A direct-mapped cache has 256 lines, 64-byte blocks, 32-bit addresses. Calculate tag, index, and offset sizes.</summary>

- Offset: $\log_2(64) = 6$ bits
- Index: $\log_2(256) = 8$ bits
- Tag: $32 - 8 - 6 = 18$ bits
</details>

<details>
<summary>Cache: hit time = 1 ns, miss rate = 5%, miss penalty = 100 ns. What is the AMAT?</summary>

$$\text{AMAT} = 1 + 0.05 \times 100 = 1 + 5 = 6\text{ ns}$$
</details>

<details>
<summary>A system has 4 KB pages and 32-bit virtual addresses. How many entries in the page table?</summary>

- Page size = $4096 = 2^{12}$ bytes → offset = 12 bits
- Virtual page number = $32 - 12 = 20$ bits
- Page table entries = $2^{20} = 1,048,576$ entries
</details>

<details>
<summary>Why does a 2-way set-associative cache have fewer conflict misses than direct-mapped?</summary>

In direct-mapped, two blocks mapping to the same line constantly evict each other (thrashing). In 2-way set-associative, each set holds 2 blocks, so two competing blocks can coexist without conflict. This reduces ping-pong evictions significantly.
</details>

<details>
<summary>Explain why write-back + write-allocate is a common pairing.</summary>

- **Write-back** avoids writing to slow main memory on every write (only on eviction)
- **Write-allocate** brings the block into cache on a miss, so subsequent writes to the same block are fast cache hits
- Together they exploit temporal locality: if you write to an address, you'll likely write again soon, and both writes stay in cache
</details>

:::
