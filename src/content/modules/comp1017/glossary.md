---
title: "Glossary"
order: 95
moduleTitle: "COMP1017 - Maths for CS 1"
tags: ["glossary", "definitions", "terminology"]
---

# Glossary

## Sets

| Term | Definition |
|------|-----------|
| **Set** | An unordered collection of distinct elements |
| **Subset** ($A \subseteq B$) | Every element of $A$ is in $B$ |
| **Proper subset** ($A \subset B$) | $A \subseteq B$ and $A \neq B$ |
| **Power set** ($\mathcal{P}(A)$) | Set of all subsets of $A$ |
| **Cartesian product** ($A \times B$) | Set of all ordered pairs $(a,b)$ with $a \in A, b \in B$ |
| **Cardinality** ($|A|$) | Number of elements in $A$ |
| **Partition** | Collection of non-empty, disjoint subsets whose union is $A$ |

## Functions

| Term | Definition |
|------|-----------|
| **Function** ($f: A \to B$) | Rule assigning exactly one element of $B$ to each element of $A$ |
| **Domain** | Input set $A$ |
| **Codomain** | Target set $B$ |
| **Range/Image** | $\{f(a) : a \in A\}$, subset of codomain actually hit |
| **Injective** (one-to-one) | Different inputs give different outputs |
| **Surjective** (onto) | Every element of codomain is hit |
| **Bijective** | Both injective and surjective |
| **Inverse function** | $f^{-1}: B \to A$ exists iff $f$ is bijective |
| **Composition** ($g \circ f$) | $(g \circ f)(x) = g(f(x))$ |

## Relations

| Term | Definition |
|------|-----------|
| **Relation** on $A$ | Subset of $A \times A$ |
| **Reflexive** | $aRa$ for all $a$ |
| **Symmetric** | $aRb \Rightarrow bRa$ |
| **Antisymmetric** | $aRb \land bRa \Rightarrow a = b$ |
| **Transitive** | $aRb \land bRc \Rightarrow aRc$ |
| **Equivalence relation** | Reflexive + symmetric + transitive |
| **Equivalence class** $[a]$ | All elements related to $a$ |
| **Partial order** | Reflexive + antisymmetric + transitive |
| **Poset** | Set with a partial order |
| **Total order** | Partial order where all pairs are comparable |
| **Hasse diagram** | Visual representation of a poset (edges going up) |

## Logic

| Term | Definition |
|------|-----------|
| **Proposition** | Statement that is either true or false |
| **Predicate** | Statement with variables; becomes proposition when variables assigned |
| **Tautology** | Always true |
| **Contradiction** | Always false |
| **Contingency** | Neither tautology nor contradiction |
| **Logically equivalent** ($\equiv$) | Same truth value for all variable assignments |
| **Converse** of $p \to q$ | $q \to p$ |
| **Contrapositive** of $p \to q$ | $\lnot q \to \lnot p$ (equivalent to original) |
| **Universal quantifier** ($\forall$) | "For all" |
| **Existential quantifier** ($\exists$) | "There exists" |
| **Vacuous truth** | $p \to q$ is true when $p$ is false |

## Proof

| Term | Definition |
|------|-----------|
| **Direct proof** | Assume hypothesis, derive conclusion |
| **Proof by contradiction** | Assume negation, derive impossibility |
| **Proof by contrapositive** | Prove $\lnot Q \to \lnot P$ instead of $P \to Q$ |
| **Mathematical induction** | Base case + inductive step |
| **Inductive hypothesis** | Assumption that $P(k)$ is true |
| **Strong induction** | Assume $P(j)$ for all $j \leq k$ in the inductive step |
| **Counterexample** | Single case disproving a universal statement |

## Number Theory

| Term | Definition |
|------|-----------|
| **Divides** ($a \mid b$) | $b = ka$ for some integer $k$ |
| **GCD** ($\gcd(a,b)$) | Greatest common divisor |
| **LCM** ($\text{lcm}(a,b)$) | Least common multiple |
| **Coprime/relatively prime** | $\gcd(a,b) = 1$ |
| **Congruence** ($a \equiv b \pmod n$) | $n \mid (a-b)$ |
| **Modular inverse** | $a^{-1}$ such that $aa^{-1} \equiv 1 \pmod n$ |
| **Prime** | $p > 1$ with no divisors other than $1$ and $p$ |
| **Composite** | $n > 1$ that is not prime |
| **Bezout's identity** | $\gcd(a,b) = ax + by$ for some integers $x,y$ |

## Sequences and Series

| Term | Definition |
|------|-----------|
| **Sequence** | Ordered list of numbers (function $\mathbb{N} \to \mathbb{R}$) |
| **Series** | Sum of terms of a sequence |
| **Arithmetic sequence** | Constant difference $d$ between terms |
| **Geometric sequence** | Constant ratio $r$ between terms |
| **Partial sum** $S_n$ | Sum of first $n$ terms |
| **Convergent series** | Partial sums approach a finite limit |
| **Divergent series** | Partial sums do not approach a finite limit |
| **Recurrence relation** | Defines terms using previous terms |
| **Characteristic equation** | Polynomial whose roots give closed-form solution |

## Calculus

| Term | Definition |
|------|-----------|
| **Limit** | Value a function approaches as input approaches some value |
| **Derivative** ($f'(x)$) | Rate of change; slope of tangent line |
| **Stationary point** | Where $f'(x) = 0$ |
| **Local maximum** | $f''(x) < 0$ at stationary point |
| **Local minimum** | $f''(x) > 0$ at stationary point |
| **Inflection point** | Where concavity changes ($f'' = 0$ and sign change) |
| **Antiderivative** | Function whose derivative is $f$ |
| **Indefinite integral** | Family of antiderivatives ($+C$) |
| **Definite integral** | $\int_a^b f\, dx = F(b) - F(a)$ |
