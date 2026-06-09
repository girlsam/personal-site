import { experience } from "@/lib/content";

/**
 * Work-history section: a stack of role cards (role, company, tenure, blurb).
 * Static server component. Content lives in lib/content.ts.
 */
export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="mx-auto max-w-3xl px-6 py-24"
    >
      <h2
        id="experience-heading"
        className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        Experience
      </h2>

      <ol className="mt-10 flex flex-col gap-4">
        {experience.map((job) => (
          <li
            key={`${job.company}-${job.start}`}
            className="rounded-xl border border-border bg-surface/50 p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-medium text-foreground">{job.role}</h3>
              <span className="font-mono text-sm text-muted">
                {job.start} – {job.end}
              </span>
            </div>
            <p className="mt-1 font-medium text-accent">{job.company}</p>
            <p className="mt-3 text-muted">{job.blurb}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
