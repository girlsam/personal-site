import { render, screen } from "@testing-library/react";

import Home from "./page";
import { checkA11y } from "@/test/a11y";

describe("Home page", () => {
  it("renders the hero and experience sections", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1, name: /sam goldsmith/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /experience/i })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Home />);
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
