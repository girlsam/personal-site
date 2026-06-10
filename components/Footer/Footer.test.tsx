import { render, screen } from "@testing-library/react";

import { Footer } from "./Footer";
import { social } from "@/lib/content";
import { checkA11y } from "@/test/a11y";

describe("Footer", () => {
  it("is a contentinfo landmark", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("links to the source repo and socials", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /view source/i })).toHaveAttribute("href", social.repo);
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute("href", social.github);
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      social.linkedin,
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Footer />);
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
