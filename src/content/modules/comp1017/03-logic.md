---
title: "Logic"
order: 3
moduleTitle: "COMP1017 - Maths for CS 1"
tags: ["propositional logic", "predicate logic", "truth tables", "logical equivalence", "quantifiers"]
---

# Logic

## Propositional Logic

### Connectives

| Connective | Symbol | Read as | True when... |
|-----------|--------|---------|--------------|
| Negation | $\lnot p$ | "not $p$" | $p$ is false |
| Conjunction | $p \land q$ | "$p$ and $q$" | Both true |
| Disjunction | $p \lor q$ | "$p$ or $q$" | At least one true |
| Implication | $p \to q$ | "if $p$ then $q$" | $\lnot p$ or $q$ |
| Biconditional | $p \leftrightarrow q$ | "$p$ iff $q$" | Both same truth value |

### Implication Truth Table (Most Tested)

| $p$ | $q$ | $p \to q$ |
|-----|-----|-----------|
| T | T | **T** |
| T | F | **F** |
| F | T | **T** |
| F | F | **T** |

> Key: An implication is only false when the hypothesis is true and the conclusion is false. "False implies anything" is always true.

### Related Statements

| Name | Form | Relationship |
|------|------|-------------|
| Original | $p \to q$ | - |
| Converse | $q \to p$ | Not logically equivalent to original |
| Inverse | $\lnot p \to \lnot q$ | Equivalent to converse |
| Contrapositive | $\lnot q \to \lnot p$ | **Equivalent to original** |

## Key Logical Equivalences

| Name | Equivalence |
|------|-------------|
| Double negation | $\lnot(\lnot p) \equiv p$ |
| De Morgan's | $\lnot(p \land q) \equiv \lnot p \lor \lnot q$ |
| De Morgan's | $\lnot(p \lor q) \equiv \lnot p \land \lnot q$ |
| Implication | $p \to q \equiv \lnot p \lor q$ |
| Biconditional | $p \leftrightarrow q \equiv (p \to q) \land (q \to p)$ |
| Distributive | $p \land (q \lor r) \equiv (p \land q) \lor (p \land r)$ |
| Distributive | $p \lor (q \land r) \equiv (p \lor q) \land (p \lor r)$ |
| Absorption | $p \lor (p \land q) \equiv p$ |
| Absorption | $p \land (p \lor q) \equiv p$ |
| Idempotent | $p \lor p \equiv p$, $p \land p \equiv p$ |

## Tautology and Contradiction

- **Tautology**: always true regardless of variable values (e.g., $p \lor \lnot p$)
- **Contradiction**: always false (e.g., $p \land \lnot p$)
- **Contingency**: neither tautology nor contradiction

## Predicate Logic

### Quantifiers

| Quantifier | Symbol | Meaning | Negation |
|-----------|--------|---------|----------|
| Universal | $\forall x\, P(x)$ | For all $x$, $P(x)$ holds | $\exists x\, \lnot P(x)$ |
| Existential | $\exists x\, P(x)$ | There exists an $x$ such that $P(x)$ | $\forall x\, \lnot P(x)$ |

### Negating Quantified Statements

$$\lnot(\forall x\, P(x)) \equiv \exists x\, \lnot P(x)$$
$$\lnot(\exists x\, P(x)) \equiv \forall x\, \lnot P(x)$$

**Nested quantifiers:** Negate by flipping each quantifier and negating the predicate.

$$\lnot(\forall x\, \exists y\, P(x,y)) \equiv \exists x\, \forall y\, \lnot P(x,y)$$

### Order of Quantifiers Matters

$$\forall x\, \exists y\, (x + y = 0) \quad \text{TRUE in } \mathbb{Z}$$
$$\exists y\, \forall x\, (x + y = 0) \quad \text{FALSE in } \mathbb{Z}$$

## Arguments and Validity

| Rule | Form |
|------|------|
| Modus Ponens | $p \to q$, $p$ $\therefore q$ |
| Modus Tollens | $p \to q$, $\lnot q$ $\therefore \lnot p$ |
| Hypothetical Syllogism | $p \to q$, $q \to r$ $\therefore p \to r$ |
| Disjunctive Syllogism | $p \lor q$, $\lnot p$ $\therefore q$ |
| Resolution | $p \lor q$, $\lnot p \lor r$ $\therefore q \lor r$ |

---

<details>
<summary><strong>Practice: Simplify using equivalences</strong></summary>

**Q:** Simplify $\lnot(p \to q)$

$$\lnot(p \to q) \equiv \lnot(\lnot p \lor q) \equiv p \land \lnot q$$

The negation of "if $p$ then $q$" is "$p$ and not $q$".

</details>

<details>
<summary><strong>Practice: Negate a quantified statement</strong></summary>

**Q:** Negate: "For every real number $x$, there exists a natural number $n$ such that $n > x$."

Formal: $\forall x \in \mathbb{R},\, \exists n \in \mathbb{N},\, n > x$

Negation: $\exists x \in \mathbb{R},\, \forall n \in \mathbb{N},\, n \leq x$

English: "There exists a real number $x$ such that for all natural numbers $n$, $n \leq x$."

</details>

<details>
<summary><strong>Practice: Truth table</strong></summary>

**Q:** Show $(p \to q) \equiv (\lnot q \to \lnot p)$

| $p$ | $q$ | $p \to q$ | $\lnot q$ | $\lnot p$ | $\lnot q \to \lnot p$ |
|-----|-----|-----------|-----------|-----------|----------------------|
| T | T | T | F | F | T |
| T | F | F | T | F | F |
| F | T | T | F | T | T |
| F | F | T | T | T | T |

Columns 3 and 6 match. Confirmed equivalent (contrapositive).

</details>
