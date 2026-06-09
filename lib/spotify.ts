const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played";

export type Track = {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string | null;
  songUrl: string;
};

type SpotifyTrackItem = {
  name: string;
  artists?: { name: string }[];
  album?: { name?: string; images?: { url: string }[] };
  external_urls?: { spotify?: string };
};

/** Whether the Spotify env vars are present (widget hides if not). */
export function isConfigured(): boolean {
  return Boolean(
    process.env.SPOTIFY_CLIENT_ID &&
    process.env.SPOTIFY_CLIENT_SECRET &&
    process.env.SPOTIFY_REFRESH_TOKEN,
  );
}

/** Map a raw Spotify track object to our flat Track shape. */
export function normalizeTrack(item: SpotifyTrackItem, isPlaying: boolean): Track {
  return {
    isPlaying,
    title: item.name,
    artist: (item.artists ?? []).map((a) => a.name).join(", "),
    album: item.album?.name ?? "",
    albumImageUrl: item.album?.images?.[0]?.url ?? null,
    songUrl: item.external_urls?.spotify ?? "",
  };
}

async function getAccessToken(): Promise<string> {
  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
  ).toString("base64");

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN ?? "",
    }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Spotify token request failed (${res.status})`);
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

/**
 * Recent listening: the currently playing track (if any) followed by the most
 * recently played ones. Returns an empty array when not configured.
 */
export async function getTracks(limit = 8): Promise<Track[]> {
  if (!isConfigured()) return [];

  const token = await getAccessToken();
  const headers = { Authorization: `Bearer ${token}` };

  let nowPlaying: Track | null = null;
  const nowRes = await fetch(NOW_PLAYING_ENDPOINT, { headers, cache: "no-store" });
  if (nowRes.status === 200) {
    const data = (await nowRes.json()) as {
      is_playing?: boolean;
      item?: SpotifyTrackItem | null;
    };
    if (data.item && data.is_playing) nowPlaying = normalizeTrack(data.item, true);
  }

  const recentRes = await fetch(`${RECENTLY_PLAYED_ENDPOINT}?limit=${limit}`, {
    headers,
    cache: "no-store",
  });
  let recent: Track[] = [];
  if (recentRes.ok) {
    const data = (await recentRes.json()) as {
      items?: { track: SpotifyTrackItem }[];
    };
    recent = (data.items ?? []).map((i) => normalizeTrack(i.track, false));
  }

  if (nowPlaying) {
    const np = nowPlaying;
    return [np, ...recent.filter((t) => t.songUrl !== np.songUrl)].slice(0, limit);
  }
  return recent;
}
