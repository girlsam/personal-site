import { render, screen } from "@testing-library/react";

import { BubbleNav } from "./BubbleNav";
import { nav, social } from "@/lib/content";
import { checkA11y } from "@/test/a11y";

describe("BubbleNav", () => {
  it("renders a primary navigation landmark", () => {
    render(<BubbleNav />);
    expect(screen.getByRole("navigation", { name: /primary/i })).toBeInTheDocument();
  });

  it("renders a link for each nav item", () => {
    render(<BubbleNav />);
    for (const item of nav) {
      expect(screen.getByRole("link", { name: item.label })).toHaveAttribute("href", item.href);
    }
  });

  it("links to GitHub and LinkedIn with accessible names", () => {
    render(<BubbleNav />);
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute("href", social.github);
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      social.linkedin,
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<BubbleNav />);
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
