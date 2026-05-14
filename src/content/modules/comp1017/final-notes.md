---
title: "Final Notes (Cheat Sheet)"
order: 97
moduleTitle: "COMP1017 - Maths for CS 1"
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

## SIDE 1: SETS, FUNCTIONS, RELATIONS & LOGIC

### Sets

| Symbol | Meaning | Example |
|--------|---------|---------|
| $\in$ | Element of | $3 \in \{1,2,3\}$ |
| $\notin$ | Not element of | $4 \notin \{1,2,3\}$ |
| $\subseteq$ | Subset (includes equal) | $\{1,2\} \subseteq \{1,2,3\}$ |
| $\subset$ | Proper subset | $\{1,2\} \subset \{1,2,3\}$ |
| $\emptyset$ | Empty set | $\emptyset \subseteq A$ always |

**Set Operations:**

| Operation | Notation | Definition |
|-----------|----------|------------|
| Union | $A \cup B$ | $\{x : x \in A \text{ or } x \in B\}$ |
| Intersection | $A \cap B$ | $\{x : x \in A \text{ and } x \in B\}$ |
| Difference | $A \setminus B$ | $\{x : x \in A \text{ and } x \notin B\}$ |
| Complement | $\overline{A}$ | $\{x \in U : x \notin A\}$ |
| Symmetric Diff | $A \triangle B$ | $(A \setminus B) \cup (B \setminus A)$ |

**De Morgan's:** $\overline{A \cup B} = \overline{A} \cap \overline{B}$ &nbsp; $\overline{A \cap B} = \overline{A} \cup \overline{B}$

**Power Set:** $\mathcal{P}(A)$ = set of all subsets of $A$. If $|A|=n$, then $|\mathcal{P}(A)|=2^n$. Always: $\emptyset \in \mathcal{P}(A)$ and $A \in \mathcal{P}(A)$.

**Cartesian Product:** $A \times B = \{(a,b) : a \in A, b \in B\}$, $|A \times B| = |A| \cdot |B|$

**Inclusion-Exclusion:** $|A \cup B| = |A| + |B| - |A \cap B|$

---

### Functions

$f: A \to B$ assigns exactly one element of $B$ to each element of $A$. Domain = $A$, Codomain = $B$, Range = $\{f(a) : a \in A\}$

| Type | Definition | Test |
|------|-----------|------|
| **Injective** (1-to-1) | $f(a_1) = f(a_2) \Rightarrow a_1 = a_2$ | No two inputs map to same output |
| **Surjective** (onto) | $\forall b \in B, \exists a \in A : f(a) = b$ | Every codomain element is hit |
| **Bijective** | Both injective and surjective | 1-to-1 correspondence |

**Cardinality constraints:** If $|A| > |B|$: injection impossible (pigeonhole). If $|A| < |B|$: surjection impossible. Bijection requires $|A| = |B|$.

**Composition:** $(g \circ f)(x) = g(f(x))$. Preserves injectivity, surjectivity, bijectivity.

**Inverse:** $f^{-1}$ exists iff $f$ is bijective. $f^{-1}(f(a)) = a$.

---

### Relations

A binary relation $R$ on $A$: $R \subseteq A \times A$. Write $aRb$ if $(a,b) \in R$.

| Property | Definition | Matrix test |
|----------|-----------|-------------|
| Reflexive | $\forall a: aRa$ | All 1s on diagonal |
| Symmetric | $aRb \Rightarrow bRa$ | $M = M^T$ |
| Antisymmetric | $aRb \land bRa \Rightarrow a=b$ | No mutual off-diagonal 1s |
| Transitive | $aRb \land bRc \Rightarrow aRc$ | $M^2$ entries imply $M$ entries |

**Equivalence Relation** = reflexive + symmetric + transitive. Partitions $A$ into equivalence classes: $[a] = \{x \in A : xRa\}$

