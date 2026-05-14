---
title: "Distributions"
order: 7
moduleTitle: "COMP1045 - Maths for CS 2"
tags: ["probability", "distributions", "binomial", "poisson", "normal", "expectation", "variance"]
---

# Distributions

## Random Variables

:::eli10

A random variable is a number that comes from a random process. If you roll a die, the number you get is a random variable. Discrete random variables give you countable results (like 1, 2, 3, 4, 5, 6). Continuous random variables can be any number in a range (like exactly how tall someone is).

:::

:::eli15

A random variable assigns numerical values to outcomes of a random experiment. Discrete random variables have countable outcomes described by a probability mass function (PMF). Continuous random variables take values in intervals, described by a probability density function (PDF) where probabilities are areas under the curve. Each type has formulas for expectation (average outcome) and variance (spread).

:::

:::eli20

| Type | Definition | Example |
|------|-----------|---------|
| Discrete | Countable outcomes | Number of heads in 10 flips |
| Continuous | Uncountable outcomes (intervals) | Height, time |

:::

## Expectation & Variance

:::eli10

Expectation (or expected value) is the average outcome you would get if you repeated the experiment many times. Variance measures how spread out the results are -- high variance means outcomes vary a lot, low variance means they cluster near the average.

:::

:::eli15

Expectation E[X] is the weighted average of all outcomes (each outcome weighted by its probability). It represents the long-run average. Variance Var(X) measures the average squared deviation from the mean -- how spread out the distribution is. Key properties: expectation is linear (E[aX + b] = aE[X] + b, E[X + Y] = E[X] + E[Y] always), variance scales quadratically (Var(aX) = a^2 Var(X)), and for independent variables, Var(X + Y) = Var(X) + Var(Y).

:::

:::eli20

| Measure | Discrete | Continuous |
|---------|----------|-----------|
| Expectation | $E[X] = \sum x \cdot P(X=x)$ | $E[X] = \int_{-\infty}^{\infty} x f(x)\,dx$ |
| Variance | $\text{Var}(X) = E[(X-\mu)^2] = E[X^2] - (E[X])^2$ | Same formula |
| Std deviation | $\sigma = \sqrt{\text{Var}(X)}$ | Same |

### Properties

| Property | Formula |
|----------|---------|
| Linearity of expectation | $E[aX + b] = aE[X] + b$ |
| Sum | $E[X + Y] = E[X] + E[Y]$ (always) |
| Variance scaling | $\text{Var}(aX + b) = a^2 \text{Var}(X)$ |
| Independent sum | $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$ (if independent) |

:::

## Discrete Distributions

:::eli10

Common discrete distributions model specific real-world scenarios. A Bernoulli is a single coin flip. A Binomial counts successes in multiple flips. A Poisson counts rare events (like how many emails arrive per hour). A Geometric counts how many tries until your first success.

:::

:::eli15

Key discrete distributions model common situations. Bernoulli(p): single trial with success probability p. Binomial(n, p): number of successes in n independent trials. Poisson(lambda): count of events in a fixed interval (good for rare events; approximates Binomial when n is large and p is small). Geometric(p): number of trials until the first success. Each has known formulas for expectation and variance that save you from computing from scratch.

:::

:::eli20

### Bernoulli($p$)

Single trial with success probability $p$.

| Parameter | Value |
|-----------|-------|
| PMF | $P(X=1) = p$, $P(X=0) = 1-p$ |
| $E[X]$ | $p$ |
| $\text{Var}(X)$ | $p(1-p)$ |

### Binomial($n, p$)

Number of successes in $n$ independent Bernoulli trials.

| Parameter | Value |
|-----------|-------|
| PMF | $P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}$ |
| $E[X]$ | $np$ |
| $\text{Var}(X)$ | $np(1-p)$ |

### Poisson($\lambda$)

Number of events in a fixed interval (rare events).

| Parameter | Value |
|-----------|-------|
| PMF | $P(X=k) = \frac{e^{-\lambda}\lambda^k}{k!}$ |
| $E[X]$ | $\lambda$ |
| $\text{Var}(X)$ | $\lambda$ |

> **Poisson approximation:** Binomial$(n, p)$ with large $n$, small $p$ → Poisson($np$).

### Geometric($p$)

Number of trials until first success.

| Parameter | Value |
|-----------|-------|
| PMF | $P(X=k) = (1-p)^{k-1}p$ |
| $E[X]$ | $1/p$ |
| $\text{Var}(X)$ | $(1-p)/p^2$ |

:::

## Continuous Distributions

:::eli10

Continuous distributions describe things that can take any value in a range. The Uniform distribution is like spinning a fair wheel -- every position is equally likely. The Exponential distribution models waiting times. The Normal (bell curve) distribution appears everywhere in nature -- heights, test scores, and measurement errors all follow it.

