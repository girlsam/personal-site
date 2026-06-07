import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { nav, site, social } from "@/lib/content";

/**
 * Sticky, pill-shaped primary navigation. Static server component — no client
 * JS. Scroll-spy (`aria-current`) is added once real sections exist.
 */
export function BubbleNav() {
  return (
    <header className="sticky top-4 z-40 flex justify-center px-4">
      <nav
        aria-label="Primary"
        className="flex items-center gap-1 rounded-full border border-border bg-surface/80 px-2 py-1 text-sm shadow-sm backdrop-blur"
      >
        <a href="#home" className="rounded-full px-3 py-1.5 font-mono font-medium text-foreground">
          {site.brand}
        </a>
        <ul className="flex items-center">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-full px-3 py-1.5 text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
        <a
          href={social.github}
          aria-label="GitHub"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full p-2 text-muted transition-colors hover:text-foreground"
        >
          <GitHubIcon />
        </a>
        <a
          href={social.linkedin}
          aria-label="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full p-2 text-muted transition-colors hover:text-foreground"
        >
          <LinkedInIcon />
        </a>
      </nav>
    </header>
  );
}
