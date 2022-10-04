import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import SpotifyWebApi from "spotify-web-api-node";

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

export function middleware(request: NextRequest, response: NextResponse) {
  console.log(request);
}
