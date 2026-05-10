---
title: "Synchronisation"
order: 4
moduleTitle: "COMP2035 - OS & Concurrency"
tags: ["synchronisation", "mutex", "semaphore", "monitor", "critical-section", "concurrency"]
---

# Synchronisation

## The Critical Section Problem

A **critical section** is a code segment that accesses shared resources and must not be executed concurrently by multiple threads.

### Requirements for a Solution

| Requirement | Description |
|-------------|-------------|
| **Mutual Exclusion** | At most one process in the CS at a time |
| **Progress** | If no process is in CS, selection of next entrant cannot be postponed indefinitely |
| **Bounded Waiting** | A bound exists on the number of times other processes can enter CS before a waiting process |

## Race Conditions

A **race condition** occurs when the outcome depends on the non-deterministic ordering of concurrent operations.

```c
// Shared: int counter = 5;
// Thread A:           // Thread B:
counter++;            counter--;
// Both read 5, then write. Result could be 4, 5, or 6!
```

The interleaving at assembly level:
```
T_A: load counter (5)
T_B: load counter (5)
T_A: increment (6)
T_B: decrement (4)
T_A: store counter (6)
T_B: store counter (4)  // Final value: 4 (wrong!)
```

## Peterson's Algorithm (2 processes)

```c
int flag[2] = {false, false};
int turn;

// Process i (i = 0 or 1, j = 1-i)
flag[i] = true;
turn = j;                          // Give turn to other
while (flag[j] && turn == j);      // Wait
    // Critical Section
flag[i] = false;
```

- Satisfies all three requirements
- Only works for 2 processes
- Requires sequential consistency (may fail on modern CPUs without memory barriers)

## Mutex (Mutual Exclusion Lock)

| Operation | Semantics |
|-----------|-----------|
| `acquire()` / `lock()` | Wait until lock is free, then take it |
| `release()` / `unlock()` | Release the lock |

**Properties:**
- Binary state: locked or unlocked
- Only the owner should release
- Can be implemented with busy-waiting (spinlock) or blocking (sleep)

### Spinlock vs Blocking Lock

| Aspect | Spinlock | Blocking (Mutex) |
|--------|----------|-------------------|
| Wait mechanism | Busy-wait loop | Sleep on queue |
| CPU usage | Wastes cycles | No waste |
| Best for | Short critical sections, multicore | Long critical sections |
| Context switch | None | Requires one |

## Semaphores

A semaphore $S$ is an integer variable accessed via two atomic operations:

$$\text{wait}(S): \quad \text{while } S \leq 0 \text{ do nothing; } S = S - 1$$

$$\text{signal}(S): \quad S = S + 1$$

| Type | Initial Value | Use Case |
|------|--------------|----------|
| **Binary Semaphore** | 1 | Mutual exclusion (like mutex) |
| **Counting Semaphore** | $N$ | Limit concurrent access to $N$ instances |

### Classical Problems

#### Producer-Consumer (Bounded Buffer)

```c
semaphore mutex = 1;    // mutual exclusion
semaphore empty = N;    // empty slots
semaphore full = 0;     // full slots

// Producer:                    // Consumer:
wait(empty);                   wait(full);
wait(mutex);                   wait(mutex);
  // add item                    // remove item
signal(mutex);                 signal(mutex);
signal(full);                  signal(empty);
```

#### Readers-Writers

```c
semaphore rw_mutex = 1;   // exclusive access for writers
semaphore mutex = 1;      // protects read_count
int read_count = 0;

// Writer:                      // Reader:
wait(rw_mutex);                wait(mutex);
  // write                       read_count++;
signal(rw_mutex);              if (read_count == 1)
                                   wait(rw_mutex);
                               signal(mutex);
                                 // read
                               wait(mutex);
                               read_count--;
                               if (read_count == 0)
                                   signal(rw_mutex);
                               signal(mutex);
```

#### Dining Philosophers

5 philosophers, 5 forks. Solutions:
- Allow at most 4 to sit simultaneously
- Asymmetric: odd picks left first, even picks right first
- Use a mutex to pick up both forks atomically

## Monitors

A **monitor** is a high-level synchronisation construct that encapsulates:
- Shared data
- Operations on that data
- Synchronisation (only one thread active inside at a time)

### Condition Variables

Used within monitors for waiting/signalling:

| Operation | Effect |
|-----------|--------|
| `wait(c)` | Release monitor lock, sleep on condition `c` |
| `signal(c)` | Wake one thread waiting on `c` |
| `broadcast(c)` | Wake all threads waiting on `c` |

**Signal semantics:**

| Semantics | After signal... |
|-----------|----------------|
| Hoare | Signalled thread runs immediately; signaller waits |
| Mesa (Java, pthreads) | Signaller continues; woken thread must re-check condition |

> With Mesa semantics, always use `while` (not `if`) to re-check the condition after waking.

### Monitor Example: Bounded Buffer

```java
monitor BoundedBuffer {
    Object[] buffer = new Object[N];
    int count = 0, in = 0, out = 0;
    condition notFull, notEmpty;

    void produce(Object item) {
        while (count == N) wait(notFull);
        buffer[in] = item;
        in = (in + 1) % N;
        count++;
        signal(notEmpty);
    }

    Object consume() {
        while (count == 0) wait(notEmpty);
        Object item = buffer[out];
        out = (out + 1) % N;
        count--;
        signal(notFull);
        return item;
    }
}
```

## Comparison of Mechanisms

| Mechanism | Level | Ease of Use | Error-Prone? |
|-----------|-------|-------------|:------------:|
| Disable interrupts | Hardware | N/A (kernel only) | Low |
| Spinlock | Low | Simple | Medium |
| Mutex | Medium | Moderate | Medium |
| Semaphore | Medium | Moderate | High (order matters) |
| Monitor | High | Easy | Low |

<details>
<summary><strong>Practice: Semaphore ordering</strong></summary>

**Q:** What happens if the producer swaps `wait(empty)` and `wait(mutex)` in the bounded buffer?

**A:** **Deadlock** can occur. If buffer is full:
1. Producer acquires `mutex`
2. Producer calls `wait(empty)` -- blocks (buffer full)
3. Consumer calls `wait(mutex)` -- blocks (producer holds it)
4. Neither can proceed = deadlock

**Rule:** Always acquire the counting semaphore before the mutex.

</details>

<details>
<summary><strong>Practice: Mesa vs Hoare</strong></summary>

**Q:** Why must we use `while(count == 0)` instead of `if(count == 0)` with Mesa semantics?

**A:** With Mesa semantics, after `signal(notEmpty)`:
- The signaller continues running
- Another thread might consume the item before the woken thread resumes
- When the woken thread finally runs, the condition may no longer hold
- `while` re-checks, `if` does not -- leading to accessing an empty buffer

</details>
