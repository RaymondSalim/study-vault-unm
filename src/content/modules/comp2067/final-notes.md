---
title: "Final Notes (Cheat Sheet)"
order: 97
moduleTitle: "COMP2067 - Formal Reasoning"
tags: ["exam", "cheat-sheet", "final-notes"]
---

<style>
@media print {
  .print-btn, .prev-next, .module-nav, .global-nav, nav, .mobile-menu-btn, .sidebar-overlay, .search-modal {
    display: none !important;
  }
  .module-wrapper {
    display: block !important;
  }
  .module-content {
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    columns: 2;
    column-gap: 1.5em;
    font-size: 8pt;
    line-height: 1.25;
    color: #000;
  }
  .module-content h2 {
    font-size: 11pt;
    margin: 0.3em 0 0.15em;
    border-bottom: 1.5px solid #000;
    column-span: all;
    break-after: avoid;
  }
  .module-content h3 {
    font-size: 9pt;
    margin: 0.3em 0 0.1em;
    break-after: avoid;
  }
  .module-content table {
    border-collapse: collapse;
    width: 100%;
    margin: 0.2em 0;
    font-size: 7.5pt;
  }
  .module-content th, .module-content td {
    border: 1px solid #999;
    padding: 1px 3px;
    text-align: left;
  }
  .module-content th {
    background: #eee !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content hr {
    margin: 0.3em 0;
    border: none;
    border-top: 1px dashed #999;
  }
  .module-content ul, .module-content ol {
    margin: 0.15em 0;
    padding-left: 1.1em;
  }
  .module-content li {
    margin: 0.05em 0;
  }
  .module-content p {
    margin: 0.15em 0;
  }
  .module-content code {
    font-size: 7pt;
    background: #f0f0f0;
    padding: 0.5px 2px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content .katex {
    font-size: 0.9em;
  }
  @page {
    size: A4;
    margin: 0.8cm;
  }
}
</style>

<button class="print-btn" onclick="window.print()" style="background:#7aa2f7;color:#1a1b26;border:none;padding:0.5em 1.2em;border-radius:6px;cursor:pointer;font-weight:600;margin-bottom:1em;font-size:0.9rem;">Print Cheat Sheet</button>

## SIDE 1: PROPOSITIONAL & PREDICATE LOGIC

### Connectives & Truth Tables

| Symbol | Name | Agda | Meaning |
|--------|------|------|---------|
| $\land$ | Conjunction | `_×_` | Both true |
| $\lor$ | Disjunction | `_⊎_` | At least one true |
| $\to$ | Implication | `_→_` | If...then |
| $\neg$ | Negation | `¬_ = P → ⊥` | Not |
| $\leftrightarrow$ | Biconditional | `_↔_` | Iff |
| $\top$ | Top | `⊤` | Always true |
| $\bot$ | Bottom | `⊥` | Always false |

**Precedence** (highest first): $\neg > \land > \lor > \to > \leftrightarrow$. Note: $\to$ is right-associative.

**Key**: $P \to Q$ is false ONLY when $P$ true and $Q$ false.

---

### Boolean Algebra Laws

| Law | $\land$ form | $\lor$ form |
|-----|-------------|-------------|
| Identity | $P \land \top \equiv P$ | $P \lor \bot \equiv P$ |
| Domination | $P \land \bot \equiv \bot$ | $P \lor \top \equiv \top$ |
| Idempotent | $P \land P \equiv P$ | $P \lor P \equiv P$ |
| Complement | $P \land \neg P \equiv \bot$ | $P \lor \neg P \equiv \top$ |
| Commutative | $P \land Q \equiv Q \land P$ | $P \lor Q \equiv Q \lor P$ |
| Associative | $(P \land Q) \land R \equiv P \land (Q \land R)$ | ditto for $\lor$ |
| Distributive | $P \land (Q \lor R) \equiv (P \land Q) \lor (P \land R)$ | $P \lor (Q \land R) \equiv (P \lor Q) \land (P \lor R)$ |
| Absorption | $P \land (P \lor Q) \equiv P$ | $P \lor (P \land Q) \equiv P$ |
| De Morgan | $\neg(P \land Q) \equiv \neg P \lor \neg Q$ | $\neg(P \lor Q) \equiv \neg P \land \neg Q$ |

**Duality principle**: Swap $\land \leftrightarrow \lor$ and $\top \leftrightarrow \bot$ in any valid identity to get another valid identity.

---

### Natural Deduction Rules

**Introduction Rules:**

| Rule | From | Derive |
|------|------|--------|
| $\land$-I | $P$ and $Q$ | $P \land Q$ |
| $\lor$-I$_1$ / $\lor$-I$_2$ | $P$ (or $Q$) | $P \lor Q$ |
| $\to$-I | Assume $P$, derive $Q$ | $P \to Q$ (discharge $P$) |
| $\neg$-I | Assume $P$, derive $\bot$ | $\neg P$ (discharge $P$) |

**Elimination Rules:**

| Rule | From | Derive |
|------|------|--------|
| $\land$-E$_1$ / $\land$-E$_2$ | $P \land Q$ | $P$ (or $Q$) |
| $\lor$-E | $P \lor Q$, $P \to R$, $Q \to R$ | $R$ |
| $\to$-E (MP) | $P \to Q$ and $P$ | $Q$ |
| $\neg$-E | $P$ and $\neg P$ | $\bot$ |
| $\bot$-E | $\bot$ | Anything (ex falso) |
| RAA | Assume $\neg P$, derive $\bot$ | $P$ (classical only) |

---

### Classical vs Intuitionistic Logic

| Aspect | Classical | Intuitionistic |
|--------|-----------|---------------|
| LEM ($P \lor \neg P$) | Axiom | Not provable |
| $\neg\neg P \to P$ | Valid | Not valid |
| Disjunction property | No | Yes: $\vdash P \lor Q \Rightarrow \vdash P$ or $\vdash Q$ |
| Existence property | No | Yes: $\vdash \exists x.P(x) \Rightarrow \vdash P(t)$ for some $t$ |

**What IS constructively provable:**
- $P \to \neg\neg P$ (DNI) -- `λ a f → f a`
- $\neg\neg\neg P \to \neg P$ (triple negation collapses)
- $\neg\neg(P \lor \neg P)$ (LEM is irrefutable)
- $(P \to Q) \to (\neg Q \to \neg P)$ (contrapositive)
- $\neg P \lor \neg Q \to \neg(P \land Q)$, $\neg(P \lor Q) \to \neg P \land \neg Q$, $\neg P \land \neg Q \to \neg(P \lor Q)$

**NOT constructively provable:** $\neg\neg P \to P$, $P \lor \neg P$, $\neg(P \land Q) \to \neg P \lor \neg Q$, $(P \to Q) \to \neg P \lor Q$

**Equivalent to LEM** (adding any one gives classical): DNE, Peirce's Law $((P \to Q) \to P) \to P$, Material Implication $(P \to Q) \to \neg P \lor Q$

---

### Curry-Howard Correspondence

| Logic | Type Theory | Agda |
|-------|-------------|------|
| $P \land Q$ | Product | `A × B` |
| $P \lor Q$ | Sum | `A ⊎ B` |
| $P \to Q$ | Function | `A → B` |
| $\neg P$ | $P \to \bot$ | `A → ⊥` |
| $\forall x.P(x)$ | $\Pi$-type | `(x : A) → P x` |
| $\exists x.P(x)$ | $\Sigma$-type | `Σ[ x ∈ A ] P x` |
| Proof | Program | Term of the type |

---

### Predicate Logic

**Quantifiers:** $\forall x.P(x)$ = "for all x" (dependent function); $\exists x.P(x)$ = "there exists x" (dependent pair)

**Translation patterns:**
- "All A are B" $\to$ $\forall x. A(x) \to B(x)$ (use $\to$ with $\forall$!)
- "Some A is B" $\to$ $\exists x. A(x) \land B(x)$ (use $\land$ with $\exists$!)
- "No A is B" $\to$ $\forall x. A(x) \to \neg B(x)$

**Negating quantifiers:** $\neg(\forall x.P(x)) \equiv \exists x.\neg P(x)$; $\neg(\exists x.P(x)) \equiv \forall x.\neg P(x)$

**Quantifier rules:**

| Rule | Restriction |
|------|-------------|
| $\forall$-I: prove $P(x)$ for arbitrary $x$ | $x$ not free in any undischarged assumption |
| $\forall$-E: from $\forall x.P(x)$ get $P(t)$ | None |
| $\exists$-I: from $P(t)$ get $\exists x.P(x)$ | None |
| $\exists$-E: from $\exists x.P(x)$, assume $P(c)$, derive $R$ | Fresh $c$ not in conclusion $R$ |

**Commutativity:** $\forall\forall$ swaps, $\exists\exists$ swaps, $\exists\forall \to \forall\exists$ valid, $\forall\exists \to \exists\forall$ INVALID

**Distributivity:** $\forall$ distributes over $\land$ (both ways); $\exists$ distributes over $\lor$ (both ways); other combinations one-way only.

---

## SIDE 2: DATA TYPES & INDUCTION

### Bool Type & Decidability

```
data Bool : Set where  true : Bool;  false : Bool
```

| Aspect | `Bool` | `Dec P` | Proposition (`Set`) |
|--------|--------|---------|-------------------|
| Values | `true`/`false` | `yes p` / `no ¬p` | Proof terms |
| Decidable? | Always | Always | Not necessarily |
| Information | 1 bit | Proof + 1 bit | Full proof structure |

**`Dec P`**: Either `yes (p : P)` or `no (np : ¬P)`. Stronger than Bool (carries evidence).

**Proving Bool properties:** Exhaustive case analysis (2 cases for unary, 4 for binary). Each case reduces to `refl`.

---

### Natural Numbers (Peano)

```
data ℕ : Set where  zero : ℕ;  suc : ℕ → ℕ
```

**Axioms:** Injectivity (`suc m ≡ suc n → m ≡ n`), Disjointness (`suc n ≢ zero`), Induction

**Operations (recursion on first arg):**
- `zero + n = n`; `(suc m) + n = suc (m + n)`
- `zero * n = zero`; `(suc m) * n = n + (m * n)`

**Induction principle:** Prove $P(0)$ (base), prove $\forall k. P(k) \to P(k+1)$ (step), conclude $\forall n. P(n)$.

**Key proofs:**

| Property | Induct on | Key technique |
|----------|-----------|---------------|
| $n + 0 \equiv n$ | $n$ | `cong suc` + IH |
| $m + \text{suc}\,n \equiv \text{suc}(m+n)$ | $m$ | `cong suc` + IH |
| $m + n \equiv n + m$ | $m$ | Uses right-id + +-suc lemmas |
| $(m+n)+p \equiv m+(n+p)$ | $m$ | `cong suc` + IH |

**Why $n + 0$ needs proof but $0 + n$ doesn't:** `_+_` recurses on first arg. `zero + n` reduces by definition; `n + zero` doesn't reduce until you case-split on $n$.

---

### Lists

```
data List (A : Set) : Set where  [] : List A;  _∷_ : A → List A → List A
```

**Operations (recurse on first list):**
- `[] ++ ys = ys`; `(x ∷ xs) ++ ys = x ∷ (xs ++ ys)`
- `map f [] = []`; `map f (x ∷ xs) = f x ∷ map f xs`
- `foldr f e [] = e`; `foldr f e (x ∷ xs) = f x (foldr f e xs)`

**Induction on lists:** Base: prove $P([])$. Step: assuming $P(xs)$, prove $P(x :: xs)$.

**Key proofs:**

| Property | Induct on | Base | Step |
|----------|-----------|------|------|
| $xs \mathbin{++} [] \equiv xs$ | `xs` | `refl` | `cong (x ∷_)` + IH |
| $(xs \mathbin{++} ys) \mathbin{++} zs \equiv xs \mathbin{++} (ys \mathbin{++} zs)$ | `xs` | `refl` | `cong (x ∷_)` + IH |
| $\text{length}(xs \mathbin{++} ys) \equiv \text{length}(xs) + \text{length}(ys)$ | `xs` | `refl` | `cong suc` + IH |
| $\text{map}\;f\;(xs \mathbin{++} ys) \equiv \text{map}\;f\;xs \mathbin{++} \text{map}\;f\;ys$ | `xs` | `refl` | `cong (f\,x ∷\_)` + IH |
| $\text{map}\;f\;(\text{map}\;g\;xs) \equiv \text{map}\;(f \circ g)\;xs$ | `xs` | `refl` | `cong (f(g\,x) ∷\_)` + IH |
| $\text{map}\;\text{id}\;xs \equiv xs$ | `xs` | `refl` | `cong (x ∷_)` + IH |

**Pattern:** Induct on first arg of `_++_` or `map`. Base = `refl`. Step = `cong` + IH.

**`reverse (reverse xs) ≡ xs`** requires helper: `reverse (xs ++ ys) ≡ reverse ys ++ reverse xs`

---

### Trees

```
data Tree (A : Set) : Set where  leaf : Tree A;  node : Tree A → A → Tree A → Tree A
```

**Operations:**
- `size leaf = 0`; `size (node l x r) = 1 + size l + size r`
- `height leaf = 0`; `height (node l x r) = 1 + max (height l) (height r)`
- `mirror leaf = leaf`; `mirror (node l x r) = node (mirror r) x (mirror l)`
- `flatten (node l x r) = flatten l ++ [x] ++ flatten r` (in-order)

**Tree induction:** TWO induction hypotheses (one per subtree).

| Property | Base | Step uses |
|----------|------|-----------|
| `mirror (mirror t) ≡ t` | `refl` | Both IHs + `cong₂` |
| `size (mirror t) ≡ size t` | `refl` | Both IHs + `+-comm` |
| `height (mirror t) ≡ height t` | `refl` | Both IHs + `max-comm` |

**Bounds:** Min height (balanced) $\geq \lceil\log_2(n+1)\rceil$; max height (degenerate) $= n$; max nodes at height $h = 2^h - 1$.

---

### Common Exam Traps

- Using LEM/DNE in a constructive proof without declaring it
- $\forall$-I when variable is free in an undischarged assumption
- "All A are B" = $\forall x. A(x) \land B(x)$ WRONG (use $\to$)
- "Some A is B" = $\exists x. A(x) \to B(x)$ WRONG (use $\land$)
- Inducting on wrong variable (induct on the arg the function recurses on)
- Using `refl` when you need `cong suc IH`
- Confusing `Dec P` (carries proof) with `Bool` (just a bit)
- $\exists$-E: conclusion must NOT mention the fresh witness variable
- $\neg(P \land Q) \to \neg P \lor \neg Q$ is NOT constructive (produces $\lor$)
