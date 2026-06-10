import { GET } from "./route";
import { getTracks, isConfigured } from "@/lib/spotify";

vi.mock("@/lib/spotify", () => ({
  isConfigured: vi.fn(),
  getTracks: vi.fn(),
}));

const track = {
  isPlaying: false,
  title: "Song",
  artist: "Artist",
  album: "Album",
  albumImageUrl: null,
  songUrl: "url",
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("GET /api/spotify", () => {
  it("returns 204 when Spotify is not configured", async () => {
    vi.mocked(isConfigured).mockReturnValue(false);
    const res = await GET();
    expect(res.status).toBe(204);
  });

  it("returns the tracks as JSON when available", async () => {
    vi.mocked(isConfigured).mockReturnValue(true);
    vi.mocked(getTracks).mockResolvedValue([track]);
    const res = await GET();
    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toHaveLength(1);
  });

  it("returns 204 when there are no tracks", async () => {
    vi.mocked(isConfigured).mockReturnValue(true);
    vi.mocked(getTracks).mockResolvedValue([]);
    const res = await GET();
    expect(res.status).toBe(204);
  });

  it("logs the error and returns 204 when the request throws", async () => {
    vi.mocked(isConfigured).mockReturnValue(true);
    vi.mocked(getTracks).mockRejectedValue(new Error("boom"));
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const res = await GET();
    expect(res.status).toBe(204);
    expect(errorSpy).toHaveBeenCalled();
  });
});
