---
title: "Transactions"
order: 6
moduleTitle: "COMP1044 - Databases & Interfaces"
tags: ["databases", "transactions", "acid", "concurrency"]
---

# Transactions

## What is a Transaction?

:::eli10

A transaction is a group of actions that must either ALL succeed or ALL fail together. Imagine transferring money between bank accounts: you take money from one AND put it in the other. If only one part happens (the money leaves but never arrives), that would be a disaster. Transactions prevent this.

:::

:::eli15

A transaction is a logical unit of work -- one or more SQL operations that are treated as indivisible. The classic example is a bank transfer: debit one account AND credit another. If anything fails partway through, ALL changes are undone (rolled back). This ensures the database never ends up in an inconsistent state where money has disappeared or been duplicated.

:::

:::eli20

A **transaction** is a logical unit of work consisting of one or more SQL operations that must be treated as an indivisible unit. Either ALL operations succeed, or NONE do.

```sql
BEGIN TRANSACTION;
    UPDATE Account SET Balance = Balance - 100 WHERE AccountID = 1;
    UPDATE Account SET Balance = Balance + 100 WHERE AccountID = 2;
COMMIT;
```

If either UPDATE fails, both are rolled back.

:::

## ACID Properties

:::eli10

ACID is a set of four promises that databases make. Atomicity: all-or-nothing. Consistency: the database stays valid. Isolation: different users do not interfere with each other. Durability: once saved, it stays saved even if the power goes out.

:::

:::eli15

ACID properties guarantee reliable transactions. Atomicity means all-or-nothing execution (enforced by undo logs). Consistency means the database moves from one valid state to another (all constraints satisfied). Isolation means concurrent transactions do not interfere (managed by locks and isolation levels). Durability means committed changes survive crashes (enforced by write-ahead logging). Together, these ensure database reliability even under failures and concurrent access.

:::

:::eli20

| Property | Meaning | Example |
|----------|---------|---------|
| **Atomicity** | All-or-nothing execution | Bank transfer: both debit and credit happen, or neither |
| **Consistency** | DB moves from one valid state to another | Total money in system remains the same after transfer |
| **Isolation** | Concurrent transactions don't interfere | Two transfers to same account don't lose updates |
| **Durability** | Committed changes survive crashes | Once COMMIT returns, data is safely stored |

### Atomicity

- Ensured by the **recovery system** (undo log)
- If a transaction is interrupted, partial changes are rolled back
- `ROLLBACK` explicitly aborts the transaction

```sql
BEGIN TRANSACTION;
    UPDATE Account SET Balance = Balance - 500 WHERE AccountID = 1;
    -- Check: is balance now negative?
    IF (SELECT Balance FROM Account WHERE AccountID = 1) < 0 THEN
        ROLLBACK;  -- undo the debit
    ELSE
        UPDATE Account SET Balance = Balance + 500 WHERE AccountID = 2;
        COMMIT;
    END IF;
```

### Consistency

- The database must satisfy all **integrity constraints** before and after a transaction
- Constraints: PRIMARY KEY, FOREIGN KEY, CHECK, NOT NULL, UNIQUE
- Application-level consistency is the programmer's responsibility

### Isolation

- Concurrent transactions should produce the same result as serial execution
- Managed by the **concurrency control** system

### Durability

- Ensured by **write-ahead logging** (WAL)
- Changes are written to a log on disk before being applied
- After a crash, the log is replayed to restore committed transactions

:::

## Transaction States

:::eli10

A transaction goes through stages: it starts active, then either partially commits (almost done) or fails. If it partially commits and everything checks out, it becomes fully committed. If it fails at any point, it is aborted and all changes are undone.

:::

:::eli15

Transactions progress through states: Active (executing), Partially Committed (all operations done, awaiting final confirmation), Committed (changes made permanent), Failed (an error occurred), and Aborted (changes rolled back). A transaction can move from Active to Failed at any point, triggering rollback. Only after reaching Committed are changes guaranteed to persist.

:::

:::eli20

