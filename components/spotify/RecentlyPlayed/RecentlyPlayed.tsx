"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowUpRightIcon, SpotifyIcon } from "@/components/icons";
import type { Track } from "@/lib/spotify";

/**
 * Client island: fetches /api/spotify after hydration and shows recent tracks
 * as a scroll-snap carousel (current track first, if playing). Reserves height
 * while loading and renders nothing when there's nothing to show.
 */
export function RecentlyPlayed() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loaded, setLoaded] = useState(false);
  const scroller = useRef<HTMLUListElement>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/spotify")
      .then((res) => (res.status === 200 ? (res.json() as Promise<Track[]>) : []))
      .then((data) => {
        if (!active) return;
        setTracks(data);
        setLoaded(true);
      })
      .catch(() => {
        if (active) setLoaded(true);
      });
    return () => {
      active = false;
    };
  }, []);

  function scrollBy(direction: 1 | -1) {
    const el = scroller.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: direction * el.clientWidth * 0.8,
      behavior: reduce ? "auto" : "smooth",
    });
  }

  if (!loaded) return <div className="h-64 w-full max-w-2xl" aria-hidden />;
  if (tracks.length === 0) return null;

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-5 flex items-center justify-between">
        <p className="flex items-center gap-1.5 font-mono text-sm text-muted">
          <SpotifyIcon className="size-4 text-[#1DB954]" />
          On my headphones
        </p>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous tracks"
            className="rounded-full border border-border p-1.5 text-muted transition-colors hover:border-accent hover:text-foreground"
          >
            <Chevron direction="left" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next tracks"
            className="rounded-full border border-border p-1.5 text-muted transition-colors hover:border-accent hover:text-foreground"
          >
            <Chevron direction="right" />
          </button>
        </div>
      </div>

      <ul
        ref={scroller}
        aria-label="Recently played tracks"
        className="-m-2 flex snap-x snap-mandatory scroll-p-2 [scrollbar-width:none] gap-3 overflow-x-auto p-2 [&::-webkit-scrollbar]:hidden"
      >
        {tracks.map((track, i) => (
          <li key={`${track.songUrl}-${i}`} className="w-40 shrink-0 snap-start">
            <a
              href={track.songUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${track.title} by ${track.artist}${track.isPlaying ? ", now playing" : ""}`}
              className="group flex flex-col gap-2 focus-visible:outline-none"
            >
              <span
                aria-hidden="true"
                className="relative block aspect-square overflow-hidden rounded-xl border border-border bg-surface group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-background"
              >
                {track.albumImageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element -- dynamic external album art (Spotify CDN)
                  <img
                    src={track.albumImageUrl}
                    alt=""
                    className="size-full object-cover transition-transform group-hover:scale-105"
                  />
                )}
                {track.isPlaying && (
                  <span className="absolute bottom-2 left-2 rounded-full bg-[#1DB954] px-2 py-0.5 text-xs font-medium text-white">
                    Now playing
                  </span>
                )}
                <span className="absolute top-2 right-2 rounded-full bg-background/80 p-1 text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  <ArrowUpRightIcon className="size-3.5" />
                </span>
              </span>
              <span aria-hidden="true" className="flex flex-col">
                <span className="truncate font-medium text-foreground">{track.title}</span>
                <span className="truncate text-sm text-muted">{track.artist}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
}
