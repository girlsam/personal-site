// One-time helper to mint a Spotify refresh token for the Now Playing widget.
//
// 1. Create an app at https://developer.spotify.com/dashboard and add
//    http://127.0.0.1:8888/callback as a Redirect URI.
// 2. Put SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in .env.local.
// 3. Run:  node --env-file=.env.local scripts/spotify-auth.mjs
// 4. Open the printed URL, authorize, then copy SPOTIFY_REFRESH_TOKEN into .env.local.

import { Buffer } from "node:buffer";
import http from "node:http";
import process from "node:process";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = "http://127.0.0.1:8888/callback";
const scope = "user-read-currently-playing user-read-recently-played";

if (!clientId || !clientSecret) {
  console.error(
    "Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET first, e.g.\n" +
      "  node --env-file=.env.local scripts/spotify-auth.mjs",
  );
  process.exit(1);
}

const authUrl = new URL("https://accounts.spotify.com/authorize");
authUrl.searchParams.set("client_id", clientId);
authUrl.searchParams.set("response_type", "code");
authUrl.searchParams.set("redirect_uri", redirectUri);
authUrl.searchParams.set("scope", scope);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, redirectUri);
  if (url.pathname !== "/callback") {
    res.writeHead(404).end();
    return;
  }

  const code = url.searchParams.get("code");
  if (!code) {
    res.writeHead(400).end("Missing ?code");
    return;
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }),
  });
  const data = await tokenRes.json();

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Done — return to your terminal.");

  if (data.refresh_token) {
    console.log("\nAdd this to .env.local:\n");
    console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}\n`);
  } else {
    console.error("\nNo refresh_token in response:", data);
  }
  server.close();
  process.exit(0);
});

server.listen(8888, () => {
  console.log("Open this URL to authorize, then return here:\n");
  console.log(authUrl.toString() + "\n");
});
