---
title: "Security & Performance Testing"
order: 8
moduleTitle: "COMP3033 - Software Quality Assurance"
tags: ["security-testing", "sast", "dast", "sca", "owasp", "devsecops", "performance-testing", "load-testing", "shift-left"]
---

## Shift Left

:::eli10

"Shift left" means finding problems early instead of late. Imagine you are building a house and discover the foundation is crooked -- fixing it on day 1 is easy, but fixing it after the whole house is built is incredibly expensive. The same goes for software bugs: catch them early!

:::

:::eli15

"Shift left" is the principle of finding and fixing defects as early as possible in the development lifecycle. The cost to fix a bug increases exponentially as it moves from requirements to design to code to testing to production. Instead of doing security and performance testing only after deployment, shift-left integrates these checks continuously into the CI/CD pipeline from the start.

:::

:::eli20

**Goal**: Find and fix defects as early in the lifecycle as possible.

- Cost to fix increases exponentially across phases (Requirements → Design → Code → Test → Production)
- Instead of security/performance testing after deployment, integrate it continuously into CI/CD

:::

## DevSecOps

:::eli10

DevSecOps means that security is everyone's job, not just one special team's job. It is like how keeping a classroom clean is everyone's responsibility, not just the janitor's. Automated tools help check for security problems every time code is written, making the safe way also the easy way.

:::

:::eli15

DevSecOps is a cultural and technical shift that integrates security into the DevOps process rather than treating it as a separate phase. Security becomes everyone's responsibility, not just a dedicated security team's. It relies heavily on automation to provide fast feedback and aims to make the secure path the easiest path for developers to follow.

:::

:::eli20

A cultural and technical shift to integrate security into the DevOps process:
- Security is **everyone's** responsibility, not just a separate team
- Relies on automation to provide fast feedback
- Goal: make the secure path the easiest path

:::

## The Automated Security Testing Triad

:::eli10

There are three robot security guards for your code. SAST reads your code looking for mistakes (like a proofreader). SCA checks if any libraries you borrowed from others have known weaknesses (like checking if your ingredients have been recalled). DAST actually attacks your running app to see if it can break in (like a friendly burglar testing your locks).

:::

:::eli15

Three complementary automated security testing techniques form a triad. SAST (Static Application Security Testing) analyses source code without running it -- fast but produces false positives. SCA (Software Composition Analysis) scans third-party dependencies against vulnerability databases -- critical since modern apps are 80-90% third-party code. DAST (Dynamic Application Security Testing) attacks the running application -- slower but finds real exploitable issues with very low false positives.

:::

:::eli20

| Technique | What it Tests | Box Type | When in CI | Speed |
|-----------|--------------|----------|-----------|-------|
| **SAST** | Your source code | White-box | Early (commit) | Fast (seconds/minutes) |
| **SCA** | Your dependencies (third-party libraries) | Black-box | Early (build) | Fast |
| **DAST** | Your running application | Black-box | Late (deploy) | Slower |

### SAST (Static Application Security Testing)

| Pros | Cons |
|------|------|
| Fast (seconds/minutes) | Noisy (many false positives) |
| Finds exact line number | Lacks runtime context |
| Finds issues before code runs | Can't tell if flaw is reachable |

**Example finding**: SQL injection via string concatenation, hardcoded secrets

**Tools**: SonarQube, Snyk Code, Veracode, Checkmarx, GitHub CodeQL

### SCA (Software Composition Analysis)

- Modern apps are 80–90% third-party code
- Scans dependencies against CVE databases
- A single vulnerability (e.g., Log4Shell CVE-2021-44228) can compromise your entire application

**Tools**: GitHub Dependabot, Snyk Open Source, OWASP Dependency-Check

### DAST (Dynamic Application Security Testing)

| Pros | Cons |
|------|------|
| Finds real, exploitable issues | Requires running application |
| Very low false positives | Cannot pinpoint exact line of code |

