/**
 * Keyboard skip link: hidden until focused, then jumps to the <main> region.
 * First focusable element on the page so keyboard users can bypass the nav.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-md bg-accent px-4 py-2 text-accent-foreground focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
    >
      Skip to content
    </a>
  );
}
