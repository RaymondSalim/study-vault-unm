---
title: "Privacy & Data Protection"
order: 5
moduleTitle: "COMP3041 - Professional Ethics in Computing"
tags: ["privacy", "contextual-integrity", "nissenbaum", "GDPR", "PDPA", "data-protection", "profiling"]
---

## Privacy: More Than Secrecy

### Traditional Definitions
- Seclusion (being alone)
- Secrecy (hiding information)
- Freedom from intrusion

### Modern Understanding
**Privacy is about appropriate information flow** — not about hiding, but about information flowing according to contextual norms.

## The "Nothing to Hide" Argument

### The Argument
"If you have nothing to hide, you have nothing to fear" — used to defend mass surveillance.

### Its Flaws

| Flaw | Explanation |
|------|-------------|
| Persecution & blackmail | "Give me six lines written by the most honest man, I'll find enough to hang him" (Cardinal Richelieu) |
| Future harm | Data collected today can be used in unforeseen discriminatory ways tomorrow |
| Chilling effect | Normalises surveillance, deters free speech and political dissent |
| Slippery slope | Accepting the argument normalises ever-increasing surveillance |

## The Limits of "Informed Consent"

| Myth | Reality |
|------|---------|
| Users read privacy policies | Information overload (thousands of words) |
| Users understand terms | Dark patterns push users toward sharing more |
| Users can negotiate | Take-it-or-leave-it — no ability to negotiate |

**Conclusion**: Cannot rely solely on consent. Need better ethical frameworks.

## Nissenbaum's Contextual Integrity (CI)

### Core Philosophy
Privacy is not secrecy — it is the **appropriate flow of personal information according to context-specific norms**. A violation occurs when information flows in a way that breaches expected norms.

### Key Components

#### 1. Context
Distinct spheres of life with their own roles, activities, and goals.

| Context | Roles | Goals |
|---------|-------|-------|
| Healthcare | Doctor, patient, nurse | Healing, care |
| Education | Teacher, student, admin | Learning |
| E-commerce | Customer, retailer | Purchase/delivery |
| Employment | Employee, employer, HR | Work |

#### 2. Actors (Three Roles)

| Role | Description | Example |
|------|-------------|---------|
| **Subject** | Person the information is about | You (the patient) |
| **Sender** | Person/entity sharing the information | Lab technician processing your blood test |
| **Recipient** | Person/entity receiving the information | Doctor receiving test results |

#### 3. Information Norms

**Appropriateness**: "Is this type of information okay to share in this context?"
- Appropriate: Sharing medical history with your doctor
- Inappropriate: Doctor asking about your political views during a physical

**Distribution (Transmission Principles)**:
- Confidentiality: Must not be shared further
- Consent: Explicit permission required
- Implied consent: Assumed by context participation
- Legal mandate: Required by law
- Payment/necessity: Required for transaction

### CI Examples

| Scenario | Verdict | Why |
|----------|---------|-----|
| You give address to e-commerce site for delivery | CI maintained | Address appropriate; distribution principle is necessity for fulfilment |
| E-commerce site sells address to marketing firm | **CI violated** | New context (marketing); original principle broken |
| Fitness app sells health data to insurance company | **CI violated** | Wellness context → Financial/Risk context; inappropriate |

## Technology as a "Context-Blending Machine"

- Digital systems extract, aggregate, and re-contextualise data
- Example: Social media "Like" (social context) used to train credit scoring (financial context)
- **Context collapse**: Distinct social contexts blur, destroying norms governing each

### Profiling as CI Violation
- Algorithms combine data points to infer habits and predict behaviour
- Creates hidden contexts the subject never sees or consents to
- Online behaviour (browsing context) → "financial risk" profile (financial context)

## Designing for Contextual Integrity

| Principle | Description |
|-----------|-------------|
| Data minimisation | Collect only what's necessary for the immediate context |
| Purpose limitation | Use data only for the purpose it was collected for |
| Contextual isolation | Architect systems to prevent blending data from different contexts |

### Technical Mechanisms
- **Differential privacy**: Adding noise to allow analysis without identifying individuals
- **Federated learning**: Training algorithms across devices without centralising raw data
- **Encryption & access controls**: Technically enforcing distribution norms

## Data Protection Law

### Invasion of Privacy — Four Types
1. **Appropriation**: Using someone's identity without consent
2. **Intrusion upon seclusion**: Intruding on private affairs
3. **Public disclosure**: Revealing private facts publicly
4. **False light**: Publishing misleading information

### Malaysia's PDPA 2010

7 Principles:
1. General principle
2. Notice and choice
3. Disclosure
4. Security
5. Retention
6. Data integrity
7. Access

### EU GDPR (2018)

| Aspect | Details |
|--------|---------|
| Principles | Lawfulness, fairness, transparency; purpose limitation; data minimisation; accuracy; storage limitation; integrity and confidentiality |
| Rights | Access, rectification, erasure, restrict processing, data portability, object to processing, object to automated decision-making |
