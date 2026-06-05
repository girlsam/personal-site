/// <reference types="vitest/globals" />

// jest-axe's `toHaveNoViolations` matcher is registered on Vitest's expect in
// vitest.setup.ts. jest-axe only types it for jest, so declare it on Vitest's
// Assertion here.
export {};

declare module "vitest" {
  interface Assertion<T = any> {
    toHaveNoViolations(): void;
  }
  interface AsymmetricMatchersContaining {
    toHaveNoViolations(): void;
  }
}
