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
  } catch {
    return new Response(null, { status: 204 });
  }
}
