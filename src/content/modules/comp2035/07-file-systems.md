---
title: "File Systems"
order: 7
moduleTitle: "COMP2035 - OS & Concurrency"
tags: ["file-systems", "allocation", "directories", "free-space", "I/O"]
---

# File Systems

## File Concept

:::eli10

A file is like a document in a filing cabinet — it has a name, a type, a size, and information about who owns it and when it was last changed. The computer's file system is the cabinet's organisation system, keeping track of where everything is stored on the disk.

:::

:::eli15

A file is a named, persistent collection of data stored on secondary storage (disk/SSD). The OS maintains metadata (attributes) for each file: its name, type, size, physical location on disk, access permissions, timestamps, and ownership. The file system provides the abstraction that lets users and programs work with named files rather than raw disk blocks, handling all the complexity of mapping logical files to physical storage locations.

:::

:::eli20

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

:::

## File Allocation Methods

:::eli10

When a file is saved, the computer needs to decide which blocks on the disk to use. Contiguous allocation puts everything in a row (fast to read but hard to grow). Linked allocation scatters blocks anywhere and connects them like a chain (easy to grow but slow to jump around). Indexed allocation keeps a "table of contents" block listing where all pieces are (good balance).

:::

:::eli15

File allocation determines how file data is mapped to disk blocks. Contiguous allocation stores files in consecutive blocks — fast for both sequential and random access, but suffers from external fragmentation and requires knowing file size upfront. Linked allocation chains blocks via pointers — no fragmentation and files grow easily, but random access requires traversing the chain (slow) and losing one pointer breaks the chain. Indexed allocation (used by Unix inodes) stores all block pointers in an index block — fast random access without fragmentation, but the index structure limits maximum file size and adds overhead.

:::

:::eli20

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

:::

## Directory Structures

:::eli10

Directories organise files, just like folders on your desk. The simplest system puts all files in one big pile. Better systems use folders inside folders (a tree structure). Links are like shortcuts — they let the same file appear in multiple places without making copies.

:::

:::eli15

Directory structures organise files hierarchically. Single-level puts everything together (fine for few files, messy for many). Two-level gives each user their own directory. Tree structures (the standard) create hierarchical folders/paths. Acyclic graphs allow shared files via links: hard links point directly to the file's inode (same file, multiple names — survives original name deletion) and soft/symbolic links point to a pathname (can cross filesystems but break if the target is deleted). General graphs with cycles are possible but require garbage collection to handle deletions.

:::

:::eli20

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

:::

## Free Space Management

:::eli10

The file system needs to know which disk blocks are free and which are taken. A bitmap is like a checklist with one checkbox per block (checked = free). A linked list threads all free blocks together. These methods track empty space so the system knows where to put new files.

:::

:::eli15

The file system must track which disk blocks are free for allocation. A bitmap uses one bit per block (1=free, 0=used) — simple and efficient for finding contiguous free space, but requires space proportional to disk size (a 1TB disk with 4KB blocks needs a 32MB bitmap). A linked list chains free blocks together — wastes no extra space but traversal is slow. Grouping stores multiple free block addresses in a single block (faster). Counting stores (start, length) pairs for contiguous free regions (very compact when free space is contiguous).

:::

:::eli20

| Method | Description | Pros | Cons |
|--------|-------------|------|------|
| **Bit vector (bitmap)** | 1 bit per block (1=free, 0=used) | Simple, fast for contiguous search | Large for big disks |
| **Linked list** | Free blocks linked together | No wasted space | Slow traversal |
| **Grouping** | First free block stores $n$ addresses | Faster than linked list | Complex |
| **Counting** | Store (start, count) pairs | Compact for contiguous free space | Variable-size entries |

### Bitmap Size

$$\text{Bitmap size} = \frac{\text{Disk size}}{\text{Block size}} \text{ bits}$$

Example: 1 TB disk, 4 KB blocks -> $\frac{2^{40}}{2^{12}} = 2^{28}$ bits = 32 MB

:::

## Disk Scheduling (I/O)

:::eli10

When multiple programs want to read from different parts of the disk, the computer has to decide which to serve first. FCFS does them in order (fair but slow). SSTF picks whichever is closest (fast but unfair). SCAN moves the read head back and forth like an elevator, serving requests along the way (good compromise).

:::

:::eli15

Disk scheduling determines the order in which pending disk I/O requests are serviced, aiming to minimise total seek time (head movement). FCFS is fair but produces long seeks. SSTF (Shortest Seek Time First) always goes to the nearest request — good throughput but can starve far requests. SCAN moves the head in one direction serving requests, then reverses (like an elevator) — prevents starvation. C-SCAN only services in one direction then jumps back, providing more uniform wait times. LOOK/C-LOOK optimise SCAN/C-SCAN by reversing at the last request rather than the disk edge.

:::

:::eli20

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

:::

## I/O Subsystem

:::eli10

The I/O system has layers, like a chain of translators. Your program says "read this file," the OS figures out which disk blocks, the device driver speaks the disk's language, and the hardware controller physically moves the read head. Interrupts tell the CPU "I'm done!" so it doesn't have to keep checking.

:::

:::eli15

The I/O subsystem is layered: user processes make high-level requests (read/write), the device-independent OS layer handles buffering, caching, and scheduling, device drivers translate generic commands to hardware-specific operations, and interrupt handlers process completion signals. Three I/O methods exist: programmed I/O (CPU polls the device — simple but wastes CPU), interrupt-driven (CPU does other work and is interrupted when I/O completes — general purpose), and DMA (a dedicated controller handles the transfer, only interrupting the CPU when fully done — best for high-throughput devices like disks).

:::

:::eli20

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

:::
