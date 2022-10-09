import type { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.body;
  const { method } = req;

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: "https://www.sazaana.com/",
  });

  try {
    const auth = await spotifyApi.authorizationCodeGrant(code);
    const access_token = auth.body.access_token;
    const refresh_token = auth.body.refresh_token;
    const expires_in = auth.body.expires_in;
    spotifyApi.setAccessToken(access_token);
    const user = await spotifyApi.getMe();
    const userTopArtists = await spotifyApi.getMyTopArtists({ limit: 10 });
    // This will allow OPTIONS request
    if (method === "OPTIONS") {
      return res.json({
        access_token,
        refresh_token,
        expires_in,
        user,
        userTopArtists,
      });
    }
  } catch (error: any) {
    res.json({ message: error.message });
  }
}
