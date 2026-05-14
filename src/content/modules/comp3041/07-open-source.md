---
title: "Open Source & Licensing"
order: 7
moduleTitle: "COMP3041 - Professional Ethics in Computing"
tags: ["open-source", "licensing", "GPL", "MIT", "Apache", "copyleft", "free-software"]
---

## What is Open Source Software?

:::eli10

Open source software is like a recipe that anyone can read, change, and share. With normal (proprietary) software, the recipe is kept secret and you can only use the finished dish. With open source, you can see how it is made, improve it, and share your improved version with others.

:::

:::eli15

Open source software provides the source code to anyone, along with the freedom to view, run, modify, and distribute it. Unlike proprietary software (where source code is a trade secret and users only get the compiled program), open source enables collaboration, transparency, and community-driven development. It is both a development model and a philosophy about how software should be shared.

:::

:::eli20

- **Source** = software in source code form
- **Open** = freedom to: view, run, modify, and distribute the software

### Key Characteristics
- Software development model
- Philosophy of sharing and collaboration
- Licensing model that enables these freedoms

### Contrast with Proprietary Software

| Aspect | Open Source | Proprietary |
|--------|-----------|-------------|
| Source code | Available to all | Trade secret |
| Distribution | Source code form | Object code only |
| Modification | Freely allowed | Restricted/forbidden |
| Derivative works | Allowed (with conditions) | Limited rights |

:::

## Other Labels for Open Source

:::eli10

Open source goes by many names. "Free software" means free as in freedom (you are free to change it), not free as in no cost. "Copyleft" means if you share changes, they must stay free too. The important thing is that the code belongs to everyone.

:::

:::eli15

Open source software is also called free software ("free as in speech, not free as in beer," meaning freedom rather than price), copyleft (ensuring derivatives remain free), community software, or public software. These terms emphasise different aspects: "free software" focuses on user freedom as a moral imperative, while "open source" emphasises the practical benefits of collaborative development.

:::

:::eli20

| Label | Notes |
|-------|-------|
| Free software | "Free as in speech, not free as in beer" |
| Copyleft | Ensures derivatives remain free |
| Community software | Developed by communities |
| Public software | Available to all |

:::

## Who Makes Open Source Software?

:::eli10

Famous people like Richard Stallman (who started the free software movement) and Linus Torvalds (who created Linux, the system that runs most of the internet) helped build open source. Today, big companies like IBM, Apple, and Google all use and contribute to open source projects.

:::

:::eli15

Open source is driven by individuals (notably Richard Stallman of the Free Software Foundation and Linus Torvalds who created Linux), communities of volunteer developers, and increasingly by major corporations (IBM, Intel, Apple, Google) who contribute to and depend on open source infrastructure. The internet itself runs largely on open source (Apache web server, Linux, BIND DNS), making it foundational to modern computing.

:::

:::eli20

### Notable Figures
- **Richard Stallman** — Free Software Foundation (FSF)
- **Linus Torvalds** — Linux kernel

### Who Uses It?
- Internet backbone: Apache, Sendmail, BIND
- Major companies: IBM, Intel, Apple, HP, Sun
- Commercial businesses, governments
- Increasingly: everyone

:::

## Open Source as a Business

:::eli10

Even though open source is free to use, companies still make money from it. They might sell help and support, offer a fancier paid version, sell hardware that runs the free software, or add extra features on top. The software is free, but the services around it are not.

:::

:::eli15

Open source does not mean "no business model." Companies monetise open source through services and support (consulting, maintenance, training), dual licensing (free community version plus paid enterprise version), selling hardware bundled with free software, branded distributions, and value-added proprietary features on top of an open core. The key insight is that value shifts from the software itself to the ecosystem around it.

:::

:::eli20

"Think 'free speech,' not 'free beer'" — Richard Stallman

| Business Model | How it works |
|---------------|-------------|
| Branded distributions | Package and distribute with branding |
| Hardware + free software | Sell hardware, give away software |
| Services and support | Sell consulting, maintenance, training |
| Dual versions | Free community edition + paid enterprise |
| Dual licensing | Open source + commercial licence option |
| Value-added software | Add proprietary features on top |
| Sponsorships/ads | Corporate sponsorship, advertising |

:::

