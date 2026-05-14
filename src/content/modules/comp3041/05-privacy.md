---
title: "Privacy & Data Protection"
order: 5
moduleTitle: "COMP3041 - Professional Ethics in Computing"
tags: ["privacy", "contextual-integrity", "nissenbaum", "GDPR", "PDPA", "data-protection", "profiling"]
---

## Privacy: More Than Secrecy

:::eli10

Privacy does not mean you are hiding something bad. It means that different people should know different things about you. You tell your doctor about your body, but you would not want your teacher to know those things. Privacy means information goes to the right people, not everywhere.

:::

:::eli15
Privacy is not simply about keeping secrets. Modern understanding defines privacy as the appropriate flow of personal information. Different contexts (medical, educational, social) have different norms about what information is appropriate to share and with whom. A privacy violation occurs not when information is shared, but when it flows outside the norms of the context in which it was provided.

:::

:::eli20
### Traditional Definitions
- Seclusion (being alone)
- Secrecy (hiding information)
- Freedom from intrusion

### Modern Understanding
**Privacy is about appropriate information flow** — not about hiding, but about information flowing according to contextual norms.

:::

## The "Nothing to Hide" Argument

:::eli10

Some people say "if you have nothing to hide, you should not mind being watched." But that is wrong. Even if you are doing nothing bad, being watched all the time makes you feel scared to be yourself. Also, information can be twisted and used against innocent people later.

:::

:::eli15
The "nothing to hide" argument claims that surveillance is only a problem for wrongdoers. This is flawed for several reasons: innocent information can be taken out of context to persecute people, data collected today might be misused under future governments or policies, constant surveillance creates a "chilling effect" where people self-censor, and accepting surveillance normalises ever-expanding intrusion into private life.

:::

:::eli20
### The Argument
"If you have nothing to hide, you have nothing to fear" — used to defend mass surveillance.

### Its Flaws

| Flaw | Explanation |
|------|-------------|
| Persecution & blackmail | "Give me six lines written by the most honest man, I'll find enough to hang him" (Cardinal Richelieu) |
| Future harm | Data collected today can be used in unforeseen discriminatory ways tomorrow |
| Chilling effect | Normalises surveillance, deters free speech and political dissent |
| Slippery slope | Accepting the argument normalises ever-increasing surveillance |

:::

## The Limits of "Informed Consent"

:::eli10

Websites say "do you agree?" before using your data, but the agreements are so long that nobody reads them. Even if you do read them, you cannot say no and still use the service. So "agreeing" does not really mean you understand or truly agreed.

:::

:::eli15
Informed consent is supposed to give users control over their data, but in practice it fails. Privacy policies are thousands of words long (information overload), use confusing legal language, employ dark patterns that push users toward sharing more, and offer no negotiation (it is "agree or leave"). Because genuine informed consent is nearly impossible in the digital world, we need additional ethical frameworks beyond just "the user clicked agree."

:::

:::eli20
| Myth | Reality |
|------|---------|
| Users read privacy policies | Information overload (thousands of words) |
| Users understand terms | Dark patterns push users toward sharing more |
| Users can negotiate | Take-it-or-leave-it — no ability to negotiate |

**Conclusion**: Cannot rely solely on consent. Need better ethical frameworks.

:::

## Nissenbaum's Contextual Integrity (CI)

:::eli10

Think of your life as different rooms: a doctor's room, a classroom, a chat with friends. Each room has its own rules about what you share. Contextual integrity means your information should stay in the right room. If the doctor tells your school about your health without asking, that breaks the rules of the room.

:::

:::eli15
Nissenbaum's Contextual Integrity framework says privacy is violated when information flows in ways that breach the norms of the context where it was originally shared. Every context (healthcare, education, commerce) has specific actors, information types, and rules about how data can be transmitted. A fitness app sharing your health data with an insurance company violates CI because the information has moved from a wellness context to a financial risk context without appropriate norms being met.

:::

:::eli20
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

:::

## Technology as a "Context-Blending Machine"

:::eli10

Computers mix up the "rooms" of your life. Something you "liked" on social media for fun might be used by a bank to decide if you can get a loan. Technology takes information from one room and moves it to another room where it does not belong.

:::

:::eli15
Digital technology breaks down the boundaries between life contexts. A "Like" on social media (social context) gets used to build a credit score (financial context). Browsing history (information-seeking context) gets sold to advertisers (commercial context). This "context collapse" destroys the norms that previously governed information flow, enabling profiling where algorithms combine data points to make predictions the subject never consented to.

:::

:::eli20
- Digital systems extract, aggregate, and re-contextualise data
- Example: Social media "Like" (social context) used to train credit scoring (financial context)
- **Context collapse**: Distinct social contexts blur, destroying norms governing each

### Profiling as CI Violation
- Algorithms combine data points to infer habits and predict behaviour
- Creates hidden contexts the subject never sees or consents to
- Online behaviour (browsing context) → "financial risk" profile (financial context)

:::

## Designing for Contextual Integrity

:::eli10

To protect privacy, app builders should only collect the information they actually need, use it only for the reason they asked for it, and keep different types of information separate so they do not get mixed up.

:::

:::eli15
Designing for contextual integrity means building systems that respect the boundaries between contexts. Key principles include data minimisation (collect only what is needed), purpose limitation (do not repurpose data), and contextual isolation (architecture prevents blending data from different life domains). Technical tools like differential privacy, federated learning, and encryption help enforce these principles at the system level.

:::

:::eli20
| Principle | Description |
|-----------|-------------|
| Data minimisation | Collect only what's necessary for the immediate context |
| Purpose limitation | Use data only for the purpose it was collected for |
| Contextual isolation | Architect systems to prevent blending data from different contexts |

### Technical Mechanisms
- **Differential privacy**: Adding noise to allow analysis without identifying individuals
- **Federated learning**: Training algorithms across devices without centralising raw data
- **Encryption & access controls**: Technically enforcing distribution norms

:::

## Data Protection Law

:::eli10

Laws exist to protect your personal information. They say companies must tell you what they are doing with your data, keep it safe, not keep it longer than they need, and let you see what they have about you. Different countries have their own versions of these rules.

:::

:::eli15
Data protection laws formalise privacy principles into legal requirements. They define types of privacy invasion (appropriation, intrusion, public disclosure, false light), establish individual rights (access, correction, deletion, portability), and impose obligations on data controllers (lawfulness, transparency, minimisation, security). Major frameworks include the EU's GDPR and Malaysia's PDPA 2010, each with their own specific principles and enforcement mechanisms.

:::

:::eli20
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

:::
