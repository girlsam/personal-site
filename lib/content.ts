export const site = {
  name: "Sam Goldsmith",
  brand: "<girlsam />",
  title: "Sam Goldsmith — girlsam",
  description: "Frontend / full-stack engineer. Clean, fast, accessible web.",
} as const;

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const social = {
  github: "https://github.com/girlsam",
  linkedin: "https://www.linkedin.com/in/samgoldsmith",
} as const;

export const hero = {
  greeting: "Hi, I'm Sam Goldsmith,",
  roles: [
    "Frontend Developer",
    "Full-Stack Engineer",
    "Gardener",
    "Mountain Biker",
    "National Park Nerd",
  ],
  welcome: "Welcome to my little corner of the internet.",
  cta: { label: "Explore", href: "#experience" },
} as const;

// Placeholder work history — replace with real roles.
export const experience = [
  {
    company: "Company 1",
    role: "Frontend Engineer",
    start: "Apr 2022",
    end: "Sept 2025",
    blurb:
      "Lead accessibility and design-system work across a multi-product web app, shipping a component library adopted by five teams.",
  },
  {
    company: "Company 2",
    role: "Full-Stack Engineer",
    start: "Mar 2022",
    end: "Nov 2020",
    blurb:
      "Built customer-facing features end to end in TypeScript and Ruby, and led a static-first rebuild that cut page load times in half.",
  },
  {
    company: "Company 3",
    role: "Web Developer",
    start: "Sept 2019",
    end: "Nov 2020",
    blurb:
      "Delivered responsive marketing sites and internal tools for small-business clients on tight timelines.",
  },
  {
    company: "Company 4",
    role: "Web Developer",
    start: "Mar 2017",
    end: "Sept 2019",
    blurb:
      "Delivered responsive marketing sites and internal tools for small-business clients on tight timelines.",
  },
] as const;

// Placeholder narrative — replace with your own.
export const about = {
  paragraphs: [
    "I came to engineering from the humanities — a history and English background that taught me to read closely, write clearly, and care about the person on the other end of the page.",
    "That throughline shapes how I build: I treat code like writing — structured, revised, and meant to be read — and I think about AI the same way, since it's mostly about saying what you mean.",
  ],
  inclusive:
    "The internet should be for everyone. Accessibility isn't a box I check at the end — it's the whole point.",
} as const;
