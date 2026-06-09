const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

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
 * The current track if something is playing, otherwise the most recently
 * played one. Returns null when not configured or nothing is available.
 */
export async function getTrack(): Promise<Track | null> {
  if (!isConfigured()) return null;

  const token = await getAccessToken();
  const headers = { Authorization: `Bearer ${token}` };

  const nowRes = await fetch(NOW_PLAYING_ENDPOINT, { headers, cache: "no-store" });
  if (nowRes.status === 200) {
    const data = (await nowRes.json()) as {
      is_playing?: boolean;
      item?: SpotifyTrackItem | null;
    };
    if (data.item && data.is_playing) return normalizeTrack(data.item, true);
  }

  const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers,
    cache: "no-store",
  });
  if (recentRes.ok) {
    const data = (await recentRes.json()) as {
      items?: { track: SpotifyTrackItem }[];
    };
    const item = data.items?.[0]?.track;
    if (item) return normalizeTrack(item, false);
  }

  return null;
}
