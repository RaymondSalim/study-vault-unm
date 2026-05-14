---
title: "Relations"
order: 2
moduleTitle: "COMP1017 - Maths for CS 1"
tags: ["relations", "equivalence relations", "partial orders", "Hasse diagrams", "reflexive", "symmetric", "transitive"]
---

# Relations

## Definition

:::eli10

A relation is a way of saying which things are "connected" to which other things. Think of it like a friendship chart: you draw arrows between people who are friends. The relation is just the collection of all those arrows.

:::

:::eli15

A binary relation on a set A is a collection of ordered pairs drawn from A. We write aRb to say "a is related to b." This is a very general concept -- you get to choose which pairs are included. Different choices give different types of relations with different useful properties.

:::

:::eli20

A (binary) relation $R$ on a set $A$ is a subset $R \subseteq A \times A$.

We write $aRb$ or $(a,b) \in R$ to mean "$a$ is related to $b$".

:::

## Properties of Relations

:::eli10

Relations can have special rules. "Reflexive" means everyone is related to themselves (like everyone being their own friend). "Symmetric" means if A is related to B, then B is related to A (friendship goes both ways). "Transitive" means if A is related to B, and B is related to C, then A is related to C (friend of a friend is a friend).

:::

:::eli15

Relations are classified by properties they may or may not have. Reflexive means every element is related to itself. Symmetric means the relation always goes both ways. Antisymmetric means if it goes both ways, the elements must be the same. Transitive means chains of relations collapse into direct ones. You can test these using the relation matrix or its graph diagram.

:::

:::eli20

| Property | Definition | Matrix test | Diagram test |
|----------|-----------|-------------|--------------|
| **Reflexive** | $\forall a \in A: aRa$ | All 1s on diagonal | Self-loop at every node |
| **Irreflexive** | $\forall a \in A: \lnot(aRa)$ | All 0s on diagonal | No self-loops |
| **Symmetric** | $aRb \Rightarrow bRa$ | Matrix = transpose | Every edge is bidirectional |
| **Antisymmetric** | $aRb \land bRa \Rightarrow a = b$ | $M_{ij} = 1 \land M_{ji} = 1 \Rightarrow i = j$ | No two-way edges (except self) |
| **Transitive** | $aRb \land bRc \Rightarrow aRc$ | $M^2$ entries imply $M$ entries | Shortcut edges exist |

:::

## Equivalence Relations

:::eli10

An equivalence relation is like sorting things into groups where everything in the same group is considered "the same" in some way. Like sorting socks by colour: all red socks are in one group, all blue in another. Every sock is in exactly one group, and the groups cover all socks.

:::

:::eli15

An equivalence relation is one that is reflexive, symmetric, and transitive. It naturally divides the set into non-overlapping groups called equivalence classes. Every element belongs to exactly one class, and two elements are in the same class if and only if they are related. This creates a clean partition of the whole set.

:::

:::eli20

A relation that is **reflexive**, **symmetric**, and **transitive**.

### Equivalence Classes

If $R$ is an equivalence relation on $A$, the equivalence class of $a$ is:

$$[a] = \{x \in A : xRa\}$$

**Key properties:**
- Equivalence classes **partition** $A$ (disjoint, union = $A$)
- $[a] = [b]$ if and only if $aRb$
- $[a] \cap [b] = \emptyset$ or $[a] = [b]$

**Example:** $\equiv \pmod{3}$ on $\mathbb{Z}$ gives classes $[0] = \{\ldots,-3,0,3,6,\ldots\}$, $[1] = \{\ldots,-2,1,4,7,\ldots\}$, $[2] = \{\ldots,-1,2,5,8,\ldots\}$

:::

## Partial Orders (Posets)

:::eli10

A partial order is like a ranking system where not everyone can be compared. Think of a family tree: you can say a grandparent is "above" a grandchild, but two cousins cannot be ranked against each other. Some things are comparable, some are not.

:::

:::eli15

A partial order is a relation that is reflexive, antisymmetric, and transitive. It creates a hierarchy, but unlike a total order (like numbers on a number line), some pairs of elements may be incomparable. Key concepts include minimal/maximal elements, least/greatest elements, and upper/lower bounds of subsets.

:::

:::eli20

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

:::

## Hasse Diagrams

:::eli10

A Hasse diagram is a simplified picture of a ranking. You only draw the direct connections (not ones you can figure out from the chain). Items higher up in the picture are "greater" than items below them.

:::

:::eli15

A Hasse diagram is a cleaned-up visual representation of a partial order. You remove self-loops (since reflexivity is assumed), remove edges implied by transitivity, and arrange elements so that if a is less than or equal to b, then a appears below b. No arrows are needed because direction is always upward.

:::

:::eli20

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

:::

## Closures

:::eli10

A closure is like adding the minimum number of connections to make a relation follow a rule. If your relation is not transitive yet, the transitive closure adds just enough new connections so the chain rule works.

:::

:::eli15

A closure of a relation with respect to a property is the smallest relation that contains the original and also satisfies that property. The reflexive closure adds all self-loops. The symmetric closure adds the reverse of every pair. The transitive closure repeatedly adds shortcut pairs until all chains are directly connected.

:::

:::eli20

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

:::
