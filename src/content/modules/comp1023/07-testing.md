---
title: "Software Testing & V&V"
order: 7
moduleTitle: "COMP1023 - Software Engineering"
tags: ["software-engineering", "testing", "verification", "validation", "black-box", "white-box"]
---

## Verification vs Validation (V&V)

:::eli10

Verification asks "did we build it correctly?" (does it match the plan). Validation asks "did we build the right thing?" (does it make the customer happy). You can build something perfectly according to the plan, but if the plan was wrong, the customer still will not be happy.

:::

:::eli15

Verification checks that the system conforms to its specification (building the product right). Validation checks that the system meets the actual user needs (building the right product). Verification uses reviews, inspections, and walkthroughs against requirements documents. Validation uses testing, prototyping, and user acceptance testing against customer expectations. Both are needed: a system can pass verification (meets spec) but fail validation (spec was wrong).

:::

:::eli20

| Aspect | Verification | Validation |
|--------|-------------|-----------|
| Question | "Are we building the product **right**?" | "Are we building the **right** product?" |
| Focus | Meets specification | Meets user needs |
| Methods | Reviews, inspections, walkthroughs | Testing, prototyping, user acceptance |
| Checks against | Requirements document | Customer expectations |
| When | Throughout development | Especially at end |

**Mnemonic:** Verification = specification-conformance; Validation = customer-satisfaction.

:::

---

## Testing Levels

:::eli10

Testing happens at different zoom levels. Unit testing checks one tiny piece (like testing one LEGO brick works). Integration testing checks that pieces fit together. System testing checks the whole thing end-to-end. Acceptance testing is when the customer checks if they are happy with it.

:::

:::eli15

Software testing is organised in levels of increasing scope. Unit testing checks individual methods or classes in isolation. Integration testing checks that combined modules work together correctly at their interfaces. System testing validates the complete system end-to-end. Acceptance testing is performed by the customer to verify fitness for purpose. Integration strategies include big-bang (all at once), top-down (using stubs), bottom-up (using drivers), and sandwich (both directions).

:::

:::eli20

| Level | Scope | Performed By | Tests |
|-------|-------|-------------|-------|
| **Unit** | Individual method/class | Developer | Single component in isolation |
| **Integration** | Combined modules | Developer/Tester | Interfaces between components |
| **System** | Complete system | Test team | End-to-end functionality |
| **Acceptance** | Business requirements | Customer/User | Fitness for purpose |

### Integration Testing Strategies

| Strategy | Approach | Advantage | Disadvantage |
|----------|----------|-----------|--------------|
| Big Bang | All at once | Simple | Hard to isolate faults |
| Top-down | Start from top, stub lower | Tests architecture early | Stubs needed |
| Bottom-up | Start from bottom, use drivers | Tests foundations first | UI tested last |
| Sandwich | Both directions | Balanced | Complex to manage |

:::

---

## Black-Box vs White-Box Testing

:::eli10

Black-box testing is when you test something without looking inside -- you only check if the right input gives the right output, like testing a vending machine by pressing buttons. White-box testing is when you look at the code inside and make sure every path and branch is tested.

:::

:::eli15

Black-box testing treats the system as opaque and tests based only on specifications (what should it do?). White-box testing examines the internal code structure and ensures adequate coverage of statements, branches, and paths. Black-box techniques include equivalence partitioning (dividing inputs into classes), boundary value analysis (testing at edges), and decision tables. White-box techniques measure statement, branch, condition, and path coverage.

:::

:::eli20

| Aspect | Black-Box | White-Box |
|--------|-----------|-----------|
| Also called | Functional, specification-based | Structural, code-based |
| Knowledge of code | None (treats as opaque) | Full (examines internals) |
| Based on | Requirements/specifications | Source code structure |
| Who performs | Testers (no code access needed) | Developers |
| Finds | Missing functionality, interface errors | Logic errors, dead code |

### Black-Box Techniques

| Technique | Description | Example |
|-----------|-------------|---------|
| **Equivalence Partitioning** | Divide inputs into valid/invalid classes; test one from each | Age field: <0, 0-17, 18-65, 66-120, >120 |
| **Boundary Value Analysis** | Test at edges of partitions | For range 1-100: test 0, 1, 2, 99, 100, 101 |
| **Decision Tables** | Map condition combinations to actions | Login: valid/invalid user + valid/invalid password |
| **State Transition** | Test state changes | Account: Active→Locked after 3 failed logins |

