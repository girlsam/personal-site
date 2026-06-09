import { getTrack, isConfigured } from "@/lib/spotify";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isConfigured()) return new Response(null, { status: 204 });

  try {
    const track = await getTrack();
    if (!track) return new Response(null, { status: 204 });
    return Response.json(track, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    });
  } catch {
    return new Response(null, { status: 204 });
  }
}
