---
title: "Flashcards"
order: 92
moduleTitle: "COMP2067 - Introduction to Formal Reasoning"
tags: ["flashcards", "revision", "quick-review"]
---

# Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | What is a proposition? | A declarative statement that is either true or false, but not both. |
| 2 | What are the five main propositional connectives? | Negation (not), conjunction (and), disjunction (or), implication (if...then), biconditional (if and only if). |
| 3 | When is an implication P -> Q false? | Only when P is true and Q is false. In all other cases, it is true. |
| 4 | What is a tautology? | A formula that is true under every possible truth value assignment (e.g., P or not P). |
| 5 | What is a contradiction? | A formula that is false under every possible truth value assignment (e.g., P and not P). |
| 6 | What is logical equivalence? | Two formulas are logically equivalent if they have the same truth value under every assignment (same truth table). |
| 7 | State De Morgan's Laws. | not(P and Q) = (not P) or (not Q); not(P or Q) = (not P) and (not Q). |
| 8 | What is the difference between propositional and predicate logic? | Propositional logic deals with whole propositions; predicate logic adds quantifiers (forall, exists) and predicates over variables. |
| 9 | What does the universal quantifier (forall x) mean? | The formula holds for ALL elements x in the domain. |
| 10 | What does the existential quantifier (exists x) mean? | There exists AT LEAST ONE element x in the domain for which the formula holds. |
| 11 | What is natural deduction? | A proof system that uses introduction and elimination rules for each connective to derive conclusions from premises step by step. |
| 12 | Explain the rule of Modus Ponens. | From P and P -> Q, conclude Q. (Implication elimination.) |
| 13 | What is proof by contradiction (RAA)? | Assume the negation of what you want to prove; derive a contradiction; conclude the original statement must be true. |
| 14 | What is a semantic tableau? | A tree-based proof method that systematically decomposes formulas to check satisfiability or validity by looking for contradictions on all branches. |
| 15 | When does a tableau branch close? | When it contains both a formula and its negation (a contradiction). |
| 16 | What does it mean for a tableau to be open? | At least one branch has no contradiction, providing a counterexample (model) showing the formula is not valid. |
| 17 | What is the contrapositive of P -> Q? | not Q -> not P. It is logically equivalent to the original implication. |
| 18 | What is the difference between syntax and semantics in logic? | Syntax: formal structure and rules for well-formed formulas. Semantics: meaning/interpretation (truth values, models). |
| 19 | What is a free variable vs a bound variable? | A bound variable is within the scope of a quantifier; a free variable is not quantified and acts like a parameter. |
| 20 | Explain conjunction introduction in natural deduction. | If you have proven P and separately proven Q, you can conclude P and Q. |
| 21 | What is disjunction elimination? | If you have P or Q, and can derive R from P alone, and R from Q alone, then you can conclude R. |
| 22 | What is the law of excluded middle? | For any proposition P, either P or not P is true. (Valid in classical logic, not in intuitionistic logic.) |
| 23 | What is the difference between classical and intuitionistic logic? | Classical logic accepts the law of excluded middle and double negation elimination; intuitionistic logic does not -- a proof of existence must be constructive. |
| 24 | What is a valid argument? | An argument where if all premises are true, the conclusion must necessarily be true (the conclusion follows logically from the premises). |
| 25 | What is structural induction? | A proof technique for recursively defined structures (natural numbers, lists, trees) where you prove the base case and then prove that if the property holds for substructures, it holds for the whole structure. |
