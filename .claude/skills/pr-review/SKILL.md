---
name: pr-review
description: Review a pull request (or the current branch's diff vs main) for correctness, accessibility, performance, and project conventions. Uses git + gh; can optionally post the review to the PR.
---

# pr-review

A focused review of a PR or the current branch, run locally. `git`/`gh` to gather the diff; posting back is optional. This does not need to run in GitHub Actions.

## Inputs

- `<pr-number>` (optional) — review a specific PR. Default: the current branch's diff vs `main`.
- `--post` (optional) — submit the review to the PR via `gh` instead of only printing it.

## Workflow

1. **Gather context.**
   - With a PR number: `gh pr view <n> --json title,body,headRefName,files` and `gh pr diff <n>`.
   - Otherwise: `git fetch origin main -q && git diff origin/main...HEAD` and `git log origin/main..HEAD --oneline`.

2. **Review against this project's bar:**
   - **Correctness & bugs** — logic errors, missing loading/empty/error states, unhandled edge cases.
   - **Accessibility (core value)** — semantic HTML, roles/labels, keyboard operability, `:focus-visible`, `prefers-reduced-motion`, color contrast, `aria-current`, form labels/errors. Flag anything no `checkA11y` test covers.
   - **Performance (FAST AF)** — needless `"use client"`, heavy deps, client data on first paint, font/image cost, layout shift.
   - **Conventions** — Server Components by default; content in `lib/content.ts`; Tailwind tokens (no magic values); co-located tests; small, single-purpose components.
   - **Privacy** — no personal info (email/phone) and no photos of the user in markup, metadata, or OG.
   - **Tests** — new/changed logic has tests; coverage stays green.

3. **Report** findings grouped by severity — **blocking / should-fix / nit** — each with `file:line` and a concrete fix.

4. Confirm the `ship` gate is green.

5. **(Optional) Post** the review with `--post`:

   ```bash
   gh pr review <n> --comment --body-file <review.md>
   # or --request-changes / --approve
   ```

## Notes

- For a deeper multi-file pass, the built-in `/code-review` command (and cloud `ultrareview`) go further.
- Auto-posting a review on every PR would run the Claude GitHub Action in CI — the only part that must execute on GitHub, and it's deferred with the rest of CI.
