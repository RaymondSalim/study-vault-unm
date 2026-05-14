---
title: "Final Notes (Cheat Sheet)"
order: 97
moduleTitle: "COMP2042 - Maintainable Software"
tags: ["exam", "cheat-sheet", "final-notes"]
---

<style>
@media print {
  .print-btn, .prev-next, .module-nav, .global-nav, nav, .mobile-menu-btn, .sidebar-overlay, .search-modal {
    display: none !important;
  }
  .module-wrapper {
    display: block !important;
  }
  .module-content {
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    columns: 2;
    column-gap: 1.5em;
    font-size: 8pt;
    line-height: 1.25;
    color: #000;
  }
  .module-content h2 {
    font-size: 11pt;
    margin: 0.3em 0 0.15em;
    border-bottom: 1.5px solid #000;
    column-span: all;
    break-after: avoid;
  }
  .module-content h3 {
    font-size: 9pt;
    margin: 0.3em 0 0.1em;
    break-after: avoid;
  }
  .module-content table {
    border-collapse: collapse;
    width: 100%;
    margin: 0.2em 0;
    font-size: 7.5pt;
  }
  .module-content th, .module-content td {
    border: 1px solid #999;
    padding: 1px 3px;
    text-align: left;
  }
  .module-content th {
    background: #eee !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content hr {
    margin: 0.3em 0;
    border: none;
    border-top: 1px dashed #999;
  }
  .module-content ul, .module-content ol {
    margin: 0.15em 0;
    padding-left: 1.1em;
  }
  .module-content li {
    margin: 0.05em 0;
  }
  .module-content p {
    margin: 0.15em 0;
  }
  .module-content code {
    font-size: 7pt;
    background: #f0f0f0;
    padding: 0.5px 2px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content .katex {
    font-size: 0.9em;
  }
  @page {
    size: A4;
    margin: 0.8cm;
  }
}
</style>

<button class="print-btn" onclick="window.print()" style="background:#7aa2f7;color:#1a1b26;border:none;padding:0.5em 1.2em;border-radius:6px;cursor:pointer;font-weight:600;margin-bottom:1em;font-size:0.9rem;">Print Cheat Sheet</button>

## SIDE 1: PRINCIPLES, PATTERNS & DESIGN

### Software Maintenance Types

| Type | Purpose | % Effort |
|------|---------|----------|
| Corrective | Fix defects/bugs | ~20% |
| Adaptive | Adapt to environment changes (new OS/API) | ~25% |
| Perfective | Improve performance, add features | ~50% |
| Preventive | Restructure to prevent future problems | ~5% |

Maintenance = **60-80%** of total lifecycle cost.

**Lehman's Laws:** I: Must continually adapt or becomes unsatisfactory. II: Complexity increases unless actively reduced. VI: Functional content must grow to maintain satisfaction. VII: Quality declines unless rigorously maintained.

**Technical Debt:** Deliberate/Prudent ("know it's a shortcut"), Deliberate/Reckless ("no time for design"), Inadvertent/Prudent ("now we know better"), Inadvertent/Reckless ("what's layered architecture?")

---

### SOLID Principles

| Principle | One-liner | Violation Example |
|-----------|-----------|-------------------|
| **S** - Single Responsibility | One reason to change | Class handles auth + billing + logging |
| **O** - Open/Closed | Open for extension, closed for modification | Adding shape requires modifying AreaCalculator |
| **L** - Liskov Substitution | Subtypes substitutable for base types | Square extends Rectangle (setWidth breaks area) |
| **I** - Interface Segregation | Don't depend on unused interfaces | Robot forced to implement eat() and sleep() |
| **D** - Dependency Inversion | Depend on abstractions, not concretions | NotificationService creates `new EmailSender()` |

**SRP fix:** Extract classes (PayCalculator, EmployeeRepository, ReportGenerator)
**OCP fix:** Use interface + polymorphism (Shape interface with area())
**LSP fix:** Use common interface instead of inheritance
**ISP fix:** Split fat interface into focused ones (Workable, Feedable, Restable)
**DIP fix:** Constructor injection of interface (MessageSender)

---

### Coupling & Cohesion

**Coupling (aim: LOW)** — worst to best:

| Type | Description |
|------|-------------|
| Content | Modifies another's internals (reflection) |
| Common | Shared global data |
| Control | Flag parameter changes behaviour |
| Stamp | Passing whole object when one field needed |
| Data | Only passing necessary simple data |
| Message | Communicating via events only |

**Cohesion (aim: HIGH)** — worst to best:

| Type | Quality |
|------|---------|
| Coincidental | No relationship — Worst |
| Logical | Logically related but functionally different |
| Temporal | Related by timing |
| Procedural | Follow specific execution order |
| Communicational | Operate on same data |
| Sequential | Output of one = input of next |
| Functional | All contribute to single task — Best |

---

### GRASP Principles

| Principle | Guideline |
|-----------|-----------|
| Information Expert | Assign to class with most data to fulfil it |
| Creator | B creates A if B contains/aggregates/closely uses A |
| Controller | System event handling in non-UI class |
| Low Coupling | Minimise dependencies |
| High Cohesion | Keep classes focused |
| Polymorphism | Handle type variations via overriding |
| Pure Fabrication | Invent non-domain class for better design |
| Indirection | Use intermediate object to decouple |
| Protected Variations | Wrap instability behind interface |

---

### Design Patterns — Creational

| Pattern | Intent | Key Structure |
|---------|--------|---------------|
| **Singleton** | One instance only | Private constructor + static getInstance() |
| **Factory Method** | Defer creation to subclasses | Abstract creator + concrete creators |
| **Abstract Factory** | Families of related objects | Factory interface → concrete factories |
| **Builder** | Complex objects step by step | Builder with fluent methods + build() |

**Singleton:** Eager (thread-safe, simple) vs Lazy (double-checked locking). Cons: global state, hard to test, violates SRP.

**Factory Method vs Abstract Factory:**

| | Factory Method | Abstract Factory |
|-|---------------|-----------------|
| Creates | One product | Family of products |
| Mechanism | Inheritance (override) | Composition (inject factory) |

---

### Design Patterns — Structural

| Pattern | Intent | Key Structure |
|---------|--------|---------------|
| **Adapter** | Convert incompatible interface | Target interface + Adaptee + Adapter (wraps) |
| **Decorator** | Add behaviour dynamically | Component interface + ConcreteComponent + Decorator chain |
| **Facade** | Simplify complex subsystem | Single entry point coordinating subsystem classes |
| **Composite** | Treat individual/group uniformly | Component interface + Leaf + Composite (has children) |

**Decorator vs Inheritance:** Decorator = runtime, any combination, OCP. Inheritance = compile-time, class explosion. Java I/O = classic Decorator (BufferedInputStream wraps FileInputStream).

**Adapter:** Object adapter (composition, preferred in Java) vs Class adapter (multiple inheritance, not possible in Java).

---

### Design Patterns — Behavioural

| Pattern | Intent | Key Structure |
|---------|--------|---------------|
| **Strategy** | Swap algorithms at runtime | Context + Strategy interface + ConcreteStrategies |
| **Observer** | One-to-many notification | Subject (maintains list) + Observer.update() |
| **State** | Behaviour changes with internal state | Context + State interface + ConcreteStates |
| **Template Method** | Algorithm skeleton, steps deferred | Abstract class (final templateMethod) + concrete subclasses |

**Strategy vs State:**

| | Strategy | State |
|-|----------|-------|
| Who decides | Client sets strategy | States manage transitions internally |
| Awareness | Strategies independent | States know about each other |
| Analogy | GPS route choice | Traffic light changes |

**Strategy vs Template Method:**

| | Strategy | Template Method |
|-|----------|----------------|
| Mechanism | Composition (inject) | Inheritance (override) |
| Flexibility | Swap at runtime | Fixed at compile time |
| Coupling | Loose | Tight (inheritance) |

**Observer:** Push model (data sent with notification) vs Pull model (observer queries subject).

**Template Method:** `final` template method locks structure. Hook methods = optional overrides with defaults. Hollywood Principle: "don't call us, we'll call you."

---

## SIDE 2: REFACTORING, TESTING & GUI

### Code Smells & Refactoring

| Smell | Symptom | Refactoring |
|-------|---------|-------------|
| Long Method | > 20 lines | Extract Method |
| God Class | Too many responsibilities | Extract Class (SRP) |
| Long Parameter List | > 3-4 params | Introduce Parameter Object / Builder |
| Feature Envy | Uses other class's data more | Move Method |
| Switch Statements | Repeated type checking | Replace Conditional with Polymorphism |
| Duplicate Code | Same logic in multiple places | Extract Method/Class |
| Message Chain | a.getB().getC().doX() | Hide Delegate |
| Refused Bequest | Subclass ignores inherited methods | Replace Inheritance with Delegation |
| Divergent Change | One class changed for many reasons | Extract Class |
| Shotgun Surgery | One change → many classes modified | Move Method, Inline Class |
| Data Clumps | Groups always appear together | Extract Class |
| Dead Code | Unreachable/unused | Delete it |

**Refactoring workflow:** Tests pass → Identify smell → Choose technique → Small steps → Run tests → Commit

**Key rule:** Never refactor and add features simultaneously.

---

### Code Quality Metrics

| Metric | Measures | Good Value |
|--------|----------|------------|
| Cyclomatic Complexity | Independent paths: $M = E - N + 2P$ | < 10 per method |
| Coupling | Dependencies between modules | Low |
| Cohesion | Relatedness within module | High |
| Test Coverage | % code exercised by tests | > 80% |

**Practical CC rule:** Count decision points (if, while, for, case, &&, ||) + 1.

---

### Testing with JUnit 5

**AAA Pattern:** Arrange (setup) → Act (execute) → Assert (verify)

| Annotation | Purpose |
|------------|---------|
| `@Test` | Test method |
| `@BeforeEach` | Before each test |
| `@AfterEach` | After each test |
| `@BeforeAll` / `@AfterAll` | Once before/after all (static) |
| `@ParameterizedTest` | Multiple inputs |
| `@Nested` | Group tests in inner class |

**Key Assertions:** `assertEquals`, `assertTrue`, `assertNull`, `assertThrows(Exception.class, () -> ...)`, `assertAll(...)`

**Mockito:**
- `mock(Class.class)` — create mock
- `when(...).thenReturn(...)` — stub return
- `verify(mock).method(...)` — verify called
- `verify(mock, never())` — verify not called

**What to mock:** External services, DB, slow ops, non-deterministic (time/random). **Don't mock:** Class under test, simple value objects, data structures.

---

### TDD (Test-Driven Development)

| Step | Colour | Action |
|------|--------|--------|
| 1 | Red | Write failing test |
| 2 | Green | Minimum code to pass |
| 3 | Refactor | Improve, keep green |

---

### Build Tools

| Aspect | Maven | Gradle |
|--------|-------|--------|
| Config | `pom.xml` (XML) | `build.gradle` (Groovy/Kotlin) |
| Speed | Slower | Faster (incremental) |
| Convention | Over configuration | Flexible |

**Maven lifecycle:** validate → compile → test → package → verify → install → deploy

**CI Best Practices:** Commit frequently, builds < 10min, fix broken builds immediately, coverage > 80%

---

### MVC (Model-View-Controller)

| Component | Responsibilities | Knows About |
|-----------|-----------------|-------------|
| Model | Data, business logic, state | Nothing (independent) |
| View | Display, user input capture | Model (observes) |
| Controller | Input handling, coordination | Model + View |

**Flow:** User → Controller → Model (update) → View (refresh via observer)

**Key benefit:** Model fully testable without GUI. View swappable (desktop/web/mobile).

---

### MVP (Model-View-Presenter)

| Aspect | MVC | MVP |
|--------|-----|-----|
| View-Model link | View observes Model | View only talks to Presenter |
| View intelligence | Some logic | Passive ("dumb") |
| Testability | Moderate | High (view = mockable interface) |
| Data flow | Model notifies View | Presenter updates View explicitly |

**MVP advantage:** Presenter fully testable with mock view interface — no GUI needed.

---

### GUI Maintainability

**Problems:** Logic in event handlers (untestable), state in widgets (inconsistent), tight coupling to framework, God methods in handlers.

**Solution:** Thin event handlers that delegate to controller/presenter immediately.

```java
// BAD: Logic in handler
button.setOnAction(e -> { validate(); calculate(); save(); });

// GOOD: Delegate
button.setOnAction(e -> controller.handleCalculate());
```

**JavaFX Separation:** FXML (declarative view) + Controller class + Property binding (`label.textProperty().bind(model.property().asString())`)

**Testable architecture:** Model has zero GUI deps. View = passive mockable interface. Handlers = thin delegates. State in model.

---

### UML Class Relationships (weakest → strongest)

| Relationship | Arrow | Meaning |
|--------------|-------|---------|
| Dependency | dashed → | Uses temporarily |
| Association | solid → | Knows about |
| Aggregation | hollow diamond | Has-a (parts can exist alone) |
| Composition | filled diamond | Has-a (parts die with whole) |
| Inheritance | hollow triangle | Is-a |
| Realisation | dashed triangle | Implements interface |

**Design heuristic:** Favour composition over inheritance — more flexible, less coupling.

---

### Pattern Selection Guide

| Scenario | Pattern |
|----------|---------|
| Exactly one instance needed | Singleton |
| Create objects without specifying type | Factory Method |
| Families of related objects, swap themes | Abstract Factory |
| Many optional parameters, immutable | Builder |
| Integrate incompatible interface | Adapter |
| Add features dynamically without subclassing | Decorator |
| Simplify complex subsystem | Facade |
| Tree structures (files, menus) | Composite |
| Swap algorithms at runtime | Strategy |
| Notify multiple objects of changes | Observer |
| Object acts differently based on state | State |
| Same algorithm structure, different steps | Template Method |
| Separate data, display, control | MVC/MVP |
