---
title: "Hash Tables"
order: 6
moduleTitle: "COMP2066 - Algorithms & DS"
tags: ["hashing", "collision-resolution", "hash-functions", "open-addressing"]
---

## Hash Table Concept

Maps keys to values via a **hash function** $h(k)$ that computes an index into an array of **buckets/slots**.

| Property | Value |
|----------|-------|
| Average search | $O(1)$ |
| Worst-case search | $O(n)$ (all keys collide) |
| Space | $O(n)$ |

### Components

| Component | Role |
|-----------|------|
| Hash function | Maps key $\to$ index in $[0, m-1]$ |
| Table (array) | Stores entries at computed indices |
| Collision resolution | Handles multiple keys mapping to same index |

## Hash Functions

### Properties of Good Hash Functions

| Property | Description |
|----------|-------------|
| Deterministic | Same key always maps to same index |
| Uniform distribution | Keys spread evenly across table |
| Efficient | $O(1)$ to compute |
| Minimise collisions | Different keys unlikely to hash same |

### Common Methods

| Method | Formula | Notes |
|--------|---------|-------|
| Division | $h(k) = k \mod m$ | $m$ should be prime, not power of 2 |
| Multiplication | $h(k) = \lfloor m(kA \mod 1)\rfloor$ | $A \approx 0.618$ (golden ratio) |
| Universal | $h(k) = ((ak + b) \mod p) \mod m$ | Random $a, b$; $p$ prime > universe |

### For Strings

$$h(s) = \sum_{i=0}^{n-1} s[i] \cdot r^{n-1-i} \mod m$$

where $r$ is a constant (e.g., 31 or 37).

## Load Factor

$$\alpha = \frac{n}{m}$$

where $n$ = number of stored elements, $m$ = table size.

| $\alpha$ | Meaning | Action |
|----------|---------|--------|
| $< 0.5$ | Sparse table | Wastes memory |
| $0.5 - 0.75$ | Good range | Optimal performance |
| $> 0.75$ | Dense table | Resize (rehash) |
| $> 1$ | Only possible with chaining | Performance degrades |

## Collision Resolution: Chaining

Each slot holds a **linked list** (or other collection) of all elements that hash to that index.

```
insert(key, value):
    i = h(key)
    table[i].append((key, value))

search(key):
    i = h(key)
    for (k, v) in table[i]:
        if k == key: return v
    return null
```

| Operation | Average | Worst |
|-----------|---------|-------|
| Search | $O(1 + \alpha)$ | $O(n)$ |
| Insert | $O(1)$ | $O(1)$ (insert at head) |
| Delete | $O(1 + \alpha)$ | $O(n)$ |

### Pros/Cons of Chaining

| Pros | Cons |
|------|------|
| Simple implementation | Extra memory for pointers |
| $\alpha$ can exceed 1 | Poor cache performance |
| Delete is straightforward | Linked list overhead |

## Collision Resolution: Open Addressing

All elements stored directly in the table. On collision, **probe** for next empty slot.

### General Probe Sequence

