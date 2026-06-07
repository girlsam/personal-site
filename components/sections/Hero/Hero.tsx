import { hero, site } from "@/lib/content";

/**
 * Landing hero: brand mark, greeting, the role line (static for now —
 * rotation is a later pizazz pass), a welcome line, and an Explore CTA that
 * scrolls to Experience. Static server component.
 */
export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="mx-auto flex min-h-[80svh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center"
    >
      <p className="font-mono text-sm text-accent sm:text-base">{site.brand}</p>

      <h1
        id="hero-heading"
        className="mt-6 text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-6xl"
      >
        {hero.greeting}
      </h1>

      <p className="mt-5 font-mono text-base text-muted sm:text-lg">{hero.roles.join("  ·  ")}</p>

      <p className="mt-6 text-lg text-balance text-muted sm:text-xl">{hero.welcome}</p>

      <a
        href={hero.cta.href}
        className="mt-12 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground transition-opacity hover:opacity-90"
      >
        {hero.cta.label}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </a>
    </section>
  );
}
