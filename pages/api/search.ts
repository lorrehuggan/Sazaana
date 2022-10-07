import type { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";
import Cors from "cors";

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
  origin: "https://sazaana.com/",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { artist } = req.query;

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .clientCredentialsGrant()
    .then(function (result) {
      spotifyApi.setAccessToken(result.body.access_token);
      getData();
    })
    .catch(function (err) {
      console.log(err);
    });

  async function getData() {
    if (artist) {
      try {
        const response = await spotifyApi.searchTracks(`artist:${artist}`);

        if (response.statusCode === 200) {
          const data = response.body as SpotifyApi.SearchResponse;

          if (artist) {
            const artistIDs = data.tracks?.items.map((artist) => {
              return artist.artists[0].id;
            });

            if (artistIDs) {
              const response = await spotifyApi.getArtists(artistIDs);
              const filteredArray = response.body.artists.filter(
                (obj, index, arr) => {
                  return (
                    arr.map((mapObj) => mapObj.id).indexOf(obj.id) === index
                  );
                }
              );
              res.send({ error: "", data: filteredArray });
              res.end();
            }
          }
        } else {
          res.status(404).send({ message: "No items found 1" });
          res.end();
        }
      } catch (error: any) {
        res.status(404).send({ message: "No items found 2" });
        res.end();
      }
    } else {
      res.status(404).send({ message: "No items found 3" });
      res.end();
    }
  }
}
