import { render, screen } from "@testing-library/react";

import { Contact } from "./Contact";
import { social } from "@/lib/content";
import { checkA11y } from "@/test/a11y";

describe("Contact", () => {
  it("renders the heading and the form fields", () => {
    render(<Contact />);
    expect(screen.getByRole("heading", { level: 2, name: /contact/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Contact />);
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
