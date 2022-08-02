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
  const id = req.query.id;
  const credentials = await spotify.clientCredentialsGrant();
  spotify.setAccessToken(credentials.body["access_token"]);

  const newTracks = await spotify.getNewReleases();

  const searchTrack = await spotify.searchTracks(`track:${id}`);

  res.status(200).json(searchTrack.body.tracks);
}
