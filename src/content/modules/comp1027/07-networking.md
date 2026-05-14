---
title: "Networking"
order: 7
moduleTitle: "COMP1027 - Computer Fundamentals"
tags: ["networking", "OSI", "TCP-IP", "protocols", "IP-addressing"]
---

## OSI Model (7 Layers)

:::eli10

The OSI model is like a 7-layer cake for how computers talk to each other. Each layer has a specific job. The top layers handle things humans care about (web pages, email). The bottom layers handle the physical stuff (actual wires and signals). Data goes down through the layers on one computer, across the network, and back up through the layers on the other computer.

:::

:::eli15

The OSI (Open Systems Interconnection) model divides network communication into 7 layers, each with a specific responsibility. From top to bottom: Application (user-facing services), Presentation (data format/encryption), Session (connection management), Transport (reliable end-to-end delivery), Network (routing between networks), Data Link (local frame delivery, MAC addressing), and Physical (bits on the wire). Each layer communicates with its peer on the other machine and provides services to the layer above.

:::

:::eli20

| # | Layer | Function | PDU | Devices | Protocols |
|---|-------|----------|-----|---------|-----------|
| 7 | Application | User interface, services | Data | - | HTTP, FTP, SMTP, DNS |
| 6 | Presentation | Encryption, compression, format | Data | - | SSL/TLS, JPEG, ASCII |
| 5 | Session | Session management | Data | - | NetBIOS, RPC |
| 4 | Transport | End-to-end delivery, reliability | Segment | - | TCP, UDP |
| 3 | Network | Routing, logical addressing | Packet | Router | IP, ICMP, ARP |
| 2 | Data Link | Framing, MAC addressing, error detection | Frame | Switch, Bridge | Ethernet, WiFi |
| 1 | Physical | Bits on wire/air | Bits | Hub, Cable | Ethernet physical, fibre |

Mnemonic (top-down): **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing

:::

## TCP/IP Model (4 Layers)

:::eli10

The TCP/IP model is a simpler version of the OSI model with only 4 layers. It is what the internet actually uses. The Application layer handles apps like web browsers and email. Transport handles delivery. Internet handles routing. Network Access handles the physical connection.

:::

:::eli15

The TCP/IP model is the practical model used by the internet, with 4 layers that map roughly to the OSI model. The Application layer combines OSI layers 5-7 (applications, presentation, session). Transport (layer 4) provides TCP (reliable) or UDP (fast). Internet (layer 3) handles IP routing. Network Access (layers 1-2) handles physical transmission. This model is less theoretical and more implementation-focused than OSI.

:::

:::eli20

| TCP/IP Layer | OSI Equivalent | Protocols |
|-------------|----------------|-----------|
| Application | 7, 6, 5 | HTTP, DNS, SMTP, FTP |
| Transport | 4 | TCP, UDP |
| Internet | 3 | IP, ICMP, ARP |
| Network Access | 2, 1 | Ethernet, WiFi |

:::

## TCP vs UDP

:::eli10

TCP is like sending a registered letter -- you get confirmation it arrived, it arrives in order, and if it gets lost it is resent. UDP is like shouting across a room -- faster but no guarantee the message arrives or arrives in order. TCP is for important stuff (web pages, email); UDP is for fast stuff (video streaming, games).

:::

:::eli15

TCP (Transmission Control Protocol) provides reliable, ordered, connection-oriented delivery. It uses a 3-way handshake to establish connections, guarantees delivery through acknowledgements and retransmission, and ensures data arrives in order. UDP (User Datagram Protocol) is connectionless, provides no delivery guarantee, but is much faster with less overhead. TCP is used for web browsing, email, and file transfer. UDP is used for streaming, DNS queries, and real-time gaming where speed matters more than perfection.

:::

:::eli20

| Feature | TCP | UDP |
|---------|-----|-----|
| Connection | Connection-oriented (3-way handshake) | Connectionless |
| Reliability | Guaranteed delivery, ordering | No guarantee |
| Speed | Slower (overhead) | Faster |
| Use cases | Web, email, file transfer | Streaming, DNS, gaming |
| Header size | 20 bytes minimum | 8 bytes |

### TCP 3-Way Handshake

1. Client → SYN → Server
2. Server → SYN-ACK → Client
3. Client → ACK → Server

:::

## IP Addressing (IPv4)

:::eli10

Every computer on a network has an IP address, like a postal address for the internet. IPv4 addresses have four numbers separated by dots (like 192.168.1.5). Some addresses are "private" (only used within your home network) and some are "public" (visible on the internet).

:::

:::eli15

IPv4 addresses are 32-bit numbers written as four octets in dotted decimal (e.g., 192.168.1.1). They are divided into classes (A, B, C) based on how many bits are for the network vs. host portion. Private address ranges (10.x.x.x, 172.16-31.x.x, 192.168.x.x) are used on local networks and not routed on the internet. Subnetting divides networks into smaller subnetworks using subnet masks, allowing efficient IP allocation.

:::

:::eli20

| Class | Range (first octet) | Default mask | Networks | Hosts/network |
|-------|---------------------|--------------|----------|---------------|
| A | 1-126 | 255.0.0.0 (/8) | 126 | ~16 million |
| B | 128-191 | 255.255.0.0 (/16) | ~16,000 | 65,534 |
| C | 192-223 | 255.255.255.0 (/24) | ~2 million | 254 |

**Private address ranges**: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16

### Subnetting