```
        ┌──────────┐
        │  Active  │
        └────┬─────┘
             │
    ┌────────┴────────┐
    ▼                 ▼
┌────────┐      ┌─────────┐
│Partially│      │  Failed  │
│Committed│      └────┬─────┘
└────┬────┘           │
     │                ▼
     ▼          ┌──────────┐
┌──────────┐    │  Aborted  │
│ Committed │    └──────────┘
└──────────┘
```

:::

## Concurrency Problems

:::eli10

When many people use the database at the same time, problems can happen. Two people might read the same account balance and both try to add money, losing one update. Or you might read data that someone else has not finished changing yet. These are called concurrency problems.

:::

:::eli15

Without proper controls, concurrent transactions can corrupt data. Lost updates occur when two transactions overwrite each other. Dirty reads happen when you read uncommitted (possibly rolled-back) data. Non-repeatable reads occur when data changes between two reads in the same transaction. Phantom reads happen when new rows appear between repeated queries. Isolation levels and locking mechanisms prevent these problems at varying performance costs.

:::

:::eli20

When transactions execute concurrently without proper control:

| Problem | Description | Example |
|---------|-------------|---------|
| **Lost Update** | Two transactions update same data; one overwrites the other | T1 reads balance 100, T2 reads 100, both add 50, final is 150 not 200 |
| **Dirty Read** | Reading uncommitted data from another transaction | T1 updates balance, T2 reads it, T1 rolls back — T2 has wrong value |
| **Non-repeatable Read** | Same query returns different results within one transaction | T1 reads balance 100, T2 changes it to 50, T1 re-reads and gets 50 |
| **Phantom Read** | New rows appear between two identical queries | T1 counts students, T2 inserts a student, T1 re-counts and gets different number |

:::

## Isolation Levels

:::eli10

Isolation levels are like choosing how much protection you want. More protection means fewer problems but slower performance. The strictest level (SERIALIZABLE) prevents all issues but is the slowest. The loosest (READ UNCOMMITTED) is fast but allows many problems.

:::

:::eli15

SQL defines four isolation levels that trade correctness for performance. READ UNCOMMITTED allows dirty reads (fastest). READ COMMITTED prevents dirty reads but allows non-repeatable reads. REPEATABLE READ prevents both but allows phantom reads. SERIALIZABLE prevents all concurrency problems but is slowest because it effectively serializes transactions. Most databases default to READ COMMITTED.

:::

:::eli20

| Isolation Level | Dirty Read | Non-repeatable Read | Phantom Read | Performance |
|----------------|-----------|-------------------|--------------|-------------|
| READ UNCOMMITTED | Possible | Possible | Possible | Fastest |
| READ COMMITTED | Prevented | Possible | Possible | Fast |
| REPEATABLE READ | Prevented | Prevented | Possible | Moderate |
| SERIALIZABLE | Prevented | Prevented | Prevented | Slowest |

```sql
-- Set isolation level
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

BEGIN TRANSACTION;
    -- operations here are fully isolated
COMMIT;
```

:::

## Locking

:::eli10

Locks are like putting a "do not disturb" sign on data. A shared lock (read lock) says "I am reading this, others can read too but nobody can change it." An exclusive lock (write lock) says "I am changing this, nobody else can touch it at all."

:::

:::eli15

Locks prevent conflicts between concurrent transactions. Shared (S) locks allow multiple readers simultaneously but block writers. Exclusive (X) locks block both readers and writers. Two-Phase Locking (2PL) guarantees serializability by requiring transactions to acquire all locks before releasing any (growing phase, then shrinking phase). The downside is deadlock: two transactions each holding a lock the other needs, both waiting forever. Deadlocks are resolved by aborting one transaction.

:::

:::eli20

Locks prevent concurrent access conflicts.

### Lock Types

| Lock | Also Called | Allows |
|------|-----------|--------|
| **Shared (S)** | Read lock | Other transactions can also read |
| **Exclusive (X)** | Write lock | No other transaction can read or write |

### Lock Compatibility Matrix

