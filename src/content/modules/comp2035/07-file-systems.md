---
title: "File Systems"
order: 7
moduleTitle: "COMP2035 - OS & Concurrency"
tags: ["file-systems", "allocation", "directories", "free-space", "I/O"]
---

# File Systems

## File Concept

A file is a named collection of related data stored on secondary storage.

### File Attributes

| Attribute | Description |
|-----------|-------------|
| Name | Human-readable identifier |
| Type | Extension / magic number |
| Size | Current size in bytes |
| Location | Pointer to data on disk |
| Protection | Access control (rwx, ACLs) |
| Timestamps | Created, modified, accessed |
| Owner | User/group |

## File Allocation Methods

| Method | Description | Pros | Cons |
|--------|-------------|------|------|
| **Contiguous** | File occupies consecutive blocks | Fast sequential & random access | External fragmentation, file size must be known |
| **Linked** | Each block points to next | No external fragmentation, easy growth | Slow random access, pointer overhead, unreliable |
| **Indexed** | Index block holds pointers to all data blocks | Fast random access, no external fragmentation | Index block overhead, max file size limited |

### Contiguous Allocation

Directory entry: `(filename, start_block, length)`

$$\text{Block for position } i = \text{start} + i$$

### Linked Allocation

Directory entry: `(filename, start_block, end_block)`

Each block: `[data | next_pointer]`

- **FAT (File Allocation Table)**: linked list stored in a separate table in memory -- improves random access

### Indexed Allocation (Unix inode)

| Pointer Type | Levels | Blocks Addressable |
|-------------|--------|-------------------|
| Direct (12) | 0 | 12 |
| Single indirect | 1 | $\frac{B}{4}$ |
| Double indirect | 2 | $\left(\frac{B}{4}\right)^2$ |
| Triple indirect | 3 | $\left(\frac{B}{4}\right)^3$ |

For block size $B = 4$ KB, pointer size = 4 bytes:
- Pointers per block: $4096/4 = 1024$
- Max file size: $12 + 1024 + 1024^2 + 1024^3$ blocks $\approx$ 4 TB

## Directory Structures

| Structure | Description |
|-----------|-------------|
| Single-level | All files in one directory |
| Two-level | One directory per user |
| Tree | Hierarchical (most common) |
| Acyclic graph | Shared files via links (hard/soft) |
| General graph | Cycles allowed (needs garbage collection) |

### Hard Links vs Soft Links

| Aspect | Hard Link | Soft (Symbolic) Link |
|--------|-----------|---------------------|
| Points to | inode | Pathname |
| Cross filesystem | No | Yes |
| Survives target deletion | Yes (until link count = 0) | No (dangling link) |
| inode count | Same inode, incremented link count | New inode |

## Free Space Management

| Method | Description | Pros | Cons |
|--------|-------------|------|------|
| **Bit vector (bitmap)** | 1 bit per block (1=free, 0=used) | Simple, fast for contiguous search | Large for big disks |
| **Linked list** | Free blocks linked together | No wasted space | Slow traversal |
| **Grouping** | First free block stores $n$ addresses | Faster than linked list | Complex |
| **Counting** | Store (start, count) pairs | Compact for contiguous free space | Variable-size entries |

### Bitmap Size

$$\text{Bitmap size} = \frac{\text{Disk size}}{\text{Block size}} \text{ bits}$$

Example: 1 TB disk, 4 KB blocks -> $\frac{2^{40}}{2^{12}} = 2^{28}$ bits = 32 MB

## Disk Scheduling (I/O)

| Algorithm | Description | Pros | Cons |
|-----------|-------------|------|------|
| **FCFS** | Service in arrival order | Fair | Long seek times |
| **SSTF** | Shortest seek time first | Good throughput | Starvation of far requests |
| **SCAN (Elevator)** | Move in one direction, service all, reverse | No starvation | Favours middle tracks |
| **C-SCAN** | Like SCAN but only services in one direction, jumps back | Uniform wait | Slightly less throughput |
| **LOOK / C-LOOK** | Like SCAN/C-SCAN but reverses at last request, not disk end | More efficient | - |

### SCAN Example

Head at 53, direction: towards 0. Queue: 98, 183, 37, 122, 14, 124, 65, 67

Order: 37, 14, 0, 65, 67, 98, 122, 124, 183

Total seek: $(53-0) + (183-0) = 236$ cylinders

## I/O Subsystem

| Layer | Role |
|-------|------|
| User process | Issues I/O request (read, write) |
| Device-independent OS | Buffering, caching, scheduling, naming |
| Device driver | Translates commands to hardware-specific operations |
| Interrupt handler | Handles I/O completion |
| Hardware | Physical device controller |

### I/O Methods

| Method | CPU Involvement | Use Case |
|--------|----------------|----------|
| Programmed I/O (polling) | CPU busy-waits | Simple, low-speed devices |
| Interrupt-driven | CPU interrupted on completion | General purpose |
| DMA (Direct Memory Access) | Minimal (setup + interrupt) | High-throughput (disk, network) |

<details>
<summary><strong>Practice: inode file size calculation</strong></summary>

**Q:** Block size = 1 KB, pointer size = 4 bytes. An inode has 10 direct, 1 single indirect, 1 double indirect, 1 triple indirect. What is the maximum file size?

**A:**
- Pointers per block: $1024/4 = 256$
- Direct: $10 \times 1\text{KB} = 10\text{ KB}$
- Single indirect: $256 \times 1\text{KB} = 256\text{ KB}$
- Double indirect: $256^2 \times 1\text{KB} = 65{,}536\text{ KB} = 64\text{ MB}$
- Triple indirect: $256^3 \times 1\text{KB} = 16{,}777{,}216\text{ KB} = 16\text{ GB}$

Max = $10\text{ KB} + 256\text{ KB} + 64\text{ MB} + 16\text{ GB} \approx 16\text{ GB}$

</details>

<details>
<summary><strong>Practice: Disk scheduling</strong></summary>

**Q:** Head at position 50, queue: [82, 170, 43, 140, 24, 16, 190]. Calculate total seek distance for SSTF.

**A:**
Starting at 50:
1. 43 (dist=7), total=7
2. 24 (dist=19), total=26
3. 16 (dist=8), total=34
4. 82 (dist=66), total=100
5. 140 (dist=58), total=158
6. 170 (dist=30), total=188
7. 190 (dist=20), total=208

Total seek distance = **208** cylinders

</details>
