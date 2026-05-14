---
title: "Final Notes (Cheat Sheet)"
order: 97
moduleTitle: "COMP3041 - Professional Ethics in Computing"
tags: ["exam", "cheat-sheet", "final-notes"]
---

<style>
@media print {
  .print-btn, .prev-next, .module-nav, .global-nav, nav, .mobile-menu-btn, .sidebar-overlay, .search-modal {
    display: none !important;
  }
  .module-wrapper {
    display: block !important;
  }
  .module-content {
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    columns: 2;
    column-gap: 1.5em;
    font-size: 8pt;
    line-height: 1.25;
    color: #000;
  }
  .module-content h2 {
    font-size: 11pt;
    margin: 0.3em 0 0.15em;
    border-bottom: 1.5px solid #000;
    column-span: all;
    break-after: avoid;
  }
  .module-content h3 {
    font-size: 9pt;
    margin: 0.3em 0 0.1em;
    break-after: avoid;
  }
  .module-content table {
    border-collapse: collapse;
    width: 100%;
    margin: 0.2em 0;
    font-size: 7.5pt;
  }
  .module-content th, .module-content td {
    border: 1px solid #999;
    padding: 1px 3px;
    text-align: left;
  }
  .module-content th {
    background: #eee !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content hr {
    margin: 0.3em 0;
    border: none;
    border-top: 1px dashed #999;
  }
  .module-content ul, .module-content ol {
    margin: 0.15em 0;
    padding-left: 1.1em;
  }
  .module-content li {
    margin: 0.05em 0;
  }
  .module-content p {
    margin: 0.15em 0;
  }
  .module-content code {
    font-size: 7pt;
    background: #f0f0f0;
    padding: 0.5px 2px;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .module-content .katex {
    font-size: 0.9em;
  }
  @page {
    size: A4;
    margin: 0.8cm;
  }
}
</style>

<button class="print-btn" onclick="window.print()" style="background:#7aa2f7;color:#1a1b26;border:none;padding:0.5em 1.2em;border-radius:6px;cursor:pointer;font-weight:600;margin-bottom:1em;font-size:0.9rem;">Print Cheat Sheet</button>

## SIDE 1: ETHICAL THEORIES, FALLACIES & PROFESSIONALISM

### Three Core Ethical Frameworks

| Framework | Central Question | Key Figure | Judges action by... |
|-----------|-----------------|------------|---------------------|
| **Consequentialism** | What are the outcomes? | Bentham, Mill | Results (maximise net good) |
| **Deontology** | What are the rules/duties? | Kant | Whether rules are followed |
| **Virtue Ethics** | What kind of person should I be? | Aristotle | Character/virtues displayed |

---

### Consequentialism / Utilitarianism

- "The greatest good for the greatest number" -- calculate net utility
- Trolley problem: Pull lever (save 5, sacrifice 1) = higher utility
- **Strengths:** Pragmatic, results-oriented, considers broader impact
- **Weaknesses:** Justice problem (can justify harming innocents for majority benefit); Calculation problem (impossible to predict all consequences)
- **Computing example:** AI content moderation -- protecting millions justifies some false positives (utilitarian verdict)

---

### Deontology (Kantianism)

- **Categorical Imperative:** "Act only so that you could will your action to be a universal law"
- Test: "What if everyone did that?" If contradiction arises, action is wrong
- Trolley problem: Do NOT pull lever -- "do not kill" rule is absolute
- **Strengths:** Protects individual rights, provides clear consistent rules
- **Weaknesses:** Rigidity (rules can conflict); what if the rule itself is unjust?
- People must never be used merely as means to an end
- **Computing:** Deceptive privacy policy violates duty of truthfulness even if profitable

---

### Virtue Ethics

- Focus on CHARACTER not rules or outcomes. "What would a virtuous person do?"
- Virtues are means between extremes (Aristotle)
- **Computing virtues:** Honesty, justice/fairness, responsibility, humility, courage
- **Strengths:** Flexible, context-sensitive, encourages development
- **Weaknesses:** Vague (doesn't give clear answers); culturally relative

---

### Other Theories

| Theory | Core Idea | Key Weakness |
|--------|-----------|-------------|
| Divine Command | God determines morality | Scriptures disagree; secular society |
| Cultural Relativism | Morality depends on society | Cannot condemn harmful practices |
| Natural Law | Human nature determines good | "Natural" does not equal "good" |
| Ethics of Justice (Rawls) | Design rules from behind "veil of ignorance" | Abstract; hard to apply |
| Ethics of Caring | Morality through empathy/relationships | Limited scope |

---

### Critical Thinking & Fallacies

**Fallacies of Relevance (Red Herrings):**

| Fallacy | Description |
|---------|-------------|
| Ad hominem (abusive) | Attack the person, not the argument |
| Ad hominem (circumstantial) | Imply ulterior motives |
| Tu quoque | "You do it too" (hypocrisy charge) |
| Straw man | Misrepresent argument to attack easier version |
| Appeal to emotion | Manipulate feelings instead of reasoning |
| Appeal to tradition | "Always been this way" |
| Inappropriate authority | Expert outside their field |
| Association fallacy | Guilt/praise by association |

**Faulty Generalisations:**

| Fallacy | Description |
|---------|-------------|
| Hasty generalisation | Broad conclusion from small sample |
| Cherry picking | Only show supporting evidence |
| False analogy | Comparison breaks down on relevant points |
| Accident | General rule applied to exception |

**Other Key Fallacies:**

| Fallacy | Description |
|---------|-------------|
| Circular reasoning | Conclusion restates the premise |
| False cause | Correlation treated as causation |
| Bifurcation / False dilemma | Only two options when more exist |
| Fallacy of composition | Parts true therefore whole true |
| Fallacy of division | Whole true therefore parts true |
| Argument from silence | No evidence against = true |
| Confirmation bias | Only seeking confirming evidence |

---

### Professionalism & SE Code of Ethics

**Profession attributes:** Specialised knowledge, code of ethics, certification/licensing, professional associations, service orientation

**Certification vs Licensing:**

| | Certification | Licensing |
|-|--------------|-----------|
| Nature | Voluntary | Mandatory |
| Granted by | Professional org | Government |
| Purpose | Attests competence | Permission to practise |

**SE Code -- 8 Principles (memorise order):**
1. **PUBLIC** interest (paramount!)
2. Client & Employer (consistent with public interest)
3. Product (highest professional standards)
4. Judgment (integrity and independence)
5. Management (ethical approach)
6. Profession (advance integrity/reputation)
7. Colleagues (fair and supportive)
8. Self (lifelong learning)

**Key clauses:** 1.03 (approve only if safe), 1.04 (disclose dangers), 2.09 (employer interests unless overriding moral concern), 5.12 (don't punish ethical concerns), 6.13 (whistleblow when no alternative)

**Public interest is PARAMOUNT** -- always overrides client/employer interests.

---

## SIDE 2: PRIVACY, IP, ACCOUNTABILITY & SPECIAL TOPICS

### Privacy & Contextual Integrity (Nissenbaum)

**Privacy is NOT secrecy** -- it is the appropriate flow of personal information according to context-specific norms.

**"Nothing to Hide" argument is flawed:**
- Persecution/blackmail from innocent data taken out of context
- Future harm (data misused under new governments)
- Chilling effect (self-censorship under surveillance)
- Slippery slope (normalises ever-increasing surveillance)

**Informed consent limitations:** Information overload, dark patterns, take-it-or-leave-it, no negotiation

**Contextual Integrity Framework:**
- **Context:** Distinct sphere of life (healthcare, education, commerce)
- **Actors:** Subject (data is about), Sender (shares), Recipient (receives)
- **Information norms:** Appropriateness (right type for context?) + Distribution/Transmission principles (confidentiality, consent, legal mandate)

**CI Violation test:** Has information flowed to a new context or actor in a way that breaches the norms of the original context?

| Scenario | CI Verdict |
|----------|-----------|
| Give address for delivery | Maintained (necessity principle) |
| E-commerce sells address to marketers | VIOLATED (new context) |
| Fitness app shares health data with insurer | VIOLATED (wellness to financial context) |

**Design principles:** Data minimisation, purpose limitation, contextual isolation

**Data Protection:** GDPR (EU) -- 6 principles, 7 rights. PDPA 2010 (Malaysia) -- 7 principles.

---

### Intellectual Property

| Type | Protects | Duration | Key Feature |
|------|----------|----------|-------------|
| Patent | Inventions | ~20 years | Must be novel, non-obvious, useful; requires public disclosure |
| Trademark | Brand identity (logos, names) | 10yr renewable | Distinguishes goods/services |
| Copyright | Expression of ideas | Life + 50-70yr | Automatic; does NOT cover ideas |
| Trade Secret | Confidential business info | Unlimited | Only while secrecy maintained |

**Copyright -- 4 exclusive rights:** Reproduce, create derivatives, distribute, perform/display publicly

**Fair Use -- 4 factors:** Purpose (commercial vs educational), nature of work, amount used, market effect

**Open Source:** Source code available; freedom to view, run, modify, distribute. Copyleft (GPL) requires derivatives stay open. Open source IS copyrighted -- licence grants freedoms.

| Licence | Copyleft? | Key Feature |
|---------|-----------|-------------|
| GPL | Yes (strong) | Derivatives must be GPL |
| MIT | No (permissive) | Do anything, keep copyright notice |
| Apache 2.0 | No (permissive) | Patent grant included |

---

### Accountability & Responsibility

| Term | Focus | Definition |
|------|-------|-----------|
| Responsibility | Forward-looking | Duty to ensure good outcomes |
| Accountability | Backward-looking | Answerable for what happened |
| Liability | Legal | Obligation to compensate for harm |

**Problem of Many Hands:** Responsibility distributed across many people -- hard to pinpoint who is accountable (not that nobody is!)

**Computing amplifiers:** Scale (one bug = millions affected), Complexity (emergent behaviours), Speed culture, Intangibility of software risk

---

### Safety & Reliability

**Dependability attributes:** Availability, Reliability, Safety, Confidentiality, Integrity, Maintainability

**Causes of failure:** Hardware errors, software bugs, wrong requirements, misuse, communication failure, malice

**Key case -- Therac-25:** Race condition in radiation therapy machine caused patient deaths. Multiple failures: software reuse without understanding, removed hardware safety interlocks, inadequate testing.

---

### Research Ethics

**Research misconduct (FFP):** Fabrication (making up data), Falsification (manipulating data), Plagiarism (using others' work without credit). Honest error is NOT misconduct.

**Human subjects:** Informed consent required, minimise harm, right to withdraw, IRB/ethics committee approval

---

### Autonomous & Pervasive Technology

- **Pervasive:** Technology embedded everywhere (smartphones, IoT, sensors)
- **Autonomous:** Operates without human intervention (thermostats, self-driving cars)
- **Cycle:** Autonomy reduces cost $\to$ wider adoption (pervasiveness) $\to$ more revenue $\to$ investment in autonomy

**Ethical challenges:** Accountability gap for autonomous decisions, surveillance from pervasive sensors, context collapse (data from one domain used in another), algorithmic bias, job displacement

---

### Cyber-Behaviour

**Hacking evolution:** Phase I (creative programmers) $\to$ Phase II (unauthorised intrusion) $\to$ Phase III (diversified cybercrime)

**Categories:** Unauthorised access, malicious code deployment, identity theft, data breaches, ransomware

---

### Structuring an Exam Answer

1. **Identify the dilemma** (what competing values are in tension?)
2. **Apply multiple frameworks:**
   - Consequentialist: Who benefits/is harmed? What maximises net good?
   - Deontological: What rules/duties apply? Can this universalise? Are people used as means?
   - Virtue Ethics: What would a virtuous professional do?
3. **Apply the SE Code** (cite specific principle numbers and clauses)
4. **Reach a justified conclusion** (acknowledge tensions, explain your reasoning)

**Key trap:** Always apply MULTIPLE frameworks. Never just one. The code should not be read legalistically -- judgment is required.
