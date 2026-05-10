---
title: "Study Order"
order: 94
moduleTitle: "COMP3028 - Computer Security"
tags: ["study-order", "planning", "revision"]
---

## Recommended Study Order

| # | Topic | Why this order | Estimated time |
|---|-------|---------------|----------------|
| 1 | Symmetric Cryptography (AES, DES, modes) | Foundation for all later crypto topics; introduces core encryption concepts | 3 hours |
| 2 | Asymmetric Cryptography (RSA, DH, ECC) | Builds on symmetric understanding; needed for authentication and TLS | 3 hours |
| 3 | Hashing and MACs | Depends on understanding of crypto primitives; links encryption to integrity | 2 hours |
| 4 | Authentication Protocols | Uses both symmetric and asymmetric crypto plus hashing | 3 hours |
| 5 | Access Control Models | Logical next step after authentication -- what happens after identity is verified | 2.5 hours |
| 6 | Network Security (TLS, IPSec, Firewalls) | Applies crypto and authentication in a network context | 3 hours |
| 7 | Web Security (XSS, CSRF, SQLi) | Application-layer attacks that sit on top of network infrastructure | 2.5 hours |

### Tips

- Topics 1-3 are pure foundations -- master these first as every later topic references them.
- Topics 4-5 are conceptual and protocol-heavy -- draw sequence diagrams for each protocol.
- Topics 6-7 are application-focused -- practice identifying attacks in code/scenario snippets.
- Total estimated study time: ~19 hours (spread over 5-6 days recommended).
