---
title: "Final Notes (Cheat Sheet)"
order: 97
moduleTitle: "COMP2040 - Languages & Computation"
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

## SIDE 1: FINITE AUTOMATA & REGULAR LANGUAGES

### Fundamentals

| Concept | Definition |
|---------|-----------|
| Alphabet ($\Sigma$) | Finite non-empty set of symbols |
| Word (string) | Finite sequence of symbols from $\Sigma$ |
| $\varepsilon$ | Empty word, $|\varepsilon| = 0$ |
| $\Sigma^*$ | All words over $\Sigma$ (including $\varepsilon$) |
| $\Sigma^+$ | $\Sigma^* \setminus \{\varepsilon\}$ |
| Language $L$ | Any subset of $\Sigma^*$ |

**Operations on languages:** Union $L_1 \cup L_2$, Concatenation $L_1 \cdot L_2$, Kleene star $L^* = \bigcup_{i=0}^{\infty} L^i$ (where $L^0 = \{\varepsilon\}$), Complement $\overline{L} = \Sigma^* \setminus L$

---

### Chomsky Hierarchy

| Type | Grammar | Recogniser | Example |
|------|---------|-----------|---------|
| 3 (Regular) | $A \to aB$ or $A \to a$ | DFA/NFA | $a^*b^*$ |
| 2 (Context-Free) | $A \to \gamma$ | PDA | $\{a^nb^n\}$ |
| 1 (Context-Sensitive) | $|\alpha| \leq |\beta|$ | LBA | $\{a^nb^nc^n\}$ |
| 0 (Unrestricted) | No restriction | Turing Machine | Halting problem |

---

### DFA (Deterministic Finite Automaton)

$M = (Q, \Sigma, \delta, q_0, F)$ where $\delta: Q \times \Sigma \to Q$ (total, deterministic)

- Exactly **one** transition per (state, symbol) pair
- Accepts if $\hat{\delta}(q_0, w) \in F$
- Language: $L(M) = \{w \in \Sigma^* \mid \hat{\delta}(q_0, w) \in F\}$
- **DFA transition function must be TOTAL** — add dead/trap state for missing transitions

---

### NFA (Nondeterministic Finite Automaton)

$M = (Q, \Sigma, \delta, q_0, F)$ where $\delta: Q \times (\Sigma \cup \{\varepsilon\}) \to \mathcal{P}(Q)$

- Can have 0, 1, or many transitions per (state, symbol)
- Allows $\varepsilon$-transitions (consume no input)
- Accepts if **there exists** at least one path to $q_f \in F$
- **TRAP:** NFA accepts if EXISTS a path, NOT all paths

---

### NFA → DFA: Subset Construction

| Step | Action |
|------|--------|
| 1 | Start state = $\varepsilon$-closure of NFA start |
| 2 | For each DFA state $S$ and symbol $a$: new state = $\varepsilon\text{-closure}(\bigcup_{q \in S} \delta(q, a))$ |
| 3 | DFA state is accepting if it contains any NFA accepting state |
| 4 | Repeat until no new states |

- $\varepsilon$-closure($q$) = all states reachable from $q$ via $\varepsilon$-transitions (including $q$)
- **Worst case:** NFA with $n$ states → DFA with up to $2^n$ states
- **TRAP:** Don't forget $\varepsilon$-closure AFTER following symbol transitions

---

### DFA Minimisation (Table-Filling Algorithm)

| Step | Action |
|------|--------|
| 1 | Mark pairs $(p, q)$ where exactly one is accepting |
| 2 | For unmarked $(p,q)$: if $(\delta(p,a), \delta(q,a))$ is marked for any $a$, mark $(p,q)$ |
| 3 | Repeat until no new marks |
| 4 | Unmarked pairs = equivalent states → merge |

- Minimal DFA is **unique** (up to isomorphism)
- Two states equivalent iff $\forall w: \hat{\delta}(p, w) \in F \iff \hat{\delta}(q, w) \in F$

---

### Regular Expressions

| Expression | Language |
|-----------|---------|
| $\emptyset$ | Empty language |
| $\varepsilon$ | $\{\varepsilon\}$ |
| $a$ | $\{a\}$ |
| $r_1 + r_2$ | $L(r_1) \cup L(r_2)$ |
| $r_1 \cdot r_2$ | Concatenation |
| $r^*$ | Kleene star |

**Precedence:** $*$ (highest) > concatenation > $+$ (lowest). So $ab^*+c = (a(b^*)) + c$

