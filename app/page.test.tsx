import { render, screen } from "@testing-library/react";

import Home from "./page";
import { checkA11y } from "@/test/a11y";

beforeEach(() => {
  // The About section's Spotify widget fetches on mount.
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ status: 204 }));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Home page", () => {
  it("renders the hero, experience, and about sections", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1, name: /sam goldsmith/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /experience/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /about/i })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Home />);
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
