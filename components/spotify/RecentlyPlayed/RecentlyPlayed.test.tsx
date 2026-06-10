import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { RecentlyPlayed } from "./RecentlyPlayed";
import { checkA11y } from "@/test/a11y";

const tracks = [
  {
    isPlaying: true,
    title: "First Song",
    artist: "Artist A",
    album: "Album A",
    albumImageUrl: "https://i.scdn.co/image/1",
    songUrl: "https://open.spotify.com/track/1",
  },
  {
    isPlaying: false,
    title: "Second Song",
    artist: "Artist B",
    album: "Album B",
    albumImageUrl: "",
    songUrl: "https://open.spotify.com/track/2",
  },
];

function stubFetch(status: number, body?: unknown) {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ status, json: () => Promise.resolve(body) }));
}

/** Stub /api/spotify with the given tracks, render, and wait for the first card. */
async function renderTracks(data = tracks) {
  stubFetch(200, data);
  const view = render(<RecentlyPlayed />);
  await screen.findByText(data[0].title);
  return view;
}

const originalClientWidth = Object.getOwnPropertyDescriptor(Element.prototype, "clientWidth");

afterEach(() => {
  vi.unstubAllGlobals();
  if (originalClientWidth) {
    Object.defineProperty(Element.prototype, "clientWidth", originalClientWidth);
  } else {
    Reflect.deleteProperty(Element.prototype, "clientWidth");
  }
});

describe("RecentlyPlayed", () => {
  it("renders a card for each recent track", async () => {
    await renderTracks();
    expect(screen.getByText("First Song")).toBeInTheDocument();
    expect(screen.getByText("Second Song")).toBeInTheDocument();
  });

  it("links each card to the track on Spotify in a new tab", async () => {
    await renderTracks();
    const link = screen.getByRole("link", { name: /first song/i });
    expect(link).toHaveAttribute("href", tracks[0].songUrl);
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("marks only the currently playing track as now playing", async () => {
    await renderTracks();
    expect(screen.getAllByText(/now playing/i)).toHaveLength(1);
  });

  it("renders album art only for tracks that have an image", async () => {
    const { container } = await renderTracks();
    expect(container.querySelectorAll("img")).toHaveLength(1);
  });

  it("scrolls forward with Next and back with Previous", async () => {
    const user = userEvent.setup();
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: false })),
    );
    const scrollBy = vi.fn();
    Element.prototype.scrollBy = scrollBy as unknown as typeof Element.prototype.scrollBy;
    Object.defineProperty(Element.prototype, "clientWidth", {
      value: 500,
      configurable: true,
    });
    await renderTracks();

    await user.click(screen.getByRole("button", { name: /next tracks/i }));
    await user.click(screen.getByRole("button", { name: /previous tracks/i }));

    // jsdom has no layout, so assert direction (sign of the offset), not pixels.
    expect(scrollBy.mock.calls[0][0].left).toBeGreaterThan(0);
    expect(scrollBy.mock.calls[1][0].left).toBeLessThan(0);
  });

  it("renders nothing when there are no tracks", async () => {
    stubFetch(204);
    const { container } = render(<RecentlyPlayed />);
    await waitFor(() => expect(container).toBeEmptyDOMElement());
  });

  it("has no accessibility violations", async () => {
    const { container } = await renderTracks();
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
