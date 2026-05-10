---
title: "Exam Strategy"
order: 93
moduleTitle: "COMP1045 - Mathematics for Computer Scientists 2"
tags: ["exam-strategy", "revision", "time-management"]
---

# Exam Strategy

## Time Allocation

| Section | Suggested Time | Notes |
|---------|---------------|-------|
| Calculus (differentiation & integration) | 25% | Standard techniques -- practise until fluent |
| Series & convergence | 15% | Taylor/Maclaurin, convergence tests |
| Differential equations | 25% | Separable, integrating factor, 2nd order |
| Probability & distributions | 25% | Binomial, Poisson, Normal -- formula application |
| Vectors, matrices & transformations | 10% | If included; usually from Maths 1 overlap |

## Topic Weighting

- **High weight:** Integration techniques, ODEs (first and second order), probability distributions
- **Medium weight:** Series (Taylor/Maclaurin, convergence tests), differentiation, expected value/variance
- **Lower weight:** Laplace transforms (if covered), graph theory basics

## Question Types to Expect

1. **Differentiation** -- chain rule, product rule, partial derivatives, implicit differentiation
2. **Integration** -- by parts, substitution, partial fractions
3. **Series** -- determine convergence, find Taylor/Maclaurin expansion, radius of convergence
4. **ODEs** -- solve separable, linear first-order (integrating factor), second-order homogeneous/non-homogeneous
5. **Probability** -- calculate probabilities using Binomial, Poisson, Normal distributions
6. **Expected value & variance** -- compute E[X], Var(X) for given distributions

## Key Formulas to Memorise

- Chain rule: $\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$
- Integration by parts: $\int u \, dv = uv - \int v \, du$
- Geometric series: $\sum ar^n = \frac{a}{1-r}$, $|r| < 1$
- Taylor series: $f(x) = \sum \frac{f^{(n)}(a)}{n!}(x-a)^n$
- Integrating factor: $\mu = e^{\int P(x) dx}$
- Characteristic equation: $ar^2 + br + c = 0$ for $ay'' + by' + cy = 0$
- Binomial: $P(X=k) = \binom{n}{k}p^k(1-p)^{n-k}$, $E[X]=np$, $Var(X)=np(1-p)$
- Poisson: $P(X=k) = \frac{\lambda^k e^{-\lambda}}{k!}$, $E[X]=Var(X)=\lambda$
- Normal: standardise with $Z = \frac{X - \mu}{\sigma}$

## Night Before Checklist -- Top 10 Things to Review

1. Differentiation rules: chain, product, quotient, common derivatives ($e^x$, $\ln x$, trig)
2. Integration techniques: by parts (LIATE rule), substitution, partial fractions
3. Taylor/Maclaurin series for $e^x$, $\sin x$, $\cos x$, $\ln(1+x)$, $(1+x)^n$
4. Convergence tests: ratio test, comparison test, geometric series condition
5. Solving separable ODEs: separate, integrate, apply initial conditions
6. Integrating factor method for first-order linear ODEs
7. Second-order ODEs: characteristic equation, complementary function + particular integral
8. Binomial distribution: formula, mean, variance, when to use (fixed n, independent trials)
9. Poisson distribution: formula, mean = variance = lambda, when to use (rare events)
10. Normal distribution: standardisation to Z, using Z-tables, 68-95-99.7 rule
