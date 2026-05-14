---
title: "DFA/NFA Equivalence & Minimisation"
order: 3
moduleTitle: "COMP2040 - Languages & Computation"
tags: ["minimisation", "table-filling", "equivalence"]
---

## DFA/NFA Equivalence Summary

:::eli10

DFAs and NFAs are equally powerful -- anything one can do, the other can too. A DFA is already an NFA (just one with no choices), and any NFA can be converted into a DFA using the subset trick. They are like bicycles with and without training wheels -- both get you to the same places.

:::

:::eli15

Every DFA is trivially an NFA (it just happens to have exactly one transition per symbol). Conversely, every NFA can be converted to an equivalent DFA via subset construction, though the DFA may have exponentially more states. The key result is that both models recognise exactly the same class of languages: the regular languages.

:::

:::eli20

| Direction | Method | Complexity |
|-----------|--------|------------|
| DFA → NFA | Trivial (DFA is already an NFA) | Same states |
| NFA → DFA | Subset construction | Up to $2^n$ states |

:::

## DFA Minimisation

:::eli10

Sometimes a DFA has extra states that are not really needed -- like having two identical rooms in a maze. Minimisation finds which states behave exactly the same and merges them together, giving you the smallest possible DFA that still accepts the same words.

:::

:::eli15

DFA minimisation finds the smallest DFA that recognises the same language. Two states are "equivalent" if no input string can distinguish them (i.e., from both states, the same words lead to acceptance). The table-filling algorithm systematically identifies which pairs of states are distinguishable. Equivalent states are merged. The resulting minimal DFA is unique (up to state renaming).

:::

:::eli20

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

:::

## Lexical Analysis Connection

:::eli10

When a computer reads your code, it breaks it into pieces like keywords, numbers, and names -- just like splitting a sentence into words. It uses minimised DFAs to do this super fast, matching patterns like a very efficient word-finder puzzle solver.

:::

:::eli15

Compilers use DFAs in their lexical analysis phase (tokenisation). Each type of token (keyword, identifier, number, operator) is defined by a pattern. These patterns are combined into one NFA, converted to a DFA, and then minimised for efficiency. This is why understanding DFA minimisation has direct practical application in compiler construction.

:::

:::eli20

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

:::
