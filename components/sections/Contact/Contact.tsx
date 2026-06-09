import { ContactForm } from "./ContactForm/ContactForm";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { contact, social } from "@/lib/content";

/**
 * Contact section: a short blurb, the Formspree-backed form, and social links.
 * Static server component wrapping the ContactForm client island.
 */
export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto max-w-3xl px-6 py-24"
    >
      <h2
        id="contact-heading"
        className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        Contact
      </h2>

      <p className="mt-4 text-lg text-muted">{contact.blurb}</p>

      <div className="mt-8 max-w-md">
        <ContactForm />
      </div>

      <div className="mt-8 flex items-center gap-3">
        <a
          href={social.github}
          aria-label="GitHub"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-border p-2 text-muted transition-colors hover:border-accent hover:text-foreground"
        >
          <GitHubIcon />
        </a>
        <a
          href={social.linkedin}
          aria-label="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-border p-2 text-muted transition-colors hover:border-accent hover:text-foreground"
        >
          <LinkedInIcon />
        </a>
      </div>
    </section>
  );
}