|  | S (held) | X (held) |
|--|----------|----------|
| **S (requested)** | Compatible | Conflict (wait) |
| **X (requested)** | Conflict (wait) | Conflict (wait) |

### Two-Phase Locking (2PL)

Guarantees **serializability**:
1. **Growing phase:** Transaction acquires locks, never releases
2. **Shrinking phase:** Transaction releases locks, never acquires

> Once a transaction releases any lock, it cannot acquire new locks.

### Deadlock

Two or more transactions wait for each other's locks indefinitely.

```
T1 holds lock on A, wants lock on B
T2 holds lock on B, wants lock on A
→ Neither can proceed = DEADLOCK
```

**Deadlock handling:**
- **Prevention:** Order resources, use timeouts
- **Detection:** Wait-for graph — if cycle exists, deadlock detected
- **Resolution:** Abort one transaction (victim) and retry

:::

## SQL Transaction Commands

:::eli10

The basic commands are: BEGIN starts a transaction, COMMIT makes it permanent, and ROLLBACK undoes everything. SAVEPOINT lets you set checkpoints so you can undo just part of the work if needed.

:::

:::eli15

SQL provides commands to control transaction boundaries. BEGIN/START TRANSACTION marks the start. COMMIT makes all changes permanent. ROLLBACK undoes all changes since the start. SAVEPOINT creates intermediate points within a transaction that you can roll back to partially, without undoing the entire transaction. This allows fine-grained error handling within complex operations.

:::

:::eli20

```sql
-- Start a transaction
BEGIN TRANSACTION;
-- or: START TRANSACTION;

-- Save intermediate point
SAVEPOINT sp1;

-- Rollback to savepoint (partial undo)
ROLLBACK TO SAVEPOINT sp1;

-- Commit (make permanent)
COMMIT;

-- Rollback entire transaction
ROLLBACK;
```

:::

## Practice

:::eli10

Try these questions about transactions, ACID properties, concurrency problems, and locking.

:::

:::eli15

These exercises test your understanding of ACID properties, identifying concurrency problems, understanding how isolation levels prevent specific issues, and reasoning about locking and deadlock scenarios.

:::

:::eli20

<details>
<summary>Q1: A bank transfer of $200 from Account A to Account B fails halfway. Only the debit executes. Which ACID property ensures this is undone?</summary>

**Atomicity.**

Atomicity guarantees that either ALL operations in a transaction complete successfully, or NONE of them take effect. Since the transaction did not reach COMMIT, the partial debit will be rolled back, restoring Account A's original balance.

</details>

<details>
<summary>Q2: Transaction T1 reads a row, then T2 modifies and commits that row, then T1 re-reads the same row and sees the new value. What concurrency problem is this? What isolation level prevents it?</summary>

This is a **non-repeatable read** — the same row gives different values within one transaction.

**REPEATABLE READ** (or higher) prevents this by holding shared locks on read rows until the transaction completes, blocking other transactions from modifying them.

</details>

<details>
<summary>Q3: Explain why two-phase locking prevents lost updates.</summary>

In 2PL, a transaction must acquire an **exclusive lock** before writing. During the growing phase:

1. T1 acquires X-lock on balance row
2. T2 tries to acquire X-lock on same row → **blocked** (conflict)
3. T1 completes its read-modify-write, then releases lock in shrinking phase
4. T2 now acquires the lock and reads the **updated** value

Since T2 is forced to wait, it reads the value AFTER T1's update, so no update is lost.

Without 2PL, both could read the old value simultaneously and overwrite each other.

</details>

<details>
<summary>Q4: Draw the wait-for graph for: T1 waits for T2, T2 waits for T3, T3 waits for T1. Is there a deadlock?</summary>

```
T1 → T2 → T3 → T1
```

**Yes, there is a deadlock.** The wait-for graph contains a cycle (T1 → T2 → T3 → T1), meaning no transaction can ever proceed.

Resolution: The DBMS must abort one transaction (e.g., the youngest or the one that has done the least work) and restart it later.

</details>

:::
