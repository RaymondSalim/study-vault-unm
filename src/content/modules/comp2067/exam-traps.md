---
title: "Exam Traps"
order: 91
moduleTitle: "COMP2067 - Formal Reasoning"
tags: ["exam", "common-mistakes", "pitfalls"]
---

## Common Proof Mistakes

<details>
<summary>Trap: Using LEM/DNE in a constructive proof</summary>

**Mistake**: Writing `case P ∨ ¬P of ...` without declaring it as a postulate or having `Dec P`.

**Why it's wrong**: In intuitionistic logic, $P \lor \neg P$ is not provable in general. If the question asks for a constructive proof, you cannot assume decidability.

**Fix**: Check if you actually need LEM. Often there's a direct proof:
- Instead of "either $P$ or $\neg P$", try to construct the proof directly from your assumptions
- If you truly need it, state explicitly that you are using a classical axiom
</details>

<details>
<summary>Trap: Confusing $\forall$-I restriction</summary>

**Mistake**: Proving $P(x)$ using an assumption that mentions $x$, then concluding $\forall x. P(x)$.

**Example of the error**:
1. Assume $x > 5$ 
2. Therefore $x > 3$
3. Therefore $\forall x. x > 3$ (WRONG!)

**Why it's wrong**: The variable $x$ is free in the undischarged assumption "$x > 5$", so $\forall$-I cannot be applied.

**Fix**: For $\forall$-I, the variable must be truly arbitrary — it cannot appear in any active (undischarged) assumption.
</details>

<details>
<summary>Trap: Wrong connective with quantifiers in translation</summary>

**Mistake**: 
- "All cats are mammals" $\to$ $\forall x. C(x) \land M(x)$ 
- "Some cat is black" $\to$ $\exists x. C(x) \to B(x)$

**Why it's wrong**:
- $\forall x. C(x) \land M(x)$ says "everything is both a cat and a mammal"
- $\exists x. C(x) \to B(x)$ is satisfied by anything that isn't a cat (vacuous truth)

**Fix**:
- Universal + restrictor: use $\to$ : $\forall x. C(x) \to M(x)$
- Existential + restrictor: use $\land$ : $\exists x. C(x) \land B(x)$
</details>

<details>
<summary>Trap: Inducting on the wrong variable</summary>

**Mistake**: Trying to prove `n + zero ≡ n` by induction on something other than `n`, or proving `xs ++ [] ≡ xs` by induction on `[]`.

**Why it's wrong**: The function `_+_` pattern-matches on its **first** argument. If you induct on the wrong variable, the definition won't reduce in the inductive step.

**Fix**: Induct on the variable that the function **recurses on**:
- `_+_` recurses on first arg → induct on first arg
- `_++_` recurses on first list → induct on first list
- For commutativity, you may need lemmas about the second arg
</details>

<details>
<summary>Trap: Forgetting to use `cong` / thinking `refl` suffices</summary>

**Mistake**: In the inductive step, writing `refl` when the goal is `suc (m + n) ≡ suc (n + m)`.

**Why it's wrong**: `refl` only works when both sides are *definitionally* equal (reduce to the same term). Here they are equal only by the IH.

**Fix**: Use `cong suc IH` to lift the inductive hypothesis under a constructor:
```
-- If IH : m + n ≡ n + m
-- Then cong suc IH : suc (m + n) ≡ suc (n + m)
```
</details>

<details>
<summary>Trap: Mixing up `Dec P` and `Bool`</summary>

**Mistake**: Treating a boolean function as if it provides a proof, or expecting `Dec P` to be just `true/false`.

**Why it's wrong**: 
- `Bool` carries no evidence — just a bit
- `Dec P` carries either a proof of `P` or a proof of `¬ P`

**Fix**: 
- Use `Dec P` when you need to **reason** about the result
- Use `Bool` only for computation
- To connect them, use the reflection pattern: `T (f x) → P x`
</details>

<details>
<summary>Trap: Assuming $\exists$-E gives you a specific witness</summary>

**Mistake**: From $\exists x. P(x)$, extracting $c$ and then using $c$ in the final conclusion.

**Example**:
1. $\exists x. P(x)$
2. Let $c$ be such that $P(c)$ [for $\exists$-E]
3. ... derive $Q(c)$ ...
4. Conclude $Q(c)$ (WRONG — $c$ must not appear in conclusion!)

**Why it's wrong**: The witness $c$ is fresh/arbitrary — the conclusion must not depend on which specific witness was chosen.

**Fix**: Your conclusion $R$ in $\exists$-E must not mention $c$. Derive something that is independent of the specific witness.
</details>

<details>
<summary>Trap: Confusing $\neg\neg A \to A$ with $A \to \neg\neg A$</summary>

**Mistake**: Stating that double negation works both ways constructively.

**Reality**:
| Direction | Constructive? |
|-----------|--------------|
| $A \to \neg\neg A$ | **Yes** (trivially: `λ a f → f a`) |
| $\neg\neg A \to A$ | **No** (requires LEM) |

**Fix**: Remember — you can always *introduce* double negation, but you cannot *eliminate* it constructively. This is the key asymmetry of intuitionistic logic.
</details>

<details>
<summary>Trap: Incorrect direction of De Morgan constructively</summary>

**Constructively provable**:
- $\neg P \land \neg Q \to \neg(P \lor Q)$ 
- $\neg(P \lor Q) \to \neg P \land \neg Q$ 
- $\neg P \lor \neg Q \to \neg(P \land Q)$ 

**NOT constructively provable**:
- $\neg(P \land Q) \to \neg P \lor \neg Q$ (requires deciding which one fails)

**Fix**: The direction that produces a disjunction ($\lor$) from a negation is the problematic one — it requires deciding *which* disjunct to produce.
</details>

<details>
<summary>Trap: Off-by-one in tree/list size reasoning</summary>

**Common confusion**:

| Structure | Size definition | Empty case |
|-----------|----------------|-----------|
| `List A` | `length [] = 0`, `length (x ∷ xs) = 1 + length xs` | 0 |
| `Tree A` | `size leaf = 0`, `size (node l x r) = 1 + size l + size r` | 0 |
| Height | `height leaf = 0`, `height (node l x r) = 1 + max(height l, height r)` | 0 |

**Fix**: Always check which constructors are "counted". Leaves have size/height 0; nodes contribute 1.
</details>

<details>
<summary>Trap: Forgetting reverse needs helper lemmas</summary>

**Mistake**: Trying to prove `reverse (reverse xs) ≡ xs` by direct induction without helpers.

**Why it fails**: The inductive step gives `reverse (reverse xs ++ [x])`, and you can't simplify this without knowing how reverse interacts with `_++_`.

**Required helper**: `reverse (xs ++ ys) ≡ reverse ys ++ reverse xs`

**Fix**: Always prove the distributivity lemma first, then the involution follows.
</details>