**RE ↔ FA equivalence:** RE → NFA (Thompson's construction) | DFA → RE (State elimination)

**Common patterns:** $(0+1)^*$ = all binary strings; $(0+1)^*1$ = ends in 1; $0^*10^*$ = exactly one 1

**Key identity:** $\emptyset^* = \{\varepsilon\}$

---

### Pumping Lemma for Regular Languages

If $L$ is regular, $\exists p$ such that any $w \in L$ with $|w| \geq p$ can be split as $w = xyz$ where:
1. $|y| > 0$ (y is non-empty)
2. $|xy| \leq p$ (pump section in first $p$ chars)
3. $\forall i \geq 0: xy^iz \in L$ (pumping stays in $L$)

**Proof strategy (by contradiction):**
1. Assume $L$ is regular
2. Choose specific $w \in L$ with $|w| \geq p$
3. Consider ALL valid splits $xyz$ (adversary chooses split!)
4. Show $\exists i$ such that $xy^iz \notin L$ for every valid split
5. Contradiction → $L$ not regular

**Classic:** $L = \{a^nb^n\}$: choose $w = a^pb^p$, $|xy| \leq p$ forces $y = a^k$, pump: $a^{p+k}b^p \notin L$

**TRAPS:**
- YOU choose $w$, ADVERSARY chooses the split — must work for ALL valid splits
- Pumping Lemma CANNOT prove regularity (necessary, not sufficient)

---

### Closure Properties

| Operation | Regular | Context-Free |
|-----------|---------|-------------|
| Union | Yes | Yes |
| Intersection | Yes | **NO** |
| Complement | Yes | **NO** |
| Concatenation | Yes | Yes |
| Kleene star | Yes | Yes |

**CFL not closed under intersection:** $\{a^nb^nc^m\} \cap \{a^mb^nc^n\} = \{a^nb^nc^n\}$ (not CF)

---

## SIDE 2: CONTEXT-FREE LANGUAGES, TURING MACHINES & DECIDABILITY

### Context-Free Grammars (CFG)

$G = (V, T, P, S)$: Variables $V$, Terminals $T$, Productions $P: A \to \gamma$, Start $S$

- **Derivation:** $S \Rightarrow^* w$ (leftmost or rightmost)
- **Parse tree:** Root = $S$, leaves = terminals (left-to-right = derived string)
- **Ambiguous** if $\exists w$ with two different leftmost derivations (two parse trees)

**Example:** $S \to aSb \mid \varepsilon$ generates $\{a^nb^n \mid n \geq 0\}$

**Fixing ambiguity (expressions):** $E \to E+T \mid T$; $T \to T*F \mid F$; $F \to (E) \mid id$ — gives $*$ higher precedence

**CFG ↔ PDA equivalence:** A language is context-free iff some PDA accepts it.

---

### Pushdown Automata (PDA)

$P = (Q, \Sigma, \Gamma, \delta, q_0, Z_0, F)$ where $\delta: Q \times (\Sigma \cup \{\varepsilon\}) \times \Gamma \to \mathcal{P}(Q \times \Gamma^*)$

| Feature | Finite Automaton | PDA |
|---------|-----------------|-----|
| Memory | None | Unbounded stack |
| Power | Regular languages | Context-free languages |
| Det. vs Nondet. | DFA = NFA | DPDA < NPDA |

**Transition:** $\delta(q, a, X) \ni (p, \gamma)$ — in state $q$, reading $a$, stack top $X$ → go to $p$, replace $X$ with $\gamma$

**Acceptance:** By final state OR by empty stack (equivalent in power)

**DPDA vs NPDA:** DPDA strictly weaker; $\{ww^R\}$ needs NPDA (must guess midpoint)

**Example PDA for $\{a^nb^n\}$:** Push $A$ for each $a$, pop $A$ for each $b$, accept when stack has only $Z_0$

---

### Context-Sensitive Grammars (CSG)

- Productions: $\alpha \to \beta$ where $|\alpha| \leq |\beta|$ (non-contracting)
- Recogniser: Linear Bounded Automaton (TM with tape = input length)
- Example: $\{a^nb^nc^n \mid n \geq 1\}$ is context-sensitive but NOT context-free

---

### Turing Machines

$M = (Q, \Sigma, \Gamma, \delta, q_0, B, F)$ where $\delta: Q \times \Gamma \to Q \times \Gamma \times \{L, R\}$

| Feature | PDA | TM |
|---------|-----|-----|
| Read direction | Left to right only | Left AND right |
| Storage | Stack (LIFO) | Infinite tape (random access) |
| Halting | Always halts | May loop forever |

**Church-Turing Thesis:** Any "effectively computable" function can be computed by a TM. (Not a theorem — a thesis.) Equivalent models: Lambda calculus, recursive functions, RAM machines.

---

### Decidability

| Term | Definition |
|------|-----------|
| Decidable (recursive) | TM always halts (accepts or rejects) |
| Semi-decidable (r.e.) | TM halts and accepts if $w \in L$, may loop if $w \notin L$ |
| Undecidable | No TM decides the language |

- Complement of decidable = decidable (swap accept/reject)
- $L$ decidable iff both $L$ and $\overline{L}$ are semi-decidable

---

### The Halting Problem

**Statement:** Given TM $M$ and input $w$, does $M$ halt on $w$? — **UNDECIDABLE**

**Proof (diagonalisation):**
1. Assume TM $H$ decides halting
2. Construct $D$: on input $M$, run $H(M, M)$; if accepts → loop; if rejects → accept
3. $D(D)$: if halts → $H$ accepts → $D$ loops (contradiction); if doesn't halt → $H$ rejects → $D$ accepts (contradiction)
4. $H$ cannot exist

**TRAP:** Undecidable **in general** — specific programs can still have halting determined

---

### P vs NP

| Class | Definition |
|-------|-----------|
| P | Decidable in polynomial time by deterministic TM |
| NP | Decidable in polynomial time by nondeterministic TM (solutions verifiable in poly time) |
| NP-complete | Hardest in NP; all NP problems reduce to these |

Open question: $P = NP$?

---

### Key Exam Traps Summary

- NFA: EXISTS a path (not ALL paths)
- $\varepsilon$-closure: always compute AFTER symbol transition in subset construction
- DFA must be total (add dead states)
- RE precedence: $*$ before concatenation before $+$
- Pumping Lemma: adversary splits, you show ALL splits fail; cannot prove regularity
- PDA $\varepsilon$ on input = "read nothing" (can fire with no remaining input)
- CFG ambiguity = two different LEFTMOST derivations
- CFL intersection NOT closed
