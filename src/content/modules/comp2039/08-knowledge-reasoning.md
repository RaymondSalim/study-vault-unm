---
title: "Knowledge & Reasoning"
order: 8
moduleTitle: "COMP2039 - AI Methods"
tags: ["knowledge-representation", "reasoning", "logic", "llm", "modelling"]
---

## Knowledge Representation

How AI systems store and use knowledge about the world.

### Representation Types

| Type | Description | Example |
|------|-------------|---------|
| Logic-based | Formal logical statements | Propositional/predicate logic |
| Rule-based | IF-THEN rules | Expert systems |
| Semantic networks | Graph of concepts + relations | WordNet |
| Frames | Structured records with slots | Object-oriented KB |
| Ontologies | Formal domain model | OWL, RDF |
| Probabilistic | Uncertain knowledge | Bayesian networks |

### Requirements for Good KR

| Requirement | Description |
|-------------|-------------|
| Representational adequacy | Can express required knowledge |
| Inferential adequacy | Can derive new knowledge |
| Inferential efficiency | Derivation is computationally feasible |
| Acquisitional efficiency | Easy to add new knowledge |

## Logic-Based Reasoning

### Propositional Logic

| Connective | Symbol | Meaning |
|-----------|--------|---------|
| AND | $\wedge$ | Both true |
| OR | $\vee$ | At least one true |
| NOT | $\neg$ | Negation |
| IMPLIES | $\rightarrow$ | If...then |
| IFF | $\leftrightarrow$ | If and only if |

### Inference Rules

| Rule | Form | Description |
|------|------|-------------|
| Modus Ponens | $P, P \rightarrow Q \vdash Q$ | If P and P implies Q, then Q |
| Modus Tollens | $\neg Q, P \rightarrow Q \vdash \neg P$ | Contrapositive reasoning |
| Resolution | $P \vee Q, \neg P \vee R \vdash Q \vee R$ | Basis of automated theorem proving |

### Predicate Logic

Extends propositional with variables, quantifiers:

- $\forall x: \text{Human}(x) \rightarrow \text{Mortal}(x)$
- $\exists x: \text{Student}(x) \wedge \text{Smart}(x)$

## Rule-Based Systems (Expert Systems)

### Architecture

| Component | Function |
|-----------|----------|
| Knowledge base | Collection of IF-THEN rules |
| Working memory | Current facts/assertions |
| Inference engine | Matches rules to facts, fires rules |
| Explanation facility | Explains reasoning chain |

### Forward vs Backward Chaining

| Property | Forward Chaining | Backward Chaining |
|----------|-----------------|-------------------|
| Direction | Data → Goal | Goal → Data |
| Strategy | Bottom-up | Top-down |
| Starts with | Known facts | Hypothesis/query |
| Use case | Monitoring, diagnosis | Proving specific goals |
| Example | CLIPS, OPS5 | Prolog |

## Reasoning Under Uncertainty

| Method | Approach |
|--------|----------|
| Bayesian | Probability theory; $P(H|E) = \frac{P(E|H)P(H)}{P(E)}$ |
| Certainty Factors | MYCIN-style; CF in [-1, 1] |
| Fuzzy Logic | Degrees of truth in [0, 1] |
| Dempster-Shafer | Belief functions; handles ignorance |

### Bayes' Theorem

$$P(H|E) = \frac{P(E|H) \cdot P(H)}{P(E)}$$

| Term | Meaning |
|------|---------|
| $P(H|E)$ | Posterior — probability of hypothesis given evidence |
| $P(E|H)$ | Likelihood — probability of evidence given hypothesis |
| $P(H)$ | Prior — initial belief in hypothesis |
| $P(E)$ | Evidence — normalising constant |

## Modelling & Simulation

### Agent-Based Modelling

| Concept | Description |
|---------|-------------|
| Agent | Autonomous entity with behaviour rules |
| Environment | Space agents inhabit |
| Interaction | Rules for agent-agent/agent-environment |
| Emergence | Complex behaviour from simple rules |

### Applications

| Domain | Use |
|--------|-----|
| Traffic | Vehicle flow, congestion patterns |
| Epidemiology | Disease spread modelling |
| Economics | Market dynamics, trading |
| Ecology | Population dynamics, predator-prey |

## Large Language Models (LLMs) in AI

### Architecture

| Component | Description |
|-----------|-------------|
| Transformer | Attention-based architecture |
| Self-attention | Relates all positions in sequence |
| Pre-training | Unsupervised learning on large corpus |
| Fine-tuning | Task-specific adaptation |

### Capabilities & Limitations

| Capability | Limitation |
|-----------|-----------|
| Natural language understanding | Hallucination (confident errors) |
| Code generation | No true reasoning/planning |
| Few-shot learning | Context window limits |
| Knowledge retrieval | Training data cutoff |
| Summarisation | Cannot verify own outputs |

### LLMs for Optimisation

| Approach | How LLM is used |
|----------|-----------------|
| Solution generation | LLM proposes solutions directly |
| Operator design | LLM generates/suggests operators |
| Heuristic generation | LLM creates evaluation functions |
| Algorithm selection | LLM recommends which algorithm to use |

### Prompt Engineering for AI Tasks

| Technique | Description |
|-----------|-------------|
| Zero-shot | Direct instruction, no examples |
| Few-shot | Provide examples in prompt |
| Chain-of-thought | Step-by-step reasoning |
| Self-consistency | Multiple reasoning paths, majority vote |

<details><summary>Practice: Apply Modus Ponens to: "All birds fly. Tweety is a bird."</summary>

1. $\forall x: \text{Bird}(x) \rightarrow \text{Fly}(x)$ (All birds fly)
2. $\text{Bird}(\text{Tweety})$ (Tweety is a bird)
3. By Modus Ponens: $\text{Fly}(\text{Tweety})$ (Tweety flies)

Note: This illustrates the **monotonicity** problem — we can't handle exceptions (penguins) without non-monotonic reasoning.

</details>

<details><summary>Practice: Forward vs Backward chaining — which for medical diagnosis?</summary>

**Backward chaining** is better for diagnosis:
- Start with hypothesis (e.g., "Patient has flu")
- Work backward to check if supporting evidence exists
- Avoids firing irrelevant rules

**Forward chaining** would fire every rule matching current symptoms — inefficient when knowledge base is large and goal is specific.

However, monitoring systems (fire alarms, process control) favour **forward chaining** — react to incoming data.

</details>

<details><summary>Practice: Key limitation of LLMs for optimisation?</summary>

| Limitation | Explanation |
|-----------|-------------|
| No search mechanism | LLMs generate, they don't iteratively improve |
| No objective evaluation | Cannot compute fitness internally |
| Stochastic outputs | Same prompt may give different (inconsistent) solutions |
| Scale | Token limits prevent encoding large problem instances |
| Hallucination | May produce infeasible or suboptimal solutions confidently |

LLMs are best used as **components** within optimisation frameworks (e.g., generating initial solutions or suggesting operators) rather than as standalone optimisers.

</details>
