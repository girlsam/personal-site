import { getTracks, isConfigured } from "@/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isConfigured()) return new Response(null, { status: 204 });

  try {
    const tracks = await getTracks();
    if (tracks.length === 0) return new Response(null, { status: 204 });
    return Response.json(tracks, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    // Server-side log only (Vercel function logs) — never reaches the browser.
    console.error("Spotify API request failed:", error);
    return new Response(null, { status: 204 });
  }
}