- **Network address**: first address (host bits all 0)
- **Broadcast address**: last address (host bits all 1)
- **Usable hosts** = 2^(host bits) - 2
- CIDR notation: /n means n bits for network

| Mask | CIDR | Hosts |
|------|------|-------|
| 255.255.255.0 | /24 | 254 |
| 255.255.255.128 | /25 | 126 |
| 255.255.255.192 | /26 | 62 |
| 255.255.255.224 | /27 | 30 |
| 255.255.255.240 | /28 | 14 |

:::

## Key Protocols

:::eli10

Protocols are rules for how computers communicate. HTTP is for web pages. DNS turns website names (like google.com) into IP addresses. DHCP automatically gives your computer an IP address when you connect to a network. Each protocol has a port number, like a door number in an apartment building.

:::

:::eli15

Network protocols define standardised rules for specific services. Each protocol typically operates on a well-known port number. HTTP (port 80) and HTTPS (port 443) serve web content. DNS (port 53) translates domain names to IP addresses. DHCP (ports 67/68) automatically assigns IP addresses to devices. SSH (port 22) provides secure remote access. Email uses SMTP (sending), IMAP/POP3 (receiving). Knowing port numbers helps with firewalling and troubleshooting.

:::

:::eli20

| Protocol | Port | Function |
|----------|------|----------|
| HTTP | 80 | Web pages (unencrypted) |
| HTTPS | 443 | Web pages (encrypted) |
| DNS | 53 | Domain name → IP resolution |
| DHCP | 67/68 | Automatic IP assignment |
| FTP | 20/21 | File transfer |
| SMTP | 25 | Sending email |
| SSH | 22 | Secure remote access |
| IMAP | 143 | Retrieving email |
| POP3 | 110 | Retrieving email (download) |

:::

## DNS Resolution Process

:::eli10

DNS is like a phone book for the internet. When you type "google.com," your computer needs to find the actual IP address. It asks a series of DNS servers, starting from the top (root servers) and working down until it finds the answer. The result is cached so you do not have to look it up again next time.

:::

:::eli15

DNS resolution converts human-readable domain names to IP addresses through a hierarchical lookup. First the browser checks its local cache. If not found, it queries a recursive DNS resolver (usually from your ISP). The resolver queries root servers (which know about top-level domains), then TLD servers (which know about specific domains), then the authoritative server for that domain (which has the actual IP). Results are cached at each level to speed up future lookups.

:::

:::eli20

1. Browser checks local cache
2. Query recursive DNS resolver (ISP)
3. Resolver queries root server → TLD server → authoritative server
4. IP returned and cached

:::

## DHCP Process (DORA)

:::eli10

DHCP is how your computer automatically gets an IP address when it joins a network. It follows four steps called DORA: your computer shouts "anyone there?" (Discover), a server replies with an offered address (Offer), your computer says "I will take it" (Request), and the server confirms (Acknowledge). No manual setup needed.

:::

:::eli15

DHCP (Dynamic Host Configuration Protocol) automatically assigns IP addresses to devices joining a network. The four-step DORA process works by broadcast: the client sends a Discover message (broadcast, since it has no IP yet), available DHCP servers respond with Offers, the client sends a Request choosing one offer, and the server sends an Acknowledge confirming the lease. This eliminates the need for manual IP configuration.

:::

:::eli20

| Step | Message | Direction |
|------|---------|-----------|
| 1 | **D**iscover | Client → Broadcast |
| 2 | **O**ffer | Server → Client |
| 3 | **R**equest | Client → Server |
| 4 | **A**cknowledge | Server → Client |

:::

## Network Devices

:::eli10

Different devices operate at different layers. A hub is like a loudspeaker -- it sends everything to everyone. A switch is smarter -- it sends data only to the right device using MAC addresses. A router is the smartest -- it finds the best path between different networks using IP addresses.

:::

:::eli15

Network devices operate at different OSI layers and have different intelligence levels. Hubs (layer 1) blindly broadcast all data to all ports. Switches (layer 2) learn MAC addresses and forward frames only to the correct port, reducing unnecessary traffic. Routers (layer 3) connect different networks and make forwarding decisions based on IP addresses and routing tables. Firewalls operate across layers 3-7 and filter traffic based on configurable rules.

:::

:::eli20

| Device | Layer | Function |
|--------|-------|----------|
| Hub | 1 | Broadcasts to all ports |
| Switch | 2 | Forwards by MAC address |
| Router | 3 | Routes by IP address |
| Firewall | 3-7 | Filters traffic by rules |

<details>
<summary>Practice: Subnet 192.168.1.0/26 -- what are network, broadcast, usable range?</summary>

/26 = 255.255.255.192 → 6 host bits → 2^6 - 2 = 62 usable hosts

- Network: 192.168.1.0
- First usable: 192.168.1.1
- Last usable: 192.168.1.62
- Broadcast: 192.168.1.63

Next subnet starts at 192.168.1.64
</details>

<details>
<summary>Practice: Which layer handles routing?</summary>

**Layer 3 (Network layer)** -- uses IP addresses and routing tables to determine the best path for packets across networks. Devices: routers.
</details>

<details>
<summary>Practice: Why does DNS primarily use UDP?</summary>

- DNS queries are small (fit in single packet)
- Speed matters more than reliability for lookups
- If response lost, client simply re-queries
- No need for connection setup overhead

Note: DNS uses TCP for zone transfers and responses > 512 bytes.
</details>

:::
