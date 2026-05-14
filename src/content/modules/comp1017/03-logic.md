---
title: "Logic"
order: 3
moduleTitle: "COMP1017 - Maths for CS 1"
tags: ["propositional logic", "predicate logic", "truth tables", "logical equivalence", "quantifiers"]
---

# Logic

## Propositional Logic

:::eli10

Propositional logic is about statements that are either true or false, and how to combine them. "AND" means both must be true. "OR" means at least one must be true. "NOT" flips true to false. "If...then" is like a promise: it is only broken if you promised something true but delivered something false.

:::

:::eli15

Propositional logic deals with propositions (statements with a definite truth value) and logical connectives that combine them. The key connectives are NOT (negation), AND (conjunction), OR (disjunction), implication (if-then), and biconditional (if and only if). Each connective has precise rules defined by truth tables. The most counterintuitive one is implication: "if P then Q" is only false when P is true and Q is false.

:::

:::eli20

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

:::

## Key Logical Equivalences

:::eli10

Logical equivalences are like math shortcuts that let you rewrite statements in different ways without changing their meaning. Just like you can rewrite 2+3 as 3+2, you can rewrite "not (A and B)" as "not A or not B."

:::

:::eli15

Logical equivalences are pairs of expressions that always have the same truth value. They are used to simplify complex logical expressions. Key ones include De Morgan's laws (for distributing negation over AND/OR), the implication rule (rewriting if-then as OR), distributive laws, and absorption. Memorising these is essential for simplifying proofs and boolean expressions.

:::

:::eli20

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

:::

## Tautology and Contradiction

:::eli10

A tautology is a statement that is ALWAYS true no matter what, like "it is either raining or not raining." A contradiction is ALWAYS false, like "it is raining and not raining at the same time." A contingency is a normal statement that can be true or false depending on the situation.

:::

:::eli15

A tautology is a logical formula that evaluates to true for every possible combination of variable values. A contradiction is one that is always false. A contingency is neither -- it depends on the values assigned. Recognising tautologies is important because they represent logical laws (things that are universally valid), while contradictions signal impossible scenarios.

:::

:::eli20

- **Tautology**: always true regardless of variable values (e.g., $p \lor \lnot p$)
- **Contradiction**: always false (e.g., $p \land \lnot p$)
- **Contingency**: neither tautology nor contradiction

:::

## Predicate Logic

:::eli10

Predicate logic adds "for all" and "there exists" to our logic toolbox. It lets you talk about whole groups: "every dog has a tail" or "there is at least one student who passed." To negate these, you flip the words: "not every dog has a tail" becomes "there exists a dog without a tail."

:::

:::eli15

Predicate logic extends propositional logic with quantifiers that let you make statements about all or some elements in a domain. The universal quantifier (for all) claims a property holds for every element. The existential quantifier (there exists) claims at least one element satisfies the property. Negation swaps the quantifier type and negates the predicate. The order of nested quantifiers matters and can change the meaning entirely.

:::

:::eli20

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

:::

## Arguments and Validity

:::eli10

An argument is valid if, whenever all the starting facts (premises) are true, the conclusion must also be true. There are named patterns for valid arguments, like "if it rains then the ground is wet; it is raining; therefore the ground is wet."

:::

:::eli15

A valid logical argument is one where the conclusion follows necessarily from the premises. Several named rules of inference capture common valid patterns: Modus Ponens (if P then Q; P; therefore Q), Modus Tollens (if P then Q; not Q; therefore not P), Hypothetical Syllogism (chaining two implications), and others. These rules form the building blocks of formal proofs.

:::

:::eli20

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

:::
