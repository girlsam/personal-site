import { getTracks, isConfigured, normalizeTrack } from "@/lib/spotify";

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
  return {
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  };
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

describe("getTracks", () => {
  it("returns an empty array when not configured", async () => {
    expect(await getTracks()).toEqual([]);
  });

  it("prepends the currently playing track to the recents", async () => {
    configure();
    vi.stubGlobal(
      "fetch",
      vi.fn((url: string) => {
        if (url.includes("api/token")) {
          return Promise.resolve(jsonRes({ access_token: "tok" }));
        }
        if (url.includes("currently-playing")) {
          return Promise.resolve(
            jsonRes({
              is_playing: true,
              item: { ...item, name: "Now", external_urls: { spotify: "now" } },
            }),
          );
        }
        return Promise.resolve(jsonRes({ items: [{ track: item }] }));
      }),
    );
    const tracks = await getTracks();
    expect(tracks[0].isPlaying).toBe(true);
    expect(tracks[0].title).toBe("Now");
    expect(tracks).toHaveLength(2);
  });

  it("returns recents when nothing is playing", async () => {
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
        return Promise.resolve(jsonRes({ items: [{ track: item }, { track: item }] }));
      }),
    );
    const tracks = await getTracks();
    expect(tracks).toHaveLength(2);
    expect(tracks[0].isPlaying).toBe(false);
  });
});
