---
title: "Flashcards"
order: 92
moduleTitle: "COMP1045 - Mathematics for Computer Scientists 2"
tags: ["flashcards", "revision", "quick-review"]
---

# Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | What is the derivative of $e^{ax}$? | $ae^{ax}$. |
| 2 | What is the chain rule? | If $y = f(g(x))$, then $\frac{dy}{dx} = f'(g(x)) \cdot g'(x)$. |
| 3 | What is the integral of $\frac{1}{x}$? | $\ln|x| + C$. |
| 4 | What is a convergent series? | A series whose partial sums approach a finite limit as the number of terms increases. |
| 5 | What is the geometric series sum formula (infinite)? | $\sum_{n=0}^{\infty} ar^n = \frac{a}{1-r}$ for $|r| < 1$. |
| 6 | What is the Maclaurin series for $e^x$? | $\sum_{n=0}^{\infty} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \ldots$ |
| 7 | What is a first-order ODE? | A differential equation involving the first derivative $\frac{dy}{dx}$ but no higher derivatives. |
| 8 | How do you solve a separable ODE? | Separate variables: $g(y) \, dy = f(x) \, dx$, then integrate both sides. |
| 9 | What is the integrating factor for $\frac{dy}{dx} + P(x)y = Q(x)$? | $\mu(x) = e^{\int P(x) \, dx}$. |
| 10 | What is the probability mass function (PMF)? | A function giving the probability that a discrete random variable equals each possible value. |
| 11 | What is the expected value of a discrete random variable? | $E[X] = \sum_x x \cdot P(X = x)$. |
| 12 | What is the variance formula? | $\text{Var}(X) = E[X^2] - (E[X])^2$. |
| 13 | What is the Binomial distribution? | Models the number of successes in n independent Bernoulli trials: $P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}$. |
| 14 | What is the Poisson distribution? | Models rare events in a fixed interval: $P(X=k) = \frac{\lambda^k e^{-\lambda}}{k!}$, mean = variance = $\lambda$. |
| 15 | What is the Normal distribution PDF? | $f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$. |
| 16 | What is integration by parts? | $\int u \, dv = uv - \int v \, du$. |
| 17 | What is the ratio test for series convergence? | If $\lim_{n \to \infty} \left|\frac{a_{n+1}}{a_n}\right| < 1$, the series converges absolutely. |
| 18 | What is a partial derivative? | The derivative of a multivariable function with respect to one variable while holding others constant. |
| 19 | What is the Taylor series expansion about $x = a$? | $f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^n$. |
| 20 | What is the complementary function of a 2nd-order linear ODE? | The general solution to the homogeneous equation $ay'' + by' + cy = 0$, found via the characteristic equation $ar^2 + br + c = 0$. |
| 21 | What is the standard deviation? | The square root of the variance: $\sigma = \sqrt{\text{Var}(X)}$. |
| 22 | When does the geometric series diverge? | When $|r| \geq 1$. |
| 23 | What is the product rule? | $\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)$. |
| 24 | What is the Laplace transform of $f(t)$? | $F(s) = \int_0^{\infty} e^{-st} f(t) \, dt$. |
| 25 | What is the Central Limit Theorem? | The sum (or mean) of many independent random variables tends toward a Normal distribution, regardless of the original distribution. |
