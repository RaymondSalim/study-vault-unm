---
title: "Asymmetric Cryptography"
order: 2
moduleTitle: "COMP3028 - Computer Security"
tags: ["RSA", "Diffie-Hellman", "public-key", "digital-signatures", "certificates"]
---

## Public Key Cryptography Overview

| Property | Detail |
|----------|--------|
| Key pair | Public key (shared) + Private key (secret) |
| Encrypt with | Recipient's public key |
| Decrypt with | Recipient's private key |
| Key distribution | Public keys can be freely shared |
| Speed | Much slower than symmetric (1000x) |
| Typical use | Key exchange, digital signatures, small data |

## RSA

### Key Generation

1. Choose two large primes $p$, $q$
2. Compute $n = pq$
3. Compute $\phi(n) = (p-1)(q-1)$
4. Choose $e$ such that $1 < e < \phi(n)$ and $\gcd(e, \phi(n)) = 1$
5. Compute $d = e^{-1} \mod \phi(n)$ (i.e., $ed \equiv 1 \pmod{\phi(n)}$)

| Key | Value |
|-----|-------|
| Public key | $(n, e)$ |
| Private key | $(n, d)$ |

### Encryption/Decryption

$$C = M^e \mod n$$
$$M = C^d \mod n$$

### Security Basis

| Problem | Difficulty |
|---------|-----------|
| Factor $n$ into $p \cdot q$ | Computationally hard for large $n$ |
| RSA problem | Finding $M$ from $C = M^e \mod n$ without $d$ |
| Recommended key size | 2048 bits minimum, 4096 for long-term |

### RSA Attacks

| Attack | Condition |
|--------|-----------|
| Brute force factoring | Small $n$ |
| Common modulus | Same $n$ for different users |
| Small $e$ attack | $e$ too small without padding |
| Timing attack | Side-channel (implementation) |
| Chosen ciphertext | Without proper padding |

> Always use **OAEP padding** (RSA-OAEP) in practice.

## Diffie-Hellman Key Exchange

### Protocol

Public parameters: prime $p$, generator $g$

| Step | Alice | Bob |
|------|-------|-----|
| 1 | Choose secret $a$ | Choose secret $b$ |
| 2 | Send $A = g^a \mod p$ | Send $B = g^b \mod p$ |
| 3 | Compute $K = B^a \mod p$ | Compute $K = A^b \mod p$ |

Both compute: $K = g^{ab} \mod p$

### Security

| Property | Detail |
|----------|--------|
| Based on | Discrete Logarithm Problem (DLP) |
| Provides | Key agreement (shared secret) |
| Does NOT provide | Authentication (vulnerable to MITM) |
| Fix for MITM | Use with digital signatures or certificates |

### Elliptic Curve Diffie-Hellman (ECDH)

Same concept but using elliptic curve groups. Smaller keys for equivalent security:

| RSA equivalent | ECC key size |
|----------------|-------------|
| 1024 bits | 160 bits |
| 2048 bits | 224 bits |
| 3072 bits | 256 bits |
| 15360 bits | 512 bits |

## Digital Signatures

### Purpose

| Property | Provides |
|----------|----------|
| Authentication | Proof of sender identity |
| Integrity | Detect message modification |
| Non-repudiation | Sender cannot deny sending |

### RSA Signature

$$\text{Sign}: S = H(M)^d \mod n$$
$$\text{Verify}: H(M) \stackrel{?}{=} S^e \mod n$$

> Sign with **private** key, verify with **public** key (opposite of encryption).

### Digital Signature Algorithm (DSA)

- Based on discrete logarithm problem
- Signature only (not encryption)
- Two components: $(r, s)$

### ECDSA

- DSA on elliptic curves
- Smaller signatures, faster
- Used in Bitcoin, TLS

## Public Key Infrastructure (PKI)

### Certificates (X.509)

| Field | Content |
|-------|---------|
| Subject | Entity the cert belongs to |
| Issuer | Certificate Authority (CA) that signed it |
| Public key | Subject's public key |
| Validity period | Not-before and not-after dates |
| Serial number | Unique identifier |
| Signature | CA's digital signature over the certificate |

### Certificate Chain

```
Root CA (self-signed, trusted)
  └── Intermediate CA (signed by Root)
       └── End-entity cert (signed by Intermediate)
```

### Certificate Validation

1. Check signature chain up to trusted root
2. Check validity period
3. Check revocation status (CRL or OCSP)
4. Check domain name matches

## Hybrid Encryption

Combine asymmetric + symmetric for efficiency:

1. Generate random symmetric key $K_s$
2. Encrypt data with $K_s$ (AES-GCM): $C = E_{K_s}(M)$
3. Encrypt $K_s$ with recipient's public key: $K_e = E_{\text{pub}}(K_s)$
4. Send $(K_e, C)$

> Used in TLS, PGP, S/MIME.

<details>
<summary><strong>Practice: RSA worked example</strong></summary>

Let $p = 11$, $q = 13$:
1. $n = 11 \times 13 = 143$
2. $\phi(n) = 10 \times 12 = 120$
3. Choose $e = 7$ ($\gcd(7, 120) = 1$)
4. Find $d$: $7d \equiv 1 \pmod{120}$ --> $d = 103$ (since $7 \times 103 = 721 = 6 \times 120 + 1$)
5. Public key: $(143, 7)$, Private key: $(143, 103)$

Encrypt $M = 9$: $C = 9^7 \mod 143 = 48$
Decrypt: $M = 48^{103} \mod 143 = 9$
</details>

<details>
<summary><strong>Practice: Why is Diffie-Hellman vulnerable to MITM?</strong></summary>

Attacker Eve intercepts and replaces:
1. Alice sends $g^a$ -- Eve intercepts, sends $g^e$ to Bob
2. Bob sends $g^b$ -- Eve intercepts, sends $g^e$ to Alice
3. Alice computes $K_1 = g^{ea}$, Eve computes $K_1 = g^{ea}$
4. Bob computes $K_2 = g^{eb}$, Eve computes $K_2 = g^{eb}$

Eve now has two shared secrets. She decrypts, re-encrypts, and forwards messages.

Fix: Authenticate the exchange (signed DH values, certificates).
</details>
