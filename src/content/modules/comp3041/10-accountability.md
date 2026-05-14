---
title: "Accountability & Responsibility"
order: 10
moduleTitle: "COMP3041 - Professional Ethics in Computing"
tags: ["accountability", "responsibility", "liability", "birsch", "problem-of-many-hands", "equifax"]
---

## Three Key Terms

:::eli10

Responsibility means making sure good things happen (looking forward). Accountability means explaining what happened and accepting blame if something went wrong (looking backward). Liability means the law says you have to pay for damage you caused. All three are important when computers cause harm.

:::

:::eli15
Responsibility, accountability, and liability are related but distinct concepts. Responsibility is forward-looking: the duty to ensure good outcomes. Accountability is backward-looking: being answerable for what already happened. Liability is the legal obligation to compensate for harm caused. In computing, where a single line of code can affect millions, all three are essential but often difficult to assign clearly.

:::

:::eli20
| Term | Focus | Description |
|------|-------|-------------|
| **Responsibility** | Forward-looking | Duty to ensure good outcomes; proactive |
| **Accountability** | Backward-looking | Being answerable for what happened; reactive |
| **Liability** | Legal | Legal obligation to compensate for harm |

:::

## Why This Matters in Computing

:::eli10

One tiny mistake in a computer program can hurt millions of people at once. You cannot just say "someone else told me to do it." Because computers are so powerful, the people who build them need to be extra careful and own up to their mistakes.

:::

:::eli15
Computing amplifies ethical stakes in unique ways. Scale means one bug affects millions of users simultaneously. Complexity makes systems behave in unexpected emergent ways. Speed culture ("move fast and break things") prioritises velocity over safety. And intangibility makes risks feel abstract since software does not visibly wear out like mechanical parts. These factors create a "perfect storm" where ethical accountability is both critically important and uniquely difficult to establish.

:::

:::eli20
- A single line of code can impact millions of people
- "I was just following orders" is not an ethical or legal defence
- We have improved reliability standards but neglected accountability for impact

### The "Perfect Storm" for Ethical Issues

| Factor | Why it amplifies risk |
|--------|----------------------|
| **Scale & amplification** | One bug → millions of users affected |
| **Complexity** | Systems are black boxes with emergent behaviours |
| **Speed** | "Move fast and break things" can break people |
| **Intangibility** | Bugs don't wear out like a brake pad — risk feels abstract |

:::

## The Problem of Many Hands

:::eli10

When lots of people work on a project together, it becomes hard to figure out who is to blame when something goes wrong. Everyone can point at someone else and say "it was not me." This is called the problem of many hands, and it happens a lot in big technology projects.

:::

:::eli15
The "problem of many hands" occurs when responsibility is distributed across so many people that no one feels personally accountable. In large tech projects with designers, engineers, managers, regulators, and executives all contributing, pinpointing who bears responsibility for a failure becomes extremely difficult. The Boeing 737 MAX crashes illustrate this: designers, engineers, regulators, and management all contributed to the disaster, but assigning individual accountability remains contentious.

:::

:::eli20
When responsibility is distributed across many people, it becomes hard to pinpoint who is accountable.

**Example**: Boeing 737 MAX crashes involved designers, engineers, regulators, management — who bears responsibility?

:::

## Traditional Moral Responsibility

:::eli10

In a simple case, one person (the agent) does something that affects another person (the patient). Like a developer writes a program that loses someone's money. But with computers, it gets complicated because lots of people and systems are connected together.

:::

:::eli15
Traditional moral responsibility has a simple structure: an agent performs an action that affects a patient. In computing, this becomes complicated because systems involve many interconnected humans, software components, and automated processes. A developer (agent) creates software causing financial loss to users (patients), but the developer works within a team, under management direction, using third-party libraries, on infrastructure they did not build. Computing professionals tend to side-step responsibility by looking for someone else to blame.

:::

:::eli20
| Component | Description |
|-----------|-------------|
| **Agent** | Person performing the action |
| **Patient** | Person/system affected by the action |

**Example**: Developer (agent) creates software causing financial loss to users (patients).

### How Computing Expands This

- Computing involves humans, software, and systems as interconnected agents
- Internet search engines prioritising information influence public opinion
- Computing practitioners tend to side-step responsibility by looking for someone else to blame

:::

## Birsch's Criteria for Accountability

:::eli10

A philosopher named Birsch made a checklist to decide if someone is really to blame. You ask: Did they cause it? Did they know what would happen? Did they do it on purpose? Could they understand what they were doing? Were they forced by someone else? The more "yes" answers, the more they are to blame.

:::

:::eli15
Birsch's framework identifies five conditions for holding someone accountable. Causation: did they cause or contribute to the outcome? Knowledge: did they know or should they have known the consequences? Intent: did they act deliberately? Capacity: did they have the ability to understand their actions? Freedom: did they act without coercion? The more criteria satisfied, the stronger the case for accountability. Coercion shifts blame to the coercer, and intent strengthens accountability (intentional harm is worse than negligent harm, which is worse than accidental harm).

