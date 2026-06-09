import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { toHaveNoViolations } from "jest-axe";
import { afterEach, expect } from "vitest";

// Register jest-axe's accessibility matcher on Vitest's expect.
expect.extend(toHaveNoViolations);

afterEach(() => {
  cleanup();
});
