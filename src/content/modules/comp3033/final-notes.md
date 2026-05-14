---
title: "Final Notes (Cheat Sheet)"
order: 97
moduleTitle: "COMP3033 - Software Quality Assurance"
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

## SIDE 1: TESTING FUNDAMENTALS & TEST DESIGN

### Software Quality Definitions

| Definition | Author | Perspective |
|-----------|--------|-------------|
| "Conformance to requirements" | Crosby (1979) | Producer (developer) |
| "Fitness for use" | Juran (1970) | Consumer (user) |

**V&V:** Verification = "building the product right?" (spec-checking). Validation = "building the right product?" (user needs).

**SQA Three Pillars:** Right product (fits user needs) + Done right (follows standards) + Managed right (on time, on budget)

---

### Fault - Error - Failure Chain

| Term | Definition | Example |
|------|-----------|---------|
| **Fault** | Static defect in code | `i <= 5` instead of `i < 5` |
| **Error** | Incorrect internal state at runtime | Variable holds wrong value |
| **Failure** | Observable wrong external behaviour | User sees incorrect output |

**Causal chain:** Fault $\to$ Error $\to$ Failure. Not every fault causes a failure (may not be reached).

---

### Testing Levels (V-Model)

| Level | Tests... | Done by | V-Model phase |
|-------|----------|---------|---------------|
| Unit | Individual methods | Developers | Implementation |
| Integration | Module interfaces | Dev/QA | System design |
| System | Full system vs requirements | QA team | System requirements |
| Acceptance | Software vs user needs | QA + users | User requirements |
| Regression | Updates don't break existing | Dev/QA | Maintenance |

**Key principle:** Testing can show presence of failures, NEVER their absence (Dijkstra).

---

### RIPR Model

| Step | Name | Meaning | JUnit Mapping |
|------|------|---------|---------------|
| 1 | **Reach** | Execution reaches faulty code | `@BeforeEach` (fixture) |
| 2 | **Infect** | Fault causes incorrect state | Test input values |
| 3 | **Propagate** | Error reaches observable output | Postfix values |
| 4 | **Reveal** | Tester notices wrong output | `assert...()` methods |

---

### Input Domain Partitioning

**Principle:** Divide inputs into equivalence classes; one test per class should suffice.

| Approach | Based on | Quality |
|----------|----------|---------|
| Interface-based | Individual parameter ranges | Simpler, less thorough |
| Functionality-based | What code does (output classes) | Better tests, needs domain knowledge |

**Boundary Value Analysis (BVA):** Test at boundaries where off-by-one errors occur. For boundary $b$: test just below, at, just above $b$.

Example: valid range [4, 10] $\to$ test: 3, 4, 5, 9, 10, 11

---

### Control Flow Graphs & Cyclomatic Complexity

**CFG:** Statements $\to$ nodes; branches $\to$ edges. Path = sequence of nodes from start to end.

**Cyclomatic Complexity:**

$$M = E - N + 2 \quad \text{or} \quad M = P + 1$$

- $E$ = edges, $N$ = nodes, $P$ = predicate (branching) nodes
- $M$ = minimum number of linearly independent paths
- **Quality rule:** methods with $M > 10$ should be refactored

**Basis Path Testing Workflow:**
1. Draw CFG from code
2. Calculate $M$
3. Derive $M$ linearly independent paths (each path covers at least one new edge/node)
4. Design test inputs to force each path

---

### TDD & Agile

**TDD Cycle:** Write ONE failing test $\to$ Write minimum code to pass $\to$ Refactor $\to$ Repeat

**Key principles:** Tests first, minimal code, tests = specification + evaluation, coverage critical

**User Story format:** "As a [role], I want [feature], so that [benefit]"

**CI:** Push to repo $\to$ CI server builds + runs tests $\to$ Immediate feedback on failures

---

## SIDE 2: SECURITY, PERFORMANCE, METRICS & MANAGEMENT

### Automated Security Testing Triad

| Technique | Tests | Box | When | Speed | Finds |
|-----------|-------|-----|------|-------|-------|
| **SAST** | Source code | White | Commit | Fast | SQL injection, hardcoded secrets (many FPs) |
| **SCA** | Dependencies | Black | Build | Fast | Known CVEs in third-party libs |
| **DAST** | Running app | Black | Deploy | Slow | XSS, broken access control (low FPs) |

**SAST** cannot tell if flaw is reachable. **DAST** cannot pinpoint exact line. **SCA** is critical (apps are 80-90% third-party code).

---

### SQL Injection

