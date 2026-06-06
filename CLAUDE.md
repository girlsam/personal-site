@AGENTS.md

# Project conventions — `<girlsam />`

Personal portfolio site for Sam Goldsmith. Professional but playful; clean, fast, accessible.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4
- Tests: Vitest + React Testing Library + jest-axe (jsdom)
- Deploy: Vercel (later)

## Working agreements

- **Server Components by default.** Add `"use client"` only when a component needs interactivity or browser APIs.
- **All editable content lives in `lib/content.ts`** (name, roles, work history, tech, copy, links) — edit there, not inside components.
- **Style with Tailwind tokens** (design tokens in `app/globals.css`); no magic color/spacing values.
- **Accessibility is a feature:** semantic HTML, keyboard operable, visible focus, `prefers-reduced-motion`, WCAG AA contrast in both themes. Every component test asserts `checkA11y`.
- **Performance (FAST AF):** minimal client JS, static by default, SVG-first visuals, self-hosted fonts.
- **Privacy:** never put personal info (email/phone) or a photo of Sam in markup, metadata, or OG images. Contact is a form + social links only.

## Scripts

`dev`, `build`, `start`, `lint`, `lint:fix`, `format`, `format:check`, `typecheck`, `test`, `test:watch`, `test:coverage`.

## Workflow (no git hooks)

Use the committed skills in `.claude/skills/`:

- **ship** — quality gate (format → lint → typecheck → test + coverage → build), then an atomic Conventional Commit. Run before every commit.
- **open-pr** — branch + ship + push, then `gh pr create` (supports `--draft` / `--reviewer`).
- **pr-review** — review a PR or branch diff for correctness, a11y, perf, conventions.
- **write-tests** — behavior-as-spec tests; assert on visible outcomes, not internals.

Conventions: atomic Conventional Commits, **no AI attribution** (no `Co-Authored-By`, no "Generated with…"), squash-merge, one concern per PR.

## Deferred (added in the hardening pass)

GitHub Actions CI, Lighthouse budgets, Playwright e2e.
