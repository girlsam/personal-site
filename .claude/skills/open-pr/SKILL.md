---
name: open-pr
description: Create a feature branch (if needed), run the ship gate, push, and open a pull request with gh — inferring the title and body from the commits and diff. Supports --draft and --reviewer.
---

# open-pr

From working changes to an open PR. `git` does branch/commit/push; `gh` creates the PR.

## Inputs

- `--draft` — open the PR as a draft (work in progress).
- `--reviewer <user>` — request a reviewer (repeatable).
- free text — extra context to weave into the PR body.

## Workflow

1. **Branch** (`git`). If you're on `main`, move the work onto a feature branch:

   ```bash
   git switch -c <type>/<short-name>   # e.g. feat/bubble-nav, fix/contrast
   ```

2. **Gate** (`ship`). Run the `ship` skill and commit pending work as atomic Conventional Commits.

3. **Push** (`git`):

   ```bash
   git push -u origin HEAD
   ```

4. **Infer PR content** from `git log main..HEAD` and `git diff main...HEAD`, filling `.github/PULL_REQUEST_TEMPLATE.md`:
   - **Title:** a Conventional-Commit-style summary.
   - **Body:** Summary, What changed, Testing (gate results), Screenshots (light + dark) for UI.

5. **Pre-flight** (`gh`). Confirm the branch is pushed and no PR exists yet:

   ```bash
   gh pr list --head "$(git branch --show-current)" --json url
   ```

6. **Create the PR** (`gh`):

   ```bash
   gh pr create --base main --head "$(git branch --show-current)" \
     --title "<title>" --body-file <body.md> [--draft] [--reviewer <user>]
   ```

   Print the resulting PR URL.

## Conventions

- **Factual, concise** titles and bodies — describe the change, not the process.
- **No AI attribution** — no `Co-Authored-By` trailers, no "Generated with…" footers.
- One concern per PR; **squash-merge** to keep `main` linear. Don't merge red.