:::

:::eli20
A philosophical framework identifying conditions under which someone can be held accountable:

| Criterion | Meaning | Example |
|-----------|---------|---------|
| **Causation** | The person caused or significantly contributed to the outcome | Developer writes code introducing security flaw → data breach |
| **Knowledge** | The person knew or should have reasonably known the consequences | Team deploys AI knowing it has bias but doesn't mitigate it |
| **Intent** | The person intentionally carried out the action | Social media company deliberately manipulates algorithms for engagement |
| **Capacity** | The person had the ability to understand their actions and outcomes | Junior dev following unclear instructions has reduced accountability vs supervisor |
| **Freedom** | The person acted freely without coercion | Developer pressured by management to release untested software → management bears responsibility |

### How Criteria Interact

- More criteria satisfied → stronger case for accountability
- Coercion (lack of freedom) can shift accountability to the coercer
- Lack of capacity reduces but doesn't eliminate accountability
- Intent strengthens accountability (intentional > negligent > accidental)

:::

## ACM Code of Ethics: Accountability Principles

:::eli10

The ACM (a big computing organisation) has rules about accountability: help society, do not cause harm, be honest, and protect people's secrets. If you build self-driving cars, you must make sure the software does not hurt people. If you find a security bug, you must tell someone.

:::

:::eli15
The ACM Code of Ethics provides specific guidance on accountability: contribute to society and human well-being (e.g., autonomous vehicle developers must minimise harm), avoid harm (including bias in AI systems), be honest and trustworthy (transparently report vulnerabilities rather than hiding them), and honour confidentiality (protect sensitive data, comply with regulations like GDPR). These principles translate abstract accountability into concrete professional obligations.

:::

:::eli20
| Principle | Application |
|-----------|-------------|
| Contribute to society and human well-being | AV developers must ensure software minimises harm |
| Avoid harm | Avoid biases in AI systems |
| Be honest and trustworthy | Transparently report vulnerabilities |
| Honour confidentiality | Protect sensitive user data (GDPR compliance) |

:::

## Case Study: Equifax Data Breach (2017)

:::eli10

Equifax was a company that stored personal information about 147 million people. Hackers got in because Equifax did not fix a known security hole even after being warned many times. The IT team, the managers, and the board of directors all failed to do their jobs. Equifax had to pay 700 million dollars.

:::

:::eli15
The Equifax breach exposed 147 million people's sensitive data (social security numbers, credit cards) because the company failed to patch a known Apache Struts vulnerability despite multiple warnings. Using Birsch's criteria, both the IT security team (direct causation, knowledge, capacity to patch) and management (oversight failure, authority to enforce) bear accountability, though neither acted with intent (it was negligence). The $700 million settlement and executive resignations demonstrate that negligence has real consequences, even without malicious intent.

:::

:::eli20
### What Happened
- One of the largest credit reporting agencies
- 147 million individuals' data exposed (SSN, credit cards)
- Cause: Failure to patch a known Apache Struts vulnerability

### Responsibility Analysis

| Party | Role | Failure |
|-------|------|---------|
| IT Security Team | Maintaining security, applying patches | Failed to patch despite multiple warnings |
| Management (CIO, CSO) | Overseeing IT, ensuring patches applied | Failed to ensure compliance |
| Board of Directors | Corporate governance | Failed to prioritise cybersecurity |
| Apache Software Foundation | Identifying and providing patch | Did their job (provided patch in timely manner) |

### Accountability Outcomes
- Several executives (including CSO) resigned
- $700 million settlement with FTC
- Demonstrated consequences of negligence in accountability

### Applying Birsch's Criteria to Equifax

| Criterion | IT Team | Management |
|-----------|---------|------------|
| Causation | Directly failed to patch | Failed to ensure patching |
| Knowledge | Knew about vulnerability (multiple warnings) | Should have known (oversight role) |
| Intent | Not intentional (negligence) | Not intentional (negligence) |
| Capacity | Had technical ability to patch | Had authority to enforce |
| Freedom | Unclear if resource-constrained | Had full authority |

:::

## Key Lesson

:::eli10

To make computing safe and fair, we need: clear rules about who is responsible for what, systems that check if people are doing their jobs, real punishments for being careless, a culture that values safety over speed, and people who do not use "I did not know" as an excuse.

:::

:::eli15
Effective accountability in computing requires five elements: clear chains of responsibility (everyone knows their role), monitoring and enforcement systems (compliance is checked), consequences for negligence (not just for malice), a culture that prioritises safety over speed (countering "move fast and break things"), and recognition that ignorance is often not a valid defence (professionals have a duty to know). Without these, the "problem of many hands" allows everyone to avoid blame.

:::

:::eli20
Accountability in computing requires:
1. Clear chains of responsibility
2. Systems for monitoring and enforcement
3. Consequences for negligence
4. Culture that values safety over speed
5. Recognition that "I didn't know" is not always a defence

:::
