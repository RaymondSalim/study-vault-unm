---
title: "Exam Preparation & Synthesis"
order: 10
moduleTitle: "COMP3033 - Software Quality Assurance"
tags: ["exam-prep", "synthesis", "worked-examples", "countzeroes", "path-testing"]
---

## Key Exam Topics & Worked Examples

### 1. Fault → Error → Failure Analysis

Given the `countZeroes` method:

```java
public static int countZeroes(int[] a) {
    int count = 0;
    for (int i = 1; i < a.length; i++) { // FAULT: i=1 instead of i=0
        if (a[i] == 0)
            count++;
    }
    return count;
}
```

**Identify program states**:

| State | Correct? | Why |
|-------|----------|-----|
| `a=[0,3,7]; count=0; i=null; PC: int i=1` | ✅ | Before loop starts |
| `a=[0,3,7]; count=0; i=3; PC: return count` | ❌ | Should be count=1 (missed a[0]=0) |
| `a=[1,4,0]; count=0; i=2; PC: i<a.length` | ✅ | Haven't reached a[2]=0 yet |
| `a=[1,4,0]; count=1; i=3; PC: return count` | ✅ | Correctly counted a[2]=0 |

### 2. Input Space Partitioning (countZeroes)

**Functionality-based characteristic design** for `int[] a`:

| Partition | Characteristic | Example Input | Expected |
|-----------|---------------|---------------|----------|
| $p_1$ | No zero elements | `[6,1,4,2,7]` | 0 |
| $p_2$ | Some (not all) zero elements | `[1,0,0,3,0]` | 3 |
| $p_3$ | All zero elements | `[0,0,0,0,0]` | 5 |

### 3. Path Testing (countZeroes)

**CFG Construction** → Calculate cyclomatic complexity:

$M = E - N + 2 = 8 - 7 + 2 = 3$

Three linearly independent paths needed:

| # | Path | Input | Expected |
|---|------|-------|----------|
| 1 | 1–2–3–7 (skip loop) | `[]` | 0 |
| 2 | 1–2–3–4–5–6–3–7 (loop, zero found) | `[0]` | 1 |
| 3 | 1–2–3–4–6–3–7 (loop, no zero) | `[1]` | 0 |

### 4. Security Code Analysis

Given a `searchProducts` method:

```java
String apiKey = "sk_live_AlzaSyDsT5...";   // VULNERABILITY 1
String sql = "SELECT * FROM products WHERE name LIKE '%" + searchTerm + "%'";  // VULNERABILITY 2
```

| # | Vulnerability | Why Dangerous | Fix |
|---|--------------|---------------|-----|
| 1 | Hardcoded secret | Visible in source/VCS, can be stolen | Use environment variables or secrets manager |
| 2 | SQL injection | Attacker can manipulate query | Use parameterised queries (prepared statements) |

### 5. Performance Testing Scenarios

| Scenario | Test Type | Reasoning |
|----------|-----------|-----------|
| "Find maximum users before crash for Flash Sale" | **Stress** | Goal is to find breaking point |
| "Verify Checkout API responds in 500ms at 100 TPS for 1 hour" | **Load** | Verifying NFR under expected load |
| "App becomes slow after 3 days, restarts fix it" | **Soak** | Time-dependent issue (memory leak) |

### 6. Organisational vs Project Level

| Activity | Level | Reasoning |
|----------|-------|-----------|
| Define company-wide coding standard | **Organisational** | Infrastructure for all projects |
| Choose security as top priority for QuickCart app | **Project** | Specific quality plan for one project |

## Synthesis: How Everything Connects

```
Quality Definition (ISO 25010, McCall)
        ↓
NFRs (specific, measurable, testable)
        ↓
Test Design (MDTD: partitioning, path testing)
        ↓
Test Automation (JUnit, Espresso)
        ↓
CI/CD Pipeline (SAST, SCA, DAST, Perf tests)
        ↓
SQA Management (plans, audits, metrics)
        ↓
Process Improvement (metrics, feedback loops)
```
