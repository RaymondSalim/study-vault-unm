---
title: "Exam Solution 2020-2021 (Paper 2)"
order: 99
moduleTitle: "COMP1045 - Maths for CS 2"
tags: ["past-papers", "solutions", "exam"]
---

## COMP1045 Mathematics for Computer Scientists 2 — Spring 2020-2021 (Paper 2)

---

## SECTION A

---

### Question 1: Relations/Functions/Matrices (20 marks)

#### (a) Relation xRy: x - y is divisible by 4 AND x > y, where x, y in N [6 marks]

We check the three properties:

**Reflexivity:** A relation is reflexive if xRx for all x in N.
- For xRx, we need: (x - x) is divisible by 4 AND x > x.
- x - x = 0, which is divisible by 4. However, x > x is **false** for all x.
- Therefore, the relation is **not reflexive**.

**Antisymmetry:** A relation is antisymmetric if xRy and yRx implies x = y.
- Suppose xRy and yRx. Then x > y and y > x.
- But x > y and y > x cannot both be true simultaneously.
- Therefore, the premise (xRy and yRx) is always false, making the implication **vacuously true**.
- The relation **is antisymmetric**.

**Transitivity:** A relation is transitive if xRy and yRz implies xRz.
- Suppose xRy and yRz. Then:
  - (x - y) is divisible by 4, so x - y = 4k for some integer k >= 1
  - (y - z) is divisible by 4, so y - z = 4m for some integer m >= 1
  - x > y and y > z
- We need to show xRz:
  - x - z = (x - y) + (y - z) = 4k + 4m = 4(k + m), which is divisible by 4.
  - Since x > y and y > z, we have x > z.
- Both conditions are satisfied, so the relation **is transitive**.

**Conclusion:**
- Not reflexive, antisymmetric, transitive.
- This is **not an equivalence relation** (fails reflexivity, and would also need symmetry).
- This is **not a (partial) order relation** in the standard sense because it fails reflexivity. However, it is a **strict partial order** (irreflexive, antisymmetric, transitive).

---

#### (b) Prove (AB)^{-1} = B^{-1}A^{-1} and verify [5 marks]

**Proof:**

We need to show that B^{-1}A^{-1} is the inverse of AB. A matrix X is the inverse of AB if (AB)X = I and X(AB) = I.

Compute (AB)(B^{-1}A^{-1}):

