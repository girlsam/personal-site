import { render, screen } from "@testing-library/react";

import { About } from "./About";
import { about } from "@/lib/content";
import { checkA11y } from "@/test/a11y";

beforeEach(() => {
  // About renders the Spotify widget, which fetches on mount.
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ status: 204 }));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("About", () => {
  it("renders the section heading", () => {
    render(<About />);
    expect(screen.getByRole("heading", { level: 2, name: /about/i })).toBeInTheDocument();
  });

  it("renders the narrative and the inclusive-design statement", () => {
    render(<About />);
    for (const paragraph of about.paragraphs) {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    }
    expect(screen.getByText(about.inclusive)).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<About />);
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
