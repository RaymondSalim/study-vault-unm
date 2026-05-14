---
title: "Boolean Type and Decidability"
order: 6
moduleTitle: "COMP2067 - Formal Reasoning"
tags: ["boolean", "decidability", "if-then-else", "type-theory"]
---

## Boolean Type in Type Theory

:::eli10

The Boolean type is the simplest type — it has exactly two values: true and false. You can combine them with NOT (flips true to false), AND (both must be true), and OR (at least one must be true). These are the same logical operations but turned into actual computations in a programming language.

:::

:::eli15

In type theory (Agda), `Bool` is a simple data type with two constructors: `true` and `false`. We define standard logical operations by pattern matching:

- `not`: Flips the value
- `_∧_` (AND): Returns second argument if first is true, else false
- `_∨_` (OR): Returns true if first is true, else second argument

Unlike propositions (which may be undecidable), Bool always gives a definite answer — you can always pattern-match on it.

:::

:::eli20

```
data Bool : Set where
  true  : Bool
  false : Bool
```

| Operation | Definition | Type |
|-----------|-----------|------|
| `not` | `not true = false; not false = true` | `Bool → Bool` |
| `_∧_` | `true ∧ b = b; false ∧ b = false` | `Bool → Bool → Bool` |
| `_∨_` | `true ∨ b = true; false ∨ b = b` | `Bool → Bool → Bool` |

:::

## Bool vs Prop

:::eli10

Bool and propositions are different ways of talking about truth. A Bool is like a light switch — it's either on or off, and you always know which. A proposition is like a mathematical statement — you might have a proof (or not), and the proof might contain useful information (like "which element satisfies the property"). Booleans always give you an answer; propositions are richer but might be undecidable.

:::

:::eli15

A crucial distinction in type theory:

- **Bool**: A data type with two values. Always decidable (just check which constructor). Carries only 1 bit of information.
- **Proposition** (type in `Set`): A type whose inhabitants are proofs. May be undecidable. Proofs carry structural information (the witness, the construction).

Example: A boolean function `isPrime : Nat -> Bool` tells you yes/no, but the propositional version `IsPrime : Nat -> Set` gives you the actual factorization-based proof, which you can use in further reasoning.

They connect via **decidability**: when a proposition is decidable, you can go between Bool and proof.

:::

:::eli20

| Aspect | `Bool` | Proposition (`Set`) |
|--------|--------|-------------------|
| Values | `true` or `false` | Proof terms |
| Decidable? | Always (pattern match) | Not necessarily |
| Information | 1 bit | Proof carries structure |
| Example | `3 < 5` returns `true` | `3 < 5` has a proof term |
| Negation | `not b` | `P → ⊥` |

**Key**: `Bool` is data; propositions are types. They connect via decidability.

:::

## If-Then-Else

:::eli10

If-then-else is like a fork in the road: if the condition is true, go one way; if false, go the other way. In type theory, it's a function that takes a boolean and two choices, and returns whichever choice the boolean selects.

:::

:::eli15

`if_then_else_` is a function that branches based on a boolean value:

- If the condition is `true`, return the first argument
- If `false`, return the second argument

This is the computational counterpart of case analysis. Note that if both branches are the same value `x`, the result is always `x` regardless of the boolean — sometimes useful for simplification proofs.

:::

:::eli20

```
if_then_else_ : {A : Set} → Bool → A → A → A
if true  then x else y = x
if false then x else y = y
```

| Expression | Result |
|-----------|--------|
| `if true then 1 else 2` | `1` |
| `if false then 1 else 2` | `2` |
| `if b then x else x` | `x` (regardless of `b`) |

:::

## Decidability

:::eli10

A question is "decidable" if there's always a definite yes or no answer you can compute. "Is 5 greater than 3?" is decidable — yes! But "Does this program ever stop?" is NOT decidable — sometimes there's no way to know. The `Dec` type packages up both the answer and the proof of why that's the answer.

:::

:::eli15

A proposition $P$ is **decidable** if we can always construct either a proof or a refutation. In Agda, this is captured by the `Dec` type:

- `yes p` — we have a proof `p : P`
- `no np` — we have a refutation `np : not P`

**Dec P vs Bool**: A Bool just says true/false. Dec P says true/false AND provides the proof. You can always extract a Bool from Dec (just drop the proof), but going the other way requires additional work.

A **decision procedure** is a function `(x : A) -> Dec (P x)` — an algorithm that decides the property for any input.

:::

:::eli20

A proposition $P$ is **decidable** if we can construct either a proof of $P$ or a proof of $\neg P$:

```
data Dec (P : Set) : Set where
  yes : P   → Dec P
  no  : ¬ P → Dec P
```

| Concept | Type | Meaning |
|---------|------|---------|
| Decidable | `Dec P` | We have either `yes p` or `no ¬p` |
| Decision procedure | `(x : A) → Dec (P x)` | Algorithm that decides for any input |
| Boolean test | `A → Bool` | Computes answer but loses proof |

### Relating Bool and Dec

```
-- From decidability to boolean
⌊_⌋ : Dec P → Bool
⌊ yes _ ⌋ = true
⌊ no  _ ⌋ = false

-- The boolean reflects the proposition
T : Bool → Set
T true  = ⊤
T false = ⊥
```

