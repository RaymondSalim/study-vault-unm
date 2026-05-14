---
title: "Knowledge Representation & Reasoning"
order: 6
moduleTitle: "COMP1032 - Fundamentals of AI"
tags: ["propositional-logic", "first-order-logic", "inference", "knowledge-base"]
---

## Knowledge-Based Agents

:::eli10

A knowledge-based agent is like a detective that keeps a notebook of facts and uses logic to figure out new things. You can tell it facts ("the sky is blue") and ask it questions ("is the sky blue?"). It can even figure out things you never told it directly, by combining what it knows.

:::

:::eli15

A knowledge-based agent stores information in a formal knowledge base (KB) and uses logical inference to derive new facts and decide actions. You interact with it via TELL (add facts) and ASK (query). The power is that inference can derive conclusions that were never explicitly stated -- for example, if you know "all cats are mammals" and "Tom is a cat," it can conclude "Tom is a mammal."

:::

:::eli20

A **knowledge-based agent** maintains a **knowledge base** (KB) — a set of sentences in a formal language — and uses **inference** to derive new facts and decide actions.

| Operation | Meaning |
|-----------|---------|
| TELL | Add a sentence to the KB |
| ASK | Query the KB (derive conclusions) |
| Inference | Derive new sentences from existing ones |

:::

---

## Propositional Logic

:::eli10

Propositional logic is like a language with simple true/false statements and connecting words: AND, OR, NOT, IF-THEN. "If it is raining AND I go outside, THEN I will get wet." You can build up complex statements from simple ones and figure out what must be true.

:::

:::eli15

Propositional logic is the simplest formal logic. Propositions are atomic true/false statements (P, Q, R) connected by logical operators: NOT, AND, OR, IMPLIES, IF-AND-ONLY-IF. Truth tables define the meaning of each operator. Important equivalences (like De Morgan's laws and implication elimination) allow you to transform expressions. The key insight: "P implies Q" is false only when P is true and Q is false.

:::

:::eli20

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

:::

---

## Entailment and Inference

:::eli10

Entailment means "if these facts are true, then this other thing MUST also be true." Inference is the process of working out what is entailed. A good inference system only derives truths (sound) and finds all truths (complete).

:::

:::eli15

Entailment (KB |= alpha) means alpha is true in every possible world where the KB is true -- it is a semantic concept about truth. Derivation (KB |- alpha) means alpha can be produced by applying inference rules -- it is a syntactic process. A sound system only derives entailed sentences. A complete system can derive every entailed sentence. Key inference rules include Modus Ponens ("if P then Q; P is true; therefore Q") and Resolution (the basis for automated provers).

:::

:::eli20

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

:::

---

## Resolution

:::eli10

Resolution is a powerful trick: if you know "A or B" and "not A or C," you can conclude "B or C" (since A is either true or false, one of the other things must hold). By converting everything into this format and applying resolution repeatedly, computers can prove anything that logically follows.

:::

:::eli15

Resolution is a single inference rule that is complete for propositional logic when sentences are in Conjunctive Normal Form (CNF -- a conjunction of disjunctions). To prove something, you assume its negation, convert everything to CNF, and apply resolution until you derive the empty clause (contradiction), proving the original statement. This "proof by contradiction" approach is the basis of automated theorem provers.

:::

:::eli20

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

:::

---

## First-Order Logic (FOL)

:::eli10

Propositional logic can only say "this fact is true or false." First-order logic is more powerful -- it can talk about objects, their properties, and relationships. You can say things like "all dogs are animals" or "there exists a dog named Rex" using special words (for-all and there-exists).

:::

:::eli15

First-order logic extends propositional logic with the ability to talk about objects, properties, relations, and quantities. It adds constants (specific objects like "John"), variables (generic objects like x), predicates (properties/relations like Brother(x,y)), functions (mappings like Father(x)), and quantifiers (for-all and there-exists). This lets you express general rules like "every student who studies passes" rather than listing individual facts.

:::

:::eli20

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

:::

---

## FOL Inference

:::eli10

In FOL, you can plug in specific things for variables. If you know "all dogs bark," you can conclude "Rex barks" (for any specific dog). Unification is matching up expressions to find what substitutions make them the same, which is how the computer chains together logical steps.

:::

:::eli15

FOL inference uses Universal Instantiation (from "for all x, P(x)" infer P(a) for any specific a), Existential Instantiation (from "there exists x, P(x)" introduce a new constant c where P(c)), and Unification (finding substitutions that make two expressions identical). Unification is the engine that drives FOL inference -- it matches predicates together so that inference rules like resolution can be applied.

:::

:::eli20

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

:::

---

## Comparison

:::eli10

Propositional logic is simple but limited -- you can only state individual facts. First-order logic is much more expressive -- you can talk about objects and general rules. The trade-off is that FOL is harder for computers to work with (sometimes impossible to solve completely).

:::

:::eli15

Propositional logic is decidable (you can always determine truth) but limited in what it can express. First-order logic is far more expressive (objects, relations, quantifiers) but only semi-decidable -- if something is true, you can eventually prove it, but if it is false, the prover might run forever. For practical AI systems, the choice depends on the domain's complexity and the guarantees you need.

:::

:::eli20

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

:::
