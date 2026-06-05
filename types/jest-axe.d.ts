// Minimal type shim for jest-axe 10, which ships no types of its own. We avoid
// @types/jest-axe because it pulls in @types/jest, whose globals clash with
// Vitest's. This declares only the surface we use; the matcher implementation is
// jest-axe's (registered in vitest.setup.ts, typed for Vitest in
// vitest-globals.d.ts).
declare module "jest-axe" {
  interface AxeResults {
    violations: unknown[];
  }

  interface RunOptions {
    rules?: Record<string, { enabled: boolean }>;
    [option: string]: unknown;
  }

  export function axe(html: Element | string, options?: RunOptions): Promise<AxeResults>;
  export function configureAxe(options?: RunOptions): typeof axe;
  export const toHaveNoViolations: {
    toHaveNoViolations(results: AxeResults): { pass: boolean; message(): string };
  };
}
