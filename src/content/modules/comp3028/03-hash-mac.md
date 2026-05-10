---
title: "Hash Functions and MACs"
order: 3
moduleTitle: "COMP3028 - Computer Security"
tags: ["hash", "SHA", "MAC", "HMAC", "integrity", "collision"]
---

## Cryptographic Hash Functions

### Definition

A hash function $H$ maps arbitrary-length input to fixed-length output (digest): $h = H(M)$.

### Required Properties

| Property | Definition | Attack if broken |
|----------|-----------|------------------|
| Pre-image resistance | Given $h$, hard to find $M$ s.t. $H(M) = h$ | Recover message from hash |
| Second pre-image resistance | Given $M_1$, hard to find $M_2 \neq M_1$ s.t. $H(M_1) = H(M_2)$ | Forge a different message |
| Collision resistance | Hard to find any $M_1 \neq M_2$ s.t. $H(M_1) = H(M_2)$ | Birthday attack |
| Avalanche effect | Small input change causes large output change | -- |

> Collision resistance implies second pre-image resistance, but not vice versa.

### Birthday Paradox

For a hash with $n$-bit output, expected collisions after $\approx 2^{n/2}$ trials.

| Hash output | Brute-force (pre-image) | Birthday (collision) |
|-------------|------------------------|---------------------|
| 128 bits | $2^{128}$ | $2^{64}$ |
| 256 bits | $2^{256}$ | $2^{128}$ |

## Common Hash Functions

| Algorithm | Output size | Block size | Status |
|-----------|------------|-----------|--------|
| MD5 | 128 bits | 512 bits | **Broken** (collisions found) |
| SHA-1 | 160 bits | 512 bits | **Deprecated** (collisions found 2017) |
| SHA-256 | 256 bits | 512 bits | Secure (SHA-2 family) |
| SHA-384 | 384 bits | 1024 bits | Secure (SHA-2 family) |
| SHA-512 | 512 bits | 1024 bits | Secure (SHA-2 family) |
| SHA-3 (256) | 256 bits | 1088 bits | Secure (Keccak, different design) |

### SHA-2 vs SHA-3

| | SHA-2 | SHA-3 |
|-|-------|-------|
| Design | Merkle-Damgard | Sponge construction |
| Based on | MD4 family | Keccak permutation |
| Why SHA-3? | Backup if SHA-2 is broken (different design) | |
| Performance | Faster in software | Faster in hardware |

## Applications of Hash Functions

| Application | How |
|-------------|-----|
| Password storage | Store $H(\text{password} \| \text{salt})$ |
| Data integrity | Compare hashes before/after transmission |
| Digital signatures | Sign $H(M)$ instead of $M$ (efficiency) |
| Commitment schemes | Commit $H(x)$, reveal $x$ later |
| Proof of work | Find nonce s.t. $H(\text{block}\|\text{nonce}) < \text{target}$ |

## Message Authentication Code (MAC)

### Purpose

Provides **integrity** and **authentication** (but not non-repudiation).

$$\text{tag} = \text{MAC}(K, M)$$

Sender sends $(M, \text{tag})$. Receiver recomputes MAC and compares.

### Properties Required

| Property | Meaning |
|----------|---------|
| Unforgeability | Cannot compute valid MAC without key |
| Deterministic | Same key + message = same tag |
| No non-repudiation | Both parties share key, so either could have produced it |

## HMAC (Hash-based MAC)

### Construction

$$\text{HMAC}(K, M) = H\bigl((K' \oplus \text{opad}) \| H((K' \oplus \text{ipad}) \| M)\bigr)$$

where:
- $K'$ = key padded to block size
- ipad = `0x36` repeated
- opad = `0x5C` repeated

### Why not just $H(K \| M)$?

| Naive approach | Vulnerability |
|----------------|--------------|
| $H(K \| M)$ | Length extension attack (Merkle-Damgard) |
| $H(M \| K)$ | Collision in $H$ leads to forgery |
| HMAC | Secure even with length extension |

## CMAC (Cipher-based MAC)

Uses a block cipher (e.g., AES) in CBC mode for MAC computation. Final block uses a derived subkey.

## Authenticated Encryption

Provides **both** confidentiality and integrity/authentication.

| Mode | Method |
|------|--------|
| Encrypt-then-MAC | $C = E_K(M)$, tag = MAC($K'$, $C$) -- recommended |
| MAC-then-Encrypt | tag = MAC($K'$, $M$), $C = E_K(M \| \text{tag})$ |
| Encrypt-and-MAC | $C = E_K(M)$, tag = MAC($K'$, $M$) |
| AES-GCM | Integrated (CTR + GMAC) -- preferred |

> **Encrypt-then-MAC** is the safest generic composition.

## Password Hashing

| Algorithm | Purpose | Features |
|-----------|---------|----------|
| bcrypt | Password hashing | Configurable cost factor, salt |
| scrypt | Password hashing | Memory-hard (resists GPU/ASIC) |
| Argon2 | Password hashing | Winner of PHC, memory + time hard |
| PBKDF2 | Key derivation | Iterative HMAC, configurable iterations |

> Never use raw SHA-256 for passwords -- too fast (brute-forceable).

<details>
<summary><strong>Practice: Length extension attack on H(K||M)</strong></summary>

For Merkle-Damgard hashes (MD5, SHA-1, SHA-256):
1. Given $H(K \| M)$ and $|K\|M|$ (not $K$ itself)
2. Attacker can compute $H(K \| M \| \text{padding} \| M')$ for any $M'$
3. Because the hash state after processing $K\|M$ is the published hash value
4. Attacker continues hashing from that state

HMAC prevents this by using an outer hash that depends on the inner result.
</details>

<details>
<summary><strong>Practice: Why is salt needed for password hashing?</strong></summary>

Without salt:
- Same password = same hash (rainbow table attack)
- Attacker pre-computes hashes for common passwords

With unique salt per user:
- hash = $H(\text{salt} \| \text{password})$
- Same password produces different hashes
- Rainbow tables become infeasible (need one per salt)
- Salt is stored alongside the hash (not secret)
</details>
