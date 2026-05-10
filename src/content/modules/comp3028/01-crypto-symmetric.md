---
title: "Symmetric Cryptography"
order: 1
moduleTitle: "COMP3028 - Computer Security"
tags: ["symmetric", "AES", "DES", "block-cipher", "encryption", "modes"]
---

## Symmetric Encryption Overview

Same key for encryption and decryption: $C = E_K(P)$, $P = D_K(C)$.

| Property | Detail |
|----------|--------|
| Key sharing | Both parties must share secret key |
| Speed | Fast (hardware acceleration available) |
| Key distribution problem | How to securely share the key? |
| Number of keys ($n$ parties) | $\binom{n}{2} = \frac{n(n-1)}{2}$ |

## Block Ciphers vs Stream Ciphers

| | Block Cipher | Stream Cipher |
|-|-------------|---------------|
| Input | Fixed-size blocks (e.g., 128 bits) | One bit/byte at a time |
| Example | AES, DES | RC4, ChaCha20 |
| Speed | Slower per bit | Faster per bit |
| Error propagation | Depends on mode | No propagation |
| Use case | General purpose | Real-time streams |

## DES (Data Encryption Standard)

| Property | Value |
|----------|-------|
| Block size | 64 bits |
| Key size | 56 bits (+ 8 parity bits = 64 total) |
| Rounds | 16 |
| Structure | Feistel network |
| Status | **Broken** -- brute-forceable |

### Feistel Network Structure

Each round:
$$L_i = R_{i-1}$$
$$R_i = L_{i-1} \oplus F(R_{i-1}, K_i)$$

| Advantage | Decryption uses same structure (reversed key schedule) |
|-----------|------------------------------------------------------|

### Triple DES (3DES)

$$C = E_{K_3}(D_{K_2}(E_{K_1}(P)))$$

| Keying option | Keys | Effective strength |
|---------------|------|--------------------|
| Option 1 | 3 independent keys | 168 bits |
| Option 2 | $K_1 = K_3 \neq K_2$ | 112 bits |
| Option 3 | $K_1 = K_2 = K_3$ | 56 bits (backwards compatible) |

## AES (Advanced Encryption Standard)

| Property | Value |
|----------|-------|
| Block size | 128 bits |
| Key sizes | 128, 192, or 256 bits |
| Rounds | 10 (128-bit), 12 (192-bit), 14 (256-bit) |
| Structure | Substitution-Permutation Network (SPN) |
| Status | Secure (current standard) |

### AES Round Operations

| Step | Operation | Purpose |
|------|-----------|---------|
| SubBytes | Byte substitution via S-box | Non-linearity (confusion) |
| ShiftRows | Circular shift of rows | Diffusion |
| MixColumns | Matrix multiplication in $GF(2^8)$ | Diffusion |
| AddRoundKey | XOR with round key | Key mixing |

> **Last round** omits MixColumns.

### Confusion and Diffusion (Shannon)

| Principle | Meaning | AES mechanism |
|-----------|---------|---------------|
| Confusion | Each ciphertext bit depends on multiple key bits | SubBytes, AddRoundKey |
| Diffusion | Each plaintext bit affects many ciphertext bits | ShiftRows, MixColumns |

## Block Cipher Modes of Operation

| Mode | Name | Parallelisable (enc) | Error propagation | IV needed |
|------|------|:---:|:---:|:---:|
| ECB | Electronic Codebook | Yes | None | No |
| CBC | Cipher Block Chaining | No | Next block | Yes |
| CTR | Counter | Yes | None | Yes (nonce) |
| CFB | Cipher Feedback | No | Next block | Yes |
| OFB | Output Feedback | No | None | Yes |
| GCM | Galois/Counter Mode | Yes | None + auth | Yes (nonce) |

### ECB Mode

$$C_i = E_K(P_i)$$

| Problem | Identical plaintext blocks produce identical ciphertext blocks |
|---------|--------------------------------------------------------------|
| Visual | "ECB penguin" -- patterns visible in encrypted images |
| Use | **Never** for multi-block data |

### CBC Mode

$$C_i = E_K(P_i \oplus C_{i-1}), \quad C_0 = \text{IV}$$
$$P_i = D_K(C_i) \oplus C_{i-1}$$

| Property | Detail |
|----------|--------|
| IV must be | Unpredictable (random), unique per message |
| Padding | Required (e.g., PKCS#7) |
| Padding oracle attack | Possible if padding errors are revealed |

### CTR Mode

$$C_i = P_i \oplus E_K(\text{Nonce} \| \text{Counter}_i)$$

| Advantage | Turns block cipher into stream cipher, fully parallelisable |
|-----------|-------------------------------------------------------------|
| Nonce | Must **never** be reused with same key |

### GCM Mode (AES-GCM)

CTR mode + authentication tag (GMAC). Provides **authenticated encryption** (confidentiality + integrity).

## Key Points

| Concept | Remember |
|---------|----------|
| ECB is insecure | Deterministic -- leaks patterns |
| IV/Nonce reuse | Catastrophic in CTR/GCM (reveals XOR of plaintexts) |
| AES-GCM | Gold standard for authenticated encryption |
| Key size for security | AES-128 minimum, AES-256 for future-proofing |

<details>
<summary><strong>Practice: Why is ECB insecure for images?</strong></summary>

Each block is encrypted independently. Identical plaintext blocks produce identical ciphertext blocks. In an image, large areas of the same colour produce the same ciphertext pattern, revealing the image structure. CBC/CTR fix this because each block's encryption depends on previous blocks or a unique counter.
</details>

<details>
<summary><strong>Practice: What happens if you reuse a nonce in CTR mode?</strong></summary>

If nonce is reused with the same key:
- $C_1 = P_1 \oplus E_K(\text{Nonce}\|\text{Ctr})$
- $C_2 = P_2 \oplus E_K(\text{Nonce}\|\text{Ctr})$
- $C_1 \oplus C_2 = P_1 \oplus P_2$

The attacker gets the XOR of two plaintexts, which can be exploited (especially with known/guessable plaintext).
</details>
