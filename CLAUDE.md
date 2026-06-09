# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal portfolio + technical notes website deployed on GitHub Pages. No build system, no dependencies, no compilation step — everything is plain HTML/CSS/JS served directly by GitHub Pages.

The `.nojekyll` file at the root disables GitHub Pages' default Jekyll processing.

## Structure

The site has two distinct parts:

**Portfolio (root)**
- `index.html` — single-page resume/portfolio
- `style.css` — all styles for the portfolio page
- `script.js` — theme toggle (localStorage key: `theme`) and typewriter animation

**Technical Notes (`notes/`)**
- `notes/index.html` — Docsify SPA entrypoint (loads all JS/CSS from CDN)
- `notes/README.md` — rendered as the notes homepage by Docsify
- `notes/_sidebar.md` — manually maintained navigation sidebar; **must be updated whenever a note is added or renamed**
- `notes/<category>/*.md` — note files organized by topic
- `notes/<category>/images/` — images referenced by notes in that category

### Note Category Folders

| Folder | Sidebar Section(s) |
|--------|-------------------|
| `notes/java/` | ☕ Java 底層與架構 |
| `notes/spring-boot/` | 🍃 Spring 生態系解析 + ☁️ Spring Cloud 微服務 + 🔧 開發工具 |
| `notes/hibernate/` | 💾 Hibernate |
| `notes/devops/` | 🐳 DevOps 與雲端部署 |
| `notes/security/` | 🔐 資安與認證 |
| `notes/acenexus/` | 🚀 實戰專案架構解析 (AceNexus) |

> **Note:** The `spring-boot/` folder physically stores Spring Boot notes, Spring Cloud notes, **and** dev-tool notes (`Git-基礎與版控.md`, `IntelliJ-開發效率完整指南.md`). The sidebar splits these into three separate sections. Place new dev-tool notes in `spring-boot/` under the 🔧 section; place new Spring Cloud notes in `spring-boot/` under the ☁️ section.

## Content Language

All notes and portfolio content are written in Traditional Chinese (zh-TW). Maintain this language when editing or adding content.

## Portfolio Theming (style.css / script.js)

Colours and spacing are driven entirely by CSS custom properties defined on `:root` (light) and `[data-theme="dark"]` (dark). The primary accent is `--primary: #0984e3`. When adding new styled elements, use existing variables rather than hardcoding values.

`script.js` toggles dark mode via `body.setAttribute('data-theme', 'dark')` / `body.removeAttribute('data-theme')`, persisting the preference to `localStorage` (`'dark'` | `'light'`), falling back to `prefers-color-scheme`. Icons swap between `fa-moon` (light mode) and `fa-sun` (dark mode).

## Adding Notes

1. Create `notes/<category>/your-note-title.md`
2. Add the corresponding entry to `notes/_sidebar.md` under the correct section
3. Images for a note go in `notes/<category>/images/` and are referenced with relative paths (e.g., `images/filename.png`)

## Docsify Configuration (notes/index.html)

Docsify v4 is loaded from CDN. Active plugins:
- **Search** — full-text search with Chinese placeholder
- **Copy Code** — adds copy button to all code blocks
- **Prism syntax highlighting** — Java, SQL, Bash, YAML (other languages render as plain text)

Sidebar depth is capped at 3 (`subMaxLevel: 3`).

### Rendering Constraints

Known rendering quirk: `` **`text`** `` (bold + inline code combined) does not render correctly — use plain `**text**` or `` `text` `` separately instead.

## Local Preview

Docsify requires a real HTTP server — `file://` URLs won't work. Serve from the repo root:

```bash
python -m http.server 8080
# then open http://localhost:8080 (portfolio) or http://localhost:8080/notes/ (notes)
```

Any static file server works (VS Code Live Server, `npx serve`, etc.).

## Adding Prism Syntax Languages

To enable highlighting for a new language in notes, add the corresponding Prism component script to `notes/index.html` after the existing Prism `<script>` tags:

```html
<script src="//cdn.jsdelivr.net/npm/prismjs@1/components/prism-<language>.min.js"></script>
```

Languages not loaded this way will render as plain (unhighlighted) code blocks.

## Deployment

Push to `main` — GitHub Pages auto-deploys. No CI, no build step.
