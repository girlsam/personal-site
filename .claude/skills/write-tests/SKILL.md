---
name: write-tests
description: Write or extend tests for this project using Vitest + React Testing Library + jest-axe. Use when adding a component, fixing a bug (add a regression test), or raising coverage.
---

# write-tests

Stack: **Vitest + React Testing Library + jest-axe**, jsdom, coverage via v8.

## Principle: tests describe behavior, not implementation

A test should read like a spec of what the thing _does_ for a user — so it survives refactors and fails only when real behavior breaks.

- **Name tests as specs** — the observable behavior, not the mechanism:
  - ✅ `it("logs the user out after 2 minutes idle")`
  - ❌ `it("returns null user after timeout")`
  - ✅ `it("shows an error when the email is missing")`
  - ❌ `it("sets formState.error to true")`
- **Assert on visible outcomes**, not internal method calls or private state:
  - ✅ rendered text, roles, `aria-*`, navigation, what a callback received.
  - ❌ private state, instance methods, whether some internal function was called.
- **Query the way a user finds things** — `getByRole` / `getByLabelText` / `getByText`, never test IDs or class names.
- **Interact like a user** — `@testing-library/user-event`, not `fireEvent` or calling handlers directly.

If a behavior can only be checked by reaching into internals, that's a smell: make the behavior observable (an `aria` attribute, visible text, a callback) and assert on that instead.

## Conventions

- **Co-locate** tests: `Foo.tsx` → `Foo.test.tsx`.
- Global `describe` / `it` / `expect` (Vitest globals are on).
- **Every component test includes an a11y assertion** via `checkA11y`.
- Keep coverage green (`vitest.config.ts`): lines/functions/statements ≥ 80, branches ≥ 70.

## Pattern

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { checkA11y } from "@/test/a11y";
import { ThemeToggle } from "./ThemeToggle";

describe("ThemeToggle", () => {
  it("switches the page to dark mode when pressed", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);

    await user.click(screen.getByRole("button", { name: /switch to dark/i }));

    // The visible outcome a user/screen-reader perceives — not internal state.
    expect(screen.getByRole("button", { name: /switch to light/i })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ThemeToggle />);
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
```

## Server vs client

- Client components (`"use client"`) — test interaction and the resulting visible output.
- Sync server components — test rendered output.
- Async data-fetching server components — covered by the later browser pass, or test their client children directly.

## Run

- `npm run test:watch` while writing; `npm run test:coverage` before shipping.
