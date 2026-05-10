---
title: "Exam Traps"
order: 91
moduleTitle: "COMP2040 - Languages & Computation"
tags: ["exam", "mistakes"]
---

## Common Mistakes

<details>
<summary>Pumping Lemma: You choose w, adversary chooses the split</summary>

The proof structure is: you pick $w$ (after being given $p$), but the **adversary** picks the split $xyz$. You must show pumping fails for ALL valid splits, not just one. "Let $y = a^k$ for some $k > 0$" (covering all cases) is correct. "Let $y = a$" (picking one specific split) is wrong.
</details>

<details>
<summary>NFA acceptance: EXISTS a path, not ALL paths</summary>

An NFA accepts if there **exists** at least one accepting computation path. Many paths may reject — that's fine. A common error is to say "this NFA rejects because there's a path to a non-accepting state."
</details>

<details>
<summary>ε-closure: Don't forget it in subset construction</summary>

When computing DFA transitions from NFA, you must:
1. Follow the symbol transition
2. THEN take the ε-closure of the result

Forgetting step 2 produces an incorrect DFA.
</details>

<details>
<summary>DFA transition function must be TOTAL</summary>

Every (state, symbol) pair must have exactly one transition. If your DFA diagram is "missing" transitions, add them going to a dead/trap state. NFAs can have missing transitions (meaning 0 transitions → that branch dies).
</details>

<details>
<summary>RE precedence: * before concatenation before +</summary>

$ab^*$ means $a(b^*)$, not $(ab)^*$. Many students read $ab^*$ as "repeat $ab$" when it actually means "$a$ followed by zero or more $b$'s."
</details>

<details>
<summary>PDA: ε on input means "don't read anything"</summary>

A PDA transition $\delta(q, \varepsilon, X)$ fires **without consuming input**. It's not "read epsilon" — it's "read nothing." This means the PDA can make moves even with no remaining input (as long as the stack condition is met).
</details>

<details>
<summary>Pumping Lemma CANNOT prove regularity</summary>

The pumping lemma is a necessary condition for regularity, NOT sufficient. Some non-regular languages satisfy the pumping conditions. To prove regularity, you must construct a DFA/NFA/RE.
</details>

<details>
<summary>CFG ambiguity: Two different LEFTMOST derivations</summary>

A grammar is ambiguous if some string has two different leftmost derivations (or equivalently, two different parse trees). Having two derivations that differ only in order of production application (but yield the same tree) does NOT count.
</details>

<details>
<summary>CFL intersection: NOT closed</summary>

$L_1 = \{a^nb^nc^m\}$ and $L_2 = \{a^mb^nc^n\}$ are both CFL. But $L_1 \cap L_2 = \{a^nb^nc^n\}$ is NOT context-free. Never assume you can intersect two CFLs and get a CFL.
</details>

<details>
<summary>Halting problem: Undecidable ≠ unsolvable for specific cases</summary>

The halting problem is undecidable **in general** — no algorithm works for ALL (TM, input) pairs. For specific programs, you can often determine halting. The impossibility is about a universal algorithm.
</details>