:::

:::eli15

Key continuous distributions: Uniform(a,b) gives equal probability to all values in [a,b]. Exponential(lambda) models time between events (memoryless: past waiting does not affect future probability). Normal(mu, sigma^2) is the famous bell curve -- characterized by mean mu and variance sigma^2. The Central Limit Theorem explains why the Normal appears so often: averages of many random variables tend toward Normal regardless of the original distribution.

:::

:::eli20

### Uniform($a, b$)

| Parameter | Value |
|-----------|-------|
| PDF | $f(x) = \frac{1}{b-a}$ for $a \leq x \leq b$ |
| $E[X]$ | $\frac{a+b}{2}$ |
| $\text{Var}(X)$ | $\frac{(b-a)^2}{12}$ |

### Exponential($\lambda$)

Time between Poisson events.

| Parameter | Value |
|-----------|-------|
| PDF | $f(x) = \lambda e^{-\lambda x}$ for $x \geq 0$ |
| CDF | $F(x) = 1 - e^{-\lambda x}$ |
| $E[X]$ | $1/\lambda$ |
| $\text{Var}(X)$ | $1/\lambda^2$ |
| Memoryless | $P(X > s+t \mid X > s) = P(X > t)$ |

### Normal($\mu, \sigma^2$)

| Parameter | Value |
|-----------|-------|
| PDF | $f(x) = \frac{1}{\sigma\sqrt{2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}$ |
| $E[X]$ | $\mu$ |
| $\text{Var}(X)$ | $\sigma^2$ |
| Standardise | $Z = \frac{X - \mu}{\sigma} \sim N(0,1)$ |

### 68-95-99.7 Rule

| Range | Probability |
|-------|------------|
| $\mu \pm 1\sigma$ | 68.3% |
| $\mu \pm 2\sigma$ | 95.4% |
| $\mu \pm 3\sigma$ | 99.7% |

:::

## Hypothesis Testing (Overview)

:::eli10

Hypothesis testing is a way to use data to make decisions. You start with an assumption (like "this coin is fair"), collect data, and check whether the data is too surprising to be explained by your assumption. If it is, you reject the assumption.

:::

:::eli15

Hypothesis testing formalises statistical decision-making. You state a null hypothesis H0 (status quo) and an alternative H1. Choose a significance level alpha (typically 0.05 = 5% chance of rejecting H0 when it is true). Compute a test statistic from your data and compare to what is expected under H0. If the result is too extreme (p-value < alpha), reject H0. Type I errors reject a true H0; Type II errors fail to reject a false H0. Power = 1 - beta is the probability of correctly detecting a real effect.

:::

:::eli20

| Step | Action |
|------|--------|
| 1 | State $H_0$ (null) and $H_1$ (alternative) |
| 2 | Choose significance level $\alpha$ (typically 0.05) |
| 3 | Compute test statistic |
| 4 | Find p-value or compare to critical value |
| 5 | Reject $H_0$ if p-value $< \alpha$ |

| Error | Definition |
|-------|-----------|
| Type I ($\alpha$) | Reject $H_0$ when it's true (false positive) |
| Type II ($\beta$) | Fail to reject $H_0$ when it's false (false negative) |
| Power | $1 - \beta$ = probability of correctly rejecting false $H_0$ |

---

<details>
<summary><strong>Practice: Binomial Distribution</strong></summary>

**Q:** A fair coin is flipped 8 times. What is $P(\text{exactly 5 heads})$?

**A:** $X \sim \text{Binomial}(8, 0.5)$

$$P(X=5) = \binom{8}{5}(0.5)^5(0.5)^3 = 56 \times \frac{1}{256} = \frac{56}{256} = 0.21875$$

</details>

<details>
<summary><strong>Practice: Poisson Distribution</strong></summary>

**Q:** A server receives 3 requests per minute on average. What is $P(\text{exactly 5 requests in a minute})$?

**A:** $X \sim \text{Poisson}(3)$

$$P(X=5) = \frac{e^{-3} \cdot 3^5}{5!} = \frac{0.0498 \times 243}{120} = \frac{12.1}{120} \approx 0.1008$$

</details>

<details>
<summary><strong>Practice: Normal Distribution</strong></summary>

**Q:** Heights are $N(170, 25)$ (mean 170 cm, variance 25). What is $P(X > 175)$?

**A:** Standardise: $Z = \frac{175 - 170}{5} = 1$

$P(X > 175) = P(Z > 1) = 1 - \Phi(1) = 1 - 0.8413 = 0.1587$

About 15.87% of people are taller than 175 cm.

</details>

:::
