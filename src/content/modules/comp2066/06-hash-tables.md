---
title: "Hash Tables"
order: 6
moduleTitle: "COMP2066 - Algorithms & DS"
tags: ["hashing", "collision-resolution", "hash-functions", "open-addressing"]
---

## Hash Table Concept

:::eli10

A hash table is like a magic filing cabinet. You give it any item, and a formula instantly tells you which drawer to put it in. Later, to find that item, you use the same formula and go straight to the right drawer — no searching needed. On average, storing and finding things takes just $O(1)$ time!

:::

:::eli15

A hash table provides average $O(1)$ lookup, insertion, and deletion by using a **hash function** to map keys directly to array indices. The key components are:

1. **Hash function**: Converts a key into an array index
2. **Array of buckets**: Where the data is stored
3. **Collision resolution**: Strategy for when two keys map to the same index

The worst case is $O(n)$ (all keys collide into one slot), but with a good hash function and proper load management, this almost never happens.

:::

:::eli20

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

:::

## Hash Functions

:::eli10

A hash function is like a recipe that turns any input into a number within a specific range. A good hash function spreads items evenly across the table (like dealing cards evenly to players) and always gives the same answer for the same input.

:::

:::eli15

A good hash function should be:
- **Deterministic**: Same key always produces the same index
- **Uniform**: Distributes keys evenly across all slots (minimises collisions)
- **Efficient**: Computes in $O(1)$ time

Common approaches:
- **Division method**: $k \mod m$ (use a prime $m$, avoid powers of 2)
- **Multiplication method**: Multiply by an irrational constant, take fractional part, scale
- **For strings**: Polynomial hash where each character is weighted by its position

:::

:::eli20

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

:::

## Load Factor

:::eli10

The load factor tells you how full the hash table is. If it gets too full (like a parking lot with almost no spaces left), collisions happen more often and things slow down. When the table is about 75% full, you should double its size to keep things fast.

:::

:::eli15

The **load factor** $\alpha = n/m$ (number of elements divided by table size) measures how full the table is:

- $\alpha < 0.5$: Lots of empty space — fast but wasteful
- $0.5 \leq \alpha \leq 0.75$: The sweet spot — good performance with reasonable memory
- $\alpha > 0.75$: Too dense — collisions increase significantly; time to resize
- $\alpha > 1$: Only possible with chaining (multiple items per slot)

When $\alpha$ exceeds a threshold, the table is resized (typically doubled) and all elements are rehashed.

:::

:::eli20

$$\alpha = \frac{n}{m}$$

where $n$ = number of stored elements, $m$ = table size.

| $\alpha$ | Meaning | Action |
|----------|---------|--------|
| $< 0.5$ | Sparse table | Wastes memory |
| $0.5 - 0.75$ | Good range | Optimal performance |
| $> 0.75$ | Dense table | Resize (rehash) |
| $> 1$ | Only possible with chaining | Performance degrades |

:::

## Collision Resolution: Chaining

:::eli10

Chaining is the simplest way to handle collisions — when two items hash to the same slot, you just make a list at that slot. It's like a coat rack with hooks: if two people hang their coats on the same hook, they stack up. To find your coat, you look through all the coats on that hook.

:::

:::eli15

With **chaining** (also called separate chaining), each table slot holds a linked list. When multiple keys hash to the same index, they are all stored in that list.

- **Insert**: Always $O(1)$ — just add to the front of the list
- **Search**: $O(1 + \alpha)$ average — go to the slot, then scan the list
- **Delete**: $O(1 + \alpha)$ average — find in the list and remove

Pros: Simple, handles high load factors, easy deletion. Cons: Extra memory for pointers, poor cache locality (pointer chasing).

:::

:::eli20

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

:::

## Collision Resolution: Open Addressing

:::eli10

Open addressing stores everything directly in the table — no linked lists. When your spot is taken, you keep looking at the next spots until you find an empty one. It's like parking: if your spot is taken, you drive to the next one, and the next one, until you find an empty space.

:::

:::eli15

In **open addressing**, all elements live directly in the table array. When a collision occurs, you "probe" — check alternative slots following a probe sequence.

Three main probing strategies:
- **Linear probing**: Check the next slot, then the next, and so on. Simple and cache-friendly, but causes "clustering" (long chains of occupied slots).
- **Quadratic probing**: Steps grow as $1, 3, 6, 10, \ldots$ (reduces primary clustering but creates secondary clustering).
- **Double hashing**: Uses a second hash function to determine the step size — best distribution, no clustering.