**Partial Order (Poset)** = reflexive + antisymmetric + transitive. Minimal $\neq$ minimum! (Minimum must be $\leq$ everything; minimal just has nothing below it.)

**Hasse Diagram:** Remove self-loops, remove transitive edges, draw upward.

**Closures:** Reflexive (add all $(a,a)$), Symmetric (add $(b,a)$ for each $(a,b)$), Transitive (repeatedly add shortcuts).

---

### Propositional Logic

| Connective | Symbol | True when... |
|-----------|--------|--------------|
| Negation | $\lnot p$ | $p$ is false |
| Conjunction | $p \land q$ | Both true |
| Disjunction | $p \lor q$ | At least one true |
| Implication | $p \to q$ | $\lnot p$ or $q$ (only false: T$\to$F) |
| Biconditional | $p \leftrightarrow q$ | Both same value |

**Contrapositive:** $p \to q \equiv \lnot q \to \lnot p$ (always equivalent to original!)

**Key Equivalences:** $\lnot(p \to q) \equiv p \land \lnot q$ | $p \to q \equiv \lnot p \lor q$ | De Morgan's: $\lnot(p \land q) \equiv \lnot p \lor \lnot q$

**Quantifiers:** $\lnot(\forall x\, P(x)) \equiv \exists x\, \lnot P(x)$ &nbsp; $\lnot(\exists x\, P(x)) \equiv \forall x\, \lnot P(x)$

**Order matters:** $\forall x \exists y \neq \exists y \forall x$ in general.

**Rules of Inference:** Modus Ponens ($p \to q$, $p$ $\therefore q$) | Modus Tollens ($p \to q$, $\lnot q$ $\therefore \lnot p$) | Hypothetical Syllogism ($p \to q$, $q \to r$ $\therefore p \to r$)

---

## SIDE 2: PROOFS, NUMBER THEORY, SEQUENCES & CALCULUS

### Proof Techniques

| Technique | Structure |
|-----------|-----------|
| **Direct** | Assume $P$, derive $Q$ |
| **Contrapositive** | Prove $\lnot Q \to \lnot P$ |
| **Contradiction** | Assume $\lnot P$, derive contradiction |
| **Induction** | Base case + assume $P(k)$ + prove $P(k+1)$ |
| **Strong Induction** | Assume $P(n_0), \ldots, P(k)$ all true, prove $P(k+1)$ |
| **Counterexample** | Find one $x$ where $P(x)$ fails (disproves universal) |

**Induction example:** Prove $\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$. Base: $n=1$: $1 = 1$. Step: $\frac{k(k+1)}{2} + (k+1) = \frac{(k+1)(k+2)}{2}$. $\square$

**Common pitfalls:** Forgetting base case, not using inductive hypothesis, assuming $P(k+1)$ instead of proving it, proof by example is NOT a proof.

---

### Number Theory

**Divisibility:** $a \mid b$ means $b = ka$. Properties: reflexive, transitive, linear combination ($a \mid b \land a \mid c \Rightarrow a \mid (bx+cy)$).

**GCD/LCM:** $\gcd(a,b) \cdot \text{lcm}(a,b) = |ab|$

**Euclidean Algorithm:** Repeatedly apply $\gcd(a,b) = \gcd(b, a \bmod b)$ until remainder = 0.

**Example:** $\gcd(252,105)$: $252 = 2 \times 105 + 42$; $105 = 2 \times 42 + 21$; $42 = 2 \times 21 + 0$. Answer: $21$.

**Bezout's Identity:** $\exists x,y: ax + by = \gcd(a,b)$. Find by back-substitution.

**Modular Arithmetic:** $a \equiv b \pmod{n}$ means $n \mid (a-b)$.

- Addition/multiplication preserve congruence
- **Cancellation:** $ac \equiv bc \pmod{n} \Rightarrow a \equiv b \pmod{n/\gcd(c,n)}$ (safe only if $\gcd(c,n)=1$)
- **Solving** $ax \equiv b \pmod{n}$: solution exists iff $\gcd(a,n) \mid b$

