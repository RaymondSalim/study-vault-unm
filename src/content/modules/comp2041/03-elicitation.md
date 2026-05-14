---
title: "Requirements Elicitation"
order: 3
moduleTitle: "COMP2041 - Software Specification"
tags: ["elicitation", "interviews", "workshops", "observation", "prototyping", "brainstorming"]
---

## What is Elicitation?

:::eli10

Elicitation is finding out what people actually need from the software. It is like being a detective -- you cannot just ask "what do you want?" because people often cannot put their needs into words. You have to use clever techniques like interviews, watching people work, and building quick mock-ups to uncover hidden needs.

:::

:::eli15

Requirements elicitation is the process of discovering what stakeholders truly need from a system. It goes beyond simply asking -- stakeholders often have tacit knowledge (they do things unconsciously), conflicting needs, or difficulty articulating what they want. Analysts must use multiple techniques (interviews, observation, prototyping, workshops) to draw out requirements from various sources including people, documents, and existing systems.

:::

:::eli20

The process of **discovering** requirements from stakeholders, domain experts, existing systems, and documents. It is not simply "gathering" — requirements often need to be drawn out, as stakeholders may not know or articulate what they need.

:::

## Challenges

:::eli10

The hard part about elicitation is that people cannot always explain what they do (tacit knowledge), different people want different things (conflicts), everyone keeps adding "just one more thing" (scope creep), and technical people and business people speak different languages.

:::

:::eli15

Major elicitation challenges include: tacit knowledge (stakeholders perform tasks without conscious awareness of the steps), conflicting needs between stakeholder groups, scope creep (nice-to-haves disguised as must-haves), the domain knowledge gap between analysts and business experts, and communication barriers like jargon and unstated assumptions. Effective elicitation requires selecting appropriate techniques for each challenge.

:::

:::eli20

| Challenge | Description |
|-----------|-------------|
| Tacit knowledge | Stakeholders do things without conscious awareness |
| Conflicting needs | Different stakeholders want different things |
| Scope creep | Stakeholders add "nice to have" as "must have" |
| Domain gap | Analysts unfamiliar with business domain |
| Communication barriers | Jargon, ambiguity, assumptions |

:::

## Techniques Comparison

:::eli10

There are many ways to find out requirements: asking people one-on-one (interviews), sending surveys to lots of people (questionnaires), watching them work (observation), group sessions (workshops), free-form idea sessions (brainstorming), building quick models (prototyping), and reading existing documents. Each works best in different situations.

:::

:::eli15

Different elicitation techniques suit different situations. Interviews give deep individual insight but are time-consuming. Questionnaires reach large groups but lack follow-up ability. Observation reveals tacit knowledge and actual workflows. Workshops achieve consensus across groups. Prototyping clarifies ideas by giving stakeholders something tangible to react to. Document analysis uncovers existing rules and processes. The best approach usually combines multiple techniques.

:::

:::eli20

| Technique | Best For | Limitations | Stakeholder Involvement |
|-----------|----------|-------------|------------------------|
| Interviews | Deep individual insight | Time-consuming, interviewer bias | 1-on-1 |
| Questionnaires | Large groups, quantitative data | Low response rate, no follow-up | Many, asynchronous |
| Observation | Understanding actual workflows | Hawthorne effect, time-intensive | Passive |
| Workshops (JAD) | Consensus, cross-functional input | Dominant personalities, scheduling | Group (6-12) |
| Brainstorming | Creative/innovative features | Unfocused, hard to converge | Group |
| Prototyping | Clarifying UI/UX, validating ideas | Can be mistaken for final product | Iterative review |
| Document analysis | Understanding existing systems/regulations | May be outdated | None (desk research) |
| Ethnography | Real-world context, tacit knowledge | Very time-consuming | Immersive |
| Scenarios/Storyboards | Contextualising requirements | May miss edge cases | Collaborative |

:::

## Interviews

:::eli10

Interviews are like conversations with a purpose. You can have a strict list of questions (structured), a flexible chat with some planned questions (semi-structured), or an open conversation (unstructured). The key rules are: let them talk, do not lead them to answers, and always check you understood them correctly.

:::

:::eli15

Interviews are the most common elicitation technique. They range from structured (fixed questions, useful for comparison) through semi-structured (core questions with flexibility to follow up) to unstructured (open exploration). Best practices include: research the stakeholder beforehand, start broad then narrow (funnel approach), use open questions before closed ones, avoid leading questions, record with permission, and validate findings with the interviewee afterward.

