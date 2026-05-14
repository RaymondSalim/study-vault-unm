---
title: "Sets and Functions"
order: 1
moduleTitle: "COMP1017 - Maths for CS 1"
tags: ["sets", "functions", "injection", "surjection", "bijection", "power set", "cartesian product"]
---

# Sets and Functions

## Set Notation

:::eli10

A set is like a bag of items where each item appears only once. We use special symbols to say things like "this item is in the bag" or "all items in bag A are also in bag B." Think of it like labelling collections of stickers and describing which stickers belong where.

:::

:::eli15

A set is a well-defined collection of distinct objects. We use standard notation to express membership (whether an element belongs to a set), subset relationships (whether all elements of one set are contained in another), and common number sets like the naturals, integers, rationals, and reals. These symbols let us write precise mathematical statements about collections without ambiguity.

:::

:::eli20

| Symbol | Meaning | Example |
|--------|---------|---------|
| $\in$ | Element of | $3 \in \{1,2,3\}$ |
| $\notin$ | Not element of | $4 \notin \{1,2,3\}$ |
| $\subseteq$ | Subset (includes equal) | $\{1,2\} \subseteq \{1,2,3\}$ |
| $\subset$ | Proper subset | $\{1,2\} \subset \{1,2,3\}$ |
| $\emptyset$ | Empty set | $\emptyset \subseteq A$ for all $A$ |
| $\mathbb{N}, \mathbb{Z}, \mathbb{Q}, \mathbb{R}$ | Number sets | Natural, Integer, Rational, Real |

:::

## Set Operations

:::eli10

Set operations are like things you can do with groups of toys. Union means "put all toys from both groups together." Intersection means "find toys that are in both groups." Difference means "take away the toys that are also in the other group."

:::

:::eli15

Set operations allow you to combine or compare sets in different ways. Union merges two sets together. Intersection finds common elements. Difference removes elements of one set from another. Complement gives everything NOT in the set. Symmetric difference gives elements in one set or the other, but not both -- like an exclusive OR for sets.

:::

:::eli20

| Operation | Notation | Definition |
|-----------|----------|------------|
| Union | $A \cup B$ | $\{x : x \in A \text{ or } x \in B\}$ |
| Intersection | $A \cap B$ | $\{x : x \in A \text{ and } x \in B\}$ |
| Difference | $A \setminus B$ | $\{x : x \in A \text{ and } x \notin B\}$ |
| Complement | $\overline{A}$ or $A^c$ | $\{x \in U : x \notin A\}$ |
| Symmetric Difference | $A \triangle B$ | $(A \setminus B) \cup (B \setminus A)$ |

:::

## De Morgan's Laws

:::eli10

De Morgan's Laws are like a rule for opposites: the opposite of "A or B" is "not A and not B." It is like saying: if it is NOT the case that you want cake OR ice cream, then you do NOT want cake AND you do NOT want ice cream.

:::

:::eli15

De Morgan's Laws tell you how to distribute a complement (negation) over unions and intersections. Taking the complement of a union turns it into an intersection of complements, and vice versa. These laws are fundamental for simplifying set expressions and logical statements.

:::

:::eli20

$$\overline{A \cup B} = \overline{A} \cap \overline{B}$$

$$\overline{A \cap B} = \overline{A} \cup \overline{B}$$

:::

## Power Set

:::eli10

The power set is like listing every possible combination of items you could pick from a bag, including picking nothing at all and picking everything. If you have 2 items, there are 4 possible combinations. If you have 3 items, there are 8.

:::

:::eli15

The power set of a set A is the collection of ALL possible subsets of A, including the empty set and A itself. The number of subsets doubles with each new element added to A -- specifically, a set with n elements has exactly 2^n subsets. This concept is important in combinatorics and in defining function spaces.

:::

:::eli20

The power set $\mathcal{P}(A)$ is the set of all subsets of $A$.

- If $|A| = n$, then $|\mathcal{P}(A)| = 2^n$
- $\emptyset \in \mathcal{P}(A)$ always
- $A \in \mathcal{P}(A)$ always

**Example:** $\mathcal{P}(\{1,2\}) = \{\emptyset, \{1\}, \{2\}, \{1,2\}\}$

:::

## Cartesian Product

:::eli10

