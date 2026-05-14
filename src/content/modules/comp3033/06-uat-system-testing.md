---
title: "Agile, TDD & CI"
order: 6
moduleTitle: "COMP3033 - Software Quality Assurance"
tags: ["agile", "tdd", "test-driven-development", "continuous-integration", "user-stories", "yagni"]
---

## The Agile Philosophy

:::eli10

Traditional software building tries to plan everything perfectly upfront, like writing a detailed plan for a year-long project. But customers keep changing their minds! Agile says: instead of making a perfect plan, build something small and working quickly, show it to people, get feedback, and keep improving. It is like drawing a picture one section at a time and asking "is this right?" as you go.

:::

:::eli15

Traditional software engineering assumes early modelling and analysis can identify problems and minimise costs. In reality, customers often cannot fully express their needs and requirements keep changing. Agile acknowledges that software is "soft" -- change is inevitable. Core principles include: YAGNI (do not build what you do not need yet), prioritise a running system early, replace non-executable documents with executable tests, and accept that outdated models are worse than no models at all.

:::

:::eli20

### Why Agile?

Traditional software engineering assumes:
1. Modelling and analysis can identify problems early
2. This minimises cost of change

**Reality**: Customers can't fully express needs, keep changing requirements. Plans, specs, and models become outdated.

### Core Agile Principles

- Software is "soft" — changes happen
- Anticipating changes is futile (YAGNI: You Ain't Gonna Need It)
- Focus on a running system as early as possible
- Outdated models are worse than no models at all
- Replace non-executable artifacts with executable ones (tests)

:::

## Test-Driven Development (TDD)

:::eli10

TDD flips things backwards: you write the test FIRST (before writing the actual code!). It is like writing the answer key for a quiz before writing the quiz questions. Then you write just enough code to pass the test, clean up your code, and repeat. The tests tell you exactly what the software should do.

:::

:::eli15

In TDD, you write a failing test before writing any implementation code. Then you write the minimum code needed to make the test pass, refactor to clean up, and repeat. Tests serve two roles: they define (specify) the software's behaviour and they evaluate whether it behaves correctly. Key principles include tests-first, minimal code, high coverage, and treating tests as the living specification.

:::

:::eli20

### The TDD Cycle

```
┌─────────────┐
│  Add a Test │ ← Write test FIRST
└──────┬──────┘
       ▼
┌─────────────┐     ┌──────────────────┐
│Execute Tests│────►│ Make Changes to  │
│             │Fail │ the Code         │
└──────┬──────┘     └────────┬─────────┘
       │Pass                 │
       ▼                     │
┌─────────────┐              │
│Implementation│◄────────────┘
│  Complete   │   (Refactor, rerun)
└─────────────┘
```

### TDD Principles

| Principle | Description |
|-----------|-------------|
| Tests first | Write tests before implementing software |
| Minimal code | Write only enough code to make the test pass |
| Tests = specification | Tests define the software's behaviour |
| Tests = evaluation | Tests verify correctness |
| Coverage matters | Test coverage is even more critical in TDD |

### Two Roles of Tests in Agile

1. **Define** (specify, document) the software's behaviour
2. **Evaluate** whether software behaves correctly

:::

## User Stories & TDD Workflow

:::eli10

A user story is a simple sentence describing what someone wants to do, like "As a student, I want to check my grades online so I don't have to visit the office." You write this story, then write tests based on it, then build the feature until all the tests pass. Then you move to the next story.

:::

:::eli15

A user story captures what a user needs in their own language (e.g., "As a user, I want to reset my password so I can regain access"). It has few details and serves as a basis for tests, then is discarded. The workflow is: write a user story, write a user acceptance test (which will fail), write TDD unit tests and implement minimal functionality iteratively until the acceptance test passes, then move to the next story.

:::

:::eli20

### User Story

A sentence capturing what a user needs to do:
> "As a user, I want to reset my password if I forget it, so that I can regain access to my account."

Properties: language of end user, very few details, basis for tests then discarded.

### Workflow

1. Write a **user story**
2. Write **user acceptance test** based on story (will fail)
3. Write **TDD unit tests** → implement minimum functionality → repeat
4. When acceptance test passes → next user story

:::

## Continuous Integration (CI)

:::eli10

Continuous Integration is like a strict teacher who checks everyone's homework the moment they hand it in. Every time a developer saves their code, a computer automatically builds the whole project and runs all the tests. If anything breaks, the whole team finds out immediately instead of discovering it weeks later.

:::

:::eli15

Continuous Integration requires developers to frequently push code to a shared repository. A CI server automatically builds the system and runs the full test suite after each push. If the build or any test fails, the team is notified immediately. This provides fast feedback, catches integration problems early, and forms a core part of the Agile test infrastructure.

:::

:::eli20

### CI Principle

1. Start with clean development environment
2. Download source (including test set) from repository
3. Make changes to source code and/or tests
4. Push changes back to repository
5. CI server builds the system & runs the test set

### Benefits

- Failures caught quickly (build or test suite fails)
- Entire team becomes aware of failures immediately
- CI system is a core part of the Agile test harness

:::

## User Acceptance & System Testing

:::eli10

A test case is like a detailed recipe for checking one specific thing. It has an ID (a name), what you are testing, what must be true before you start, step-by-step instructions, the data to use, and what you expect to happen. After running it, you write down what actually happened and compare.

:::

:::eli15

Formal test cases have a structured format with defined fields: a unique ID, description of the objective, pre-conditions that must be met, step-by-step procedure, test data to use, expected result, and actual result (filled after execution to determine pass/fail). This structure ensures tests are repeatable, traceable, and unambiguous. Test cases are derived from user stories or requirements.

:::

:::eli20

### Test Case Structure

| Field | Description |
|-------|-------------|
| **ID** | Unique identifier |
| **Description** | Summary and objective |
| **Pre-conditions** | Assumptions that must be fulfilled before executing |
| **Procedure** | Step-by-step execution instructions |
| **Test data** | Data to be entered/used during procedure |
| **Expected result** | Expected outcome |
| **Actual result** | Filled in after execution; determines pass/fail |

### Example Test Case

| Field | Content |
|-------|---------|
| ID | 345 |
| Description | Registered user can successfully login at Moodle |
| Pre-conditions | User has valid credentials; supported browser |
| Procedure | 1. Navigate to Moodle 2. Enter username 3. Enter password 4. Click Login |
| Test data | Username and password |
| Expected result | Dashboard loads showing user's name |

:::
