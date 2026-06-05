import { axe } from "jest-axe";

/**
 * Run axe against an isolated component container.
 *
 * Document-scoped rules (page title, `<html lang>`, single `main` landmark,
 * region) can't be satisfied by a detached component, so they're disabled here
 * and covered instead by the full-page Playwright + axe pass in `e2e/`.
 */
export function checkA11y(container: Element) {
  return axe(container, {
    rules: {
      "document-title": { enabled: false },
      "html-has-lang": { enabled: false },
      "landmark-one-main": { enabled: false },
      region: { enabled: false },
      // jsdom has no canvas, so color-contrast can't be computed here — it's
      // checked against the real browser in the Playwright + axe e2e pass.
      "color-contrast": { enabled: false },
    },
  });
}
