---
title: "Flashcards"
order: 92
moduleTitle: "COMP3033 - Software Quality Assurance"
tags: ["flashcards", "revision", "Q&A"]
---

## Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | What are the two QA strategies? | Defect prevention (process-oriented, stop defects entering) and defect detection (product-oriented, find and remove defects) |
| 2 | Define Verification vs Validation. | Verification: "Are we building the product right?" (process, reviews). Validation: "Are we building the right product?" (product, testing against user needs) |
| 3 | What is the Fault → Error → Failure chain? | Fault (static defect in code) → Error (incorrect internal state at runtime) → Failure (externally observable wrong behaviour) |
| 4 | Why can't testing prove the absence of bugs? | Testing can only show the presence of defects, not their absence. Exhaustive testing of all inputs is impossible (Dijkstra's observation). |
| 5 | What is equivalence partitioning? | Dividing the input domain into classes where all values in a class are expected to behave equivalently, then testing one representative from each |
| 6 | What is boundary value analysis? | Testing at the edges of equivalence partitions (min, min+1, max-1, max) where defects are most likely to occur |
| 7 | How do you calculate cyclomatic complexity? | M = E - N + 2 (edges minus nodes plus 2), or M = P + 1 (predicate nodes plus 1), or count regions in CFG |
| 8 | What does cyclomatic complexity tell you? | The minimum number of linearly independent paths through the code — the minimum test cases needed for basis path coverage |
| 9 | What is the RIPR model? | Reachability (execute the fault), Infection (create incorrect state), Propagation (state reaches output), Reveal (output differs from expected) |
| 10 | Name the three components of a test case. | Test inputs (values), expected output (oracle), and execution conditions (preconditions/environment) |
| 11 | What is a test fixture in JUnit? | Setup/teardown code that establishes a known environment before each test (`@BeforeEach` / `@AfterEach`) |
| 12 | What is TDD's Red-Green-Refactor cycle? | Red: write a failing test. Green: write minimal code to pass. Refactor: improve design without changing behaviour. |
| 13 | What is the difference between SAST and DAST? | SAST analyses source code statically (white-box, fast, false positives). DAST tests the running application dynamically (black-box, slower, fewer false positives). |
| 14 | What is SCA and why is it important? | Software Composition Analysis scans dependencies for known CVEs. Important because 80-90% of modern apps are third-party code. |
| 15 | How do prepared statements prevent SQL injection? | They separate SQL code from data — user input is always treated as literal data, never as executable SQL, regardless of content |
| 16 | What is the "shift left" principle? | Moving testing and security activities earlier in the SDLC to find defects when they're cheapest to fix |
| 17 | What is load testing vs stress testing? | Load: verify system handles expected load (meets NFRs). Stress: find the breaking point by exceeding capacity. |
| 18 | What is a soak test? | Running normal load for an extended period (24-48h) to find time-dependent issues like memory leaks |
| 19 | What is the hockey stick curve? | As load increases, latency stays flat until saturation ("the knee"), then increases exponentially |
| 20 | Name 3 McCall quality factors. | Any from: correctness, reliability, efficiency, integrity, usability, maintainability, testability, flexibility, portability, reusability, interoperability |
| 21 | What distinguishes organisational vs project level SQA? | Organisational: company-wide policies/processes/standards. Project: specific quality plan for one project. |
| 22 | What is WMC (Weighted Methods per Class)? | Sum of cyclomatic complexities of all methods in a class — measures class complexity |
| 23 | What is CBO (Coupling Between Objects)? | Count of classes that a class is coupled to — higher CBO means harder to maintain and test |
| 24 | What is LCOM (Lack of Cohesion of Methods)? | Measures how unrelated the methods of a class are — high LCOM suggests the class should be split |
| 25 | What are the three activities SQA performs for each development phase? | Action (test current artifacts), Design (prepare future tests), Influence (improve subsequent development) |
