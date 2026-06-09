import { getTrack, isConfigured, normalizeTrack } from "@/lib/spotify";

const item = {
  name: "Song",
  artists: [{ name: "A" }, { name: "B" }],
  album: { name: "Album", images: [{ url: "img-url" }] },
  external_urls: { spotify: "song-url" },
};

function configure() {
  vi.stubEnv("SPOTIFY_CLIENT_ID", "id");
  vi.stubEnv("SPOTIFY_CLIENT_SECRET", "secret");
  vi.stubEnv("SPOTIFY_REFRESH_TOKEN", "refresh");
}

function jsonRes(body: unknown, status = 200) {
  return { ok: status >= 200 && status < 300, status, json: () => Promise.resolve(body) };
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("normalizeTrack", () => {
  it("flattens artists and pulls album art + url", () => {
    expect(normalizeTrack(item, true)).toEqual({
      isPlaying: true,
      title: "Song",
      artist: "A, B",
      album: "Album",
      albumImageUrl: "img-url",
      songUrl: "song-url",
    });
  });
});

describe("isConfigured", () => {
  it("is false without env and true with all three vars", () => {
    expect(isConfigured()).toBe(false);
    configure();
    expect(isConfigured()).toBe(true);
  });
});

describe("getTrack", () => {
  it("returns null when not configured", async () => {
    expect(await getTrack()).toBeNull();
  });

  it("returns the currently playing track", async () => {
    configure();
    vi.stubGlobal(
      "fetch",
      vi.fn((url: string) => {
        if (url.includes("api/token")) {
          return Promise.resolve(jsonRes({ access_token: "tok" }));
        }
        return Promise.resolve(jsonRes({ is_playing: true, item }));
      }),
    );
    const t = await getTrack();
    expect(t?.isPlaying).toBe(true);
    expect(t?.title).toBe("Song");
  });

  it("falls back to the most recently played track", async () => {
    configure();
    vi.stubGlobal(
      "fetch",
      vi.fn((url: string) => {
        if (url.includes("api/token")) {
          return Promise.resolve(jsonRes({ access_token: "tok" }));
        }
        if (url.includes("currently-playing")) {
          return Promise.resolve(jsonRes(null, 204));
        }
        return Promise.resolve(jsonRes({ items: [{ track: item }] }));
      }),
    );
    const t = await getTrack();
    expect(t?.isPlaying).toBe(false);
    expect(t?.title).toBe("Song");
  });
});