The load factor must stay below 1 (table must have empty slots for probing to terminate).

:::

:::eli20

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

:::

## Comparison of Collision Strategies

:::eli10

Each collision strategy has trade-offs. Chaining is simplest but uses extra memory. Linear probing is fast due to caching but creates traffic jams. Double hashing spreads things out best but is harder to implement. Choose based on your situation.

:::

:::eli15

| Strategy | Pros | Cons |
|----------|------|------|
| Chaining | No clustering, $\alpha > 1$ OK, easy delete | Extra memory, poor cache |
| Linear probing | Excellent cache, simple | Primary clustering at high loads |
| Quadratic probing | Less clustering than linear | Secondary clustering, coverage issues |
| Double hashing | No clustering at all | Two hash functions, poor cache |

In practice, linear probing with a good hash function and low load factor is often fastest due to cache friendliness. Chaining is safest for unpredictable workloads.

:::

:::eli20

| Strategy | Clustering | Cache | Space | Delete |
|----------|-----------|-------|-------|--------|
| Chaining | None | Poor | Extra pointers | Easy |
| Linear probing | Primary | Excellent | None | Lazy (tombstone) |
| Quadratic probing | Secondary | Good | None | Lazy |
| Double hashing | None | Poor | None | Lazy |

:::

## Deletion in Open Addressing

:::eli10

Deleting from open addressing is tricky — if you just erase an item, you might break the trail that other items used to find their spots. The solution is to leave a "deleted" marker (tombstone) so the search keeps going past it. Or you can rebuild the whole table, which is cleaner but slower.

:::

:::eli15

You cannot simply empty a slot in open addressing — doing so would break probe chains for other elements that skipped past that slot during insertion.

Two solutions:
- **Tombstone**: Mark the slot as "deleted." Searches skip over it; inserts can reuse it. Simple but degrades performance over time as tombstones accumulate.
- **Rehash**: Periodically rebuild the entire table from scratch, ignoring deleted entries. Expensive ($O(n)$) but restores optimal performance.

:::

:::eli20

Cannot simply remove an element (breaks probe chains). Two approaches:

| Method | How | Trade-off |
|--------|-----|-----------|
| Tombstone (lazy) | Mark slot as "deleted"; skip during search, reuse on insert | Degrades performance over time |
| Rehash | Rebuild table without deleted elements | Expensive but clean |

:::

## Rehashing (Resizing)

:::eli10

When a hash table gets too full, you make a bigger table (usually double the size) and move everything over. You have to recalculate where each item goes because the formula depends on the table size. It's expensive once, but spread over many inserts, it averages out to $O(1)$ per insert.

:::

:::eli15

When the load factor exceeds a threshold (typically 0.75), the table must be resized:

1. Allocate a new table roughly double the size (pick the next prime)
2. Recompute the hash of every existing element (since $h(k) = k \mod m$ changes with new $m$)
3. Insert all elements into the new table

This takes $O(n)$ for a single resize, but since you double the capacity each time, the **amortised cost** per insert remains $O(1)$ (same doubling argument as dynamic arrays).

:::

:::eli20

When $\alpha$ exceeds threshold:
1. Create new table of size $\approx 2m$ (pick next prime)
2. Recompute hash for every element using new $m$
3. Insert all elements into new table

**Amortised cost**: $O(1)$ per operation (doubling argument).

:::

## Expected Probe Counts

:::eli10

The fuller your hash table gets, the more attempts you need to find an empty spot. At half full, you typically need 2 tries for a miss. At 90% full, you might need 10 tries! This is why keeping the load factor below 0.75 is important.

:::

:::eli15

For open addressing under the uniform hashing assumption:

- **Unsuccessful search** (key not found): Expected probes = $\frac{1}{1-\alpha}$
- **Successful search** (key found): Expected probes = $\frac{1}{\alpha} \ln \frac{1}{1-\alpha}$

At $\alpha = 0.5$: about 2 probes for a miss, 1.4 for a hit. At $\alpha = 0.9$: about 10 probes for a miss, 2.6 for a hit. This exponential growth as $\alpha \to 1$ is why we resize well before the table is full.

:::

:::eli20

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

:::
