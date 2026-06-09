import { render, screen, waitFor } from "@testing-library/react";

import { NowPlaying } from "./NowPlaying";
import { checkA11y } from "@/test/a11y";

const track = {
  isPlaying: true,
  title: "Test Song",
  artist: "Test Artist",
  album: "Test Album",
  albumImageUrl: "https://i.scdn.co/image/abc",
  songUrl: "https://open.spotify.com/track/123",
};

function mockFetch(status: number, body?: unknown) {
  return vi.fn().mockResolvedValue({
    status,
    json: () => Promise.resolve(body),
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("NowPlaying", () => {
  it("shows a now-playing track with its album art", async () => {
    vi.stubGlobal("fetch", mockFetch(200, track));
    const { container } = render(<NowPlaying />);
    expect(await screen.findByText("Test Song")).toBeInTheDocument();
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
    expect(screen.getByText(/now playing/i)).toBeInTheDocument();
    expect(container.querySelector("img")).not.toBeNull();
  });

  it("labels a non-playing track as last played", async () => {
    vi.stubGlobal("fetch", mockFetch(200, { ...track, isPlaying: false }));
    render(<NowPlaying />);
    expect(await screen.findByText(/last played/i)).toBeInTheDocument();
  });

  it("renders nothing when there is no track", async () => {
    vi.stubGlobal("fetch", mockFetch(204));
    const { container } = render(<NowPlaying />);
    await waitFor(() => expect(container.querySelector("a")).toBeNull());
  });

  it("has no accessibility violations", async () => {
    vi.stubGlobal("fetch", mockFetch(200, track));
    const { container } = render(<NowPlaying />);
    await screen.findByText("Test Song");
    expect(await checkA11y(container)).toHaveNoViolations();
  });
});
