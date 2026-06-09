import { fireEvent, render, screen } from "@testing-library/react";

import { ContactForm } from "./ContactForm";
import { contact } from "@/lib/content";
import { checkA11y } from "@/test/a11y";

function fillIn() {
  fireEvent.change(screen.getByLabelText(/name/i), {
    target: { value: "Ada" },
  });
  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: "ada@example.com" },
  });
  fireEvent.change(screen.getByLabelText(/message/i), {
    target: { value: "Hello there" },
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ContactForm", () => {
  it("renders required fields and a submit button", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/name/i)).toBeRequired();
    expect(screen.getByLabelText(/email/i)).toHaveAttribute("type", "email");
    expect(screen.getByLabelText(/message/i)).toBeRequired();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("shows a success message after a successful submit", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
    render(<ContactForm />);
    fillIn();
    fireEvent.click(screen.getByRole("button", { name: /send/i }));
    expect(await screen.findByText(contact.success)).toBeInTheDocument();
  });

  it("shows an error message when the submit fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    render(<ContactForm />);
    fillIn();
    fireEvent.click(screen.getByRole("button", { name: /send/i }));
    expect(await screen.findByText(contact.error)).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ContactForm />);
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