:::

## Decidable Properties — Examples

:::eli10

"Is this number equal to that number?" — decidable, you just compare them. "Is this number less than that number?" — also decidable. But "Will this program eventually stop running?" — NOT decidable! There's no algorithm that can always answer that. The halting problem proves some questions are fundamentally unanswerable by computers.

:::

:::eli15

Examples of decidable and undecidable properties:

- **Decidable**: Equality on natural numbers (compare structurally), ordering ($\leq$), equality on booleans, "is this list empty?"
- **Undecidable**: The halting problem ("does program p halt on input x?"), general program equivalence, "is this proposition provable?"

If a property is decidable, you can write an algorithm that always terminates with a definite yes/no answer (plus proof). Undecidable properties have no such algorithm.

:::

:::eli20

| Property | Decidable? | Why |
|----------|-----------|-----|
| $n =_\mathbb{N} m$ | Yes | Compare digit by digit |
| $n \leq m$ | Yes | Structural recursion |
| "Program $p$ halts" | **No** | Halting problem |
| $P \lor \neg P$ for all $P$ | **No** | Would give LEM |
| Equality on `Bool` | Yes | Pattern match |

:::

## Proving Properties of Boolean Functions

:::eli10

You can prove that Boolean functions behave correctly by checking all possible inputs. Since Bool only has two values (true and false), you just check all combinations and verify each case works out. In Agda, each case reduces to `refl` (reflexivity) because both sides compute to the same value.

:::

:::eli15

Proofs about Boolean functions in Agda are typically done by **exhaustive case analysis**. Since Bool has only two constructors, you enumerate all possible inputs and verify each case:

- For a unary function: 2 cases (true, false)
- For a binary function: 4 cases (all combinations)

In each case, both sides of the equation reduce by computation, so the proof is just `refl` (both sides are definitionally equal). This is a simple but powerful technique.

:::

:::eli20

```
-- not is an involution
not-invol : (b : Bool) → not (not b) ≡ b
not-invol true  = refl
not-invol false = refl

-- De Morgan for Bool
demorgan : (a b : Bool) → not (a ∧ b) ≡ (not a) ∨ (not b)
demorgan true  true  = refl
demorgan true  false = refl
demorgan false true  = refl
demorgan false false = refl
```

:::

## The "Reflection" Pattern

:::eli10

Reflection connects boolean tests (which give quick yes/no answers) with logical proofs (which carry detailed evidence). If a boolean test returns "true," reflection gives you an actual proof that the property holds. It's like converting a quick check into a certified guarantee.

:::

:::eli15

The **reflection pattern** bridges the gap between Bool (computational) and Prop (logical):

- **Soundness** (Bool -> Prop): If the boolean test says `true`, then the proposition holds
- **Completeness** (Prop -> Bool): If the proposition holds, the boolean test returns `true`
- **Reflection** (both): Perfect two-way correspondence

This is useful in practice: boolean tests are fast to compute (just run the function), and reflection gives you the proof you need for further reasoning — best of both worlds.

:::

:::eli20

Connecting a boolean test to a propositional proof:

```
-- If (m ≤? n) returns true, then m ≤ n holds as a proposition
≤-reflects : (m n : ℕ) → T (m ≤ᵇ n) → m ≤ n
```

| Direction | Name | Use |
|-----------|------|-----|
| `Bool → Prop` | Soundness | Boolean `true` implies proposition holds |
| `Prop → Bool` | Completeness | If proposition holds, boolean is `true` |
| Both | Reflection | Perfect correspondence |

<details>
<summary>Practice: Prove $\text{not}(a \lor b) \equiv \text{not}(a) \land \text{not}(b)$ by cases</summary>

```
demorgan-or : (a b : Bool) → not (a ∨ b) ≡ (not a) ∧ (not b)
demorgan-or true  true  = refl  -- not true  ≡ false ∧ false ✓
demorgan-or true  false = refl  -- not true  ≡ false ∧ true  → false ≡ false ✓
demorgan-or false true  = refl  -- not true  ≡ true  ∧ false → false ≡ false ✓
demorgan-or false false = refl  -- not false ≡ true  ∧ true  → true  ≡ true  ✓
```

Each case reduces by computation to `refl`.
</details>

<details>
<summary>Practice: Why is `Dec P` stronger than `Bool`?</summary>

`Bool` only gives you a bit: `true` or `false`.

`Dec P` gives you either:
- `yes p` where `p : P` — an actual proof/witness
- `no np` where `np : ¬ P` — an actual refutation

With `Dec P` you can **extract** the proof and use it in further reasoning. With `Bool` you just get a bit with no justification.

Example: `Dec (n ≤ m)` gives you either the proof `n ≤ m` or the proof `n > m`, which you can then use in subsequent proofs.
</details>

<details>
<summary>Practice: Define `_xor_` on Bool and prove it is commutative</summary>

```
_xor_ : Bool → Bool → Bool
true  xor b = not b
false xor b = b

xor-comm : (a b : Bool) → a xor b ≡ b xor a
xor-comm true  true  = refl
xor-comm true  false = refl
xor-comm false true  = refl
xor-comm false false = refl
```
</details>

:::
