---
title: "Turing Machines & Decidability"
order: 8
moduleTitle: "COMP2040 - Languages & Computation"
tags: ["turing-machine", "decidability", "halting-problem", "CSG"]
---

## Context-Sensitive Grammars (CSGs)

:::eli10

Context-sensitive grammars are rules where the replacement is always at least as long as what it replaces -- you cannot shrink things. They sit between context-free grammars and fully unrestricted grammars in power. They can describe languages like "equal numbers of a's, b's, AND c's" which context-free grammars cannot handle.

:::

:::eli15

In a CSG, every production has the form alpha -> beta where |alpha| <= |beta| (non-contracting). This is more restrictive than unrestricted grammars but more powerful than CFGs. The corresponding machine model is the Linear Bounded Automaton (a Turing machine whose tape is limited to the input length). CSGs can express languages like a^n b^n c^n that are provably not context-free.

:::

:::eli20

Productions: $\alpha \to \beta$ where $|\alpha| \leq |\beta|$ (non-contracting).

Exception: $S \to \varepsilon$ allowed only if $S$ doesn't appear on any RHS.

**Recogniser**: Linear Bounded Automaton (TM with tape limited to input length).

### Example: $L = \{a^nb^nc^n \mid n \geq 1\}$

This is context-sensitive but NOT context-free.

:::

## Turing Machines

:::eli10

A Turing machine is the most powerful type of computer we can imagine (that still follows rules). It has an infinite tape where it can read, write, and move left or right. Unlike a PDA that can only look at the top of its stack, a Turing machine can go back and revisit anything it wrote before. It can do everything any real computer can do.

:::

:::eli15

A Turing machine has a finite control (states) plus an infinite tape divided into cells. It can read the current cell, write a new symbol, and move the head left or right. Unlike PDAs (stack, one direction), TMs have random access to their tape and can move both directions. This gives them the power to compute anything that is computable. The Church-Turing thesis says TMs capture the full notion of algorithmic computation.

:::

:::eli20

A TM is a 7-tuple $M = (Q, \Sigma, \Gamma, \delta, q_0, B, F)$:

| Component | Meaning |
|-----------|---------|
| $Q$ | Finite set of states |
| $\Sigma$ | Input alphabet ($B \notin \Sigma$) |
| $\Gamma$ | Tape alphabet ($\Sigma \subset \Gamma$, $B \in \Gamma$) |
| $\delta: Q \times \Gamma \to Q \times \Gamma \times \{L, R\}$ | Transition function |
| $q_0$ | Start state |
| $B$ | Blank symbol |
| $F$ | Accepting states |

### Key Differences from PDA

| Feature | PDA | TM |
|---------|-----|-----|
| Read direction | Left to right only | Left AND right |
| Storage | Stack (LIFO) | Infinite tape (random access) |
| Write | Push/pop stack | Write to current cell |
| Halting | Always halts (on finite input) | May loop forever |

:::

## Decidability

:::eli10

Some questions a computer can always answer with "yes" or "no" (decidable). Some questions it can say "yes" to when the answer is yes, but might get stuck forever when the answer is "no" (semi-decidable). And some questions no computer can ever fully solve (undecidable). The most famous unsolvable problem is: "will this program ever stop running?"

:::

:::eli15

A language (problem) is decidable if a Turing machine exists that always halts and correctly says "yes" or "no." It is semi-decidable if a TM can confirm membership (halts and accepts) but might loop forever on non-members. Undecidable problems have no TM that always halts with the correct answer. The halting problem -- determining whether an arbitrary program terminates -- is the most famous undecidable problem.

:::

:::eli20

| Term | Definition |
|------|-----------|
| Decidable (recursive) | A TM exists that always halts (accepts or rejects) |
| Semi-decidable (r.e.) | A TM exists that halts and accepts if $w \in L$, but may loop if $w \notin L$ |
| Undecidable | No TM can decide the language |

:::

## The Halting Problem

:::eli10

The halting problem asks: "Given any program and input, will the program eventually stop?" It turns out no program can solve this for ALL possible programs. The proof is a clever trick: if such a solver existed, you could build a paradoxical program that does the opposite of what the solver predicts, creating a contradiction -- like a fortune teller who is always wrong about their own future.

:::

:::eli15

The halting problem asks whether a given Turing machine halts on a given input. It is proven undecidable by diagonalisation: assume a halting-decider H exists, then construct a machine D that uses H to determine its own behaviour -- if H says D halts, then D loops; if H says D loops, then D halts. Running D on itself creates a contradiction either way, proving H cannot exist.

:::

:::eli20

**Statement**: Given a TM $M$ and input $w$, does $M$ halt on $w$?

**Theorem**: The halting problem is undecidable.

**Proof sketch** (diagonalisation):
1. Assume TM $H$ decides halting: $H(M, w)$ = accept if $M$ halts on $w$, reject otherwise
2. Construct $D$: on input $M$, run $H(M, M)$; if $H$ accepts, loop forever; if $H$ rejects, accept
3. What does $D(D)$ do?
   - If $D$ halts on $D$ → $H$ accepts → $D$ loops. Contradiction.
   - If $D$ doesn't halt on $D$ → $H$ rejects → $D$ accepts (halts). Contradiction.
4. Therefore $H$ cannot exist.

:::

## Church-Turing Thesis

:::eli10

The Church-Turing thesis says that anything you could ever compute by following a step-by-step procedure can also be computed by a Turing machine. It means TMs are as powerful as any computer that will ever exist. This is not a proven theorem but a widely accepted belief.

:::

:::eli15

The Church-Turing thesis states that any function that is "effectively computable" (i.e., can be solved by a mechanical procedure) is computable by a Turing machine. This is not a formal theorem (you cannot prove it because "effectively computable" is informal) but a widely accepted thesis supported by the equivalence of many independent models: lambda calculus, recursive functions, Post systems, and RAM machines all compute exactly the same class of functions.

:::

:::eli20

Any "effectively computable" function can be computed by a Turing machine. (Not a theorem — a thesis/hypothesis.)

Equivalent models: Lambda calculus, recursive functions, Post systems, RAM machines.

:::

## P vs NP

:::eli10

P is the set of problems a computer can solve quickly (in a reasonable time). NP is the set of problems where, if someone gives you a solution, you can check it quickly. The big open question is: "If you can check a solution quickly, can you always find one quickly too?" Nobody knows the answer, and a million-dollar prize awaits whoever figures it out.

:::

:::eli15

P is the class of problems solvable in polynomial time by a deterministic Turing machine. NP is the class solvable in polynomial time by a nondeterministic TM (equivalently, problems whose solutions can be verified in polynomial time). NP-complete problems are the hardest in NP -- if any one of them is in P, then P = NP. Whether P equals NP is one of the most important open questions in computer science and mathematics.

:::

:::eli20

| Class | Definition |
|-------|-----------|
| P | Problems decidable in polynomial time by a deterministic TM |
| NP | Problems decidable in polynomial time by a nondeterministic TM |
| NP-complete | Hardest problems in NP (all NP problems reduce to these) |

Open question: Does $P = NP$?

<details>
<summary>Practice: Is the set of all valid Java programs decidable?</summary>

Yes — syntactic validity is decidable (it's context-free, actually). Whether a Java program **halts** is undecidable (reduction from the halting problem), but checking if it compiles is decidable.
</details>

<details>
<summary>Practice: Is the complement of a decidable language also decidable?</summary>

Yes. If TM $M$ decides $L$ (always halts), then swap accept/reject states to get a TM that decides $\overline{L}$.
</details>

:::
