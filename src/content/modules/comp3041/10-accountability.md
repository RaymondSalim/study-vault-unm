---
title: "Accountability & Responsibility"
order: 10
moduleTitle: "COMP3041 - Professional Ethics in Computing"
tags: ["accountability", "responsibility", "liability", "birsch", "problem-of-many-hands", "equifax"]
---

## Three Key Terms

| Term | Focus | Description |
|------|-------|-------------|
| **Responsibility** | Forward-looking | Duty to ensure good outcomes; proactive |
| **Accountability** | Backward-looking | Being answerable for what happened; reactive |
| **Liability** | Legal | Legal obligation to compensate for harm |

## Why This Matters in Computing

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

## The Problem of Many Hands

When responsibility is distributed across many people, it becomes hard to pinpoint who is accountable.

**Example**: Boeing 737 MAX crashes involved designers, engineers, regulators, management — who bears responsibility?

## Traditional Moral Responsibility

| Component | Description |
|-----------|-------------|
| **Agent** | Person performing the action |
| **Patient** | Person/system affected by the action |

**Example**: Developer (agent) creates software causing financial loss to users (patients).

### How Computing Expands This

- Computing involves humans, software, and systems as interconnected agents
- Internet search engines prioritising information influence public opinion
- Computing practitioners tend to side-step responsibility by looking for someone else to blame

## Birsch's Criteria for Accountability

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

## ACM Code of Ethics: Accountability Principles

| Principle | Application |
|-----------|-------------|
| Contribute to society and human well-being | AV developers must ensure software minimises harm |
| Avoid harm | Avoid biases in AI systems |
| Be honest and trustworthy | Transparently report vulnerabilities |
| Honour confidentiality | Protect sensitive user data (GDPR compliance) |

## Case Study: Equifax Data Breach (2017)

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

## Key Lesson

Accountability in computing requires:
1. Clear chains of responsibility
2. Systems for monitoring and enforcement
3. Consequences for negligence
4. Culture that values safety over speed
5. Recognition that "I didn't know" is not always a defence
