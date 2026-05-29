# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

There is no test suite in this project.

## Architecture

This is a **Next.js 16 (Pages Router)** portfolio site using TypeScript, Tailwind CSS, and Framer Motion. It is a single-page application — all sections render from `pages/index.tsx` stacked vertically.

### Internationalization (i18n)

The site supports **English, French, and Arabic** via `next-i18next`.

- Translation strings live in `public/locales/{en,fr,ar}/common.json`
- Components access translations via the custom `useTranslationContext()` hook (`contexts/translationContext.tsx`), which wraps `next-i18next`'s `useTranslation`
- Every page that uses translations must export `getStaticProps` calling `serverSideTranslations`
- Arabic requires RTL layout — use CSS logical properties (`start`/`end`, `ms-`/`me-`) instead of `left`/`right` throughout

### Content data split

Content is split into two layers:
- **Translatable text** (titles, descriptions, bios) → `public/locales/` JSON files, referenced by i18n keys
- **Static data** (image paths, URLs, technology arrays, colors) → `constants/data.ts`, imported directly into components

When adding a new section or project, put the text in all three locale files and the structural/visual data in `constants/data.ts`.

### Interactive Terminal

`components/terminal.tsx` renders a modal terminal emulator. Commands are defined in `interface/commands.tsx` using the `Command` interface from `interface/commandInterface.tsx`. The terminal supports piping (`|`), command aliases, tab-completion, and command history. Commands that need translations receive a `t` function as their third argument.

### Styling

Tailwind CSS with a dark glassmorphism theme. The `glass-strong` class (defined in `styles/globals.css`) is used for frosted-glass panels throughout.

### Key file locations

| Purpose | Path |
|---|---|
| All page sections | `pages/index.tsx` |
| Translation context | `contexts/translationContext.tsx` |
| Static content data | `constants/data.ts` |
| Terminal commands | `interface/commands.tsx` |
| Locale strings | `public/locales/{en,fr,ar}/common.json` |
| Global styles | `styles/globals.css` |
