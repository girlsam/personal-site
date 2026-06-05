import { render, screen } from "@testing-library/react";
import Home from "./page";
import { checkA11y } from "@/test/a11y";

describe("Home page", () => {
  it("renders its content", () => {
    render(<Home />);
    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Home />);
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
