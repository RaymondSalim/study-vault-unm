---
title: "Exam Strategy"
order: 93
moduleTitle: "COMP2067 - Introduction to Formal Reasoning"
tags: ["exam", "strategy", "revision", "tips"]
---

# Exam Strategy

## Time Allocation

| Section | Approx. Weight | Suggested Time (2hr exam) |
|---------|---------------|--------------------------|
| Propositional logic & truth tables | 20% | 24 min |
| Natural deduction proofs | 30% | 36 min |
| Predicate logic | 20% | 24 min |
| Semantic tableaux | 15% | 18 min |
| Structural induction / data types | 15% | 18 min |

## Topic Weighting

1. **Natural Deduction** -- Almost always the biggest section; construct formal proofs using introduction/elimination rules
2. **Predicate Logic** -- Quantifier manipulation, translation to/from English, proofs with forall/exists
3. **Propositional Logic** -- Truth tables, logical equivalence, identifying tautologies
4. **Semantic Tableaux** -- Systematic validity/satisfiability checking
5. **Induction & Data Types** -- Proofs over natural numbers, lists, trees

## Common Question Types

- **Construct a natural deduction proof** for a given sequent
- **Translate English into predicate logic** and vice versa
- **Build a semantic tableau** to determine validity or find a counterexample
- **Determine logical equivalence** using truth tables or algebraic manipulation
- **Prove a property by structural induction** over natural numbers or lists
- **Identify whether a formula is a tautology, contradiction, or contingent**

## Key Rules to Memorise

| Rule | Type | Description |
|------|------|-------------|
| ->I (Implication Introduction) | Intro | Assume P, derive Q, conclude P -> Q, discharge assumption |
| ->E (Modus Ponens) | Elim | From P and P -> Q, derive Q |
| &I (Conjunction Introduction) | Intro | From P and Q, derive P & Q |
| &E (Conjunction Elimination) | Elim | From P & Q, derive P (or Q) |
| vI (Disjunction Introduction) | Intro | From P, derive P v Q |
| vE (Disjunction Elimination) | Elim | From P v Q, derive R using subproofs from P->R and Q->R |
| RAA (Reductio ad Absurdum) | Special | Assume not-P, derive contradiction, conclude P |
| not-I (Negation Introduction) | Intro | Assume P, derive contradiction, conclude not-P |
| forall-E | Elim | From forall x. P(x), derive P(t) for any term t |
| forall-I | Intro | From P(a) where a is arbitrary, derive forall x. P(x) |
| exists-I | Intro | From P(t), derive exists x. P(x) |
| exists-E | Elim | From exists x. P(x), assume P(a) for fresh a, derive conclusion |

## Exam Approach Tips

1. **For natural deduction** -- work backwards from what you need to prove; identify which introduction rule produces the goal
2. **For tableaux** -- apply non-branching rules first to keep the tree manageable
3. **For translation** -- identify the domain, predicates, and quantifier scope carefully
4. **Label every step** with the rule name and line numbers referenced
5. **Check your proof is complete** -- all assumptions discharged, all rules applied correctly

## Night Before Top 10 Checklist

1. Practice one implication proof using ->I (assume antecedent, derive consequent)
2. Practice one proof by contradiction (RAA)
3. Know all introduction and elimination rules for: and, or, implies, not, forall, exists
4. Do one semantic tableau for validity (negate the conclusion, decompose to find contradiction)
5. Translate 3 English sentences into predicate logic with quantifiers
6. Know De Morgan's laws and contrapositive equivalence
7. Review the restriction on forall-I (the variable must be arbitrary/fresh)
8. Review the restriction on exists-E (the assumed witness must be fresh)
9. Practice one structural induction proof (e.g., length(append(xs,ys)) = length(xs) + length(ys))
10. Understand the difference between classical and intuitionistic logic (excluded middle, double negation)
