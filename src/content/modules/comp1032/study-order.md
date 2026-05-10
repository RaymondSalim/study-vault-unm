---
title: "Study Order"
order: 94
moduleTitle: "COMP1032 - Fundamentals of Artificial Intelligence"
tags: ["study-plan", "dependencies", "learning-path"]
---

# Study Order

## Recommended Learning Path

| # | Topic | Why this order | Estimated time |
|---|-------|---------------|----------------|
| 1 | Intro & Agents | Sets up terminology (agent, environment, rationality) used everywhere else | 2-3 hours |
| 2 | Uninformed Search | Core algorithms (BFS, DFS, IDS) -- foundational for informed search | 4-5 hours |
| 3 | Informed Search | Builds on uninformed by adding heuristics (A*, greedy) | 4-5 hours |
| 4 | Constraint Satisfaction | Applies search concepts to structured problems; introduces backtracking + heuristics | 3-4 hours |
| 5 | Game Playing | Extends search to adversarial settings (minimax, alpha-beta) | 3-4 hours |
| 6 | Knowledge Representation | Shifts to logic-based AI; propositional and predicate logic, inference | 4-5 hours |
| 7 | Machine Learning | Standalone topic; best studied last as it draws on all prior concepts of problem-solving | 4-5 hours |

## Rationale

The module progresses from simple problem-solving (search) to adversarial reasoning (games) to knowledge and learning. Each search topic builds on the previous one, so mastering uninformed search before informed search is essential. Knowledge representation and ML are more independent but benefit from the problem-solving mindset developed earlier.

## Dependencies Diagram

```
Intro & Agents
    |
    v
Uninformed Search
    |
    v
Informed Search
   / \
  v   v
CSPs   Game Playing
        |
        v
Knowledge Representation
        |
        v
Machine Learning
```
