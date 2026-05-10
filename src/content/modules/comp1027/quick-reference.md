---
title: "Quick Reference"
order: 90
moduleTitle: "COMP1027 - Computer Fundamentals"
tags: ["reference", "cheat-sheet", "binary", "gates"]
---

## Logic Gate Truth Table Summary

| A | B | AND | OR | NAND | NOR | XOR | XNOR |
|---|---|-----|----|----|-----|-----|------|
| 0 | 0 | 0 | 0 | 1 | 1 | 0 | 1 |
| 0 | 1 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 0 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 1 | 1 | 1 | 0 | 0 | 0 | 1 |

## Binary/Decimal/Hex Conversions

| Decimal | Binary | Hex |
|---------|--------|-----|
| 0 | 0000 | 0 |
| 1 | 0001 | 1 |
| 2 | 0010 | 2 |
| 3 | 0011 | 3 |
| 4 | 0100 | 4 |
| 5 | 0101 | 5 |
| 6 | 0110 | 6 |
| 7 | 0111 | 7 |
| 8 | 1000 | 8 |
| 9 | 1001 | 9 |
| 10 | 1010 | A |
| 11 | 1011 | B |
| 12 | 1100 | C |
| 13 | 1101 | D |
| 14 | 1110 | E |
| 15 | 1111 | F |

## Powers of 2

| 2^n | Value | Common Name |
|-----|-------|-------------|
| 2^0 | 1 | |
| 2^1 | 2 | |
| 2^4 | 16 | |
| 2^8 | 256 | |
| 2^10 | 1,024 | 1 KB |
| 2^16 | 65,536 | 64 KB |
| 2^20 | 1,048,576 | 1 MB |
| 2^24 | 16,777,216 | 16 MB |
| 2^30 | 1,073,741,824 | 1 GB |
| 2^32 | 4,294,967,296 | 4 GB |

## 2's Complement (n-bit)

| Operation | Method |
|-----------|--------|
| Positive → binary | Normal binary |
| Negative → binary | Invert all bits + 1 |
| Range (n bits) | -2^(n-1) to 2^(n-1) - 1 |
| 8-bit range | -128 to +127 |
| 16-bit range | -32768 to +32767 |

## HACK Instruction Quick Ref

| Instruction type | Bit 15 | Format |
|-----------------|--------|--------|
| A-instruction | 0 | 0 + 15-bit value |
| C-instruction | 1 | 111 a cccccc ddd jjj |

### Dest codes: d1=A, d2=D, d3=M

### Jump codes

| Code | Meaning |
|------|---------|
| 000 | No jump |
| 001 | JGT (>0) |
| 010 | JEQ (=0) |
| 011 | JGE (>=0) |
| 100 | JLT (<0) |
| 101 | JNE (!=0) |
| 110 | JLE (<=0) |
| 111 | JMP (always) |

## OSI Layers Mnemonic

**P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way (bottom-up: 1→7)

| Layer | Name | Key protocol |
|-------|------|-------------|
| 7 | Application | HTTP, DNS |
| 4 | Transport | TCP, UDP |
| 3 | Network | IP |
| 2 | Data Link | Ethernet |
| 1 | Physical | Cables |

## Subnet Cheat Sheet

| CIDR | Mask last octet | Block size | Usable hosts |
|------|----------------|------------|-------------|
| /24 | 0 (255) | 256 | 254 |
| /25 | 128 | 128 | 126 |
| /26 | 192 | 64 | 62 |
| /27 | 224 | 32 | 30 |
| /28 | 240 | 16 | 14 |
| /29 | 248 | 8 | 6 |
| /30 | 252 | 4 | 2 |

## Key Port Numbers

| Port | Service |
|------|---------|
| 20/21 | FTP |
| 22 | SSH |
| 25 | SMTP |
| 53 | DNS |
| 67/68 | DHCP |
| 80 | HTTP |
| 443 | HTTPS |

## Boolean Algebra Laws (Quick)

| Law | Formula |
|-----|---------|
| De Morgan's | (AB)' = A'+B' ; (A+B)' = A'B' |
| Absorption | A(A+B) = A ; A+AB = A |
| Consensus | AB+A'C+BC = AB+A'C |
