---
title: "Symmetric Cryptography"
order: 1
moduleTitle: "COMP3028 - Computer Security"
tags: ["symmetric", "AES", "DES", "block-cipher", "encryption", "modes"]
---

## Symmetric Encryption Overview

:::eli10

Symmetric encryption is like having a secret language that you and your friend both know. You use the same codebook to turn your message into gibberish (encryption) and back into the real message (decryption). The tricky part is: how do you share the codebook without anyone else seeing it?

:::

:::eli15
Symmetric encryption uses a single shared secret key for both encryption and decryption. It is fast and efficient, making it the workhorse of modern encryption. The main challenge is key distribution -- both parties must somehow securely agree on the same key before they can communicate. The number of keys needed grows quadratically with the number of participants: for n people, you need n(n-1)/2 unique keys.

:::

:::eli20
Same key for encryption and decryption: $C = E_K(P)$, $P = D_K(C)$.

| Property | Detail |
|----------|--------|
| Key sharing | Both parties must share secret key |
| Speed | Fast (hardware acceleration available) |
| Key distribution problem | How to securely share the key? |
| Number of keys ($n$ parties) | $\binom{n}{2} = \frac{n(n-1)}{2}$ |

:::

## Block Ciphers vs Stream Ciphers

:::eli10

Imagine encrypting a letter. A block cipher is like putting the letter into a special box that scrambles exactly one page at a time. A stream cipher is like a magic pen that scrambles each letter as you write it, one by one. The box method is stronger for most things, but the pen method is faster for live conversations.

:::

:::eli15
Block ciphers encrypt data in fixed-size chunks (blocks), typically 128 bits. They are general-purpose and used in most file/network encryption. Stream ciphers encrypt data one bit or byte at a time, generating a pseudorandom keystream that is XORed with the plaintext. Stream ciphers are faster per bit and better suited for real-time communications where data arrives continuously. Errors in stream ciphers do not propagate to other parts of the message.

:::

:::eli20
| | Block Cipher | Stream Cipher |
|-|-------------|---------------|
| Input | Fixed-size blocks (e.g., 128 bits) | One bit/byte at a time |
| Example | AES, DES | RC4, ChaCha20 |
| Speed | Slower per bit | Faster per bit |
| Error propagation | Depends on mode | No propagation |
| Use case | General purpose | Real-time streams |

:::

## DES (Data Encryption Standard)

:::eli10

DES was once the lock that protected all important computer secrets. It uses a 56-bit key, which seemed big in the 1970s but today is like having a lock with too few combinations -- a computer can try them all and break in. It is no longer safe to use.

:::

:::eli15
DES is an older encryption standard that processes 64-bit blocks using a 56-bit key over 16 rounds of a Feistel network. In a Feistel network, each round splits the block in half and mixes one half with a round key, then swaps the halves. This elegant structure means the same hardware can encrypt and decrypt (just reversing the key order). DES is now considered broken because modern hardware can brute-force all 2^56 possible keys. Triple DES (3DES) applies DES three times with different keys to achieve 112-bit effective security, but it is slow and being phased out.

:::

:::eli20
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

:::

## AES (Advanced Encryption Standard)

:::eli10

AES is the gold-standard lock used today to protect everything from bank transactions to your Wi-Fi password. It works on 128-bit blocks and has keys of 128, 192, or 256 bits. Nobody has found a way to break it -- it is like a lock with so many combinations that even all the world's computers working together could never try them all.

:::

:::eli15
AES replaced DES as the encryption standard. Unlike DES's Feistel structure, AES uses a Substitution-Permutation Network (SPN), applying four operations each round: byte substitution (SubBytes) for non-linearity, row shifting (ShiftRows) and column mixing (MixColumns) for diffusion, and key XOR (AddRoundKey). These operations implement Shannon's principles of confusion (making the relationship between key and ciphertext complex) and diffusion (spreading plaintext influence across the ciphertext). AES supports 128, 192, or 256-bit keys with 10, 12, or 14 rounds respectively.

:::

:::eli20
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

:::

## Block Cipher Modes of Operation

:::eli10

A block cipher only scrambles one small block at a time. But what if your message is longer than one block? Modes of operation are different strategies for chaining blocks together. Some strategies (like ECB) are bad because identical blocks produce identical scrambled output -- you could still see patterns. Better strategies (like CBC or CTR) mix in extra randomness so every block looks different even if the original blocks were the same.

:::

:::eli15
Block cipher modes determine how to securely encrypt messages longer than one block. The simplest mode, ECB, encrypts each block independently, which leaks patterns (the famous "ECB penguin"). CBC chains blocks together so each ciphertext block depends on the previous one, requiring an unpredictable IV. CTR mode turns the block cipher into a stream cipher by encrypting sequential counter values and XORing with plaintext -- it is parallelisable and does not require padding. GCM combines CTR with an authentication tag, providing both confidentiality and integrity (authenticated encryption). Never reuse a nonce/IV with the same key in CTR or GCM mode -- it completely breaks security.

:::

:::eli20
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

:::

## Key Points

:::eli10

The most important things to remember: never use ECB mode (it leaks patterns), never reuse a secret number (nonce) with the same key (it reveals your messages), and AES-GCM is the best choice for encrypting data today because it protects both secrecy and detects tampering.

:::

:::eli15
Key takeaways for practice:
- ECB mode is deterministic and leaks plaintext patterns -- never use it for real data.
- Reusing a nonce/IV in CTR or GCM mode is catastrophic: it allows an attacker to XOR two ciphertexts and obtain the XOR of the plaintexts.
- AES-GCM is the current gold standard because it provides authenticated encryption (confidentiality plus integrity) in a single operation.
- Use at least AES-128 for current security, AES-256 for long-term or post-quantum considerations.

:::

:::eli20
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

:::
