---
title: "Exam Traps"
order: 91
moduleTitle: "COMP3033 - Software Quality Assurance"
tags: ["exam", "common-mistakes", "traps", "pitfalls"]
---

## Common Exam Traps

### 1. Fault / Error / Failure Confusion

| Trap | Correct |
|------|---------|
| "A fault always causes a failure" | No — a fault must be reached (executed), cause an infection (incorrect state), propagate to output, and be revealed |
| "Error and failure are the same thing" | Error = incorrect internal state; Failure = externally observable wrong output |
| "If output is correct, there's no fault" | The fault may exist but not be triggered by that particular input |
| "A test that passes proves no bugs" | It only proves no bug for that specific input — the fault may exist on untested paths |

### 2. Testing Levels Mistakes

| Trap | Correct |
|------|---------|
| "Unit testing catches integration bugs" | Unit tests test in isolation — interface mismatches only appear at integration level |
| "System testing replaces unit testing" | Each level catches different defect types; they complement, not replace |
| "Acceptance testing is done by developers" | Acceptance testing is done by or with the customer/end user |
| "More testing = no defects" | Testing shows presence of defects, cannot prove absence (Dijkstra) |

### 3. Cyclomatic Complexity Errors

| Trap | Correct |
|------|---------|
| "Count the number of paths through the code" | Count **linearly independent** paths only. Total paths can be much higher. |
| "M = E - N + 2P where P = predicates" | P in the formula = number of **connected components** (usually 1 for a single method). For predicates: M = predicates + 1 |
| "A method with M=3 needs exactly 3 tests" | M is the **minimum** for basis path coverage. You may need more for other criteria. |
| "Loops don't affect complexity" | Each loop condition is a predicate node and increases M by 1 |

### 4. Test Design Technique Confusion

| Trap | Correct |
|------|---------|
| "BVA replaces equivalence partitioning" | BVA supplements it — first partition, then test boundaries of each partition |
| "One test per partition is always sufficient" | For base coverage yes, but BVA adds boundary tests within each partition |
| "White-box testing doesn't need expected outputs" | ALL tests need expected outputs (oracle). White-box determines which paths to cover. |
| "100% statement coverage = no bugs" | Statement coverage doesn't test all condition combinations or boundary cases |

### 5. JUnit / TDD Mistakes

| Trap | Correct |
|------|---------|
| "In TDD, write all tests first" | Write ONE failing test, make it pass, refactor. One at a time. |
| "`@BeforeAll` runs before each test" | `@BeforeAll` runs once before all tests. `@BeforeEach` runs before each test. |
| "Parameterized tests are separate test methods" | One test method, multiple data inputs — same logic, different values |
| "TDD means you don't need design" | TDD drives emergent design but you still need upfront architectural thinking |

### 6. Security Testing Traps

| Trap | Correct |
|------|---------|
| "SAST finds all vulnerabilities" | SAST lacks runtime context — can't detect broken access control or business logic flaws |
| "Input sanitisation (blocklist) is secure" | Blocklists can be bypassed. Parameterised queries are secure by design. |
| "DAST can pinpoint the vulnerable line" | DAST only sees external behaviour — it confirms exploitability but can't locate the exact code |
| "SCA only matters for open-source projects" | Any project using third-party libraries (virtually all) needs SCA |

### 7. Performance Testing Traps

| Trap | Correct |
|------|---------|
| "Load testing and stress testing are the same" | Load verifies NFRs at expected load; stress finds the breaking point by exceeding capacity |
| "If it works at 100 users it works at 1000" | Latency is non-linear — the hockey stick curve shows exponential degradation after saturation |
| "Performance testing only checks response time" | Also measures throughput (RPS) and error rate |
| "Memory leaks are found by load testing" | Memory leaks require **soak testing** (extended duration under normal load) |

### 8. Quality Models Traps

| Trap | Correct |
|------|---------|
| "ISO 25010 and McCall are the same" | McCall (1977) has 11 factors in 3 categories. ISO 25010 has 8 characteristics with 31 sub-chars. |
| "NFRs don't need to be testable" | Good NFRs must be specific and measurable (e.g., "response time < 500ms at 1000 users") |
| "Quality = no bugs" | Quality encompasses many attributes: usability, performance, security, maintainability, etc. |
| "ISO 25010 covers quality-in-use" | ISO 25010 = product quality. ISO 25019 = quality-in-use (context of actual use). |

### 9. SQA Management Traps

| Trap | Correct |
|------|---------|
| "SQA team writes the code" | SQA team provides oversight and assurance — the SE team builds the product |
| "SQA plan = project plan" | SQA plan covers quality activities; project plan covers development tasks. They coordinate. |
| "Defining coding standards is project-level" | Company-wide standards are **organisational** level infrastructure |
| "Choosing security as top priority is organisational" | Prioritising quality attributes for a specific app is **project** level |

### 10. Metrics Traps

| Trap | Correct |
|------|---------|
| "More LOC = more complex" | LOC doesn't measure logical complexity — cyclomatic complexity does |
| "High DIT is always bad" | Moderate DIT (2-5) enables reuse. Only extreme depth causes problems. |
| "Low CBO means good design" | Low CBO means low coupling (good), but classes still need to collaborate |
| "LCOM = 0 means perfect cohesion" | LCOM = 0 means all method pairs share at least one attribute — maximum cohesion |
