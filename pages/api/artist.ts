import type { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";

export const spotify = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: "http://localhost:3000/",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { artist } = req.query;

  if (!artist) {
    res.status(400).send({ error: "Missing artist query parameter", data: {} });
    return;
  }

  try {
    const artistResponse = await spotify.searchArtists(`artist:${artist}`);
    const artistData = artistResponse.body;
  } catch (error: any) {
    res.status(400).send({ error: error.message, data: {} });
  }

  res.status(200).json({ test: "test" });
}
