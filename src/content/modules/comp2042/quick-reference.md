---
title: "Quick Reference"
order: 90
moduleTitle: "COMP2042 - Maintainable Software"
tags: ["reference", "cheat sheet", "patterns", "SOLID", "UML"]
---

# Quick Reference - Pattern Catalog and SOLID

## SOLID Summary

| Principle | Violation Sign | Fix |
|-----------|---------------|-----|
| **S**ingle Responsibility | Class changes for multiple reasons | Extract class per responsibility |
| **O**pen/Closed | Adding feature requires modifying existing class | Use interfaces + polymorphism |
| **L**iskov Substitution | Subclass breaks parent's contract | Redesign hierarchy, use composition |
| **I**nterface Segregation | Classes implement methods they don't need | Split into smaller interfaces |
| **D**ependency Inversion | High-level class instantiates low-level class | Inject abstractions via constructor |

---

## Design Pattern Catalog

### Creational Patterns

| Pattern | Structure (Text UML) | Key Idea |
|---------|----------------------|----------|
| **Singleton** | `Singleton` {`-instance: Singleton`, `-Singleton()`, `+getInstance(): Singleton`} | Private constructor, static instance |
| **Factory Method** | `Creator` → abstract `factoryMethod()` → `ConcreteCreator` returns `ConcreteProduct` | Subclass decides which class to instantiate |
| **Abstract Factory** | `AbstractFactory` {`createA()`, `createB()`} ← `ConcreteFactory1`, `ConcreteFactory2` | Family of related objects |
| **Builder** | `Director` uses `Builder` {`buildPartA()`, `buildPartB()`, `getResult()`} | Step-by-step construction |

### Structural Patterns

| Pattern | Structure (Text UML) | Key Idea |
|---------|----------------------|----------|
| **Adapter** | `Client` → `Target` ← `Adapter` → wraps `Adaptee` | Convert interface A to interface B |
| **Decorator** | `Component` ← `ConcreteComponent`; `Component` ← `Decorator` → wraps `Component` | Wrap to add behaviour, same interface |
| **Facade** | `Client` → `Facade` → {`SubsystemA`, `SubsystemB`, `SubsystemC`} | Simplify complex subsystem |
| **Composite** | `Component` ← `Leaf`; `Component` ← `Composite` → contains `Component[]` | Uniform tree operations |

### Behavioural Patterns

| Pattern | Structure (Text UML) | Key Idea |
|---------|----------------------|----------|
| **Strategy** | `Context` → `Strategy` ← `ConcreteStrategyA/B` | Swap algorithms at runtime |
| **Observer** | `Subject` → notifies `Observer[]` ← `ConcreteObserver` | Publish/subscribe notification |
| **State** | `Context` → `State` ← `ConcreteStateA/B` (states transition between each other) | Behaviour changes with state |
| **Template Method** | `AbstractClass` {`templateMethod()` calls `step1()`, `step2()`} ← `ConcreteClass` | Fixed skeleton, variable steps |

---

## UML Class Diagram Relationships

```
A ──────> B         Association (A knows about B)
A ─ ─ ─ > B         Dependency (A temporarily uses B)
A ◇─────> B         Aggregation (A has B, B can exist alone)
A ◆─────> B         Composition (A has B, B cannot exist alone)
A ───────|> B       Inheritance (A is-a B)
A ─ ─ ─ |> B       Realisation (A implements B interface)
```

| Arrow | Multiplicity examples |
|-------|----------------------|
| `1` | Exactly one |
| `0..1` | Zero or one |
| `*` or `0..*` | Zero or more |
| `1..*` | One or more |
| `n..m` | Between n and m |

---

## Pattern Selection Guide

| Problem | Pattern |
|---------|---------|
| Need exactly one instance | Singleton |
| Don't know concrete class at compile time | Factory Method |
| Need families of related objects | Abstract Factory |
| Complex object with many optional parts | Builder |
| Incompatible interface to integrate | Adapter |
| Add behaviour without subclassing | Decorator |
| Complex subsystem needs simple API | Facade |
| Tree structure with uniform operations | Composite |
| Swap algorithm at runtime | Strategy |
| Notify many objects of state change | Observer |
| Object behaviour depends on its state | State |
| Same algorithm structure, different steps | Template Method |
| Separate UI from logic | MVC/MVP |

---

## Refactoring Quick Reference

| Code Smell | Refactoring |
|------------|-------------|
| Long Method | Extract Method |
| God Class | Extract Class |
| Feature Envy | Move Method |
| Long Parameter List | Introduce Parameter Object |
| Switch on type | Replace Conditional with Polymorphism |
| Duplicate Code | Extract Method / Pull Up Method |
| Message Chain | Hide Delegate |
| Data Clumps | Extract Class (Value Object) |
| Refused Bequest | Replace Inheritance with Delegation |
| Inappropriate Intimacy | Move Method, encapsulate field |

---

## Testing Quick Reference

| JUnit 5 | Purpose |
|----------|---------|
| `@Test` | Test method |
| `@BeforeEach` / `@AfterEach` | Setup/teardown per test |
| `@ParameterizedTest` + `@CsvSource` | Data-driven test |
| `assertEquals(expected, actual)` | Check equality |
| `assertThrows(Exception.class, lambda)` | Check exception |
| `@Nested` | Group related tests |

| Mockito | Purpose |
|---------|---------|
| `mock(Class.class)` | Create mock |
| `when(...).thenReturn(...)` | Define behaviour |
| `verify(mock).method(...)` | Check interaction |
| `any()`, `anyInt()` | Flexible matchers |

---

## Build Tool Commands

| Action | Maven | Gradle |
|--------|-------|--------|
| Build + Test | `mvn package` | `gradle build` |
| Test only | `mvn test` | `gradle test` |
| Clean | `mvn clean` | `gradle clean` |
| Run | `mvn exec:java` | `gradle run` |
| Deps tree | `mvn dependency:tree` | `gradle dependencies` |
