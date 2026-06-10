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
        <a
          href="#home"
          className="hidden rounded-full px-3 py-1.5 font-mono font-medium text-foreground sm:block"
        >
          {site.brand}
        </a>
        <ul className="flex items-center">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="rounded-full px-2.5 py-1.5 text-muted transition-colors hover:text-foreground sm:px-3"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <span className="mx-1 hidden h-5 w-px bg-border sm:block" aria-hidden="true" />
        <div className="hidden items-center gap-0.5 pr-1.5 sm:flex">
          <a
            href={social.github}
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-1.5 text-muted transition-colors hover:text-foreground"
          >
            <GitHubIcon />
          </a>
          <a
            href={social.linkedin}
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-1.5 text-muted transition-colors hover:text-foreground"
          >
            <LinkedInIcon />
          </a>
        </div>
      </nav>
    </header>
  );
}
