---
title: "Asymmetric Cryptography"
order: 2
moduleTitle: "COMP3028 - Computer Security"
tags: ["RSA", "Diffie-Hellman", "public-key", "digital-signatures", "certificates"]
---

## Public Key Cryptography Overview

:::eli10

Imagine you have a mailbox with a slot anyone can drop letters into (public key), but only you have the key to open it and read them (private key). That is public key cryptography. Anyone can send you a secret message, but only you can read it. The downside is that it is much slower than symmetric encryption.

:::

:::eli15

Public key cryptography uses a pair of mathematically linked keys: a public key that anyone can know, and a private key that only the owner keeps secret. To send someone a confidential message, you encrypt with their public key and only their private key can decrypt it. This solves the key distribution problem of symmetric cryptography -- no need to secretly share a key beforehand. However, it is roughly 1000x slower than symmetric encryption, so in practice it is used to exchange symmetric keys or to create digital signatures, not to encrypt large amounts of data.

:::

:::eli20

| Property | Detail |
|----------|--------|
| Key pair | Public key (shared) + Private key (secret) |
| Encrypt with | Recipient's public key |
| Decrypt with | Recipient's private key |
| Key distribution | Public keys can be freely shared |
| Speed | Much slower than symmetric (1000x) |
| Typical use | Key exchange, digital signatures, small data |

:::

## RSA

:::eli10

RSA is like a magic math trick using really big prime numbers. You multiply two huge prime numbers together to get an even bigger number. It is easy to multiply them, but incredibly hard to figure out which two primes were used just by looking at the big number. This one-way difficulty is what keeps RSA secure.

:::

:::eli15

RSA is the most widely known public-key algorithm. Its security relies on the difficulty of factoring the product of two large prime numbers. Key generation involves choosing two large primes, computing their product n, and deriving public exponent e and private exponent d such that encrypting with e and decrypting with d are inverse operations (modular exponentiation). RSA keys should be at least 2048 bits today. RSA is vulnerable to several attacks if implemented naively -- always use OAEP padding for encryption. RSA can also be used for digital signatures by "encrypting" a hash with the private key.

:::

:::eli20

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

:::

## Diffie-Hellman Key Exchange

:::eli10

Imagine you and a friend each have a secret colour of paint. You both start with the same public colour and mix in your own secret colour. Then you swap your mixed colours and each add your secret colour again. You both end up with the same final colour, but anyone watching only saw the mixed colours and cannot figure out the final one. That is how Diffie-Hellman works -- two people can agree on a shared secret over a public channel.

:::

:::eli15

Diffie-Hellman allows two parties to establish a shared secret key over an insecure channel without ever transmitting the secret itself. Each party picks a secret number, performs modular exponentiation with a public base and prime, and exchanges the result. Both then combine the other's public value with their own secret to arrive at the same shared key. Its security relies on the Discrete Logarithm Problem. However, basic DH does not authenticate the parties -- an attacker in the middle can intercept and substitute their own values (man-in-the-middle attack). Elliptic Curve DH (ECDH) provides the same security with much smaller keys.

:::

:::eli20

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

:::

## Digital Signatures

:::eli10

A digital signature is like signing a letter with invisible ink that only your special pen can make, but anyone can check it with a special light. It proves you wrote the message, that nobody changed it, and you cannot later deny sending it.

:::

:::eli15

Digital signatures provide three guarantees: authentication (proof of who sent it), integrity (detecting if the message was changed), and non-repudiation (the sender cannot deny sending it). The sender signs by hashing the message and encrypting the hash with their private key. Anyone can verify by decrypting with the sender's public key and comparing hashes. Common schemes include RSA signatures, DSA, and ECDSA (used in Bitcoin and TLS). Note that signing uses the private key and verification uses the public key -- the opposite direction from encryption.

:::

:::eli20

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

:::

## Public Key Infrastructure (PKI)

:::eli10

How do you know a website's public key really belongs to that website and not an imposter? PKI is like a system of trusted notaries. A Certificate Authority (CA) checks a website's identity and signs a digital certificate saying "yes, this public key really belongs to this website." Your browser trusts a handful of top-level CAs, and they vouch for others in a chain.

:::

:::eli15

Public Key Infrastructure (PKI) solves the problem of trusting public keys. A Certificate Authority (CA) verifies the identity of a key owner and issues a digitally signed X.509 certificate binding the public key to that identity. Certificates form a chain of trust: root CAs (pre-trusted by your OS/browser) sign intermediate CAs, which sign end-entity certificates. Validation involves checking the entire signature chain, the validity period, revocation status (via CRL or OCSP), and that the domain name matches. This is how HTTPS works -- your browser validates the server's certificate before trusting its public key.

:::

:::eli20

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

:::

## Hybrid Encryption

:::eli10

Asymmetric encryption is safe but slow. Symmetric encryption is fast but you need to share the key somehow. Hybrid encryption combines both: use the slow method to securely send a random key, then use the fast method with that key to encrypt the actual message. This is how almost all internet encryption (like HTTPS) actually works.

:::

:::eli15

In practice, asymmetric encryption is too slow for bulk data, and symmetric encryption requires a shared key. Hybrid encryption combines the best of both: generate a random symmetric session key, encrypt the actual data with that fast symmetric cipher (e.g., AES-GCM), then encrypt only the small session key with the recipient's public key. The recipient decrypts the session key with their private key and then decrypts the data. This approach is used in TLS, PGP, and S/MIME.

:::

:::eli20

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

:::
