---
title: "Exam Traps"
order: 91
moduleTitle: "COMP2042 - Maintainable Software"
tags: ["exam tips", "common mistakes", "pitfalls"]
---

# Exam Traps - Common Mistakes

## SOLID Principles

| Trap | Correct Understanding |
|------|----------------------|
| "SRP means a class should have one method" | SRP means one *reason to change* (one responsibility/actor) |
| "OCP means never change existing code" | OCP means design so *new features* don't require modifying existing code (via abstraction) |
| "LSP just means you can use inheritance" | LSP means the *behavioural contract* must be preserved (preconditions, postconditions, invariants) |
| "ISP means every interface has one method" | ISP means clients should not *depend on* methods they don't use |
| "DIP means don't use concrete classes at all" | DIP means high-level *policy* shouldn't depend on low-level *details*. Concrete classes are fine for value objects |

## Design Pattern Traps

| Trap | Correct |
|------|---------|
| "Singleton is always the best choice for shared state" | Singleton creates hidden dependencies, makes testing hard, consider DI instead |
| "Factory Method and Abstract Factory are the same" | Factory Method uses *inheritance* (subclass overrides), Abstract Factory uses *composition* (inject factory object) |
| "Decorator and inheritance achieve the same thing" | Decorator works at *runtime* and can be *combined*; inheritance is fixed at compile time |
| "Strategy and State are identical in structure" | Structurally similar but: Strategy is set by client, States transition *themselves* |
| "Observer always uses inheritance" | Can use interfaces, lambdas, or functional interfaces in modern Java |
| "MVC means the View never talks to the Model" | In classic MVC, View *observes* Model directly. In MVP, View is passive |
| "Adapter changes the adaptee's code" | Adapter wraps without modifying; it's a *bridge* between interfaces |
| "Facade replaces the subsystem" | Facade *simplifies* access; subsystem classes remain accessible if needed |

## Refactoring Traps

| Trap | Correct |
|------|---------|
| "Refactoring means rewriting from scratch" | Refactoring is *incremental structural improvement* with no behaviour change |
| "You can refactor without tests" | Tests are essential to verify behaviour is preserved |
| "Comments are always a code smell" | *Excessive* comments compensating for unclear code are a smell. Intent/API docs are fine |
| "Extracting a method always improves code" | Only if the extracted method has a clear name and single purpose |
| "Feature Envy means a class has too many features" | Feature Envy means a method *envies* another class's data (uses its fields more than its own) |
| "God Class = large file" | God Class = too many *responsibilities*, not just lines of code |

## Testing Traps

| Trap | Correct |
|------|---------|
| "100% coverage means no bugs" | Coverage only measures *execution*, not *correctness* of assertions |
| "Mock everything" | Only mock external dependencies and slow/non-deterministic things |
| "Test private methods directly" | Test through public interface; if you need to test private, it may need extraction |
| "`@BeforeAll` runs before each test" | `@BeforeAll` runs once; `@BeforeEach` runs before each test |
| "Unit tests should test multiple classes together" | That's *integration* testing; unit tests isolate one class |
| "Parameterized tests replace regular tests" | Parameterized tests cover data variations; still need explicit tests for edge cases/readability |

## UML Traps

| Trap | Correct |
|------|---------|
| "Aggregation and Composition are the same" | Aggregation: part *can* exist independently. Composition: part *cannot* exist without whole |
| "Arrow points to the subclass" | Inheritance arrow (triangle) points *to the parent/interface* |
| "Association means inheritance" | Association = "uses/knows". Inheritance = "is-a" |
| "Dependency is the strongest relationship" | Dependency is the *weakest* (temporary usage). Composition/Inheritance are strongest |

## Java/OOP Traps

| Trap | Correct |
|------|---------|
| "Abstract class = interface" | Abstract class can have state + implemented methods; interface (pre-default methods) only contracts |
| "Polymorphism requires inheritance" | Interface implementation is also polymorphism (preferred in many cases) |
| "Encapsulation just means private fields" | Encapsulation = hiding *implementation details* and exposing a stable interface |
| "Coupling is always bad" | *Some* coupling is necessary; aim for loose coupling through abstractions |
| "High cohesion means classes should be large" | High cohesion means a class's elements are *closely related* to one purpose |

## Build/VCS Traps

| Trap | Correct |
|------|---------|
| "Maven and Gradle do the same thing identically" | Different config formats (XML vs Groovy), Gradle is more flexible and faster |
| "`mvn install` deploys to production" | `install` puts artifact in *local* repo; `deploy` pushes to *remote* repo |
| "Git commit saves to the server" | `commit` is local; `push` sends to remote |
| "CI and CD are the same" | CI = continuous integration (build + test). CD = continuous delivery/deployment |

---

## Pattern Identification Exam Strategy

When asked "which pattern is this?":

1. **Count the key classes** - how many abstractions?
2. **Look at the relationship** - inheritance vs composition?
3. **Check the intent** - creating objects? structuring? communicating?
4. **Watch for distinguishing features:**

| If you see... | It's probably... |
|---------------|-----------------|
| Private constructor + static getInstance() | Singleton |
| Abstract method returning a product type | Factory Method |
| Multiple create methods in one interface | Abstract Factory |
| Method chaining with return `this` | Builder |
| Wrapping object with same interface | Decorator |
| Wrapping object with *different* interface | Adapter |
| Simplified interface to complex subsystem | Facade |
| Tree with leaves and composites sharing interface | Composite |
| Interchangeable algorithm via interface + setter | Strategy |
| Subject with list of observers, notify() method | Observer |
| Context delegates to state object, state changes itself | State |
| Abstract class with final method calling abstract steps | Template Method |

<details>
<summary>Practice: Exam-style multiple choice</summary>

**Q1:** Which statement about the Liskov Substitution Principle is TRUE?
- A) Subclasses can strengthen preconditions
- B) Subclasses can weaken postconditions
- C) Subclasses must honour the parent's behavioural contract
- D) LSP only applies to abstract classes

**Answer: C.** Subclasses cannot strengthen preconditions or weaken postconditions.

---

**Q2:** What distinguishes the State pattern from Strategy?
- A) State uses interfaces, Strategy uses abstract classes
- B) In State, transitions are managed by state objects themselves
- C) Strategy has more classes
- D) State can only have two states

**Answer: B.** State objects manage their own transitions; in Strategy, the client sets the algorithm.

---

**Q3:** Which is NOT a valid reason to use the Decorator pattern?
- A) Adding responsibilities dynamically at runtime
- B) Avoiding class explosion from many feature combinations
- C) Converting one interface to another
- D) Stacking multiple behaviours on a single object

**Answer: C.** Converting interfaces is Adapter, not Decorator.

</details>
