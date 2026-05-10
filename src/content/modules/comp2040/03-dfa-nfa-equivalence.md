---
title: "DFA/NFA Equivalence & Minimisation"
order: 3
moduleTitle: "COMP2040 - Languages & Computation"
tags: ["minimisation", "table-filling", "equivalence"]
---

## DFA/NFA Equivalence Summary

| Direction | Method | Complexity |
|-----------|--------|------------|
| DFA → NFA | Trivial (DFA is already an NFA) | Same states |
| NFA → DFA | Subset construction | Up to $2^n$ states |

## DFA Minimisation

**Goal**: Find the DFA with the fewest states that recognises the same language.

### Equivalent States

Two states $p, q$ are **equivalent** ($p \equiv q$) if:
$$\forall w \in \Sigma^*: \hat{\delta}(p, w) \in F \iff \hat{\delta}(q, w) \in F$$

Two states are **distinguishable** if there exists some word $w$ accepted from one but not the other.

### Table-Filling Algorithm

| Step | Action |
|------|--------|
| 1 | Mark all pairs $(p, q)$ where exactly one is accepting |
| 2 | For each unmarked pair $(p, q)$: for each $a \in \Sigma$, if $(\delta(p,a), \delta(q,a))$ is marked, mark $(p,q)$ |
| 3 | Repeat step 2 until no new pairs are marked |
| 4 | Unmarked pairs = equivalent states → merge them |

### Worked Example

States: $\{A, B, C, D, E\}$, accepting: $\{C, E\}$, alphabet: $\{0, 1\}$

**Step 1**: Mark pairs where one is accepting and one isn't:
- Mark: (A,C), (A,E), (B,C), (B,E), (D,C), (D,E)

**Step 2**: For unmarked pairs, check transitions:
- (A,B): check if $(\delta(A,0), \delta(B,0))$ or $(\delta(A,1), \delta(B,1))$ is marked
- Continue until stable...

**Step 4**: Merge all remaining unmarked pairs.

## Lexical Analysis Connection

- Tokenisers in compilers use DFAs
- Keywords, identifiers, numbers → different accepting states
- NFA for each token pattern → combined NFA → DFA → minimised DFA

<details>
<summary>Practice: After minimisation, is the resulting DFA unique?</summary>

Yes — the minimal DFA for a regular language is unique up to renaming of states (isomorphism). This is a fundamental theorem.
</details>

<details>
<summary>Practice: In the table-filling algorithm, why do we initially mark pairs where exactly one state is accepting?</summary>

If $p \in F$ and $q \notin F$, then the empty word $\varepsilon$ distinguishes them: $\hat{\delta}(p, \varepsilon) = p \in F$ but $\hat{\delta}(q, \varepsilon) = q \notin F$. These are the "base case" distinguishable pairs.
</details>