**Vulnerable:** `"SELECT * FROM users WHERE id = '" + userId + "'"`

**Secure (parameterised query):**
```java
String q = "SELECT * FROM users WHERE id = ?";
PreparedStatement ps = conn.prepareStatement(q);
ps.setString(1, userId);
```

Sanitisation (blocklist) is fragile and bypassable. Parameterised queries are secure by design.

---

### OWASP Top 10 (2021)

| # | Risk | Key Point |
|---|------|-----------|
| A01 | Broken Access Control | Users act outside permissions |
| A02 | Cryptographic Failures | Sensitive data exposure |
| A03 | Injection | SQL, OS, LDAP injection |
| A04 | Insecure Design | Missing security controls |
| A05 | Security Misconfiguration | Default configs, verbose errors |
| A06 | Vulnerable Components | Outdated third-party libs |
| A07 | Auth Failures | Broken authentication |
| A08 | Data Integrity Failures | Untrusted deserialization |
| A09 | Logging Failures | Insufficient monitoring |
| A10 | SSRF | Server-Side Request Forgery |

---

### Performance Testing

**Key Metrics:** Latency (response time per request), Throughput (requests/second), Error rate (% failures)

| Type | Goal | Method |
|------|------|--------|
| **Load** | Verify NFRs at expected load | Simulate expected users |
| **Stress** | Find breaking point | Ramp beyond capacity |
| **Soak** | Find time-dependent issues (memory leaks) | Normal load for 24-48h |

**Hockey stick curve:** Latency flat until saturation ("the knee"), then exponential rise.

---

### Quality Models

**McCall (1977):** 3 categories, 11 factors: Operation (correctness, reliability, efficiency, integrity, usability) + Revision (maintainability, flexibility, testability) + Transition (portability, reusability, interoperability)

**ISO/IEC 25010 Product Quality (8 characteristics):** Functional suitability, Performance efficiency, Compatibility, Usability, Reliability, Security, Maintainability, Portability

**ISO/IEC 25019 Quality in Use (5):** Effectiveness, Efficiency, Satisfaction, Freedom from risk, Context coverage

**Writing good NFRs:** Must be specific, measurable, verifiable. Bad: "system should be fast". Good: "dashboard renders in < 2s for 95% of requests under 500 concurrent users."

---

### Software Metrics

**C&K OO Metrics Suite:**

| Metric | Measures | High value means... |
|--------|----------|-------------------|
| WMC | $\sum$ method complexities | Hard to maintain, less reusable |
| DIT | Inheritance depth | More reuse but harder to predict |
| NOC | Number of subclasses | More reuse but diluted abstraction |
| CBO | Coupling to other classes | Decreased reusability, ripple effects |
| RFC | Methods callable in response | Greater testing effort |
| LCOM | Method pairs NOT sharing fields | Multiple abstractions; split the class |

**Goal:** Low coupling (between classes) + High cohesion (within a class)

**LOC limitations:** Style-dependent, language-dependent, doesn't measure logical complexity

---

### SQA Management

| Level | Focus | Example |
|-------|-------|---------|
| **Organisational** | Company-wide infrastructure | Define coding standards, quality policy |
| **Project** | Specific project quality plan | Choose security as top priority for app X |

**SQA Plan structure:** Purpose, references, process, config management, problem reporting, tools, SCM, testing methodology, records

**SQA Team:** Independent from SE team. Responsibilities: create SQA plan, ensure standards, review artifacts, control change, measure metrics, perform audits, report.

**Integration per phase:** Action (test current phase) + Design (prepare future tests) + Influence (improve next phase)

---

### JUnit 5 Quick Reference

| Annotation | Purpose |
|-----------|---------|
| `@Test` | Marks a test method |
| `@BeforeEach` | Runs before EACH test |
| `@AfterEach` | Runs after EACH test |
| `@BeforeAll` | Runs once before ALL tests (static) |
| `@ParameterizedTest` + `@CsvSource` | Data-driven tests |

**Asserts:** `assertEquals`, `assertTrue`, `assertFalse`, `assertNull`, `assertThrows`, `assertArrayEquals`, `fail`

**Espresso (Android):** Match (find element) $\to$ Act (perform action) $\to$ Assert (verify result)

---

### CI/CD Pipeline

```
Commit → Build → Unit Tests + SAST → SCA → UI/DAST + Perf → Deploy → Monitor
```

**Shift Left:** Find defects early; cost increases exponentially in later phases.

**DevSecOps:** Security is everyone's responsibility; automate for fast feedback; make secure path the easiest path.
