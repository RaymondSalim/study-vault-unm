---
title: "Safety & Reliability"
order: 8
moduleTitle: "COMP3041 - Professional Ethics in Computing"
tags: ["safety", "reliability", "system-failures", "therac-25", "dependability", "software-engineering"]
---

## Core Principle

:::eli10

Computers do not make mistakes on their own. People make mistakes when building or using them. When something goes wrong with a computer system, it is almost always because a human made an error somewhere along the way. That is why builders of software have a big responsibility.

:::

:::eli15

Computing system failures are ultimately traceable to human decisions: flawed requirements, coding bugs, inadequate testing, or misuse. While errors can be traced technically, assigning moral and legal responsibility is often complex because many people contribute to a system. The core ethical principle is that computing professionals bear responsibility for the safety and reliability of the systems they create.

:::

:::eli20

> Computers are only as good as we humans make them. Computing system errors stem from human errors.

Errors are typically traceable, but moral and legal responsibility is not always easy to establish.

:::

## Causes of Failure in Computing Systems

:::eli10

Computers can fail because: the physical parts break, the code has bugs, the builders solved the wrong problem, people use it in ways it was not designed for, people miscommunicate, or someone deliberately breaks it. Most of these come down to human mistakes.

:::

:::eli15

System failures have multiple causes: hardware malfunction, software bugs, incorrect specifications (solving the wrong problem), user misuse beyond intended parameters, communication breakdowns between stakeholders, and deliberate sabotage. Understanding these categories helps professionals design systems that are resilient to each type of failure and establish who bears responsibility when things go wrong.

:::

:::eli20

| Cause | Description |
|-------|-------------|
| Hardware errors | Physical component failure |
| Software errors | Bugs in code |
| Solving the wrong problem | Incorrect requirements/specifications |
| Misuse of the system | Users operating beyond intended parameters |
| Human communication failure | Misunderstanding between stakeholders |
| Human malice | Deliberate sabotage or attack |

:::

## Dependability Attributes

:::eli10

A dependable system is one you can trust. It should be available when you need it, do what it promises, not cause harm, keep secrets safe, not get corrupted, and be easy to fix when something does go wrong.

:::

:::eli15

Dependability encompasses six attributes: availability (ready when needed), reliability (performs as specified), safety (no catastrophic harm), confidentiality (no unauthorised disclosure), integrity (no improper alterations to data/state), and maintainability (can be repaired and updated). A system's overall trustworthiness depends on all six working together. Ethical obligations require professionals to address each attribute.

:::

:::eli20

| Attribute | Definition |
|-----------|-----------|
| **Availability** | Ability to deliver service when requested |
| **Reliability** | Ability to deliver services as specified |
| **Safety** | Ability to operate without catastrophic failure |
| **Confidentiality** | Absence of unauthorised disclosure |
| **Integrity** | Absence of improper state alterations |
| **Maintainability** | Ability to undergo repairs and modifications |

:::

## Software Engineering Lifecycle

:::eli10

Building software has steps: first you figure out what to build (specification), then you build it (development), then you test it to make sure it works (validation), then you keep improving it over time (evolution). Cutting corners at any step can cause harm to real people.

:::

:::eli15

The software lifecycle has four main phases, each with ethical implications. Specification defines what the system should do (are the requirements complete and correct?). Development produces the software (are shortcuts being taken?). Validation tests whether it works correctly (is testing adequate?). Evolution adapts it to changing needs (is maintenance properly funded?). The seven principles of testing remind us that testing can only show the presence of defects, never prove their absence.

:::

:::eli20

| Phase | Focus | Ethical Relevance |
|-------|-------|-------------------|
| **Specification** | Define functions and constraints | Are requirements complete and correct? |
| **Development** | Produce working software matching specs | Are corners being cut? |
| **Validation** | Test the software | Is testing adequate? |
| **Evolution** | Modify for changing needs | Is maintenance properly resourced? |

### Validation Principles (Seven Principles of Testing)

1. Testing shows presence of defects (not absence)
2. Exhaustive testing is impossible
3. Early testing is important
4. Defect clustering (bugs tend to cluster)
5. Pesticide paradox (same tests stop finding new bugs)
6. Testing is context-dependent
7. Absence of errors is a fallacy

:::

## Data-Related Failures

:::eli10

Sometimes problems happen because wrong information gets put into a computer, or people misunderstand what the computer tells them. In one case, innocent people were arrested because a database confused them with criminals. Bad data can ruin lives.

:::

:::eli15

Data-related failures fall into two categories: incorrect data entry (garbage in, garbage out) and incorrect interpretation of retrieved data. Real-world consequences include the Florida 2000 election where voters were wrongly flagged as felons and disqualified, and multiple cases of false arrests due to database identity confusion. These cases show that data accuracy is not just a technical concern but an ethical imperative with direct impact on human lives and rights.

:::

:::eli20

### Two Types
1. Wrong data entered into system
2. People incorrectly interpret data they retrieve

### Case Studies

| Case | What Happened | Consequence |
|------|---------------|-------------|
| Florida 2000 election | Voters incorrectly flagged as felons | Thousands wrongly disqualified; may have affected outcome |
| False arrests (Stossier, Hernandez, Rogan) | Database identity confusion | Innocent people arrested, jailed for days |
| NCIC accuracy | FBI exempt from Privacy Act accuracy provisions | More erroneous records → more false arrests |