### Equivalence Partitioning Example

For a field accepting ages 18-65:

| Partition | Values | Expected Result | Test Value |
|-----------|--------|----------------|-----------|
| Invalid (below) | < 18 | Rejected | 10 |
| Valid | 18-65 | Accepted | 30 |
| Invalid (above) | > 65 | Rejected | 80 |
| Invalid (non-numeric) | "abc" | Error | "abc" |
| Invalid (negative) | < 0 | Error | -5 |

### Boundary Value Analysis Example

For the same age field (18-65):

| Boundary | Test Values | Why |
|----------|-------------|-----|
| Lower boundary | 17, **18**, 19 | Just below, at, just above minimum |
| Upper boundary | 64, **65**, 66 | Just below, at, just above maximum |

### White-Box Techniques

| Technique | Coverage Target | Description |
|-----------|----------------|-------------|
| **Statement coverage** | Every statement executed at least once | Weakest criterion |
| **Branch/Decision coverage** | Every branch (true/false) taken | Tests both paths of every if |
| **Condition coverage** | Every boolean sub-expression both T/F | Individual conditions in compound expressions |
| **Path coverage** | Every possible path through code | Strongest (often impractical) |

### Coverage Hierarchy

```
Path Coverage (strongest, impractical)
    ↑
Condition Coverage
    ↑
Branch/Decision Coverage
    ↑
Statement Coverage (weakest, minimum)
```

### White-Box Example

```java
void process(int x, int y) {
    if (x > 0 && y > 0) {    // Branch 1
        doA();
    } else {
        doB();
    }
    if (x + y > 10) {         // Branch 2
        doC();
    }
}
```

| Coverage Goal | Test Cases Needed |
|--------------|-------------------|
| Statement | (x=5, y=5) hits doA and doC; (x=-1, y=0) hits doB → 2 tests |
| Branch | Need true AND false for each branch: (5,5), (-1,0), (5,1) → 3 tests |
| Condition | Need x>0 T/F, y>0 T/F, x+y>10 T/F → may need 4+ tests |

:::

---

## Test Types (Beyond Levels)

:::eli10

Beyond the basic levels, there are special types of testing. Regression testing re-runs old tests after changes to make sure nothing broke. Performance testing checks if the system is fast enough. Security testing looks for vulnerabilities. Smoke testing is a quick check that basic things work at all.

:::

:::eli15

Beyond the four testing levels, specialised test types address specific concerns. Regression testing ensures changes do not break existing functionality. Smoke testing provides a quick sanity check. Performance, load, and stress testing examine behaviour under various demands. Security testing identifies vulnerabilities. Usability testing evaluates ease of use. Exploratory testing relies on tester intuition to find unexpected issues.

:::

:::eli20

| Type | Purpose | Example |
|------|---------|---------|
| **Regression** | Ensure changes don't break existing | Re-run tests after bug fix |
| **Smoke** | Basic sanity check | Can system start? Login work? |
| **Performance** | Check speed/throughput | Response time under load |
| **Load** | Behaviour under expected load | 1000 concurrent users |
| **Stress** | Behaviour beyond capacity | 10x expected load |
| **Security** | Find vulnerabilities | SQL injection, XSS |
| **Usability** | Ease of use | Task completion time |
| **Exploratory** | Unscripted, investigative | Tester's intuition & creativity |

:::

---

## Test Case Design

:::eli10

A test case is a written plan for one specific test. It says what to do step by step, what should happen, and whether it passed or failed. It is like a recipe card: ingredients (preconditions), steps (actions), and what the dish should look like (expected result).

:::

:::eli15

A well-structured test case has a unique ID, descriptive title, preconditions (required starting state), numbered steps to execute, expected results, and fields for recording actual results and pass/fail status. Good test cases are repeatable, independent, and trace back to specific requirements. They form the foundation of systematic testing.

:::

:::eli20

| Component | Description | Example |
|-----------|-------------|---------|
| **ID** | Unique identifier | TC-LOGIN-001 |
| **Title** | Brief description | Valid login with correct credentials |
| **Preconditions** | Required state before test | User account exists, user is on login page |
| **Steps** | Actions to perform | 1. Enter email 2. Enter password 3. Click Login |
| **Expected Result** | What should happen | Redirected to dashboard, welcome message shown |
| **Actual Result** | What actually happened | (filled during execution) |
| **Status** | Pass/Fail/Blocked | Pass |

