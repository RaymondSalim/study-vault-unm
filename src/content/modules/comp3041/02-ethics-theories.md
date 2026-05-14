---
title: "Ethics Theories"
order: 2
moduleTitle: "COMP3041 - Professional Ethics in Computing"
tags: ["ethics-theories", "consequentialism", "deontology", "virtue-ethics", "utilitarianism", "kant"]
---

## The Three Core Frameworks

:::eli10

There are three main ways people decide what is right and wrong. One way looks at results (did more good than bad happen?). Another way follows strict rules (some things are always wrong, no matter what). The third way asks what a good, kind person would do.

:::

:::eli15

Ethics has three major frameworks. Consequentialism judges actions by their outcomes (maximise benefit, minimise harm). Deontology judges actions by whether they follow moral rules or duties, regardless of outcome. Virtue ethics focuses on developing good character traits and asks "what would a person of integrity do?" Each framework gives different answers to the same dilemma.

:::

:::eli20

| Framework | Central Question | Key Figure |
|-----------|-----------------|------------|
| **Consequentialism** | What are the outcomes? | Bentham, Mill |
| **Deontology** | What are the rules/duties? | Kant |
| **Virtue Ethics** | What kind of person should I be? | Aristotle |

:::

## Consequentialism / Utilitarianism

:::eli10

This way of thinking says: pick the choice that makes the most people happy. If you have to choose between saving one person or five people, you save five because that makes more people happy overall. It is like counting up the good and bad points and picking the highest score.

:::

:::eli15

Consequentialism (especially utilitarianism) says that the morally right action is the one that produces the best overall outcome. You weigh all the benefits against all the harms and choose whichever maximises net good. It is practical and results-focused, but it can justify harming individuals if the majority benefits, and predicting all consequences is often impossible.

:::

:::eli20

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

:::

## Deontology (Kantianism)

:::eli10

This way of thinking says: some things are always wrong, even if breaking the rule would help more people. Lying is wrong. Stealing is wrong. Hurting someone is wrong. You follow the rules no matter what, because rules keep everyone safe and treated fairly.

:::

:::eli15

Deontology says morality is about following duties and rules, not about outcomes. Kant's "categorical imperative" asks: could you make your action a universal law for everyone? If not, it is wrong. This protects individual rights (you cannot sacrifice one person to save five), but it can be rigid when rules conflict with each other.

:::

:::eli20

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

:::

## Virtue Ethics

:::eli10

This way of thinking asks: "What kind of person do I want to be?" Instead of following rules or counting results, you try to be brave, honest, fair, and kind. You ask yourself "what would a really good person do here?" and do that.

:::

:::eli15

Virtue ethics focuses on character rather than rules or outcomes. It asks what traits (virtues) a good person would cultivate: honesty, courage, fairness, humility. For computing professionals, this means asking "would a responsible, honest engineer do this?" rather than just "is this legal?" or "does this maximise profit?" It is flexible but can be vague when you need a concrete answer.

:::

:::eli20

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

:::

## Other Ethical Theories

:::eli10

There are other ways people decide right from wrong: some follow religious teachings, some say "whatever my culture says is fine," some look at what is natural, some focus on fairness for the weakest people, and some focus on caring relationships.

:::

:::eli15

Beyond the three main frameworks, other theories include: Divine Command (morality comes from God's commands), Cultural Relativism (morality depends on your society), Natural Law (human nature determines good/bad), Ethics of Justice by Rawls (design rules as if you did not know your position in society), and Ethics of Caring (morality through empathy and relationships). Each has strengths but also significant limitations.

:::

:::eli20

| Theory | Core Idea | Strengths | Weaknesses |
|--------|-----------|-----------|------------|
| **Divine Command** | God's commands determine morality | Clear authority | Different scriptures disagree; secular society; doesn't address modern problems |
| **Cultural Relativism** | Morality depends on society's guidelines | Respects different contexts | No way to resolve conflicts between cultures; many/any fallacy |
| **Natural Law** | Human nature determines good/bad | Grounded in human nature | "Natural" ≠ good or right |
| **Ethics of Justice** (Rawls) | Justice as fairness; social contract | Protects least-advantaged | Abstract; hard to apply to specific cases |
| **Ethics of Caring** | Morality through caring relationships | Values empathy and connection | Limited to those we can care for directly |

:::

## Applying Theories: Comparison

:::eli10

When you face a tricky decision, you can use all three ways of thinking like different lenses. One lens asks "what gives the best result?", another asks "what rules should I follow?", and the last asks "what would a good person do?" Looking through all three helps you see the full picture.

:::

:::eli15

In practice, you apply multiple frameworks to the same scenario to get a richer picture. For an AI hiring tool: a consequentialist asks if it produces better hiring outcomes overall, a deontologist asks whether it respects candidates' rights and follows anti-discrimination law, and virtue ethics asks whether deploying it reflects fairness and responsibility. Real ethical reasoning often combines insights from all three.

:::

:::eli20

| Scenario | Consequentialist | Deontological | Virtue Ethics |
|----------|-----------------|---------------|---------------|
| AI Hiring Tool | Is it accurate? Does it maximise good outcomes? | Does it follow the law? | Does it act with justice and fairness? |
| Technical Debt | Will fixing it produce better outcomes? | Is there a duty to maintain quality? | What would a responsible engineer do? |

:::
