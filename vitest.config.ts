import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**"],
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      // Pages/layout are covered by the full-page Playwright + axe pass in e2e/
      // rather than unit tests, so they're excluded from unit-coverage thresholds.
      include: ["app/**", "components/**", "lib/**"],
      exclude: ["**/*.test.{ts,tsx}", "**/*.d.ts", "app/**/layout.tsx"],
      thresholds: {
        lines: 80,
        functions: 80,
        statements: 80,
        branches: 70,
      },
    },
  },
});