## Licensing: The Force Behind Open Source

:::eli10

A licence is the set of rules that comes with open source software. Without a licence, even free software could be taken and locked up by someone. The licence makes sure the software stays open and tells people what they can and cannot do with it.

:::

:::eli15

Licensing is what makes open source legally enforceable. Open source is not the same as public domain (no rights reserved) or freeware (free to use but not to modify). A licence uses copyright law to grant specific freedoms while imposing conditions. Without a licence, the default is "all rights reserved," so paradoxically, software must be copyrighted and licensed to remain free.

:::

:::eli20

**Important distinctions**:
- Open source ≠ public domain
- Open source ≠ shareware/freeware
- Licensing makes it work (control over use, risk shifting)

> "To stay free, software must be copyrighted and licensed." — Debian GNU/Linux Group

:::

## Major Open Source Licences

:::eli10

The GPL licence says: if you use this code and share what you build, you must share your code too (it is "contagious"). The MIT licence says: do whatever you want, just keep my name on it. The Apache licence is like MIT but also says you cannot sue the creators over patents. Each has different rules about sharing.

:::

:::eli15

The three most important open source licences differ in how much freedom they give and require. GPL (copyleft) requires that any derivative work must also be open source under GPL, ensuring the code stays free forever. MIT (permissive) allows almost anything, including use in proprietary software, with only a copyright notice required. Apache (permissive with patent grant) is similar to MIT but explicitly grants patent rights and is more business-friendly. The choice of licence reflects a philosophical stance on software freedom.

:::

:::eli20

### GPL (GNU General Public License)

| Aspect | Details |
|--------|---------|
| Usage | Most widely used (~85% of open source) |
| Core requirement | Derivative works must also be GPL ("copyleft") |
| Source code | Must distribute source with any distribution |
| Freedom | Ensures software remains free forever |
| Key effect | "Viral" — derivatives must adopt GPL |

### MIT License

| Aspect | Details |
|--------|---------|
| Freedom | Extensive — use, modify, distribute freely |
| Proprietary use | Allowed (can use in proprietary projects) |
| Requirements | Include original copyright notice and disclaimer |
| Key effect | Minimal obligations; permissive |

### Apache License

| Aspect | Details |
|--------|---------|
| Origin | Governs Apache web-server software |
| Modification | User freedom to distribute and modify |
| Source code | No requirement to make source available downstream |
| Requirements | Retain copyright notices and warranty disclaimers |
| Key effect | Business-friendly; allows proprietary derivatives |

### Licence Comparison

| Feature | GPL | MIT | Apache |
|---------|-----|-----|--------|
| Can use in proprietary software? | No | Yes | Yes |
| Must share source of derivatives? | Yes | No | No |
| Must include copyright notice? | Yes | Yes | Yes |
| "Copyleft" (viral)? | Yes | No | No |
| Patent grant? | GPLv3: Yes | No | Yes |

:::

## Ethical Dimensions

:::eli10

Some people believe all software should be free because controlling software means controlling people. Others think it is okay to mix open and closed software because that helps more people use it and helps businesses survive. Both sides care about doing the right thing, but they disagree on what "right" means here.

:::

:::eli15

The ethics of open source involve a core tension. The Free Software Foundation view (Stallman) holds that proprietary software is inherently unethical because it restricts user freedom; GPL ensures freedom propagates. The pragmatic view holds that permissive licences (MIT, Apache) enable wider adoption and business sustainability, even if some derivatives become proprietary. Other tensions include whether corporate open source contributions are genuine or strategic, and whether copyleft "forcing" openness respects developer freedom.

:::

:::eli20

### Software Freedom (FSF View)
- Users should control software, not vice versa
- Proprietary software is inherently unethical (restricts freedom)
- GPL ensures freedom propagates

### Pragmatic View
- Open source enables collaboration and innovation
- Permissive licences (MIT, Apache) enable wider adoption
- Business sustainability requires viable models

### Ethical Tensions

| Tension | Analysis |
|---------|----------|
| GPL forces openness on derivatives | Freedom for end users vs freedom for developers |
| Proprietary software using open source | Fair use of permissive licences vs "taking" from community |
| Corporate open source contributions | Genuine contribution vs strategic positioning |

:::
