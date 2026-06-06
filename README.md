# `<girlsam />`

Sam Goldsmith's personal site — a clean, fast, accessible corner of the internet. Frontend / full-stack engineer with a humanities background; this repo is meant to be as much a portfolio piece as the site itself.

> Built in the open. The code aims to reflect how I work: small components, strong accessibility, behavior-driven tests, and an AI-assisted, hook-free workflow.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4**
- **Vitest** + **React Testing Library** + **jest-axe**
- Deployed on **Vercel** (soon)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Script                                          | What it does             |
| ----------------------------------------------- | ------------------------ |
| `npm run dev`                                   | Start the dev server     |
| `npm run build` / `npm start`                   | Production build / serve |
| `npm run lint` / `lint:fix`                     | ESLint (+ `jsx-a11y`)    |
| `npm run format` / `format:check`               | Prettier write / check   |
| `npm run typecheck`                             | `tsc --noEmit`           |
| `npm run test` / `test:watch` / `test:coverage` | Vitest (unit + a11y)     |

## Quality & workflow

No git hooks — the quality gate runs through committed Claude skills in [`.claude/skills/`](.claude/skills):

- **ship** — format → lint → typecheck → tests + coverage → build, then an atomic commit.
- **open-pr** — branch, ship, push, and open a PR with `gh`.
- **pr-review** — review a diff for correctness, accessibility, performance, and conventions.
- **write-tests** — behavior-as-spec tests (assert on visible outcomes, not internals).

Commits follow [Conventional Commits](https://www.conventionalcommits.org); PRs are squash-merged, one concern each.

## Accessibility & performance

Accessibility is a first-class requirement: semantic HTML, full keyboard support, visible focus, `prefers-reduced-motion`, and WCAG AA contrast in both light and dark themes. The site targets a near-instant load — minimal client JS, static rendering by default, SVG-first visuals, and self-hosted fonts.

## Project structure

```
app/         # routes, layout, global styles + design tokens
components/  # UI, Server Components by default (added as the site grows)
lib/         # content.ts — all editable copy/data — plus helpers
test/        # test helpers (a11y)
.claude/     # committed dev-workflow skills
```