:::

---

## Testing in Agile

:::eli10

In Agile, testing is not saved for the end. Test-Driven Development (TDD) means you write the test FIRST (it fails because you have not built the feature yet), then build the feature to make the test pass. The test pyramid says: lots of small fast tests, fewer medium tests, and very few big slow tests.

:::

:::eli15

Agile integrates testing throughout development rather than treating it as a phase at the end. TDD (Test-Driven Development) writes tests before code: write a failing test, implement just enough to pass, then refactor. Continuous Integration runs all tests automatically on every commit. The test pyramid recommends many fast unit tests at the base, fewer integration tests in the middle, and minimal slow end-to-end tests at the top. The Definition of Done includes "all tests pass."

:::

:::eli20

| Practice | Description |
|----------|------------|
| TDD (Test-Driven Development) | Write test first → run (fail) → implement → run (pass) → refactor |
| Continuous Integration | Automated tests run on every commit |
| Definition of Done | Includes "all tests pass" |
| Test Pyramid | Many unit tests, fewer integration, fewest E2E |

### Test Pyramid

```
        /  E2E/UI  \        ← Few, slow, expensive
       /   Tests    \
      /──────────────\
     / Integration    \     ← Medium number
    /    Tests         \
   /────────────────────\
  /     Unit Tests       \  ← Many, fast, cheap
 /________________________\
```

:::

---

## Practice Questions

:::eli20

<details>
<summary>Q: Apply equivalence partitioning and boundary value analysis to a password field that requires 8-20 characters, at least one uppercase, one lowercase, and one digit.</summary>

**Equivalence Partitions:**

| Partition | Example | Expected |
|-----------|---------|----------|
| Valid (meets all rules) | "Password1" (9 chars) | Accept |
| Too short (< 8) | "Pass1" (5 chars) | Reject |
| Too long (> 20) | "Abcdefghijklmnop12345" (21 chars) | Reject |
| No uppercase | "password1" | Reject |
| No lowercase | "PASSWORD1" | Reject |
| No digit | "Password" | Reject |
| Empty | "" | Reject |

**Boundary Values (length):**

| Test | Length | Example | Expected |
|------|--------|---------|----------|
| Below min | 7 | "Passwrd1" (adjust to 7) | Reject |
| At min | 8 | "Passwd1a" (force valid) | Accept |
| Above min | 9 | "Passwd12a" | Accept |
| Below max | 19 | Valid 19-char string | Accept |
| At max | 20 | Valid 20-char string | Accept |
| Above max | 21 | Valid 21-char string | Reject |
</details>

<details>
<summary>Q: What is the difference between statement coverage and branch coverage? Give an example where 100% statement coverage does NOT achieve 100% branch coverage.</summary>

**Statement coverage:** Every line of code is executed at least once.
**Branch coverage:** Every decision point (if/else) takes both true and false paths.

**Example:**
```java
void discount(int age) {
    double rate = 0;
    if (age >= 65) {
        rate = 0.2;  // senior discount
    }
    applyDiscount(rate);
}
```

- **Test: age = 70** → Executes `rate = 0`, enters if (`rate = 0.2`), calls `applyDiscount(0.2)`
- This achieves **100% statement coverage** (all lines executed)
- But only **50% branch coverage** - the `else` path (age < 65, skipping the if body) is never tested
- Need **age = 30** to test the false branch
</details>

<details>
<summary>Q: Explain why "testing can show the presence of bugs but not their absence" (Dijkstra).</summary>

Testing is inherently **incomplete** because:

1. **Exhaustive testing is impossible** - even a simple function with two 32-bit integer inputs has 2^64 (~18 quintillion) possible input combinations
2. **Tests only cover tested scenarios** - passing all tests proves those specific cases work, not all cases
3. **Environment variations** - different OS, hardware, timing, concurrency can expose bugs tests miss
4. **Tests reflect assumptions** - if the tester has the same misunderstanding as the developer, the bug won't be caught

Therefore, passing all tests increases **confidence** but never provides **proof** of correctness. Formal verification (mathematical proof) is needed for absence-of-bugs guarantees, but is impractical for most software.
</details>

:::