:::

:::eli20

### Types

| Type | Structure | When to Use |
|------|-----------|-------------|
| Structured | Pre-defined questions, fixed order | Comparing responses across stakeholders |
| Semi-structured | Core questions + follow-up flexibility | Most common in RE |
| Unstructured | Open conversation, no fixed agenda | Early exploration, building rapport |

### Best Practices

- Prepare: research stakeholder role, review domain documents
- Start broad, then narrow (funnel approach)
- Use open questions first ("Tell me about..."), closed questions to confirm
- Avoid leading questions ("Don't you think X would be better?")
- Record and transcribe (with permission)
- Summarise and validate findings with interviewee

:::

## Questionnaires / Surveys

:::eli10

Questionnaires are lists of questions you send to many people at once. They are good when you need numbers (like "how many people prefer feature A vs feature B") but bad for understanding complex needs. Keep them short or people will not finish them.

:::

:::eli15

Questionnaires are effective for reaching large populations and collecting quantitative data. Use closed questions (Likert scales, multiple choice) for statistical analysis and open questions sparingly for qualitative insight. Keep them under 15 minutes, pilot with a small group first, and accept that response rates may be low. They are best for confirming priorities, reaching remote stakeholders, and large-scale data collection.

:::

:::eli20

- Use **closed questions** (Likert scales, multiple choice) for quantitative analysis
- Use **open questions** sparingly for qualitative insight
- Keep short (< 15 minutes)
- Pilot with a small group first
- Good for: confirming priorities, reaching remote stakeholders, large populations

:::

## Observation (Ethnography)

:::eli10

Sometimes the best way to understand what people need is to just watch them work. People often do clever workarounds they do not even think to mention. There are three levels: silently watching, asking questions while watching, and actually trying to do the job yourself.

:::

:::eli15

Observation involves watching users in their actual work environment to understand real workflows, workarounds, and tacit knowledge they would not mention in interviews. Variants include passive observation (watch without interfering), active observation (ask questions during work), and apprenticing (analyst performs the task themselves). The key benefit is revealing implicit knowledge and real (vs. idealised) processes.

:::

:::eli20

| Variant | Description |
|---------|-------------|
| Passive observation | Analyst watches without interfering |
| Active observation | Analyst asks questions during the work |
| Apprenticing | Analyst performs the task themselves |

**Key benefit:** Reveals tacit knowledge and workarounds that stakeholders won't mention in interviews.

:::

## Workshops (Joint Application Development)

:::eli10

Workshops bring a group of different people together in one room to agree on requirements. A neutral facilitator keeps things fair and on track. It is like a group project meeting but with clear rules so everyone gets heard and decisions actually get made.

:::

:::eli15

Joint Application Development (JAD) workshops bring cross-functional stakeholders together for structured group sessions. Success factors include: a neutral facilitator (not a decision-maker), time-boxed activities, ground rules (no hierarchy, equal voice), and documented outcomes. Techniques like sticky notes, dot voting, and affinity diagrams help structure discussion and reach consensus. Workshops are excellent for resolving conflicts and building shared understanding.

:::

:::eli20

**Structure:**
1. Define objective and agenda
2. Select participants (cross-functional mix)
3. Assign roles: facilitator, scribe, participants
4. Use structured activities: sticky notes, dot voting, affinity diagrams
5. Produce documented outcomes (agreed requirements)

**Success factors:**
- Neutral facilitator (not a project decision-maker)
- Time-boxed activities
- Ground rules (no hierarchy, equal voice)
- Documented action items

:::

## Brainstorming

:::eli10

Brainstorming is when a group throws out as many ideas as possible without anyone saying "that is a bad idea." Quantity first, quality later. Wild ideas are encouraged because they might spark a practical solution. After generating ideas, you vote or group them to find the best ones.

:::

:::eli15

Brainstorming generates creative ideas through uncritical divergent thinking. Core rules: no criticism during generation, quantity over quality initially, build on others' ideas, and welcome wild suggestions. After the divergent phase, convergence techniques (dot voting, affinity grouping, feasibility/value matrices) help filter and prioritise the ideas into actionable requirements.

:::

:::eli20

**Rules:**
- No criticism during idea generation
- Quantity over quality initially
- Build on others' ideas
- Wild ideas welcome

**Convergence techniques:** Dot voting, affinity grouping, feasibility/value matrix.

