import { GET } from "./route";
import { getTrack, isConfigured } from "@/lib/spotify";

vi.mock("@/lib/spotify", () => ({
  isConfigured: vi.fn(),
  getTrack: vi.fn(),
}));

afterEach(() => {
  vi.resetAllMocks();
});

describe("GET /api/spotify", () => {
  it("returns 204 when Spotify is not configured", async () => {
    vi.mocked(isConfigured).mockReturnValue(false);
    const res = await GET();
    expect(res.status).toBe(204);
  });

  it("returns the track as JSON when available", async () => {
    vi.mocked(isConfigured).mockReturnValue(true);
    vi.mocked(getTrack).mockResolvedValue({
      isPlaying: false,
      title: "Song",
      artist: "Artist",
      album: "Album",
      albumImageUrl: null,
      songUrl: "url",
    });
    const res = await GET();
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toMatchObject({ title: "Song" });
  });

  it("returns 204 when there is no track", async () => {
    vi.mocked(isConfigured).mockReturnValue(true);
    vi.mocked(getTrack).mockResolvedValue(null);
    const res = await GET();
    expect(res.status).toBe(204);
  });
});
