import type { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { access, playlistName, tracks, publicPlaylist } = req.body;

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: "http://localhost:3000/",
  });

  spotifyApi.setAccessToken(access);

  try {
    const createPlaylist = await spotifyApi.createPlaylist(playlistName, {
      collaborative: false,
      public: publicPlaylist,
    });
    const playlistId = createPlaylist.body.id;
    const addTracks = await spotifyApi.addTracksToPlaylist(playlistId, tracks);
    res.status(200).send({
      error: "",
      data: addTracks.body,
      message: `${playlistName} Added to Spotify library`,
    });
  } catch (error: any) {
    res.json({ message: error.message });
  }
}
