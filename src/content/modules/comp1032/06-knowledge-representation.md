---
title: "Knowledge Representation & Reasoning"
order: 6
moduleTitle: "COMP1032 - Fundamentals of AI"
tags: ["propositional-logic", "first-order-logic", "inference", "knowledge-base"]
---

## Knowledge-Based Agents

A **knowledge-based agent** maintains a **knowledge base** (KB) — a set of sentences in a formal language — and uses **inference** to derive new facts and decide actions.

| Operation | Meaning |
|-----------|---------|
| TELL | Add a sentence to the KB |
| ASK | Query the KB (derive conclusions) |
| Inference | Derive new sentences from existing ones |

---

## Propositional Logic

### Syntax

| Symbol | Name | Meaning |
|--------|------|---------|
| $P, Q, R$ | Propositions | Atomic true/false statements |
| $\neg$ | Negation | NOT |
| $\land$ | Conjunction | AND |
| $\lor$ | Disjunction | OR |
| $\Rightarrow$ | Implication | IF...THEN |
| $\Leftrightarrow$ | Biconditional | IF AND ONLY IF |

### Semantics (Truth Tables)

| $P$ | $Q$ | $\neg P$ | $P \land Q$ | $P \lor Q$ | $P \Rightarrow Q$ | $P \Leftrightarrow Q$ |
|-----|-----|----------|-------------|------------|-------------------|----------------------|
| T | T | F | T | T | T | T |
| T | F | F | F | T | F | F |
| F | T | T | F | T | T | F |
| F | F | T | F | F | T | T |

> **Key insight**: $P \Rightarrow Q$ is false **only** when $P$ is true and $Q$ is false.

### Important Equivalences

| Name | Equivalence |
|------|-------------|
| Contrapositive | $P \Rightarrow Q \equiv \neg Q \Rightarrow \neg P$ |
| Implication elimination | $P \Rightarrow Q \equiv \neg P \lor Q$ |
| De Morgan's | $\neg(P \land Q) \equiv \neg P \lor \neg Q$ |
| De Morgan's | $\neg(P \lor Q) \equiv \neg P \land \neg Q$ |
| Double negation | $\neg \neg P \equiv P$ |
| Distributivity | $P \lor (Q \land R) \equiv (P \lor Q) \land (P \lor R)$ |
| Distributivity | $P \land (Q \lor R) \equiv (P \land Q) \lor (P \land R)$ |

---

## Entailment and Inference

**Entailment**: $\text{KB} \models \alpha$ means $\alpha$ is true in **every** model where KB is true.

| Concept | Meaning |
|---------|---------|
| **Entailment** ($\models$) | Semantic: $\alpha$ follows from KB in all models |
| **Derivation** ($\vdash$) | Syntactic: $\alpha$ can be derived by inference rules |
| **Soundness** | If $\text{KB} \vdash \alpha$ then $\text{KB} \models \alpha$ (only derives truths) |
| **Completeness** | If $\text{KB} \models \alpha$ then $\text{KB} \vdash \alpha$ (derives all truths) |

### Inference Rules

| Rule | Form | Description |
|------|------|-------------|
| **Modus Ponens** | $P \Rightarrow Q, \; P \;\;\vdash\;\; Q$ | If P implies Q and P is true, Q is true |
| **Modus Tollens** | $P \Rightarrow Q, \; \neg Q \;\;\vdash\;\; \neg P$ | Contrapositive reasoning |
| **And-elimination** | $P \land Q \;\;\vdash\;\; P$ | Extract from conjunction |
| **Resolution** | $P \lor Q, \; \neg P \lor R \;\;\vdash\;\; Q \lor R$ | Key rule for automated provers |

---

## Resolution

**Resolution** is a single, complete inference rule for propositional logic (when sentences are in CNF).

### Conjunctive Normal Form (CNF)

A conjunction ($\land$) of disjunctions ($\lor$) of literals:

$$(A \lor \neg B) \land (B \lor C \lor \neg D) \land (\neg A)$$

