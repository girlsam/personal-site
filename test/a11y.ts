import { axe } from "jest-axe";

/**
 * Run axe against an isolated component container.
 *
 * Document-scoped rules (page title, `<html lang>`, single `main` landmark,
 * region) can't be satisfied by a detached component, so they're disabled here.
 * They're verified later in a full-page, real-browser a11y pass.
 */
export function checkA11y(container: Element) {
  return axe(container, {
    rules: {
      "document-title": { enabled: false },
      "html-has-lang": { enabled: false },
      "landmark-one-main": { enabled: false },
      region: { enabled: false },
      // jsdom has no canvas, so color-contrast can't be computed here — it's
      // verified later in a full-page, real-browser a11y pass.
      "color-contrast": { enabled: false },
    },
  });
}
