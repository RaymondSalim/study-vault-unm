---
title: "Requirements Elicitation"
order: 3
moduleTitle: "COMP2041 - Software Specification"
tags: ["elicitation", "interviews", "workshops", "observation", "prototyping", "brainstorming"]
---

## What is Elicitation?

The process of **discovering** requirements from stakeholders, domain experts, existing systems, and documents. It is not simply "gathering" — requirements often need to be drawn out, as stakeholders may not know or articulate what they need.

## Challenges

| Challenge | Description |
|-----------|-------------|
| Tacit knowledge | Stakeholders do things without conscious awareness |
| Conflicting needs | Different stakeholders want different things |
| Scope creep | Stakeholders add "nice to have" as "must have" |
| Domain gap | Analysts unfamiliar with business domain |
| Communication barriers | Jargon, ambiguity, assumptions |

## Techniques Comparison

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

## Interviews

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

## Questionnaires / Surveys

- Use **closed questions** (Likert scales, multiple choice) for quantitative analysis
- Use **open questions** sparingly for qualitative insight
- Keep short (< 15 minutes)
- Pilot with a small group first
- Good for: confirming priorities, reaching remote stakeholders, large populations

## Observation (Ethnography)

| Variant | Description |
|---------|-------------|
| Passive observation | Analyst watches without interfering |
| Active observation | Analyst asks questions during the work |
| Apprenticing | Analyst performs the task themselves |

**Key benefit:** Reveals tacit knowledge and workarounds that stakeholders won't mention in interviews.

## Workshops (Joint Application Development)

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

## Brainstorming

**Rules:**
- No criticism during idea generation
- Quantity over quality initially
- Build on others' ideas
- Wild ideas welcome

**Convergence techniques:** Dot voting, affinity grouping, feasibility/value matrix.

## Prototyping

| Type | Fidelity | Purpose | Tool Examples |
|------|----------|---------|---------------|
| Paper sketch | Low | Quick concept validation | Pen & paper, whiteboard |
| Wireframe | Low-Medium | Layout and flow | Balsamiq, Figma (lo-fi) |
| Clickable mockup | Medium-High | Interaction validation | Figma, InVision |
| Functional prototype | High | Technical feasibility | Code (throwaway) |

**Risks:**
- Stakeholders assume prototype = final product
- "Throwaway" prototype gets shipped (manage expectations explicitly)

## Document Analysis

Sources to examine:
- Existing system documentation / manuals
- Business process documents
- Regulations and standards
- Competitor products
- Problem reports / helpdesk logs
- Organisational policies

## Choosing Techniques

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
