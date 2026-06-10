import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon } from "@/components/icons";
import { site, social } from "@/lib/content";

/**
 * Site footer: brand mark, a "view source" link (the code-as-portfolio
 * payoff), and social links. Static server component.
 */
export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-12 text-sm sm:flex-row sm:justify-between sm:gap-4">
        <p className="font-mono text-foreground">{site.brand}</p>

        <div className="flex items-center gap-5 text-muted">
          <a
            href={social.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
          >
            View source
            <ArrowUpRightIcon className="size-3.5" />
          </a>
          <a
            href={social.github}
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            <GitHubIcon className="size-5" />
          </a>
          <a
            href={social.linkedin}
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            <LinkedInIcon className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
