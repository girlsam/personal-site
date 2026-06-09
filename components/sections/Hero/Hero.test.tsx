import { render, screen } from "@testing-library/react";

import { Hero } from "./Hero";
import { hero } from "@/lib/content";
import { checkA11y } from "@/test/a11y";

describe("Hero", () => {
  it("leads with the greeting as the page heading", () => {
    render(<Hero />);
    expect(screen.getByRole("heading", { level: 1, name: /sam goldsmith/i })).toBeInTheDocument();
  });

  it("lists each role", () => {
    render(<Hero />);
    for (const role of hero.roles) {
      expect(screen.getByText(new RegExp(role, "i"))).toBeInTheDocument();
    }
  });

  it("has an Explore call-to-action linking to Experience", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /explore/i })).toHaveAttribute("href", "#experience");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Hero />);
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
