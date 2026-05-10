---
title: "Flashcards"
order: 92
moduleTitle: "COMP3028 - Computer Security"
tags: ["flashcards", "revision", "Q&A"]
---

## Flashcards

| # | Question | Answer |
|---|----------|--------|
| 1 | What are the three pillars of the CIA triad? | Confidentiality, Integrity, Availability |
| 2 | What block size and key sizes does AES support? | Block size = 128 bits; key sizes = 128, 192, or 256 bits |
| 3 | What is the key difference between symmetric and asymmetric encryption? | Symmetric uses one shared key for both encryption and decryption; asymmetric uses a public/private key pair |
| 4 | What mathematical problem underpins RSA security? | The difficulty of factoring the product of two large primes |
| 5 | What is the difference between a hash and a MAC? | A hash provides integrity only; a MAC provides integrity and authentication (requires a secret key) |
| 6 | Name three properties a cryptographic hash function must satisfy. | Pre-image resistance, second pre-image resistance, collision resistance |
| 7 | What does Diffie-Hellman achieve and what can it not do? | It establishes a shared secret over an insecure channel but provides no authentication (vulnerable to MITM) |
| 8 | What is the difference between authentication and authorisation? | Authentication verifies identity; authorisation determines what an authenticated entity is allowed to do |
| 9 | What is a replay attack and how is it prevented? | An attacker re-sends a valid captured message; prevented with nonces, timestamps, or sequence numbers |
| 10 | Explain the Bell-LaPadula model rules. | No read up (simple security) and no write down (star property) -- designed to protect confidentiality |
| 11 | What is the difference between DAC and MAC? | DAC lets owners set permissions on their objects; MAC enforces system-wide policy that users cannot override |
| 12 | What is a buffer overflow and why is it a security risk? | Writing data beyond a buffer's allocated memory, potentially overwriting the return address to execute arbitrary code |
| 13 | What is the purpose of a digital certificate? | To bind a public key to an identity, verified by a trusted Certificate Authority (CA) |
| 14 | What is SQL injection? | Inserting malicious SQL into input fields to manipulate database queries |
| 15 | How does TLS provide secure communication? | Handshake uses asymmetric crypto to authenticate and exchange keys; data transfer uses symmetric encryption for speed |
| 16 | What is Cross-Site Scripting (XSS)? | Injecting malicious scripts into web pages viewed by other users, stealing cookies or session data |
| 17 | What is the difference between ECB and CBC modes? | ECB encrypts each block independently (patterns leak); CBC XORs each plaintext block with the previous ciphertext block |
| 18 | What is a firewall and what are its two default policies? | A network device that filters traffic; default-allow (permit unless denied) or default-deny (deny unless permitted) |
| 19 | What is CSRF and how is it mitigated? | Cross-Site Request Forgery tricks a user's browser into making unwanted requests; mitigated with anti-CSRF tokens |
| 20 | What is the Needham-Schroeder protocol's main vulnerability? | Susceptible to replay attacks if a session key is compromised; fixed by Kerberos adding timestamps |
| 21 | What is the principle of least privilege? | A subject should only have the minimum permissions needed to perform its task |
| 22 | What is a man-in-the-middle (MITM) attack? | An attacker secretly intercepts and potentially alters communication between two parties who believe they are communicating directly |
| 23 | What are the DES key and block sizes? | Key = 56 bits (64 bits with parity); block = 64 bits |
| 24 | What is role-based access control (RBAC)? | Permissions are assigned to roles rather than individual users; users are assigned roles |
| 25 | What is the difference between IDS and IPS? | IDS (Intrusion Detection System) monitors and alerts; IPS (Intrusion Prevention System) can also block malicious traffic |
