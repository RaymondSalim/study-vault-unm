---
title: "Prerequisites"
order: 96
moduleTitle: "COMP3033 - Software Quality Assurance"
tags: ["prerequisites", "preparation", "self-test"]
---

## Prerequisites

### Required Knowledge

| Area | Specifics |
|------|-----------|
| Programming (Java) | Classes, methods, arrays, loops, exceptions |
| Software development lifecycle | Waterfall, Agile, V-Model concepts |
| Version control | Basic git usage (commits, branches) |
| Basic graph theory | Nodes, edges, paths (for control flow graphs) |

### Helpful Prior Modules

| Module | Why it helps |
|--------|-------------|
| Software Engineering | SDLC models, requirements engineering, team processes |
| Object-Oriented Programming | Java classes, inheritance, polymorphism — needed for JUnit and OO metrics |
| Algorithms & Data Structures | Complexity concepts, graph traversal — helps with CFGs and path analysis |
| Databases | SQL basics — needed to understand SQL injection and prepared statements |

### Self-Test: Are You Ready?

Answer these 5 questions. If you struggle with more than 2, revise the prerequisite material first.

1. **Write a Java method that takes an array and returns the count of elements greater than 10.** (Tests: basic Java competency)
2. **What is the difference between a unit test and an integration test?** (Expected: unit tests test individual components in isolation; integration tests test components working together)
3. **Draw a simple control flow graph for an if-else statement.** (Expected: decision node with two branches merging at a join node)
4. **Name two Agile practices.** (Expected: any from — sprints, daily standups, user stories, retrospectives, CI)
5. **What does `SELECT * FROM users WHERE id = '1 OR 1=1'` do?** (Expected: returns all rows because the injected condition is always true)
