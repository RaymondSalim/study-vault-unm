---
title: "Exam Strategy"
order: 93
moduleTitle: "COMP2042 - Developing Maintainable Software"
tags: ["exam", "strategy", "revision", "tips"]
---

# Exam Strategy

## Time Allocation

| Section | Approx. Weight | Suggested Time (2hr exam) |
|---------|---------------|--------------------------|
| OOP & SOLID principles | 25% | 30 min |
| Design patterns | 30% | 36 min |
| Refactoring & code smells | 20% | 24 min |
| Testing & build tools | 15% | 18 min |
| GUI & maintenance | 10% | 12 min |

## Topic Weighting

1. **Design Patterns** -- Expect to identify, apply, or draw UML for patterns
2. **SOLID Principles** -- Identify violations in code, explain how to fix
3. **Refactoring** -- Identify smells and propose specific refactoring techniques
4. **Testing** -- Unit testing principles, TDD cycle, test design
5. **GUI & MVC** -- Separation of concerns, event handling

## Common Question Types

- **Identify the pattern:** Given a class diagram or code snippet, name the design pattern
- **Apply a pattern:** Given a problem scenario, design a solution using an appropriate pattern
- **SOLID violation:** Given code, identify which SOLID principle is violated and how to fix it
- **Refactoring exercise:** Identify code smells and propose specific refactorings
- **Draw UML:** Class diagram showing a pattern implementation
- **Compare patterns:** When to use Strategy vs Template Method, Decorator vs Adapter, etc.

## Key Patterns to Know

| Category | Patterns | Key Idea |
|----------|----------|----------|
| Creational | Factory Method, Singleton, Abstract Factory | Object creation without specifying exact class |
| Structural | Adapter, Decorator, Composite, Facade | Composing objects for new functionality |
| Behavioural | Observer, Strategy, Template Method, State | Object communication and responsibility |

## Exam Approach Tips

1. **For pattern questions** -- draw UML class diagrams showing relationships (uses, extends, implements)
2. **For SOLID questions** -- name the specific principle, quote the violation, show the fix
3. **For refactoring** -- name both the smell AND the specific refactoring technique (e.g., "Long Method -> Extract Method")
4. **For code analysis** -- look for coupling, cohesion, God classes, and feature envy
5. **Be specific** -- "violates SRP because the class handles both file I/O and data validation" not just "violates SRP"

## Night Before Top 10 Checklist

1. Write out all 5 SOLID principles from memory with one-sentence explanations
2. Know the UML structure of: Factory Method, Observer, Strategy, Decorator, Adapter
3. List 5 code smells and the corresponding refactoring for each
4. Understand the TDD cycle: Red -> Green -> Refactor
5. Know the difference between Strategy and Template Method (composition vs inheritance)
6. Be able to explain why "favour composition over inheritance"
7. Understand MVC and how events flow between components
8. Know what coupling and cohesion are and why they matter
9. Review Decorator vs inheritance -- when and why Decorator is preferred
10. Be able to identify Liskov Substitution violations (e.g., Square extends Rectangle problem)
