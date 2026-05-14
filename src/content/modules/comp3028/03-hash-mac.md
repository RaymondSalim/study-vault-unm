---
title: "Hash Functions and MACs"
order: 3
moduleTitle: "COMP3028 - Computer Security"
tags: ["hash", "SHA", "MAC", "HMAC", "integrity", "collision"]
---

## Cryptographic Hash Functions

:::eli10

A hash function is like a fingerprint machine for data. You feed in any file or message (no matter how big) and it always gives back a fixed-size fingerprint. Even a tiny change to the input completely changes the fingerprint. You cannot reverse-engineer the original data from the fingerprint. This is useful for checking if something has been tampered with.

:::

:::eli15

A cryptographic hash function takes an input of any length and produces a fixed-size output (called a digest or hash). It must be one-way (cannot recover input from output), collision-resistant (hard to find two inputs with the same hash), and exhibit the avalanche effect (a single bit change in input drastically changes the output). The birthday paradox means collisions can be found in roughly 2^(n/2) attempts for an n-bit hash, not 2^n. MD5 and SHA-1 are broken; SHA-256 and SHA-3 are the current standards. Hashes are used for password storage, data integrity verification, digital signatures, and proof-of-work systems.

:::

:::eli20

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

:::

## Common Hash Functions

:::eli10

There are different hash function "brands." MD5 and SHA-1 are old and broken -- people found ways to create fakes with the same fingerprint. SHA-256 and SHA-3 are the safe ones to use today. SHA-3 was designed completely differently from SHA-2 as a backup plan in case SHA-2 ever gets broken.

:::

:::eli15

MD5 (128-bit output) and SHA-1 (160-bit) are both broken -- real-world collisions have been demonstrated. The SHA-2 family (SHA-256, SHA-384, SHA-512) uses the Merkle-Damgard construction and remains secure. SHA-3 uses a completely different "sponge construction" based on the Keccak permutation -- it was standardised as insurance in case a structural flaw is found in SHA-2. SHA-2 is generally faster in software, while SHA-3 can be more efficient in hardware implementations.

:::

:::eli20

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

:::

## Applications of Hash Functions

:::eli10

Hashes are used everywhere: storing passwords safely (so the website never sees your actual password), checking if a downloaded file was corrupted, signing documents digitally, and even in how Bitcoin mining works. They are one of the most important building blocks in all of computer security.

:::

:::eli15

Hash functions serve many roles in security. For password storage, you store the hash (plus a random salt) rather than the password itself -- during login, you hash the input and compare. For data integrity, you compare hashes before and after transfer to detect corruption. Digital signatures hash the message first for efficiency (sign the short hash, not the long message). Commitment schemes let you commit to a value by publishing its hash and revealing the value later. Proof-of-work systems (like Bitcoin) require finding an input that produces a hash below a target threshold.

:::

:::eli20

| Application | How |
|-------------|-----|
| Password storage | Store $H(\text{password} \| \text{salt})$ |
| Data integrity | Compare hashes before/after transmission |
| Digital signatures | Sign $H(M)$ instead of $M$ (efficiency) |
| Commitment schemes | Commit $H(x)$, reveal $x$ later |
| Proof of work | Find nonce s.t. $H(\text{block}\|\text{nonce}) < \text{target}$ |

:::

## Message Authentication Code (MAC)

:::eli10

A MAC is like a tamper-evident seal that only you and your friend can create and check. When you send a message, you attach a special code computed using a secret key you both share. If anyone changes the message, the code will not match anymore. Unlike a digital signature, both sides share the same key, so you cannot prove which one of you created it.

:::

:::eli15

A Message Authentication Code (MAC) provides integrity and authentication for a message using a shared secret key. The sender computes a tag over the message using the key and sends both the message and tag. The receiver recomputes the tag with their copy of the key and checks it matches. Unlike digital signatures, MACs do not provide non-repudiation because both parties possess the key and either could have produced the tag. MACs must be unforgeable without knowledge of the key.

:::

:::eli20

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

:::

## HMAC (Hash-based MAC)

:::eli10

HMAC is a recipe for building a MAC using a hash function. You cannot just glue the key and message together and hash them -- that has a sneaky vulnerability called a length extension attack. HMAC uses a clever double-hashing trick that keeps it safe from this problem.

:::

:::eli15

HMAC constructs a MAC from a hash function by hashing the message with the key in a two-layer structure. Simply computing H(key || message) is insecure for Merkle-Damgard hashes because of length extension attacks -- an attacker who knows H(K||M) and the length can compute H(K||M||padding||extra) without knowing K. HMAC's nested structure (inner hash and outer hash with different padded keys) prevents this. HMAC is proven secure as long as the underlying hash function's compression function is a PRF.

:::

:::eli20

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

:::

## CMAC (Cipher-based MAC)

:::eli10

CMAC is another way to create a tamper-evident seal, but instead of using a hash function, it uses a block cipher like AES. It processes the message in blocks using CBC mode and outputs the final block as the authentication tag.

:::

:::eli15

CMAC uses a block cipher (such as AES) in CBC mode to compute a MAC. The message is processed block-by-block through the cipher, and the final output block serves as the authentication tag. A special subkey derived from the main key is XORed into the final block to handle variable-length messages securely. CMAC is useful when you already have a block cipher available and want integrity without needing a separate hash function.

:::

:::eli20

Uses a block cipher (e.g., AES) in CBC mode for MAC computation. Final block uses a derived subkey.

:::

## Authenticated Encryption

:::eli10

What if you want to keep a message secret AND make sure nobody tampered with it? Authenticated encryption does both at once. AES-GCM is the most popular way to do this -- it encrypts your data and produces a tag that detects any changes, all in one operation.

:::

:::eli15

Authenticated encryption provides both confidentiality (encryption) and integrity/authentication (MAC) in a single mechanism. There are several ways to combine encryption and MAC: Encrypt-then-MAC (safest generic composition -- MAC the ciphertext), MAC-then-Encrypt, and Encrypt-and-MAC. AES-GCM is the preferred integrated solution that combines CTR mode encryption with GMAC authentication in one pass. The order matters for security: Encrypt-then-MAC is provably secure even if the underlying encryption has certain weaknesses.

:::

:::eli20

Provides **both** confidentiality and integrity/authentication.

| Mode | Method |
|------|--------|
| Encrypt-then-MAC | $C = E_K(M)$, tag = MAC($K'$, $C$) -- recommended |
| MAC-then-Encrypt | tag = MAC($K'$, $M$), $C = E_K(M \| \text{tag})$ |
| Encrypt-and-MAC | $C = E_K(M)$, tag = MAC($K'$, $M$) |
| AES-GCM | Integrated (CTR + GMAC) -- preferred |

> **Encrypt-then-MAC** is the safest generic composition.

:::

## Password Hashing

:::eli10

When a website stores your password, it should not keep the actual password -- that would be dangerous if hackers break in. Instead, it puts the password through a special slow hash function (like bcrypt or Argon2) that takes a lot of time and memory to compute. This makes it extremely hard for attackers to guess passwords by trying millions of possibilities.

:::

:::eli15

Password hashing differs from general-purpose hashing: it must be deliberately slow to resist brute-force attacks. Regular hash functions like SHA-256 are too fast -- modern GPUs can compute billions per second. Purpose-built password hashing algorithms like bcrypt, scrypt, and Argon2 have configurable cost factors for CPU time and memory usage. Argon2 (winner of the Password Hashing Competition) is considered state-of-the-art, being both memory-hard and time-hard. A unique random salt per user prevents rainbow table attacks and ensures identical passwords produce different hashes.

:::

:::eli20

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

:::
