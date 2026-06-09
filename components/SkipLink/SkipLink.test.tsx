import { render, screen } from "@testing-library/react";

import { SkipLink } from "./SkipLink";
import { checkA11y } from "@/test/a11y";

describe("SkipLink", () => {
  it("links to the main content region", () => {
    render(<SkipLink />);
    const link = screen.getByRole("link", { name: /skip to content/i });
    expect(link).toHaveAttribute("href", "#main");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SkipLink />);
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
