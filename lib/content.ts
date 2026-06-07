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
