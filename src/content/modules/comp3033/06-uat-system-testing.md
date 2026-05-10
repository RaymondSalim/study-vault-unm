---
title: "Agile, TDD & CI"
order: 6
moduleTitle: "COMP3033 - Software Quality Assurance"
tags: ["agile", "tdd", "test-driven-development", "continuous-integration", "user-stories", "yagni"]
---

## The Agile Philosophy

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

## Test-Driven Development (TDD)

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

## User Stories & TDD Workflow

### User Story

A sentence capturing what a user needs to do:
> "As a user, I want to reset my password if I forget it, so that I can regain access to my account."

Properties: language of end user, very few details, basis for tests then discarded.

### Workflow

1. Write a **user story**
2. Write **user acceptance test** based on story (will fail)
3. Write **TDD unit tests** → implement minimum functionality → repeat
4. When acceptance test passes → next user story

## Continuous Integration (CI)

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

## User Acceptance & System Testing

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
