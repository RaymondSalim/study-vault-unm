---
title: "Ethics Theories"
order: 2
moduleTitle: "COMP3041 - Professional Ethics in Computing"
tags: ["ethics-theories", "consequentialism", "deontology", "virtue-ethics", "utilitarianism", "kant"]
---

## The Three Core Frameworks

| Framework | Central Question | Key Figure |
|-----------|-----------------|------------|
| **Consequentialism** | What are the outcomes? | Bentham, Mill |
| **Deontology** | What are the rules/duties? | Kant |
| **Virtue Ethics** | What kind of person should I be? | Aristotle |

## Consequentialism / Utilitarianism

### Core Principle
The morality of an action is determined solely by its outcomes — maximise good consequences, minimise bad ones.

**"The greatest good for the greatest number"** — Calculate the net utility.

### Trolley Problem (Consequentialist)
- Option A (Do nothing): 5 deaths → very low utility
- Option B (Pull lever): 1 death → higher utility
- **Verdict**: Pull the lever (saving 5 > saving 1)

### Strengths

- Pragmatic and results-oriented
- Encourages considering broader impact
- Aligns with cost-benefit analysis (familiar in tech)

### Weaknesses

| Problem | Example |
|---------|---------|
| **Justice Problem** | Justifies harming an innocent if it maximises utility (framing someone to prevent a riot) |
| **Calculation Problem** | Impossible to predict all consequences; how do we quantify "good"? |

### Computing Example: Algorithmic Content Moderation
- Option 1: AI flags hate speech → protects millions (greatest good)
- Option 2: AI makes mistakes → silences legitimate users (false positives)
- Utilitarian verdict: benefit to billions justifies harm to thousands mistakenly flagged

## Deontology (Kantianism)

### Core Principle
Morality is based on whether an action follows rules/duties — the intent and action itself matter, not consequences.

### The Categorical Imperative
> "Act only according to that maxim whereby you can, at the same time, will that it should become a universal law."

**Test**: "What if everyone did that?" — if it leads to contradiction, the action is wrong.

### Trolley Problem (Deontological)
- Rule: Do not kill
- Pulling the lever = actively killing one person (using them as means)
- **Verdict**: Do NOT pull the lever — violating "do not kill" is inherently wrong

### Strengths

- Protects individual rights and justice
- Provides clear, consistent rules
- Aligns with integrity and principle

### Weaknesses

| Problem | Example |
|---------|---------|
| **Rigidity** | Rules can conflict — what if you must lie to save a life? |
| **Unjust Rules** | What if the rule itself is bad? |

### Computing Examples

| Scenario | Analysis |
|----------|----------|
| Deceptive privacy policy | Violates duty of truthfulness, even if profitable |
| Skipping security protocols for deadline | Violates professional duty to protect users |

## Virtue Ethics

### Core Principle
Morality is about developing a virtuous **character** — not following rules or calculating outcomes.

**Key question**: "What would a virtuous person do?"

### Aristotle's Framework
- Virtues are ideal means between two extremes
- **Character virtues**: love, justice, patience, generosity (acquired by practice)
- **Intellectual virtues**: curiosity, humility, open-mindedness (cultivated through education)

### Virtues for Computer Scientists

| Virtue | Application |
|--------|-------------|
| Honesty | Transparent about system capabilities and limitations |
| Justice/Fairness | Designing systems that don't discriminate |
| Responsibility | Taking ownership of systems you build |
| Humility | Acknowledging what you don't know, potential for harm |
| Courage | Whistleblowing on unethical practices |

### Strengths

- Flexible and context-sensitive
- Encourages personal and professional development
- Moves beyond "what to do" to "who to be"

### Weaknesses

- **Vagueness**: "be virtuous" doesn't give clear answers
- **Cultural relativity**: definitions of virtues vary across cultures

## Other Ethical Theories

| Theory | Core Idea | Strengths | Weaknesses |
|--------|-----------|-----------|------------|
| **Divine Command** | God's commands determine morality | Clear authority | Different scriptures disagree; secular society; doesn't address modern problems |
| **Cultural Relativism** | Morality depends on society's guidelines | Respects different contexts | No way to resolve conflicts between cultures; many/any fallacy |
| **Natural Law** | Human nature determines good/bad | Grounded in human nature | "Natural" ≠ good or right |
| **Ethics of Justice** (Rawls) | Justice as fairness; social contract | Protects least-advantaged | Abstract; hard to apply to specific cases |
| **Ethics of Caring** | Morality through caring relationships | Values empathy and connection | Limited to those we can care for directly |

## Applying Theories: Comparison

| Scenario | Consequentialist | Deontological | Virtue Ethics |
|----------|-----------------|---------------|---------------|
| AI Hiring Tool | Is it accurate? Does it maximise good outcomes? | Does it follow the law? | Does it act with justice and fairness? |
| Technical Debt | Will fixing it produce better outcomes? | Is there a duty to maintain quality? | What would a responsible engineer do? |