The Cartesian product is like making all possible pairs. If you have 3 shirts and 2 pants, the Cartesian product gives you all 6 possible outfits (each shirt paired with each pant).

:::

:::eli15

The Cartesian product A x B creates all ordered pairs where the first element comes from A and the second from B. The total number of pairs equals the product of the sizes of A and B. Order matters: (a, b) is different from (b, a), so A x B is generally not the same as B x A.

:::

:::eli20

$$A \times B = \{(a, b) : a \in A, b \in B\}$$

- $|A \times B| = |A| \cdot |B|$
- $A \times B \neq B \times A$ in general (unless $A = B$ or one is empty)

:::

## Functions

:::eli10

A function is like a machine: you put one thing in, and exactly one thing comes out. Every input must give an output, and the same input always gives the same output. It is like a vending machine where each button gives you exactly one snack.

:::

:::eli15

A function f: A -> B is a rule that assigns to every element in set A exactly one element in set B. The set A is called the domain (all valid inputs), B is the codomain (all possible outputs), and the range or image is the subset of B that actually gets used as outputs.

:::

:::eli20

A function $f: A \to B$ assigns exactly one element of $B$ to each element of $A$.

- **Domain**: $A$ (input set)
- **Codomain**: $B$ (target set)
- **Range/Image**: $\{f(a) : a \in A\} \subseteq B$

:::

## Types of Functions

:::eli10

Functions can be classified by how they connect inputs to outputs. Injective means no two inputs give the same output (like everyone having a unique seat). Surjective means every possible output is used by at least one input (no empty seats). Bijective means both -- a perfect one-to-one pairing.

:::

:::eli15

An injective (one-to-one) function never maps two different inputs to the same output. A surjective (onto) function covers every element of the codomain -- nothing is missed. A bijective function is both: it creates a perfect pairing between input and output sets, which means an inverse function exists.

:::

:::eli20

| Type | Definition | Test |
|------|-----------|------|
| **Injective** (one-to-one) | $f(a_1) = f(a_2) \Rightarrow a_1 = a_2$ | No two inputs map to same output |
| **Surjective** (onto) | $\forall b \in B, \exists a \in A : f(a) = b$ | Every element in codomain is hit |
| **Bijective** | Both injective and surjective | One-to-one correspondence |

:::

## Cardinality Constraints

:::eli10

The sizes of the input and output sets limit what kind of function you can have. You cannot have a one-to-one function from a bigger set to a smaller set -- it is like trying to seat 5 people in 3 chairs with nobody sharing.

:::

:::eli15

The relative sizes of domain and codomain determine which types of functions are possible. If the domain is larger than the codomain, an injection is impossible (pigeonhole principle). If the domain is smaller, a surjection is impossible. A bijection requires both sets to be the same size.

:::

:::eli20

| | $|A| < |B|$ | $|A| = |B|$ | $|A| > |B|$ |
|--|--|--|--|
| Injective possible? | Yes | Yes | No (pigeonhole) |
| Surjective possible? | No | Yes | Yes |
| Bijective possible? | No | Yes | No |

:::

## Composition

:::eli10

Composition is like chaining two machines together: the output of the first machine becomes the input of the second machine. If you put something into machine f, then take that result and put it into machine g, that is the composition g after f.

:::

:::eli15

Function composition combines two functions into one by applying them in sequence. The notation (g o f)(x) means "first apply f to x, then apply g to the result." If both functions preserve injectivity, surjectivity, or bijectivity, then their composition does too.

:::

:::eli20

$(g \circ f)(x) = g(f(x))$

- If $f$ and $g$ are injective, then $g \circ f$ is injective
- If $f$ and $g$ are surjective, then $g \circ f$ is surjective
- If $f$ and $g$ are bijective, then $g \circ f$ is bijective

:::

## Inverse Functions

:::eli10

An inverse function is like an "undo" button. If a function turns 3 into 7, the inverse turns 7 back into 3. But you can only have an undo button if the function is bijective -- every output came from exactly one input, so you can always trace back.

:::

:::eli15

An inverse function reverses the mapping of the original function. It only exists when the function is bijective (one-to-one and onto), because you need a unique input for every output to be able to reverse the mapping unambiguously. Applying a function and then its inverse (or vice versa) gives you back the original value.

:::

:::eli20

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

:::
