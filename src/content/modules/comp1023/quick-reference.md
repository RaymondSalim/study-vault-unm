---
title: "Quick Reference"
order: 90
moduleTitle: "COMP1023 - Software Engineering"
tags: ["software-engineering", "reference", "UML", "cheat-sheet"]
---

## UML Notation Quick Reference

### Class Diagram Symbols

| Symbol | Meaning |
|--------|---------|
| `+` | Public visibility |
| `-` | Private visibility |
| `#` | Protected visibility |
| `~` | Package visibility |
| *italic* | Abstract class/method |
| <u>underline</u> | Static member |
| `<<interface>>` | Interface stereotype |
| `{abstract}` | Abstract constraint |

### Relationship Lines

| Line | Arrow/End | Relationship |
|------|-----------|-------------|
| Solid | None | Bidirectional association |
| Solid | Open arrow `>` | Unidirectional association |
| Solid | Hollow diamond `◇` | Aggregation (whole side) |
| Solid | Filled diamond `◆` | Composition (whole side) |
| Solid | Hollow triangle `△` | Inheritance (parent side) |
| Dashed | Hollow triangle `△` | Realisation/implements |
| Dashed | Open arrow `>` | Dependency |

### Multiplicity

| Notation | Meaning |
|----------|---------|
| `1` | Exactly one |
| `0..1` | Optional (zero or one) |
| `*` or `0..*` | Zero or more |
| `1..*` | One or more |
| `n..m` | Range |

---

## Sequence Diagram Symbols

| Element | Symbol | Description |
|---------|--------|-------------|
| Synchronous message | `──────→` (filled head) | Caller blocks until return |
| Asynchronous message | `──────→` (open head) | Caller continues |
| Return | `- - - →` (dashed) | Return value |
| Object creation | `- - - →` to new box | `<<create>>` |
| Object destruction | `──────→ X` | Terminates lifeline |
| Self-call | Loop arrow on same lifeline | Internal method call |

### Combined Fragments

| Fragment | Guard | Meaning |
|----------|-------|---------|
| `alt` | `[condition]` | If-else (one operand executes) |
| `opt` | `[condition]` | If only (no else) |
| `loop` | `[condition]` or `[min, max]` | Repeat |
| `break` | `[condition]` | Exit enclosing interaction |
| `par` | (none) | Parallel execution |
| `ref` | (none) | Reference to another diagram |

---

## Use Case Diagram Symbols

| Element | Symbol | Notes |
|---------|--------|-------|
| Actor | Stick figure | Outside system boundary |
| Use Case | Ellipse | Inside system boundary |
| System | Rectangle | Contains use cases |
| Association | Solid line | Actor to use case |
| `<<include>>` | Dashed arrow → included | Mandatory sub-behaviour |
| `<<extend>>` | Dashed arrow → base | Optional extension |
| Generalisation | Solid + hollow triangle | Actor or UC inheritance |

**Arrow directions:**
- Include: Base Case ──→ Included Case
- Extend: Extending Case ──→ Base Case

---

## SDLC Model Comparison

| | Waterfall | V-Model | Agile/Scrum | Spiral |
|--|-----------|---------|-------------|--------|
| **Approach** | Sequential | Sequential + V&V | Iterative | Risk-driven iterative |
| **Flexibility** | None | None | High | High |
| **Customer** | Start/end | Start/end | Continuous | Periodic |
| **Risk** | Late discovery | Medium | Early feedback | Explicit analysis |
| **Delivery** | Single | Single | Incremental | Incremental |
| **Docs** | Heavy | Heavy | Light | Medium |
| **Best for** | Stable reqs | Safety-critical | Evolving reqs | High-risk, large |

---

## Requirements Checklist

| Quality | Check |
|---------|-------|
| Complete | All scenarios covered? |
| Consistent | No contradictions? |
| Unambiguous | Only one interpretation? |
| Verifiable | Can write a test for it? |
| Traceable | Links to source and test? |
| Feasible | Technically possible? |
| Necessary | Needed by stakeholder? |
| Prioritised | MoSCoW or ranking applied? |

---

## Testing Quick Reference

| Technique | Type | Key Idea |
|-----------|------|----------|
| Equivalence Partitioning | Black-box | Divide inputs into classes |
| Boundary Value Analysis | Black-box | Test at partition edges |
| Decision Table | Black-box | Condition combinations |
| State Transition | Black-box | Test state changes |
| Statement Coverage | White-box | Execute every line |
| Branch Coverage | White-box | Take every true/false path |
| Path Coverage | White-box | Every possible route |

### Coverage Strength (weakest → strongest)

```
Statement < Branch < Condition < Path
```

---

## SOLID at a Glance

| Letter | Principle | One-liner |
|--------|-----------|-----------|
| S | Single Responsibility | One class, one reason to change |
| O | Open/Closed | Extend behaviour without modifying code |
| L | Liskov Substitution | Subtypes must honour parent's contract |
| I | Interface Segregation | Small, focused interfaces |
| D | Dependency Inversion | Depend on abstractions, not concretions |

---

## Coupling & Cohesion Summary

| | Good | Bad |
|--|------|-----|
| **Coupling** | Low (loose, independent) | High (tight, interdependent) |
| **Cohesion** | High (focused, related) | Low (scattered, unrelated) |
