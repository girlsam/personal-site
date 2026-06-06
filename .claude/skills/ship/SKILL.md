---
name: ship
description: Run the full local quality gate (format, lint, typecheck, unit tests + coverage, build) and, if green, stage and commit with a Conventional Commit message. Use before every commit — this repo uses no git hooks.
---

# ship

The local quality gate — run it before committing; it replaces git hooks. Pure `git`: committing is a version-control operation (`gh` has no equivalent).

## Steps

1. Run the gate, stopping at the first failure:

   ```bash
   npm run format:check && npm run lint && npm run typecheck && npm run test:coverage && npm run build
   ```

   - If `format:check` fails, run `npm run format`, review the diff, and re-run.
   - Fix any lint / type / test / build failure before continuing. **Never commit red.**

2. Review what you're about to commit:

   ```bash
   git status && git diff
   ```

3. Stage and commit with a [Conventional Commit](https://www.conventionalcommits.org):

   ```bash
   git add -A
   git commit -m "<type>: <imperative summary>" -m "<body>"
   ```

   - Types: `feat`, `fix`, `chore`, `test`, `docs`, `refactor`, `style`, `perf`.
   - **One logical change per commit** — split unrelated work.
   - Subject in the imperative ("add", not "added").
   - **No AI attribution** — no `Co-Authored-By` trailers, no "Generated with…" lines; keep messages factual.

## Notes

- Don't push here — use the `open-pr` skill to branch, push, and open the PR.
- For UI changes, also do a quick `npm run dev` smoke first.
