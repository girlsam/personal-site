import { fireEvent, render, screen, waitFor } from "@testing-library/react";

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
    albumImageUrl: "https://i.scdn.co/image/2",
    songUrl: "https://open.spotify.com/track/2",
  },
];

function mockFetch(status: number, body?: unknown) {
  return vi.fn().mockResolvedValue({
    status,
    json: () => Promise.resolve(body),
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("RecentlyPlayed", () => {
  it("renders a card for each recent track", async () => {
    vi.stubGlobal("fetch", mockFetch(200, tracks));
    render(<RecentlyPlayed />);
    expect(await screen.findByText("First Song")).toBeInTheDocument();
    expect(screen.getByText("Second Song")).toBeInTheDocument();
  });

  it("marks the currently playing track", async () => {
    vi.stubGlobal("fetch", mockFetch(200, tracks));
    render(<RecentlyPlayed />);
    expect(await screen.findByText(/now playing/i)).toBeInTheDocument();
  });

  it("exposes previous/next controls that scroll", async () => {
    vi.stubGlobal("fetch", mockFetch(200, tracks));
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({ matches: false })),
    );
    const scrollBy = vi.fn();
    Element.prototype.scrollBy = scrollBy as unknown as typeof Element.prototype.scrollBy;
    render(<RecentlyPlayed />);
    await screen.findByText("First Song");
    fireEvent.click(screen.getByRole("button", { name: /next tracks/i }));
    fireEvent.click(screen.getByRole("button", { name: /previous tracks/i }));
    expect(scrollBy).toHaveBeenCalledTimes(2);
  });

  it("renders nothing when there are no tracks", async () => {
    vi.stubGlobal("fetch", mockFetch(204));
    const { container } = render(<RecentlyPlayed />);
    await waitFor(() => expect(container.querySelector("a")).toBeNull());
  });

  it("has no accessibility violations", async () => {
    vi.stubGlobal("fetch", mockFetch(200, tracks));
    const { container } = render(<RecentlyPlayed />);
    await screen.findByText("First Song");
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
