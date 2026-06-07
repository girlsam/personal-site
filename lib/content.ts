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