:::

## Prototyping

:::eli10

A prototype is a quick, rough version of the software -- like a sketch or a clickable drawing. You show it to users and they say "yes, like that!" or "no, that is not what I meant." It is much cheaper to fix a sketch than to rebuild finished software. Just make sure people know it is NOT the real thing.

:::

:::eli15

Prototypes range from low-fidelity (paper sketches, wireframes) to high-fidelity (clickable mockups, functional code). They help stakeholders visualise and react to proposed solutions, uncovering requirements that abstract descriptions cannot. Key risks: stakeholders may mistake prototypes for the final product, and "throwaway" prototypes sometimes get shipped. Always manage expectations explicitly about what a prototype is and is not.

:::

:::eli20

| Type | Fidelity | Purpose | Tool Examples |
|------|----------|---------|---------------|
| Paper sketch | Low | Quick concept validation | Pen & paper, whiteboard |
| Wireframe | Low-Medium | Layout and flow | Balsamiq, Figma (lo-fi) |
| Clickable mockup | Medium-High | Interaction validation | Figma, InVision |
| Functional prototype | High | Technical feasibility | Code (throwaway) |

**Risks:**
- Stakeholders assume prototype = final product
- "Throwaway" prototype gets shipped (manage expectations explicitly)

:::

## Document Analysis

:::eli10

Sometimes the information you need is already written down -- in manuals, rule books, competitor products, or helpdesk logs. Document analysis means reading through existing materials to understand the current system and its rules before building something new.

:::

:::eli15

Document analysis involves reviewing existing materials to understand the current system, business rules, and regulatory context. Sources include: system documentation, business process documents, regulations, competitor products, helpdesk logs, and organisational policies. It is useful for replacing existing systems and understanding regulatory domains, though documents may be outdated or incomplete.

:::

:::eli20

Sources to examine:
- Existing system documentation / manuals
- Business process documents
- Regulations and standards
- Competitor products
- Problem reports / helpdesk logs
- Organisational policies

:::

## Choosing Techniques

:::eli10

Different situations call for different techniques. For a brand new project, brainstorm and prototype. To replace an old system, watch how people use it and read the documentation. For faraway stakeholders, use surveys. If users cannot explain their needs, build something they can react to.

:::

:::eli15

Selecting appropriate techniques depends on the project context. Greenfield projects benefit from workshops, brainstorming, and prototyping. System replacements call for document analysis, observation, and interviews. Distributed teams need questionnaires and video workshops. Inarticulate users respond better to prototyping and observation. Conflicting views require facilitated workshops. Regulatory domains demand document analysis and expert interviews. Most projects use a combination of techniques.

:::

:::eli20

| Situation | Recommended Techniques |
|-----------|----------------------|
| New greenfield project | Workshops, brainstorming, prototyping |
| Replacing existing system | Document analysis, observation, interviews |
| Geographically distributed stakeholders | Questionnaires, video workshops |
| Users cannot articulate needs | Observation, prototyping |
| Conflicting stakeholder views | Workshops with facilitated negotiation |
| Regulatory domain | Document analysis, expert interviews |

<details><summary>Practice: Match technique to scenario</summary>

For each scenario, identify the most appropriate primary elicitation technique:

1. You need to understand how warehouse staff currently pick and pack orders.
2. You need to gather feature preferences from 500 students.
3. You need creative ideas for a brand-new product with no existing equivalent.
4. Users keep saying "just make it like the old system but better" without specifics.
5. Legal requirements for a healthcare system.

**Answers:**
1. **Observation** — reveals actual workflow and tacit knowledge
2. **Questionnaire** — large population, quantitative data needed
3. **Brainstorming / Workshop** — creative divergent thinking
4. **Prototyping** — gives users something tangible to react to
5. **Document analysis** — regulations are written, need systematic review

</details>

<details><summary>Practice: Design interview questions</summary>

You are eliciting requirements for a university room booking system. Write 3 open questions and 2 closed questions for a lecturer stakeholder.

**Model answer:**

Open:
1. "Can you walk me through how you currently book a room for a lecture?"
2. "What frustrations do you experience with the current process?"
3. "If you could change one thing about room booking, what would it be?"

Closed:
1. "Do you ever need to book rooms for more than 100 students? (Yes/No)"
2. "How often do you need to reschedule a booked room? (Never / Rarely / Monthly / Weekly)"

</details>

:::