:::

## Notable Software System Failures

:::eli10

Here are famous computer failures: a missile defence system failed because it ran too long and its clock drifted, killing 28 soldiers. A rocket blew up because code from an older, slower rocket was reused without checking. A phone network crashed because of one line of bad code, cutting off millions of calls. Small bugs can cause enormous disasters.

:::

:::eli15

Major software failures illustrate how small technical errors cause catastrophic outcomes. The Patriot Missile (1991) had a tiny clock drift that accumulated over 100+ hours into a 687-metre tracking error, killing 28 soldiers. Ariane 5 (1996) self-destructed because code reused from the slower Ariane 4 caused an integer overflow. The AT&T network crash affected 70 million calls due to a single line of error-recovery code. These cases demonstrate why rigorous testing, appropriate reuse, and proper operational constraints are ethical obligations.

:::

:::eli20

### Patriot Missile (1991)
- Designed as anti-aircraft; used to intercept Scud missiles
- One battery failed to shoot → 28 soldiers killed
- Cause: Designed for few hours' operation; kept running 100+ hours
- Tiny truncation errors accumulated → 0.3433 second clock error → 687m tracking error

### Ariane 5 (1996)
- 40 seconds into maiden flight, rocket self-destructed
- $500 million in uninsured satellites lost
- Cause: Floating-point to integer conversion raised exception (not caught)
- Code reused from Ariane 4 (slower rocket, smaller values — exception was previously impossible)

### AT&T Long-Distance Network
- Half of telephone-routing switches crashed
- 70 million calls not completed; 60,000 lost all service
- Cause: Single line of code in error-recovery procedure
- Propagated through network (all switches running same software)

:::

## Ethical Analyses of System Failures

:::eli10

When a system fails, we can use our ethics frameworks to decide who was right or wrong. Counting benefits vs harms (utilitarianism) might say a database is worth keeping even if it occasionally gets someone arrested unfairly. But Kant would say it is always wrong to use a person unfairly, even if it helps others.

:::

:::eli15

Ethical frameworks provide different perspectives on system failures. Act utilitarianism might justify the NCIC database because its benefits (recovering stolen cars) outweigh its harms (rare false arrests), but this ignores justice for the individual. Rule utilitarianism and Kantian analysis ask different questions: when Amazon listed an iPad at the wrong price, rule utilitarianism concluded Amazon was right not to honour it (a universal rule to honour all errors would harm everyone), and Kantian analysis concluded the buyers were wrong for knowingly exploiting an obvious mistake.

:::

:::eli20

### Act Utilitarian Analysis: NCIC Database
- Benefits: ~100,000 cars recovered annually ($500M value)
- Harms: ~1 false arrest/year (~$55K compensation)
- Conclusion: Benefits surpass harm → database justified
- BUT: doesn't address the injustice to falsely arrested individuals

### Rule Utilitarian Analysis: E-Retailer Posts Wrong Price
- Amazon UK listed iPad for £7 instead of £275, refused to honour
- Rule: "Company must always honour advertised price"
- Consequences of rule: Higher costs → higher prices for all → few benefit from errors
- Conclusion: Rule has more harms than benefits → Amazon was right to refuse

### Kantian Analysis: E-Retailer Wrong Price
- Buyers knew 97.5% markdown was an error
- They attempted to take advantage (not acting in "good faith")
- Using Amazon as mere means to their end
- Conclusion: Buyers were wrong, not Amazon

:::

## Computer Simulations

:::eli10

Sometimes scientists use computer programs to simulate things they cannot test in real life, like nuclear explosions or weather. But if the simulation has a bug, the results are wrong, and people might make dangerous decisions based on those wrong results.

:::

:::eli15

Computer simulations are used for experiments that cannot be conducted physically (nuclear tests, climate modelling, oil drilling). They raise two ethical concerns: verification (is the code correctly implemented?) and validation (does the model accurately represent reality?). Erroneous simulation results, whether from bugs or flawed models, can lead to dangerous real-world decisions. Professionals must clearly communicate the limitations and uncertainty of simulation outputs.

:::

:::eli20

### Ethical Importance
- Simulate experiments not possible in real settings (nuclear weapons, oil drills)
- May produce erroneous results from software bugs OR flawed models

### Two Types of Correctness
- **Verification**: Is the program correctly implemented?
- **Validation**: Is the model an accurate representation of reality?

:::

## Key Takeaway

:::eli10

Because computer programs can hurt people when they fail, the people who build them must be careful, test thoroughly, take responsibility, and speak up when they see something dangerous. Building software is a serious responsibility.

:::

:::eli15

The capacity for software to cause harm (from financial loss to loss of life) is the fundamental reason computing professionals must act ethically, take personal responsibility for developing good judgment, ensure thorough testing and validation, and report safety concerns rather than staying silent. The ethical duty is proportional to the potential harm.

:::

:::eli20

The ability to cause harm is a powerful reason why computing professionals must:
- Act according to ethical principles
- Take personal responsibility for developing ethical decision-making skills
- Ensure adequate testing and validation
- Report concerns about safety and reliability

:::
