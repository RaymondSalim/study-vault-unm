---
title: "Sets and Functions"
order: 1
moduleTitle: "COMP1017 - Maths for CS 1"
tags: ["sets", "functions", "injection", "surjection", "bijection", "power set", "cartesian product"]
---

# Sets and Functions

## Set Notation

| Symbol | Meaning | Example |
|--------|---------|---------|
| $\in$ | Element of | $3 \in \{1,2,3\}$ |
| $\notin$ | Not element of | $4 \notin \{1,2,3\}$ |
| $\subseteq$ | Subset (includes equal) | $\{1,2\} \subseteq \{1,2,3\}$ |
| $\subset$ | Proper subset | $\{1,2\} \subset \{1,2,3\}$ |
| $\emptyset$ | Empty set | $\emptyset \subseteq A$ for all $A$ |
| $\mathbb{N}, \mathbb{Z}, \mathbb{Q}, \mathbb{R}$ | Number sets | Natural, Integer, Rational, Real |

## Set Operations

| Operation | Notation | Definition |
|-----------|----------|------------|
| Union | $A \cup B$ | $\{x : x \in A \text{ or } x \in B\}$ |
| Intersection | $A \cap B$ | $\{x : x \in A \text{ and } x \in B\}$ |
| Difference | $A \setminus B$ | $\{x : x \in A \text{ and } x \notin B\}$ |
| Complement | $\overline{A}$ or $A^c$ | $\{x \in U : x \notin A\}$ |
| Symmetric Difference | $A \triangle B$ | $(A \setminus B) \cup (B \setminus A)$ |

## De Morgan's Laws

$$\overline{A \cup B} = \overline{A} \cap \overline{B}$$

$$\overline{A \cap B} = \overline{A} \cup \overline{B}$$

## Power Set

The power set $\mathcal{P}(A)$ is the set of all subsets of $A$.

- If $|A| = n$, then $|\mathcal{P}(A)| = 2^n$
- $\emptyset \in \mathcal{P}(A)$ always
- $A \in \mathcal{P}(A)$ always

**Example:** $\mathcal{P}(\{1,2\}) = \{\emptyset, \{1\}, \{2\}, \{1,2\}\}$

## Cartesian Product

$$A \times B = \{(a, b) : a \in A, b \in B\}$$

- $|A \times B| = |A| \cdot |B|$
- $A \times B \neq B \times A$ in general (unless $A = B$ or one is empty)

## Functions

A function $f: A \to B$ assigns exactly one element of $B$ to each element of $A$.

- **Domain**: $A$ (input set)
- **Codomain**: $B$ (target set)
- **Range/Image**: $\{f(a) : a \in A\} \subseteq B$

## Types of Functions

| Type | Definition | Test |
|------|-----------|------|
| **Injective** (one-to-one) | $f(a_1) = f(a_2) \Rightarrow a_1 = a_2$ | No two inputs map to same output |
| **Surjective** (onto) | $\forall b \in B, \exists a \in A : f(a) = b$ | Every element in codomain is hit |
| **Bijective** | Both injective and surjective | One-to-one correspondence |

## Cardinality Constraints

| | $|A| < |B|$ | $|A| = |B|$ | $|A| > |B|$ |
|--|--|--|--|
| Injective possible? | Yes | Yes | No (pigeonhole) |
| Surjective possible? | No | Yes | Yes |
| Bijective possible? | No | Yes | No |

## Composition

$(g \circ f)(x) = g(f(x))$

- If $f$ and $g$ are injective, then $g \circ f$ is injective
- If $f$ and $g$ are surjective, then $g \circ f$ is surjective
- If $f$ and $g$ are bijective, then $g \circ f$ is bijective

## Inverse Functions

$f^{-1}$ exists if and only if $f$ is bijective.

$$f^{-1}(f(a)) = a \quad \text{and} \quad f(f^{-1}(b)) = b$$

---

<details>
<summary><strong>Practice: Determine if injective/surjective</strong></summary>

**Q:** Let $f: \mathbb{Z} \to \mathbb{Z}$ defined by $f(n) = 2n + 1$.

- **Injective?** Yes. If $2n_1 + 1 = 2n_2 + 1$ then $n_1 = n_2$.
- **Surjective?** No. $f(n)$ is always odd, so even integers are never hit.

**Q:** Let $g: \mathbb{R} \to \mathbb{R}$ defined by $g(x) = x^3$.

- **Injective?** Yes. Cubic is strictly increasing.
- **Surjective?** Yes. For any $y \in \mathbb{R}$, $x = \sqrt[3]{y}$ works.
- Therefore $g$ is **bijective**.

</details>

<details>
<summary><strong>Practice: Power Set</strong></summary>

**Q:** Find $\mathcal{P}(\{a, b, c\})$ and state its cardinality.

**A:** $\mathcal{P}(\{a,b,c\}) = \{\emptyset, \{a\}, \{b\}, \{c\}, \{a,b\}, \{a,c\}, \{b,c\}, \{a,b,c\}\}$

Cardinality: $2^3 = 8$

</details>
