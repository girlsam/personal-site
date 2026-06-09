import { RecentlyPlayed } from "@/components/spotify/RecentlyPlayed/RecentlyPlayed";
import { about } from "@/lib/content";

/**
 * About section: short narrative, an inclusive-design statement, and the
 * Spotify now-playing/last-played widget. Static server component; the widget
 * is a client island.
 */
export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="mx-auto max-w-3xl px-6 py-24">
      <h2
        id="about-heading"
        className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        About
      </h2>

      <div className="mt-8 flex flex-col gap-5 text-lg text-muted">
        {about.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <blockquote className="mt-10 border-l-2 border-accent pl-5 text-lg font-medium text-foreground">
        {about.inclusive}
      </blockquote>

      <div className="mt-10">
        <RecentlyPlayed />
      </div>
    </section>
  );
}
