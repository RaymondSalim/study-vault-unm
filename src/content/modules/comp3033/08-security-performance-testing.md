---
title: "Security & Performance Testing"
order: 8
moduleTitle: "COMP3033 - Software Quality Assurance"
tags: ["security-testing", "sast", "dast", "sca", "owasp", "devsecops", "performance-testing", "load-testing", "shift-left"]
---

## Shift Left

**Goal**: Find and fix defects as early in the lifecycle as possible.

- Cost to fix increases exponentially across phases (Requirements → Design → Code → Test → Production)
- Instead of security/performance testing after deployment, integrate it continuously into CI/CD

## DevSecOps

A cultural and technical shift to integrate security into the DevOps process:
- Security is **everyone's** responsibility, not just a separate team
- Relies on automation to provide fast feedback
- Goal: make the secure path the easiest path

## The Automated Security Testing Triad

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

## SQL Injection Prevention

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

## OWASP Top 10 (2021)

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

## Performance Testing

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

## The Full CI/CD Pipeline

```
Commit → Build → Unit Tests + SAST → SCA Scan → UI/DAST + Perf Tests → Deploy → Monitor
```
