---
title: "Knowledge & Reasoning"
order: 8
moduleTitle: "COMP2039 - AI Methods"
tags: ["knowledge-representation", "reasoning", "logic", "llm", "modelling"]
---

## Knowledge Representation

:::eli10

For a computer to be "smart," it needs to store knowledge about the world in a way it can use. There are different formats: logical rules (if it rains, the ground is wet), networks of connected concepts (like a mind map), structured records (like filling in a form), or probability-based knowledge (there's a 70% chance of rain). The format you choose determines what questions the system can answer.

:::

:::eli15

Knowledge representation (KR) is how AI systems encode information about the world in a machine-usable format. Logic-based representations use formal statements that support rigorous inference. Rule-based systems use IF-THEN rules (expert systems). Semantic networks represent knowledge as graphs of concepts connected by relationships. Ontologies provide formal domain models with defined concepts and relations. Probabilistic methods handle uncertainty. A good KR system must be able to express the needed knowledge, derive new conclusions, do so efficiently, and be easy to extend with new information.

:::

:::eli20

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

:::

## Logic-Based Reasoning

:::eli10

Logic is a formal way to write down facts and rules, then figure out what must be true. "If it's a bird, it can fly. Tweety is a bird. Therefore, Tweety can fly." Computers can do this reasoning automatically using rules like Modus Ponens (if P is true and P implies Q, then Q is true). Predicate logic adds variables so you can talk about "all" or "some" things.

:::

:::eli15

Logic provides a formal foundation for automated reasoning. Propositional logic uses statements connected by AND, OR, NOT, and IMPLIES. Inference rules like Modus Ponens (from P and "P implies Q", conclude Q), Modus Tollens (from "not Q" and "P implies Q", conclude "not P"), and resolution (basis of automated theorem provers) allow deriving new facts from existing ones. Predicate logic extends this with variables and quantifiers — "for all x, if x is human then x is mortal" — enabling reasoning about categories of objects rather than just specific propositions.

:::

:::eli20

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

:::

## Rule-Based Systems (Expert Systems)

:::eli10

Expert systems are like asking a computer doctor for advice. They have a bunch of rules (IF temperature > 38 AND cough THEN maybe flu), a memory of current facts about the patient, and an "engine" that applies rules to facts to reach conclusions. They can even explain their reasoning: "I think you have flu because your temperature is high and you're coughing."

:::

:::eli15

Rule-based expert systems encode domain expertise as IF-THEN rules. The architecture has four parts: a knowledge base (rules), working memory (current facts), an inference engine (matches rules to facts and executes them), and an explanation facility (traces the reasoning chain). Forward chaining starts from known facts and fires applicable rules to derive new facts (data-driven — good for monitoring). Backward chaining starts from a goal/hypothesis and works backward to check if supporting evidence exists (goal-driven — good for diagnosis). The choice depends on whether you're reacting to data or trying to prove something specific.

:::

:::eli20

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

:::

## Reasoning Under Uncertainty

:::eli10

In the real world, things aren't always certain. Maybe there's a 70% chance the patient has flu based on symptoms. Bayesian reasoning uses probability to update beliefs when new evidence arrives — like a detective becoming more confident as clues accumulate. Fuzzy logic handles vague concepts like "tall" or "warm" by allowing partial truth rather than just true/false.

:::

:::eli15

Real-world knowledge is often uncertain. Several frameworks handle this: Bayesian reasoning uses Bayes' theorem to update the probability of a hypothesis given new evidence — the posterior probability combines prior belief with the likelihood of the observed evidence. Certainty factors (used in MYCIN) assign confidence scores between -1 and 1 to rules. Fuzzy logic allows degrees of truth between 0 and 1 (handling vague concepts like "warm"). Dempster-Shafer theory handles explicit ignorance by distinguishing between disbelief and lack of evidence. Bayesian networks graphically model conditional dependencies between variables for efficient probabilistic inference.

:::

:::eli20

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

:::

## Modelling & Simulation

:::eli10

Agent-based modelling is like building a virtual world filled with simple creatures that follow basic rules. Each creature (agent) acts on its own, but when many interact together, complex patterns emerge — like how simple rules for each bird create beautiful flocking behaviour. It's used to simulate traffic, disease spread, and market economies.

:::

:::eli15

Agent-based modelling (ABM) simulates complex systems by defining many autonomous agents, each following simple behaviour rules, and letting them interact in an environment. Complex macro-level phenomena emerge from these micro-level interactions — a key property called emergence. For example, traffic jams emerge from individual driving behaviours without any driver intending to create one. ABM is applied in epidemiology (disease spread from individual contacts), economics (market dynamics from trader decisions), ecology (predator-prey dynamics), and urban planning (pedestrian flows). The strength of ABM is modelling systems where global behaviour can't easily be predicted from local rules.

:::

:::eli20

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

:::

## Large Language Models (LLMs) in AI

:::eli10

Large Language Models (like ChatGPT) are AI systems trained on enormous amounts of text. They can write essays, generate code, and answer questions by predicting what words come next. They're impressive but have limits — they can confidently say wrong things (hallucination), can't truly reason step by step like a calculator, and don't know about events after their training. They're best as assistants rather than standalone problem solvers.

:::

:::eli15

LLMs are transformer-based neural networks pre-trained on vast text corpora. They excel at natural language understanding, code generation, few-shot learning (performing tasks from just a few examples in the prompt), and summarisation. However, they have significant limitations: hallucination (generating plausible but false information confidently), lack of true reasoning/planning capability, context window limits, training data cutoffs, and inability to verify their own outputs. For optimisation, LLMs can be useful components — generating initial solutions, suggesting operators, or recommending algorithms — but they cannot replace iterative search methods because they lack internal objective evaluation and systematic improvement mechanisms.

:::

:::eli20

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

:::