$$h(k, i) = (h'(k) + f(i)) \mod m$$

where $i = 0, 1, 2, \ldots$ is the probe number.

### Linear Probing

$$h(k, i) = (h'(k) + i) \mod m$$

| Property | Value |
|----------|-------|
| Probe sequence | $h'(k), h'(k)+1, h'(k)+2, \ldots$ |
| Problem | **Primary clustering** -- long runs of occupied slots |
| Cache performance | Excellent (sequential memory access) |

### Quadratic Probing

$$h(k, i) = (h'(k) + c_1 i + c_2 i^2) \mod m$$

| Property | Value |
|----------|-------|
| Probe sequence | $h'(k), h'(k)+1, h'(k)+3, h'(k)+6, \ldots$ |
| Problem | **Secondary clustering** -- same initial hash = same probe sequence |
| Guarantee | Full table coverage if $m$ is prime and $\alpha < 0.5$ |

### Double Hashing

$$h(k, i) = (h_1(k) + i \cdot h_2(k)) \mod m$$

| Property | Value |
|----------|-------|
| $h_2(k)$ requirement | Must never be 0; must be coprime with $m$ |
| Common choice | $h_2(k) = q - (k \mod q)$ where $q < m$ is prime |
| Clustering | No primary or secondary clustering |
| Best among | Open addressing methods |

## Comparison of Collision Strategies

| Strategy | Clustering | Cache | Space | Delete |
|----------|-----------|-------|-------|--------|
| Chaining | None | Poor | Extra pointers | Easy |
| Linear probing | Primary | Excellent | None | Lazy (tombstone) |
| Quadratic probing | Secondary | Good | None | Lazy |
| Double hashing | None | Poor | None | Lazy |

## Deletion in Open Addressing

Cannot simply remove an element (breaks probe chains). Two approaches:

| Method | How | Trade-off |
|--------|-----|-----------|
| Tombstone (lazy) | Mark slot as "deleted"; skip during search, reuse on insert | Degrades performance over time |
| Rehash | Rebuild table without deleted elements | Expensive but clean |

## Rehashing (Resizing)

When $\alpha$ exceeds threshold:
1. Create new table of size $\approx 2m$ (pick next prime)
2. Recompute hash for every element using new $m$
3. Insert all elements into new table

**Amortised cost**: $O(1)$ per operation (doubling argument).

## Expected Probe Counts

For open addressing with load factor $\alpha$:

| Operation | Expected Probes (uniform hashing) |
|-----------|----------------------------------|
| Unsuccessful search | $\frac{1}{1-\alpha}$ |
| Successful search | $\frac{1}{\alpha}\ln\frac{1}{1-\alpha}$ |

| $\alpha$ | Unsuccessful | Successful |
|----------|-------------|-----------|
| 0.5 | 2.0 | 1.39 |
| 0.75 | 4.0 | 1.85 |
| 0.9 | 10.0 | 2.56 |

<details>
<summary><strong>Practice: Insert with Linear Probing</strong></summary>

Table size $m = 7$, $h(k) = k \mod 7$

Insert: 10, 17, 24, 31, 3

| Key | $h(k)$ | Probes | Final Index |
|-----|---------|--------|-------------|
| 10 | 3 | 3 (empty) | 3 |
| 17 | 3 | 3 (occupied), 4 (empty) | 4 |
| 24 | 3 | 3, 4, 5 (empty) | 5 |
| 31 | 3 | 3, 4, 5, 6 (empty) | 6 |
| 3 | 3 | 3, 4, 5, 6, 0 (empty) | 0 |

Table: `[3, _, _, 10, 17, 24, 31]`

Notice the **primary clustering** -- all keys hashing to 3 create a long chain.

</details>

<details>
<summary><strong>Practice: Double Hashing</strong></summary>

$m = 7$, $h_1(k) = k \mod 7$, $h_2(k) = 5 - (k \mod 5)$

Insert: 10, 17, 24

| Key | $h_1$ | $h_2$ | Probes | Index |
|-----|--------|--------|--------|-------|
| 10 | 3 | 5-(10%5)=5 | 3 | 3 |
| 17 | 3 | 5-(17%5)=3 | 3 (occ), (3+3)%7=6 | 6 |
| 24 | 3 | 5-(24%5)=1 | 3 (occ), (3+1)%7=4 | 4 |

Table: `[_, _, _, 10, 24, _, 17]`

No clustering -- different step sizes spread elements out.

</details>

<details>
<summary><strong>Practice: Why Prime Table Size?</strong></summary>

If $m = 2^k$ (power of 2), then $h(k) = k \mod m$ only uses the last $k$ bits.

Example: $m = 8$
- Keys 0, 8, 16, 24 all hash to 0
- Keys 1, 9, 17, 25 all hash to 1

With $m = 7$ (prime):
- 0->0, 8->1, 16->2, 24->3 -- better distribution

Prime $m$ ensures all probe sequences in quadratic/double hashing cover the full table.

</details>