**Conversion to CNF:**
1. Eliminate $\Leftrightarrow$: replace with $(P \Rightarrow Q) \land (Q \Rightarrow P)$
2. Eliminate $\Rightarrow$: replace $P \Rightarrow Q$ with $\neg P \lor Q$
3. Move $\neg$ inward (De Morgan's + double negation)
4. Distribute $\lor$ over $\land$

### Resolution Refutation (Proof by Contradiction)

To prove $\text{KB} \models \alpha$:
1. Add $\neg \alpha$ to KB
2. Convert everything to CNF
3. Apply resolution repeatedly
4. If we derive the **empty clause** ($\bot$), then $\text{KB} \models \alpha$

<details>
<summary>Practice: Prove KB ⊨ R given KB = {P, P⇒Q, Q⇒R}</summary>

**Step 1**: Negate the goal: add $\neg R$.

**Step 2**: Convert to CNF:
- $P$ (already CNF)
- $P \Rightarrow Q$ becomes $\neg P \lor Q$
- $Q \Rightarrow R$ becomes $\neg Q \lor R$
- $\neg R$ (already CNF)

**Step 3**: Resolve:
1. $\neg Q \lor R$ + $\neg R$ → $\neg Q$ (resolve on $R$)
2. $\neg P \lor Q$ + $\neg Q$ → $\neg P$ (resolve on $Q$)
3. $P$ + $\neg P$ → $\bot$ (empty clause!)

**Conclusion**: Contradiction derived, so $\text{KB} \models R$. ✓
</details>

---

## First-Order Logic (FOL)

Propositional logic cannot express relationships or quantify over objects. FOL adds:

| Element | Description | Example |
|---------|-------------|---------|
| **Constants** | Specific objects | John, 2, UoN |
| **Variables** | Generic objects | $x, y, z$ |
| **Predicates** | Properties/relations | Brother(x, y), King(John) |
| **Functions** | Mappings to objects | Father(John), LeftLeg(x) |
| **Quantifiers** | Universal/existential | $\forall, \exists$ |

### Quantifiers

| Quantifier | Syntax | Meaning | Example |
|-----------|--------|---------|---------|
| Universal | $\forall x \; P(x)$ | For all $x$, $P(x)$ holds | $\forall x \; \text{Cat}(x) \Rightarrow \text{Mammal}(x)$ |
| Existential | $\exists x \; P(x)$ | There exists an $x$ such that $P(x)$ | $\exists x \; \text{Cat}(x) \land \text{Black}(x)$ |

> **Common mistake**: $\forall$ typically pairs with $\Rightarrow$, while $\exists$ pairs with $\land$.

$$\forall x \; \text{Cat}(x) \land \text{Black}(x) \quad \text{← WRONG (says everything is a black cat)}$$
$$\forall x \; \text{Cat}(x) \Rightarrow \text{Black}(x) \quad \text{← CORRECT (all cats are black)}$$

### Quantifier Equivalences

| Equivalence | Rule |
|-------------|------|
| $\neg \forall x \; P(x)$ | $\equiv \exists x \; \neg P(x)$ |
| $\neg \exists x \; P(x)$ | $\equiv \forall x \; \neg P(x)$ |
| $\forall x \; \forall y$ | $\equiv \forall y \; \forall x$ (order doesn't matter) |
| $\exists x \; \exists y$ | $\equiv \exists y \; \exists x$ (order doesn't matter) |
| $\forall x \; \exists y$ | $\not\equiv \exists y \; \forall x$ (order MATTERS!) |

---

## FOL Inference

### Universal Instantiation (UI)

From $\forall x \; P(x)$, infer $P(a)$ for any ground term $a$.

### Existential Instantiation (EI)

From $\exists x \; P(x)$, infer $P(c)$ for a new **Skolem constant** $c$.

### Unification

Finding a substitution $\theta$ that makes two expressions identical:

| Expression 1 | Expression 2 | Unifier $\theta$ |
|-------------|-------------|-------------------|
| Knows(John, x) | Knows(John, Jane) | {x/Jane} |
| Knows(John, x) | Knows(y, Bill) | {x/Bill, y/John} |
| Knows(John, x) | Knows(x, Jane) | **Fail** (x cannot be both John and Jane) |

---

## Comparison

| Feature | Propositional Logic | First-Order Logic |
|---------|--------------------|--------------------|
| Expressiveness | Limited (only facts) | Objects, relations, quantifiers |
| Decidability | Decidable | Semi-decidable |
| Complexity | NP-complete (SAT) | Undecidable in general |
| Use case | Simple rule systems | Rich domain modelling |

<details>
<summary>Practice: Translate "Every student who studies passes the exam" to FOL</summary>

$$\forall x \; (\text{Student}(x) \land \text{Studies}(x)) \Rightarrow \text{Passes}(x, \text{Exam})$$

Or equivalently:
$$\forall x \; \text{Student}(x) \Rightarrow (\text{Studies}(x) \Rightarrow \text{Passes}(x, \text{Exam}))$$
</details>

<details>
<summary>Practice: What's wrong with ∃x King(x) ⇒ Greedy(x)?</summary>

This says "there exists an x such that if x is a king then x is greedy." Due to the semantics of $\Rightarrow$, this is satisfied by **any** non-king (since $\text{King}(x)$ is false, the implication is vacuously true). So even in a world with no kings, this sentence is true.

**Correct version**: $\exists x \; \text{King}(x) \land \text{Greedy}(x)$ — "there exists a greedy king."
</details>
