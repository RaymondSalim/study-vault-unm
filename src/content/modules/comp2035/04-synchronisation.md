---
title: "Synchronisation"
order: 4
moduleTitle: "COMP2035 - OS & Concurrency"
tags: ["synchronisation", "mutex", "semaphore", "monitor", "critical-section", "concurrency"]
---

# Synchronisation

## The Critical Section Problem

:::eli10

A critical section is a part of a program where it touches shared data that other threads also want to use. It's like a single bathroom — only one person can use it at a time. The rules are: only one person inside (mutual exclusion), no locking it forever when nobody's using it (progress), and everyone eventually gets a turn (bounded waiting).

:::

:::eli15

When multiple threads share data, only one should access it at a time to prevent corruption. A critical section is the code that accesses shared resources. A valid solution must guarantee three properties: mutual exclusion (only one thread in the critical section at once), progress (if nobody is in the section and someone wants in, they can enter without indefinite delay), and bounded waiting (there's a limit on how many times others can cut in line before a waiting thread gets its turn).

:::

:::eli20

A **critical section** is a code segment that accesses shared resources and must not be executed concurrently by multiple threads.

### Requirements for a Solution

| Requirement | Description |
|-------------|-------------|
| **Mutual Exclusion** | At most one process in the CS at a time |
| **Progress** | If no process is in CS, selection of next entrant cannot be postponed indefinitely |
| **Bounded Waiting** | A bound exists on the number of times other processes can enter CS before a waiting process |

:::

## Race Conditions

:::eli10

A race condition is like two people trying to edit the same document at the same time without knowing about each other's changes. They both read "5", one adds 1 and one subtracts 1, then they both save — one person's change gets lost. The final answer depends on who saves last, not on what should have happened.

:::

:::eli15

A race condition occurs when the outcome of concurrent operations depends on their unpredictable execution ordering. At the machine level, even simple operations like "counter++" involve multiple steps (load, modify, store). If two threads interleave these steps, they can read stale values and overwrite each other's results. For example, two threads both read counter=5, one increments to 6, the other decrements to 4, and whichever stores last "wins" — producing an incorrect result. Race conditions are the fundamental motivation for synchronisation.

:::

:::eli20

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

:::

## Peterson's Algorithm (2 processes)

:::eli10

Peterson's Algorithm is a clever way for exactly two processes to take turns using a shared resource without any special hardware help. Each process raises a flag saying "I want to go," and politely offers the turn to the other. If both want to go, the one who was polite most recently waits. It's like two people at a door both saying "after you" — the last one to say it actually goes second.

:::

:::eli15

Peterson's Algorithm solves the critical section problem for two processes using only shared variables — no hardware support needed. Each process has a flag (indicating intent to enter) and a shared turn variable. Before entering, a process sets its flag and gives the turn to the other. It then waits only if the other process also wants in AND it's their turn. This satisfies mutual exclusion, progress, and bounded waiting. However, it only works for exactly 2 processes and assumes sequential consistency (modern CPUs may need memory barriers).

:::

:::eli20

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

:::

## Mutex (Mutual Exclusion Lock)

:::eli10

A mutex is like a key to a room. Only the person holding the key can be inside. If someone else wants in, they have to wait until the key is returned. There are two types of waiting: spinning (pacing back and forth checking if the key is available) or blocking (going to sleep and being woken when it's free).

:::

:::eli15

A mutex (mutual exclusion lock) is a synchronisation primitive with two operations: lock (acquire) and unlock (release). Only one thread can hold the lock at a time. A spinlock implements the wait by busy-looping (checking the lock repeatedly) — efficient for very short critical sections on multicore systems since it avoids context-switch overhead. A blocking mutex puts the waiting thread to sleep and wakes it when the lock is released — better for longer critical sections as it doesn't waste CPU cycles.

:::

:::eli20

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

:::

## Semaphores

:::eli10

A semaphore is like a bouncer counting how many people are allowed inside a club. A counting semaphore allows up to N people in. Each person entering decreases the count (wait), and each person leaving increases it (signal). If the count hits zero, the next person has to wait outside until someone leaves. A binary semaphore is a club that only fits one person — like a mutex.

:::

:::eli15

A semaphore is an integer variable with two atomic operations: wait (decrement; block if zero) and signal (increment; potentially wake a blocked thread). Binary semaphores (initialised to 1) act like mutexes. Counting semaphores (initialised to N) limit concurrent access to N — useful for resource pools like database connections. Classic synchronisation problems (producer-consumer, readers-writers, dining philosophers) are solved using combinations of semaphores. The order of wait operations is critical — getting it wrong causes deadlock.

:::

:::eli20

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

:::

## Monitors

:::eli10

A monitor is like a self-service machine that handles one customer at a time automatically. You don't need to worry about locks — the machine itself only lets one person use it. If you need to wait for something (like waiting for food to cook), you step aside (condition variable wait) and the machine serves someone else until your thing is ready.

:::

:::eli15

A monitor is a high-level synchronisation construct that bundles shared data with the operations that access it, automatically ensuring mutual exclusion — only one thread can be active inside a monitor at a time. Condition variables allow threads to wait inside the monitor for specific conditions. With Mesa semantics (used in Java, pthreads), a signalled thread doesn't run immediately — so it must re-check the condition in a while loop after waking, because the condition might have become false again before it resumed.

:::

:::eli20

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

:::

## Comparison of Mechanisms

:::eli10

There are many tools for synchronisation, from simple to complex. Disabling interrupts is like being a dictator (only the OS can do it). Spinlocks are simple but wasteful. Mutexes and semaphores are moderate tools. Monitors are the easiest to use correctly because they handle the locking for you automatically.

:::

:::eli15

Synchronisation mechanisms form a hierarchy from low-level to high-level. Disabling interrupts prevents preemption entirely (kernel-only, single-core). Spinlocks provide mutual exclusion via busy-waiting. Mutexes add blocking to avoid wasting CPU. Semaphores generalise to counting and signalling but are error-prone if wait/signal order is wrong. Monitors are the highest level — they encapsulate synchronisation into the data structure itself, making correct usage much easier. Higher-level mechanisms are generally safer but may have more overhead.

:::

:::eli20

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

:::