$$
(AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = A \cdot I \cdot A^{-1} = AA^{-1} = I
$$

Compute (B^{-1}A^{-1})(AB):

$$
(B^{-1}A^{-1})(AB) = B^{-1}(A^{-1}A)B = B^{-1} \cdot I \cdot B = B^{-1}B = I
$$

Since both products give I, we conclude (AB)^{-1} = B^{-1}A^{-1}. QED.

**Verification with given matrices:**

A = [[2,0,1],[1,1,0],[3,2,1]], B = [[1,0,1],[1,1,0],[2,2,2]]

**Step 1: Compute AB**

AB = [[2(1)+0(1)+1(2), 2(0)+0(1)+1(2), 2(1)+0(0)+1(2)],
      [1(1)+1(1)+0(2), 1(0)+1(1)+0(2), 1(1)+1(0)+0(2)],
      [3(1)+2(1)+1(2), 3(0)+2(1)+1(2), 3(1)+2(0)+1(2)]]

AB = [[4, 2, 4],
      [2, 1, 1],
      [7, 4, 5]]

**Step 2: Compute A^{-1}**

Using the adjugate method or row reduction on [A|I]:

det(A) = 2(1·1 - 0·2) - 0(1·1 - 0·3) + 1(1·2 - 1·3) = 2(1) - 0 + 1(-1) = 1

Since det(A) = 1, we compute the cofactor matrix:

C11 = (1·1 - 0·2) = 1, C12 = -(1·1 - 0·3) = -1, C13 = (1·2 - 1·3) = -1
C21 = -(0·1 - 1·2) = 2, C22 = (2·1 - 1·3) = -1, C23 = -(2·2 - 0·3) = -4
C31 = (0·0 - 1·1) = -1, C32 = -(2·0 - 1·1) = 1, C33 = (2·1 - 0·1) = 2

A^{-1} = (1/det(A)) * adj(A) = [[1, 2, -1], [-1, -1, 1], [-1, -4, 2]]

**Step 3: Compute B^{-1}**

det(B) = 1(1·2 - 0·2) - 0(1·2 - 0·2) + 1(1·2 - 1·2) = 1(2) - 0 + 1(0) = 2

Cofactors:
C11 = (1·2 - 0·2) = 2, C12 = -(1·2 - 0·2) = -2, C13 = (1·2 - 1·2) = 0
C21 = -(0·2 - 1·2) = 2, C22 = (1·2 - 1·2) = 0, C23 = -(1·2 - 0·2) = -2
C31 = (0·0 - 1·1) = -1, C32 = -(1·0 - 1·1) = 1, C33 = (1·1 - 0·1) = 1

B^{-1} = (1/2) * [[2, 2, -1], [-2, 0, 1], [0, -2, 1]]

**Step 4: Compute B^{-1}A^{-1}**

B^{-1}A^{-1} = (1/2)[[2,2,-1],[-2,0,1],[0,-2,1]] * [[1,2,-1],[-1,-1,1],[-1,-4,2]]

Row 1: (1/2)[2(1)+2(-1)+(-1)(-1), 2(2)+2(-1)+(-1)(-4), 2(-1)+2(1)+(-1)(2)]
      = (1/2)[2-2+1, 4-2+4, -2+2-2] = (1/2)[1, 6, -2]

Row 2: (1/2)[-2(1)+0(-1)+1(-1), -2(2)+0(-1)+1(-4), -2(-1)+0(1)+1(2)]
      = (1/2)[-2+0-1, -4+0-4, 2+0+2] = (1/2)[-3, -8, 4]

Row 3: (1/2)[0(1)+(-2)(-1)+1(-1), 0(2)+(-2)(-1)+1(-4), 0(-1)+(-2)(1)+1(2)]
      = (1/2)[0+2-1, 0+2-4, 0-2+2] = (1/2)[1, -2, 0]

B^{-1}A^{-1} = [[1/2, 3, -1], [-3/2, -4, 2], [1/2, -1, 0]]

**Step 5: Compute (AB)^{-1} directly**

det(AB) = det(A)·det(B) = 1·2 = 2

Computing (AB)^{-1} using the cofactor method on AB = [[4,2,4],[2,1,1],[7,4,5]]:

C11 = (1·5 - 1·4) = 1, C12 = -(2·5 - 1·7) = -3, C13 = (2·4 - 1·7) = 1
C21 = -(2·5 - 4·4) = 6, C22 = (4·5 - 4·7) = -8, C23 = -(4·4 - 2·7) = -2
C31 = (2·1 - 4·1) = -2, C32 = -(4·1 - 4·2) = 4, C33 = (4·1 - 2·2) = 0

(AB)^{-1} = (1/2) * [[1, 6, -2], [-3, -8, 4], [1, -2, 0]]
           = [[1/2, 3, -1], [-3/2, -4, 2], [1/2, -1, 0]]

**Verified:** (AB)^{-1} = B^{-1}A^{-1}

---

#### (c) Verify (AB)^T = B^T A^T [5 marks]

A = [[1,0,2],[3,5,1],[2,2,0]], B = [[1,0,3],[1,-1,0],[4,2,1]]

**Step 1: Compute AB**

AB = [[1(1)+0(1)+2(4), 1(0)+0(-1)+2(2), 1(3)+0(0)+2(1)],
      [3(1)+5(1)+1(4), 3(0)+5(-1)+1(2), 3(3)+5(0)+1(1)],
      [2(1)+2(1)+0(4), 2(0)+2(-1)+0(2), 2(3)+2(0)+0(1)]]

AB = [[9, 4, 5],
      [12, -3, 10],
      [4, -2, 6]]

**Step 2: Compute (AB)^T**

(AB)^T = [[9, 12, 4],
          [4, -3, -2],
          [5, 10, 6]]

**Step 3: Compute B^T and A^T**

B^T = [[1, 1, 4],
       [0, -1, 2],
       [3, 0, 1]]

A^T = [[1, 3, 2],
       [0, 5, 2],
       [2, 1, 0]]

**Step 4: Compute B^T A^T**

B^T A^T = [[1(1)+1(3)+4(2), 1(0)+1(5)+4(2), 1(2)+1(1)+4(0)],
           [0(1)+(-1)(3)+2(2), 0(0)+(-1)(5)+2(2), 0(2)+(-1)(1)+2(0)],
           [3(1)+0(3)+1(2), 3(0)+0(5)+1(2), 3(2)+0(1)+1(0)]]

B^T A^T = [[1+3+8, 0+5+8, 2+1+0],
           [0-3+4, 0-5+4, 0-1+0],
           [3+0+2, 0+0+2, 6+0+0]]

B^T A^T = [[12, 13, 3],
           [1, -1, -1],
           [5, 2, 6]]

Wait, let me recompute more carefully.

B^T A^T:
- Row 1, Col 1: 1(1) + 1(0) + 4(2) = 1 + 0 + 8 = 9
- Row 1, Col 2: 1(3) + 1(5) + 4(1) = 3 + 5 + 4 = 12
- Row 1, Col 3: 1(2) + 1(2) + 4(0) = 2 + 2 + 0 = 4
- Row 2, Col 1: 0(1) + (-1)(0) + 2(2) = 0 + 0 + 4 = 4
- Row 2, Col 2: 0(3) + (-1)(5) + 2(1) = 0 - 5 + 2 = -3
- Row 2, Col 3: 0(2) + (-1)(2) + 2(0) = 0 - 2 + 0 = -2
- Row 3, Col 1: 3(1) + 0(0) + 1(2) = 3 + 0 + 2 = 5
- Row 3, Col 2: 3(3) + 0(5) + 1(1) = 9 + 0 + 1 = 10
- Row 3, Col 3: 3(2) + 0(2) + 1(0) = 6 + 0 + 0 = 6

B^T A^T = [[9, 12, 4],
           [4, -3, -2],
           [5, 10, 6]]

**Conclusion:** (AB)^T = B^T A^T = [[9,12,4],[4,-3,-2],[5,10,6]]. Verified.

---

#### (d) Linear combination of columns in B [4 marks]

B = [[1,2,3,7],[2,0,1,5],[1,1,2,5],[0,2,1,3]]

Let the columns be c1, c2, c3, c4.

We check if c4 is a linear combination of c1, c2, c3, i.e., c4 = a*c1 + b*c2 + c*c3.

This gives the system:
- a + 2b + 3c = 7
- 2a + 0b + c = 5
- a + b + 2c = 5
- 0a + 2b + c = 3

From equation 2: 2a + c = 5, so c = 5 - 2a.

From equation 4: 2b + c = 3, substituting c: 2b + 5 - 2a = 3, so 2b = 2a - 2, thus b = a - 1.

From equation 1: a + 2(a-1) + 3(5-2a) = 7
- a + 2a - 2 + 15 - 6a = 7
- -3a + 13 = 7
- -3a = -6
- a = 2

Therefore: a = 2, b = 2 - 1 = 1, c = 5 - 4 = 1.

**Verification with equation 3:** a + b + 2c = 2 + 1 + 2(1) = 5. Correct.

**Conclusion:** Column 4 is a linear combination of columns 1, 2, and 3:

**c4 = 2c1 + c2 + c3**

Verification:
- 2(1) + 2 + 3 = 7 ✓
- 2(2) + 0 + 1 = 5 ✓
- 2(1) + 1 + 2 = 5 ✓
- 2(0) + 2 + 1 = 3 ✓

---

### Question 2: Systems of Linear Equations - Matrix Theory (20 marks)

#### (a) Cramer's system check and solution [5 marks]

System: {2x - y + 2z = 2, x + 2z = 2, 2x - y = 3}

The coefficient matrix is:
A = [[2, -1, 2],
     [1,  0, 2],
     [2, -1, 0]]

**Step 1: Check if this is a Cramer's system**

A system is a Cramer's system if det(A) != 0.

det(A) = 2(0·0 - 2·(-1)) - (-1)(1·0 - 2·2) + 2(1·(-1) - 0·2)
       = 2(0 + 2) + 1(0 - 4) + 2(-1 - 0)
       = 4 - 4 - 2
       = -2

Since det(A) = -2 != 0, this **is a Cramer's system** with a unique solution.

**Step 2: Solve using Cramer's rule**

For x, replace column 1 with [2, 2, 3]:
D_x = det([[2,-1,2],[2,0,2],[3,-1,0]])
    = 2(0·0 - 2·(-1)) - (-1)(2·0 - 2·3) + 2(2·(-1) - 0·3)
    = 2(2) + 1(0-6) + 2(-2)
    = 4 - 6 - 4 = -6

x = D_x / det(A) = -6 / (-2) = 3

For y, replace column 2 with [2, 2, 3]:
D_y = det([[2,2,2],[1,2,2],[2,3,0]])
    = 2(2·0 - 2·3) - 2(1·0 - 2·2) + 2(1·3 - 2·2)
    = 2(0-6) - 2(0-4) + 2(3-4)
    = -12 + 8 - 2 = -6

y = D_y / det(A) = -6 / (-2) = 3

For z, replace column 3 with [2, 2, 3]:
D_z = det([[2,-1,2],[1,0,2],[2,-1,3]])
    = 2(0·3 - 2·(-1)) - (-1)(1·3 - 2·2) + 2(1·(-1) - 0·2)
    = 2(0+2) + 1(3-4) + 2(-1)
    = 4 - 1 - 2 = 1

z = D_z / det(A) = 1 / (-2) = -1/2

**Solution: x = 3, y = 3, z = -1/2**

**Verification:**
- 2(3) - 3 + 2(-1/2) = 6 - 3 - 1 = 2 ✓
- 3 + 2(-1/2) = 3 - 1 = 2 ✓
- 2(3) - 3 = 6 - 3 = 3 ✓

---

#### (b) Ranks and compatibility [5 marks]

System: {2x - y + z = 1, 4x - 2y + 2z = 2, -2x + y - z = 1}

Incomplete (coefficient) matrix:
A = [[2, -1, 1],
     [4, -2, 2],
     [-2, 1, -1]]

Complete (augmented) matrix:
[A|b] = [[2, -1, 1, | 1],
          [4, -2, 2, | 2],
          [-2, 1, -1, | 1]]

**Step 1: Find rank of A**

Row reduce A:
- R2 = R2 - 2R1: [0, 0, 0]
- R3 = R3 + R1: [0, 0, 0]

Reduced form: [[2, -1, 1], [0, 0, 0], [0, 0, 0]]

rank(A) = 1

**Step 2: Find rank of [A|b]**

Row reduce [A|b]:
- R2 = R2 - 2R1: [0, 0, 0, | 0]
- R3 = R3 + R1: [0, 0, 0, | 2]

Reduced form: [[2, -1, 1, | 1], [0, 0, 0, | 0], [0, 0, 0, | 2]]

Row 3 gives: 0x + 0y + 0z = 2, which is impossible.

rank([A|b]) = 2

**Step 3: Assess compatibility**

By the Rouche-Capelli theorem: a system is compatible iff rank(A) = rank([A|b]).

Here rank(A) = 1 and rank([A|b]) = 2. Since rank(A) != rank([A|b]), the system is **incompatible (inconsistent)** -- it has no solution.

---

#### (c) Solve the system [5 marks]

System: {x - y + z = 1, 2x - 2y + 2z = 2, x - z = 0}

Augmented matrix:
[[1, -1, 1, | 1],
 [2, -2, 2, | 2],
 [1,  0, -1, | 0]]

**Row reduction:**
- R2 = R2 - 2R1: [0, 0, 0, | 0]
- R3 = R3 - R1: [0, 1, -2, | -1]

Reduced form:
[[1, -1, 1, | 1],
 [0, 1, -2, | -1],
 [0, 0, 0, | 0]]

rank(A) = rank([A|b]) = 2, n = 3 unknowns.

Number of free variables = n - rank = 3 - 2 = 1.

The system has **infinitely many solutions** (a one-parameter family).

**Solve:**

Let z = t (free parameter), where t is in R.

From Row 2: y - 2z = -1, so y = 2t - 1.

From Row 1: x - y + z = 1, so x = 1 + y - z = 1 + (2t-1) - t = t.

**Solution:** (x, y, z) = (t, 2t - 1, t) = t(1, 2, 1) + (0, -1, 0), for all t in R.

There are **infinitely many solutions** (specifically, a 1-parameter family since we have one degree of freedom).

---

#### (d) Rank and solution of homogeneous system [5 marks]

System: {x - y + z = 0, 2x - 2y + 2z = 0, x - z = 0}

Coefficient matrix:
A = [[1, -1, 1],
     [2, -2, 2],
     [1, 0, -1]]

**Row reduction:**
- R2 = R2 - 2R1: [0, 0, 0]
- R3 = R3 - R1: [0, 1, -2]

Reduced form:
[[1, -1, 1],
 [0, 1, -2],
 [0, 0, 0]]

**rank(A) = 2**

Since n = 3 and rank = 2, dimension of solution space = n - rank = 1.

**Solve:**

Let z = t (free parameter).

From Row 2: y = 2t.

From Row 1: x - y + z = 0, so x = y - z = 2t - t = t.

**Solution:** (x, y, z) = (t, 2t, t) = t(1, 2, 1), for all t in R.

The solution space is a line through the origin spanned by the vector (1, 2, 1). It has dimension 1 (which equals n - rank(A) = 3 - 2 = 1, confirming our result).

---

### Question 3: Systems of Linear Equations - Direct Methods (20 marks)

#### (a) Gaussian elimination [6 marks]

System: {x + 2y - 3z = 2, 2x + y - z = 0, x - 4y + 4z = 1}

Augmented matrix:
[[1,  2, -3, | 2],
 [2,  1, -1, | 0],
 [1, -4,  4, | 1]]

**Step 1: Eliminate first column**
- R2 = R2 - 2R1: [0, -3, 5, | -4]
- R3 = R3 - R1: [0, -6, 7, | -1]

Matrix:
[[1, 2, -3, | 2],
 [0, -3, 5, | -4],
 [0, -6, 7, | -1]]

**Step 2: Eliminate second column**
- R3 = R3 - 2R2: [0, 0, -3, | 7]

Upper triangular form:
[[1, 2, -3, | 2],
 [0, -3, 5, | -4],
 [0, 0, -3, | 7]]

**Step 3: Back substitution**

From Row 3: -3z = 7, so **z = -7/3**

From Row 2: -3y + 5z = -4
- -3y + 5(-7/3) = -4
- -3y - 35/3 = -4
- -3y = -4 + 35/3 = -12/3 + 35/3 = 23/3
- **y = -23/9**

From Row 1: x + 2y - 3z = 2
- x + 2(-23/9) - 3(-7/3) = 2
- x - 46/9 + 7 = 2
- x - 46/9 + 63/9 = 2
- x + 17/9 = 2
- x = 2 - 17/9 = 18/9 - 17/9
- **x = 1/9**

**Solution: x = 1/9, y = -23/9, z = -7/3**

**Verification:**
- x + 2y - 3z = 1/9 + 2(-23/9) - 3(-7/3) = 1/9 - 46/9 + 7 = -45/9 + 7 = -5 + 7 = 2 ✓
- 2x + y - z = 2/9 + (-23/9) - (-7/3) = 2/9 - 23/9 + 21/9 = 0/9 = 0 ✓
- x - 4y + 4z = 1/9 - 4(-23/9) + 4(-7/3) = 1/9 + 92/9 - 84/9 = 9/9 = 1 ✓

---

#### (b) LU factorisation [7 marks]

System: {x + 4y - 3z = 2, 4x + 13y - 14z = 4, -x - 4y + 8z = 8}

Coefficient matrix:
A = [[1, 4, -3],
     [4, 13, -14],
     [-1, -4, 8]]

**Step 1: Gaussian elimination (tracking multipliers for L)**

R2 = R2 - 4R1: [0, -3, -2] (multiplier l21 = 4)
R3 = R3 + R1: [0, 0, 5] (multiplier l31 = -1)

After first elimination:
[[1, 4, -3],
 [0, -3, -2],
 [0, 0, 5]]

No further elimination needed (already upper triangular).

l32 = 0 (no operation needed for position (3,2))

**Step 2: Write L and U**

L = [[1, 0, 0],
     [4, 1, 0],
     [-1, 0, 1]]

U = [[1, 4, -3],
     [0, -3, -2],
     [0, 0, 5]]

**Verification: LU = A**

LU = [[1(1)+0+0, 1(4)+0+0, 1(-3)+0+0],
      [4(1)+1(0)+0, 4(4)+1(-3)+0, 4(-3)+1(-2)+0],
      [-1(1)+0+1(0), -1(4)+0+1(0), -1(-3)+0+1(5)]]

LU = [[1, 4, -3],
      [4, 13, -14],
      [-1, -4, 8]] = A ✓

**Step 3: Solve Ly = b (forward substitution)**

Ly = [2, 4, 8]:
[[1, 0, 0], [y1]   [2]
 [4, 1, 0], [y2] = [4]
 [-1, 0, 1]] [y3]   [8]

- y1 = 2
- 4y1 + y2 = 4 => y2 = 4 - 8 = -4
- -y1 + y3 = 8 => y3 = 8 + 2 = 10

y = [2, -4, 10]

**Step 4: Solve Ux = y (back substitution)**

[[1, 4, -3], [x]   [2]
 [0, -3, -2], [y] = [-4]
 [0, 0, 5]]  [z]   [10]

- 5z = 10 => **z = 2**
- -3y - 2z = -4 => -3y = -4 + 4 = 0 => **y = 0**
- x + 4y - 3z = 2 => x + 0 - 6 = 2 => **x = 8**

**Solution: x = 8, y = 0, z = 2**

**Verification:**
- x + 4y - 3z = 8 + 0 - 6 = 2 ✓
- 4x + 13y - 14z = 32 + 0 - 28 = 4 ✓
- -x - 4y + 8z = -8 + 0 + 16 = 8 ✓

---

#### (c) Gaussian elimination to LU factorisation [7 marks]

System: {4x - 3y + 5z = 3, y + 5z = 3, 28x - 20y + 41z = -5}

Coefficient matrix:
A = [[4, -3, 5],
     [0, 1, 5],
     [28, -20, 41]]

**Step 1: Gaussian elimination (tracking multipliers)**

R1 is already the pivot row. l21 = 0/4 = 0 (R2 already has 0 in first column).
R3 = R3 - 7R1: [28-28, -20+21, 41-35] = [0, 1, 6] (multiplier l31 = 7)

After first step:
[[4, -3, 5],
 [0, 1, 5],
 [0, 1, 6]]

R3 = R3 - R2: [0, 0, 1] (multiplier l32 = 1)

Upper triangular form:
[[4, -3, 5],
 [0, 1, 5],
 [0, 0, 1]]

**Step 2: Write L and U**

L = [[1, 0, 0],
     [0, 1, 0],
     [7, 1, 1]]

U = [[4, -3, 5],
     [0, 1, 5],
     [0, 0, 1]]

**Verification: LU = A**

LU = [[1(4)+0+0, 1(-3)+0+0, 1(5)+0+0],
      [0(4)+1(0)+0, 0(-3)+1(1)+0, 0(5)+1(5)+0],
      [7(4)+1(0)+1(0), 7(-3)+1(1)+1(0), 7(5)+1(5)+1(1)]]

LU = [[4, -3, 5],
      [0, 1, 5],
      [28, -20, 41]] = A ✓

**Step 3: Solve Ly = b (forward substitution)**

b = [3, 3, -5]

- y1 = 3
- y2 = 3
- 7y1 + y2 + y3 = -5 => 21 + 3 + y3 = -5 => y3 = -29

y = [3, 3, -29]

**Step 4: Solve Ux = y (back substitution)**

[[4, -3, 5], [x]   [3]
 [0, 1, 5],  [y] = [3]
 [0, 0, 1]]  [z]   [-29]

- z = -29
- y + 5(-29) = 3 => y = 3 + 145 = **148**
- 4x - 3(148) + 5(-29) = 3 => 4x - 444 - 145 = 3 => 4x = 592 => **x = 148**

**Solution: x = 148, y = 148, z = -29**

**Verification:**
- 4(148) - 3(148) + 5(-29) = 592 - 444 - 145 = 3 ✓
- 148 + 5(-29) = 148 - 145 = 3 ✓
- 28(148) - 20(148) + 41(-29) = 4144 - 2960 - 1189 = -5 ✓

**Equivalence of Gaussian elimination and LU factorisation:**

The Gaussian elimination process directly produces the LU factorisation. The multipliers used in elimination form the lower triangular matrix L (below the diagonal), while the resulting upper triangular system forms U. Solving Ax = b via Gaussian elimination is algebraically equivalent to:
1. Factoring A = LU
2. Solving Ly = b (forward substitution, equivalent to applying the elimination steps to b)
3. Solving Ux = y (back substitution, equivalent to the back substitution step of Gaussian elimination)

Both methods produce identical solutions because they perform the same arithmetic operations, just organized differently.

---

## SECTION B

---

### Question 1: Vector Spaces (20 marks)

#### (a) Prove W + S is a direct sum iff w1,...,wu, s1,...,sv are linearly independent [14 marks]

Let V be a vector space, W and S be subspaces of V with bases {w1,...,wu} and {s1,...,sv} respectively.

**Recall:** W + S = {w + s : w in W, s in S}. The sum W + S is a direct sum (written W ⊕ S) if and only if W ∩ S = {0}.

**Proof (=>): If W + S = W ⊕ S, then {w1,...,wu, s1,...,sv} are linearly independent.**

Assume W + S is a direct sum, meaning W ∩ S = {0}.

Suppose we have a linear combination equal to zero:
a1w1 + a2w2 + ... + auwu + b1s1 + b2s2 + ... + bvsv = 0

Rearranging:
a1w1 + ... + auwu = -(b1s1 + ... + bvsv)

The left side is a vector in W (since it is a linear combination of basis vectors of W).
The right side is a vector in S (since it is a linear combination of basis vectors of S).

Since both sides are equal, this vector lies in W ∩ S. But W ∩ S = {0} (since the sum is direct).

Therefore:
- a1w1 + ... + auwu = 0
- b1s1 + ... + bvsv = 0

Since {w1,...,wu} is a basis of W, they are linearly independent, so a1 = a2 = ... = au = 0.
Since {s1,...,sv} is a basis of S, they are linearly independent, so b1 = b2 = ... = bv = 0.

Thus all coefficients are zero, proving {w1,...,wu, s1,...,sv} are linearly independent.

**Proof (<=): If {w1,...,wu, s1,...,sv} are linearly independent, then W + S = W ⊕ S.**

Assume {w1,...,wu, s1,...,sv} are linearly independent.

We need to show W ∩ S = {0}.

Let v be in W ∩ S. Then:
- v in W, so v = a1w1 + ... + auwu for some scalars ai
- v in S, so v = b1s1 + ... + bvsv for some scalars bj

Since both expressions equal v:
a1w1 + ... + auwu = b1s1 + ... + bvsv

Rearranging:
a1w1 + ... + auwu - b1s1 - ... - bvsv = 0

Since {w1,...,wu, s1,...,sv} are linearly independent, all coefficients must be zero:
a1 = ... = au = 0 and b1 = ... = bv = 0 (noting the coefficients of sj are -bj, so -bj = 0 implies bj = 0).

Therefore v = 0, which means W ∩ S = {0}.

Hence W + S is a direct sum: W + S = W ⊕ S.

**Additional note on dimension:** When the sum is direct, dim(W ⊕ S) = dim(W) + dim(S) = u + v, which is consistent with {w1,...,wu, s1,...,sv} forming a basis of W ⊕ S (u + v linearly independent vectors spanning W + S).

QED.

---

#### (b) Subspaces U and V [6 marks]

U = {(x,y,z) in R^3 | x - y + z = 0, y - 2z = 0}
V = {(x,y,z) in R^3 | x - y - z = 0}

##### b1. Find bases of U, V, U ∩ V and dimension of U + V [4 marks]

**Basis of U:**

From the constraints:
- y - 2z = 0 => y = 2z
- x - y + z = 0 => x = y - z = 2z - z = z

Let z = t. Then (x, y, z) = (t, 2t, t) = t(1, 2, 1).

**Basis of U = {(1, 2, 1)}, dim(U) = 1**

**Basis of V:**

From x - y - z = 0 => x = y + z.

Let y = s, z = t. Then (x, y, z) = (s + t, s, t) = s(1, 1, 0) + t(1, 0, 1).

**Basis of V = {(1, 1, 0), (1, 0, 1)}, dim(V) = 2**

**Basis of U ∩ V:**

A vector in U ∩ V must satisfy all three equations:
- x - y + z = 0
- y - 2z = 0
- x - y - z = 0

From equations 1 and 3:
- (x - y + z) - (x - y - z) = 0 - 0
- 2z = 0 => z = 0

From y - 2z = 0: y = 0.
From x - y + z = 0: x = 0.

Therefore U ∩ V = {(0, 0, 0)}.

**Basis of U ∩ V = {} (empty set), dim(U ∩ V) = 0**

**Dimension of U + V:**

By the dimension formula:
dim(U + V) = dim(U) + dim(V) - dim(U ∩ V) = 1 + 2 - 0 = 3

**dim(U + V) = 3**

Since dim(U + V) = 3 = dim(R^3), we have U + V = R^3.

##### b2. Geometrical interpretation [2 marks]

**U ∩ V:** Since U ∩ V = {0}, the intersection is just the **origin** (a single point).

**U + V:** Since dim(U + V) = 3, U + V = R^3, i.e., the sum is the **entire 3-dimensional space**.

**Geometrical picture:**
- U is a **line** through the origin (1-dimensional subspace) in the direction (1, 2, 1).
- V is a **plane** through the origin (2-dimensional subspace) defined by x - y - z = 0.
- The line U does not lie in the plane V (since (1,2,1) does not satisfy x - y - z = 1 - 2 - 1 = -2 != 0).
- Therefore they intersect only at the origin, and together they span all of R^3.
- Since U ∩ V = {0}, the sum U + V is actually a **direct sum**: U ⊕ V = R^3.

---

### Question 2: Linear Mapping (20 marks)

#### (a1) Check if f(x,y,z) = (2x - y + z, y - z, 3x + z) is linear [6 marks]

A map f: R^3 -> R^3 is linear if:
1. **Additivity:** f(u + v) = f(u) + f(v) for all u, v in R^3
2. **Homogeneity:** f(ku) = kf(u) for all u in R^3, k in R

Let u = (x1, y1, z1) and v = (x2, y2, z2).

**Check Additivity:**

f(u + v) = f(x1 + x2, y1 + y2, z1 + z2)
= (2(x1+x2) - (y1+y2) + (z1+z2), (y1+y2) - (z1+z2), 3(x1+x2) + (z1+z2))
= (2x1 + 2x2 - y1 - y2 + z1 + z2, y1 + y2 - z1 - z2, 3x1 + 3x2 + z1 + z2)

f(u) + f(v) = (2x1 - y1 + z1, y1 - z1, 3x1 + z1) + (2x2 - y2 + z2, y2 - z2, 3x2 + z2)
= (2x1 - y1 + z1 + 2x2 - y2 + z2, y1 - z1 + y2 - z2, 3x1 + z1 + 3x2 + z2)

f(u + v) = f(u) + f(v) ✓

**Check Homogeneity:**

f(ku) = f(kx1, ky1, kz1)
= (2kx1 - ky1 + kz1, ky1 - kz1, 3kx1 + kz1)
= k(2x1 - y1 + z1, y1 - z1, 3x1 + z1)
= kf(u)

f(ku) = kf(u) ✓

**Conclusion: f is linear.**

The associated matrix (with respect to the standard basis) is:

A = [[2, -1, 1],
     [0, 1, -1],
     [3, 0, 1]]

(Each column is the image of the corresponding standard basis vector.)

---

#### (a2) Check if f(x,y,z) = (2x + z, y - z, 3 + z) is linear [6 marks]

**Quick check - necessary condition:** For a linear map, f(0) = 0.

f(0, 0, 0) = (2(0) + 0, 0 - 0, 3 + 0) = (0, 0, 3)

Since f(0, 0, 0) = (0, 0, 3) != (0, 0, 0), **f is NOT linear**.

**Alternative verification via additivity (for completeness):**

Let u = (1, 0, 0) and v = (1, 0, 0).

f(u) = (2, 0, 3), f(v) = (2, 0, 3)
f(u) + f(v) = (4, 0, 6)

f(u + v) = f(2, 0, 0) = (4, 0, 3)

f(u + v) = (4, 0, 3) != (4, 0, 6) = f(u) + f(v)

This confirms additivity fails.

**Conclusion: f is NOT linear** (it is an affine map due to the constant term 3 in the third component).

---

#### (b) Endomorphism with rank(A) = 1: linear dependence and proportionality [8 marks]

Let f: R^3 -> R^3 be an endomorphism (linear map) with rank(A) = 1, where A is the matrix representing f. Let x, y, z be linearly independent vectors in R^3.

**Part 1: Show f(x), f(y), f(z) are linearly dependent.**

Since rank(A) = 1, the image of f has dimension 1:
dim(Im(f)) = rank(A) = 1

This means Im(f) is a 1-dimensional subspace of R^3, i.e., Im(f) = span{v} for some non-zero vector v.

Since f(x), f(y), f(z) all belong to Im(f), they all lie in a 1-dimensional subspace. Any set of more than 1 vector in a 1-dimensional space is linearly dependent (since all vectors must be scalar multiples of v).

More explicitly: since dim(Im(f)) = 1, any two vectors in Im(f) are linearly dependent. In particular, any three vectors in Im(f) are linearly dependent.

Therefore, **f(x), f(y), f(z) are linearly dependent**.

**Part 2: Show f(x), f(y), f(z) are proportional (pairwise).**

Since Im(f) = span{v} for some non-zero vector v:
- f(x) = alpha * v for some scalar alpha
- f(y) = beta * v for some scalar beta
- f(z) = gamma * v for some scalar gamma

Therefore:
- If beta != 0: f(x) = (alpha/beta) * f(y)
- If gamma != 0: f(x) = (alpha/gamma) * f(z)
- If alpha != 0: f(y) = (beta/alpha) * f(x)

In general, any two non-zero vectors among f(x), f(y), f(z) are proportional to each other (they are all scalar multiples of the same direction v).

**Note:** Some of these images could be zero. Since rank(A) = 1, the nullity is n - rank = 3 - 1 = 2 (by the rank-nullity theorem). So dim(ker(f)) = 2. Since x, y, z are linearly independent (forming a basis of R^3), and ker(f) has dimension 2, at most 2 of the vectors x, y, z can be in the kernel.

Thus at least one of f(x), f(y), f(z) is non-zero, and all three are scalar multiples of the same vector v (with the scalar possibly being 0). This means they are all **pairwise proportional** (where we consider 0 as proportional to any vector, since 0 = 0 * w for any w).

**Conclusion:** Yes, f(x), f(y), f(z) are linearly dependent AND pairwise proportional. They all lie on the same line through the origin (the 1-dimensional image of f), possibly including the origin itself.
