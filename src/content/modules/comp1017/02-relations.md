---
title: "Relations"
order: 2
moduleTitle: "COMP1017 - Maths for CS 1"
tags: ["relations", "equivalence relations", "partial orders", "Hasse diagrams", "reflexive", "symmetric", "transitive"]
---

# Relations

## Definition

A (binary) relation $R$ on a set $A$ is a subset $R \subseteq A \times A$.

We write $aRb$ or $(a,b) \in R$ to mean "$a$ is related to $b$".

## Properties of Relations

| Property | Definition | Matrix test | Diagram test |
|----------|-----------|-------------|--------------|
| **Reflexive** | $\forall a \in A: aRa$ | All 1s on diagonal | Self-loop at every node |
| **Irreflexive** | $\forall a \in A: \lnot(aRa)$ | All 0s on diagonal | No self-loops |
| **Symmetric** | $aRb \Rightarrow bRa$ | Matrix = transpose | Every edge is bidirectional |
| **Antisymmetric** | $aRb \land bRa \Rightarrow a = b$ | $M_{ij} = 1 \land M_{ji} = 1 \Rightarrow i = j$ | No two-way edges (except self) |
| **Transitive** | $aRb \land bRc \Rightarrow aRc$ | $M^2$ entries imply $M$ entries | Shortcut edges exist |

## Equivalence Relations

A relation that is **reflexive**, **symmetric**, and **transitive**.

### Equivalence Classes

If $R$ is an equivalence relation on $A$, the equivalence class of $a$ is:

$$[a] = \{x \in A : xRa\}$$

**Key properties:**
- Equivalence classes **partition** $A$ (disjoint, union = $A$)
- $[a] = [b]$ if and only if $aRb$
- $[a] \cap [b] = \emptyset$ or $[a] = [b]$

**Example:** $\equiv \pmod{3}$ on $\mathbb{Z}$ gives classes $[0] = \{\ldots,-3,0,3,6,\ldots\}$, $[1] = \{\ldots,-2,1,4,7,\ldots\}$, $[2] = \{\ldots,-1,2,5,8,\ldots\}$

## Partial Orders (Posets)

A relation that is **reflexive**, **antisymmetric**, and **transitive**.

A partially ordered set (poset) is $(A, \leq)$ where $\leq$ is a partial order.

| Term | Definition |
|------|-----------|
| **Comparable** | $a \leq b$ or $b \leq a$ |
| **Incomparable** | Neither $a \leq b$ nor $b \leq a$ |
| **Total order** | Every pair is comparable |
| **Minimal** | No element $b \neq a$ with $b \leq a$ |
| **Maximal** | No element $b \neq a$ with $a \leq b$ |
| **Minimum (least)** | $a \leq x$ for all $x \in A$ |
| **Maximum (greatest)** | $x \leq a$ for all $x \in A$ |
| **Upper bound of $S$** | $s \leq a$ for all $s \in S$ |
| **Lower bound of $S$** | $a \leq s$ for all $s \in S$ |
| **LUB / supremum** | Least upper bound |
| **GLB / infimum** | Greatest lower bound |

> Minimal $\neq$ minimum! A minimum must be $\leq$ all elements; a minimal element just has nothing below it.

## Hasse Diagrams

Rules for drawing:
1. Remove self-loops (reflexivity is assumed)
2. Remove edges implied by transitivity
3. Draw remaining edges going **upward** (so $a$ below $b$ if $a \leq b$)
4. No arrows needed (direction is always up)

**Example:** Divisibility on $\{1,2,3,4,6,12\}$

```
       12
      / \
     4   6
     |   |\ 
     2   3  \
      \ /   |
       1----+
```

## Closures

| Closure | Add to make... | Method |
|---------|---------------|--------|
| Reflexive | Reflexive | Add $(a,a)$ for all $a$ |
| Symmetric | Symmetric | If $(a,b) \in R$, add $(b,a)$ |
| Transitive | Transitive | Repeatedly: if $(a,b),(b,c) \in R$, add $(a,c)$ |

---

<details>
<summary><strong>Practice: Classify relations</strong></summary>

**Q:** On $\{1,2,3,4\}$, let $R = \{(1,1),(2,2),(3,3),(4,4),(1,2),(2,1),(3,4),(4,3)\}$

- Reflexive? Yes (all $(a,a)$ present)
- Symmetric? Yes ($(1,2)$ and $(2,1)$; $(3,4)$ and $(4,3)$)
- Transitive? Yes (check all pairs: $(1,2),(2,1) \Rightarrow (1,1)$ present; etc.)
- **Equivalence relation?** Yes. Classes: $\{1,2\}$ and $\{3,4\}$.

</details>

<details>
<summary><strong>Practice: Hasse diagram interpretation</strong></summary>

**Q:** In the poset $(\{1,2,3,5,6,10,15,30\}, |)$ (divisibility):
- Minimal element: $1$ (also minimum)
- Maximal element: $30$ (also maximum)
- LUB of $\{2,3\}$: $6$
- GLB of $\{10,15\}$: $5$

</details>