**Example findings**: XSS (injects `<script>` tags), Broken Access Control (tries other users' IDs)

**Tools**: OWASP ZAP, Burp Suite

:::

## SQL Injection Prevention

:::eli10

SQL injection is when a hacker types special code into a text box (like a login form) and tricks the database into doing something it should not. The fix is to use "parameterised queries" which keep the hacker's text separate from the actual commands, so the database treats everything they type as just plain text, not instructions.

:::

:::eli15

SQL injection occurs when user input is concatenated directly into SQL queries, allowing attackers to manipulate the query logic. Sanitisation (stripping dangerous characters) is fragile and can be bypassed. The secure approach is parameterised queries (prepared statements), which separate code from data using placeholders -- the database treats all input as literal data, never as executable SQL commands.

:::

:::eli20

| Approach | Method | Weakness |
|----------|--------|----------|
| **Sanitisation** (reactive) | Strip dangerous characters | Fragile — blocklist can be bypassed |
| **Parameterised queries** (secure by design) | Separate code from data using `?` placeholders | None — database treats input as literal data |

```java
// VULNERABLE
String query = "SELECT * FROM users WHERE id = '" + userId + "'";

// SECURE (Prepared Statement)
String query = "SELECT * FROM users WHERE id = ?";
PreparedStatement pstmt = conn.prepareStatement(query);
pstmt.setString(1, userId);
```

:::

## OWASP Top 10 (2021)

:::eli10

The OWASP Top 10 is like a "most wanted" list of the ten most common ways hackers break into websites. It includes things like people getting access they should not have, data not being protected properly, and attackers injecting bad code. Developers use this list to know what to protect against first.

:::

:::eli15

The OWASP Top 10 is the industry-standard awareness document listing the ten most critical web application security risks. It covers broken access control, cryptographic failures, injection attacks, insecure design, security misconfiguration, vulnerable components, authentication failures, data integrity failures, logging failures, and server-side request forgery (SSRF). It is updated periodically and used as a baseline for security testing priorities.

:::

:::eli20

| # | Category | Description |
|---|----------|-------------|
| A01 | Broken Access Control | Users act outside intended permissions |
| A02 | Cryptographic Failures | Sensitive data exposure |
| A03 | Injection | SQL, NoSQL, OS, LDAP injection |
| A04 | Insecure Design | Missing security controls in design |
| A05 | Security Misconfiguration | Default configs, verbose errors |
| A06 | Vulnerable Components | Outdated third-party libraries |
| A07 | Auth Failures | Broken authentication/session management |
| A08 | Data Integrity Failures | Untrusted deserialization, unsigned updates |
| A09 | Logging Failures | Insufficient monitoring and alerting |
| A10 | SSRF | Server-Side Request Forgery |

:::

## Performance Testing

:::eli10

Performance testing is like stress-testing a bridge to see how much weight it can hold. You throw lots of fake users at a website to see if it stays fast (load testing), find out when it crashes (stress testing), or check if it gets slower over many hours (soak testing). The key measurements are speed, how many requests it handles, and how many errors occur.

:::

:::eli15

Performance testing verifies that software meets speed and capacity requirements. Three key metrics are measured: latency (response time for a single request), throughput (requests handled per second), and error rate. Three types of tests are used: load testing verifies behaviour under expected users, stress testing finds the breaking point by ramping up beyond capacity, and soak testing runs for extended periods to find time-dependent issues like memory leaks.

:::

:::eli20

### Key Metrics

| Metric | Definition | Example |
|--------|-----------|---------|
| **Latency** (response time) | Time for single request to complete | p95 < 500ms |
| **Throughput** | Requests handled per unit time | 1000 RPS |
| **Error rate** | Percentage of failed requests | < 1% HTTP 500s |

### Types of Performance Tests

| Type | Goal | Method |
|------|------|--------|
| **Load testing** | Verify system handles expected load | Simulate exact expected users (e.g., 1000) |
| **Stress testing** | Find the breaking point | Ramp up until system crashes (e.g., 1000→4000) |
| **Soak testing** | Find time-dependent issues (memory leaks) | Run normal load for extended period (24–48h) |

### The "Hockey Stick" Curve

As load increases, latency stays flat until the system reaches **saturation** ("the knee"), then latency increases exponentially.

### Performance Testing Process

1. Define NFRs (specific, measurable)
2. Design test scenarios (user flow mix)
3. Configure tools (JMeter, Gatling, k6)
4. Execute tests from load generators
5. Analyze & report (find bottlenecks: CPU? DB? Network?)
6. Tune & repeat

### Tools

| Tool | Characteristics |
|------|----------------|
| **Apache JMeter** | Classic, Java-based, UI-driven |
| **Gatling** | Modern, code-based, high-concurrency |
| **k6** | Lightweight, JavaScript-based, DevOps-friendly |

:::

## The Full CI/CD Pipeline

:::eli10

The CI/CD pipeline is like a factory assembly line for code. Your code goes through stations: it gets built, then unit tests check it, then security scanners look for problems, then performance tests run, and finally it gets deployed to users. If any station finds a problem, the line stops.

:::

:::eli15

A full CI/CD pipeline orchestrates all quality checks in sequence: code is committed, the project is built, unit tests and SAST run early, SCA scans dependencies, then UI/DAST and performance tests execute against the deployed application, followed by monitoring in production. This ensures every change passes through multiple quality gates before reaching users.

:::

:::eli20

```
Commit → Build → Unit Tests + SAST → SCA Scan → UI/DAST + Perf Tests → Deploy → Monitor
```

:::
