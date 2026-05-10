---
title: "Memory Hierarchy"
order: 7
moduleTitle: "COMP1030 - Systems & Architecture"
tags: ["memory", "cache", "RAM", "virtual-memory", "memory-hierarchy"]
---

## Memory Hierarchy

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

---

## Cache Basics

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

---

## Cache Organisation

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

---

## Cache Mapping Strategies

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

---

## Replacement Policies

When a cache set is full, which line to evict?

| Policy | Description | Notes |
|--------|-------------|-------|
| LRU (Least Recently Used) | Evict the line unused longest | Good but expensive to track |
| FIFO | Evict oldest loaded line | Simpler than LRU |
| Random | Evict a random line | Surprisingly effective |

---

## Write Policies

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

---

## Types of Cache Misses (The 3 Cs)

| Type | Cause | Fix |
|------|-------|-----|
| **Compulsory** (Cold) | First access to a block | Prefetching; larger blocks |
| **Capacity** | Cache too small for working set | Bigger cache |
| **Conflict** | Multiple blocks compete for same set | Higher associativity |

---

## RAM Types

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

---

## Virtual Memory (Overview)

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
