# Study Portal

Unified study site covering all university modules across 3 years. Built with Astro for zero-JS static output, deployed to GitHub Pages.

## Modules

### Year 1 (2023-2024)
| Code | Module | Semester |
|------|--------|----------|
| COMP1017 | Mathematics for Computer Scientists 1 | 1 |
| COMP1027 | Computer Fundamentals | 1 |
| COMP1028 | Programming and Algorithms | 1 |
| COMP1030 | Systems and Architecture | 1 |
| COMP1023 | Software Engineering | 2 |
| COMP1029 | Programming Paradigms | 2 |
| COMP1032 | Fundamentals of Artificial Intelligence | 2 |
| COMP1044 | Databases and Interfaces | 2 |
| COMP1045 | Mathematics for Computer Scientists 2 | 2 |

### Year 2 (2024-2025)
| Code | Module | Semester |
|------|--------|----------|
| COMP2035 | Operating Systems & Concurrency | 1 |
| COMP2042 | Developing Maintainable Software | 1 |
| COMP2066 | Algorithms Data Structures and Efficiency | 1 |
| COMP2032 | Introduction to Image Processing | 2 |
| COMP2039 | Artificial Intelligence Methods | 2 |
| COMP2040 | Languages and Computation | 2 |
| COMP2041 | Software Specification | 2 |
| COMP2067 | Introduction to Formal Reasoning | 2 |

### Year 3 (2025-2026)
| Code | Module | Semester |
|------|--------|----------|
| COMP3038 | Machine Learning | 1 |
| COMP3028 | Computer Security | 2 |
| COMP3029 | Computer Vision | 2 |

## Running Locally

```bash
npm install
npm run dev
```

Open http://localhost:4321/study-portal/

## Building for Production

```bash
npm run build
```

Output goes to `dist/`. Deploy to any static host.

## Deployment (GitHub Pages)

Push to `main` — the GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically builds and deploys.

## Tech Stack

- **Astro 5** — static site generator
- **KaTeX** — math rendering (via remark-math + rehype-katex)
- **Mermaid** — diagrams (client-side ESM import)
- **Tokyo Night** — dark theme colour palette

## Adding a New Module

1. Create `src/content/modules/<code>/` directory
2. Add `.md` files with frontmatter:
   ```yaml
   ---
   title: "Topic Name"
   order: 1
   moduleTitle: "COMP1234 - Module Name"
   tags: ["topic"]
   ---
   ```
3. Update `src/pages/index.astro` module list
4. Copy PDFs to `public/files/<code>/`