**Fermat's Little Theorem:** If $p$ prime, $\gcd(a,p)=1$: $a^{p-1} \equiv 1 \pmod{p}$

**Example:** $7^{222} \pmod{11}$: $7^{10} \equiv 1$, $222 = 10 \times 22 + 2$, answer: $7^2 = 49 \equiv 5$.

**Repeated Squaring:** Write exponent in binary, square-and-multiply. $O(\log n)$ multiplications.

---

### Sequences & Series

**Arithmetic:** $a_n = a_1 + (n-1)d$, &nbsp; $S_n = \frac{n}{2}(2a_1 + (n-1)d)$

**Geometric:** $a_n = a_1 r^{n-1}$, &nbsp; $S_n = a_1 \frac{1-r^n}{1-r}$ ($r \neq 1$), &nbsp; $S_\infty = \frac{a_1}{1-r}$ ($|r|<1$)

**Key Sums:** $\sum_{i=1}^n i = \frac{n(n+1)}{2}$ | $\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}$ | $\sum_{i=1}^n i^3 = \left(\frac{n(n+1)}{2}\right)^2$ | $\sum_{i=0}^n r^i = \frac{r^{n+1}-1}{r-1}$

**Telescoping:** If $a_i = f(i) - f(i-1)$, then $\sum_{i=1}^n a_i = f(n) - f(0)$

**Convergence Tests:**

| Test | Converges if | Diverges if |
|------|-------------|-------------|
| Divergence | - (can't prove convergence) | $a_n \not\to 0$ |
| Geometric | $|r| < 1$ | $|r| \geq 1$ |
| $p$-series $\sum 1/n^p$ | $p > 1$ | $p \leq 1$ |
| Ratio | $\lim |a_{n+1}/a_n| < 1$ | limit $> 1$ |

**Trap:** $a_n \to 0$ does NOT imply convergence! ($\sum 1/n$ diverges.)

**Recurrences:** $a_n = c_1 a_{n-1} + c_2 a_{n-2}$: solve $x^2 - c_1 x - c_2 = 0$. Distinct roots $r_1,r_2$: $a_n = Ar_1^n + Br_2^n$. Repeated root $r$: $a_n = (A+Bn)r^n$. Use initial conditions for $A,B$.

---

### Calculus

**Differentiation Rules:**

| Rule | Formula |
|------|---------|
| Power | $\frac{d}{dx}[x^n] = nx^{n-1}$ |
| Product | $(fg)' = f'g + fg'$ |
| Quotient | $(f/g)' = (f'g - fg')/g^2$ |
| Chain | $\frac{d}{dx}[f(g(x))] = f'(g(x)) \cdot g'(x)$ |

**Common:** $(e^x)' = e^x$ | $(\ln x)' = 1/x$ | $(\sin x)' = \cos x$ | $(\cos x)' = -\sin x$

**Stationary Points:** Set $f'(x) = 0$. Classify: $f''(x)>0$ = min, $f''(x)<0$ = max, $f''(x)=0$ = inconclusive.

**Integration:** $\int x^n dx = \frac{x^{n+1}}{n+1} + C$ ($n \neq -1$) | $\int 1/x\, dx = \ln|x| + C$ | $\int e^x dx = e^x + C$

**Substitution:** $\int f(g(x))g'(x)\,dx = \int f(u)\,du$ where $u = g(x)$

**Definite Integrals:** $\int_a^b f(x)\,dx = F(b) - F(a)$

**L'Hopital's Rule:** If $\frac{0}{0}$ or $\frac{\infty}{\infty}$: $\lim \frac{f}{g} = \lim \frac{f'}{g'}$

**Traps:** Don't forget $+C$! Chain rule omission ($\frac{d}{dx}[e^{2x}] = 2e^{2x}$, not $e^{2x}$). Power rule fails at $n=-1$. $\int 1/x\,dx = \ln|x|+C$ (absolute value!).
