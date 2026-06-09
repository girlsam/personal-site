import { render, screen } from "@testing-library/react";
import { experience } from "@/lib/content";
import { checkA11y } from "@/test/a11y";

import { Experience } from "./Experience";

describe("Experience", () => {
  it("renders the section heading", () => {
    render(<Experience />);
    expect(screen.getByRole("heading", { level: 2, name: /experience/i })).toBeInTheDocument();
  });

  it("renders a card for every job, with its company", () => {
    render(<Experience />);
    // one role heading per job (roles may repeat, so assert by count)
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(experience.length);
    for (const job of experience) {
      expect(screen.getByText(job.company)).toBeInTheDocument();
    }
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Experience />);
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
