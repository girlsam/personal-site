"use client";

import { useEffect, useState } from "react";

import type { Track } from "@/lib/spotify";

/**
 * Client island: fetches /api/spotify after hydration and shows the current
 * or most-recently-played track. Reserves height while loading and renders
 * nothing when there's no track (e.g. Spotify not configured).
 */
export function NowPlaying() {
  const [track, setTrack] = useState<Track | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/spotify")
      .then((res) => (res.status === 200 ? (res.json() as Promise<Track>) : null))
      .then((data) => {
        if (!active) return;
        setTrack(data);
        setLoaded(true);
      })
      .catch(() => {
        if (active) setLoaded(true);
      });
    return () => {
      active = false;
    };
  }, []);

  if (!loaded) return <div className="h-[68px]" aria-hidden />;
  if (!track) return null;

  return (
    <a
      href={track.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 rounded-xl border border-border bg-surface/50 p-3 transition-colors hover:border-accent"
    >
      {track.albumImageUrl && (
        // eslint-disable-next-line @next/next/no-img-element -- dynamic external album art (Spotify CDN)
        <img src={track.albumImageUrl} alt="" width={44} height={44} className="rounded-md" />
      )}
      <span className="flex flex-col">
        <span className="font-mono text-xs tracking-wide text-muted uppercase">
          {track.isPlaying ? "Now playing" : "Last played"}
        </span>
        <span className="font-medium text-foreground">{track.title}</span>
        <span className="text-sm text-muted">{track.artist}</span>
      </span>
    </a>
  );
}
