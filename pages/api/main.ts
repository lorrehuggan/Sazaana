import { ExternalUrls, Followers, Image } from "@/lib/types/mainSearch";
import { Type } from "@/lib/types/User";
import type { NextApiRequest, NextApiResponse } from "next";
import SpotifyWebApi from "spotify-web-api-node";

// export const spotifyApi = new SpotifyWebApi({
//   clientId: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
// });

interface Artist {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: Type;
  uri: string;
}

interface Curated {
  id: string;
  name: string;
  artist: SpotifyApi.ArtistObjectSimplified[];
  album: string;
  preview_url: null | string;
  images: SpotifyApi.ImageObject[];
  albumURL: string;
  trackURL: string;
  popularity: number;
  explicit: boolean;
  duration: number;
  trackURI: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { authorization, accesstoken } = req.headers;

  let ID = "";

  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .clientCredentialsGrant()
    .then(function (result) {
      spotifyApi.setAccessToken(result.body.access_token);
      //console.log(result);
    })
    .catch(function (err) {
      console.log(err);
    });

  // if (accesstoken) {
  //   spotifyApi.setAccessToken(accesstoken as string);
  // } else {
  // }

  //   if (!authorization) {
  //     res.status(404).send({ message: "No auth provided" });
  //     return;
  //   }

  //   if (authorization !== process.env.AUTH_TOKEN) {
  //     res.status(404).send({ message: "Invalid Auth" });
  //     return;
  //   }

  //----->object store<------
  let recommendedArtists = [] as SpotifyApi.ArtistObjectFull[];
  let topTracks = [] as Curated[];
  let queryArtist = {
    name: "",
    id: "",
    image: "",
    followers: 0,
    url: "",
    rating: 0,
  };

  //------>Search for recommendations<-----
  if (req.query.id) {
    ID = req.query.id as string;
  } else {
    res.status(404).send({ message: "invalid query" });
  }
  if (ID) {
    const response = await spotifyApi.getArtistRelatedArtists(ID);
    console.log({ response });

    if (response.statusCode === 200) {
      const data = response.body.artists;
      recommendedArtists = data;
    }
    const artist = await spotifyApi.getArtist(ID);
    if (artist.statusCode === 200) {
      queryArtist = {
        name: artist.body.name,
        id: artist.body.id,
        image: artist.body.images[0].url,
        followers: artist.body.followers.total,
        url: artist.body.external_urls.spotify,
        rating: artist.body.popularity,
      };
    }
  } else {
    res.status(404).send({ message: "search error" });
  }

  //-------->Get recommended artist top tracks<--------
  if (recommendedArtists.length > 0) {
    try {
      const artistIDs = recommendedArtists.map((artist) => artist.id);
      const response = await Promise.all(
        artistIDs.map((id) => spotifyApi.getArtistTopTracks(id, "US"))
      );
      const data = response.map((data) => {
        return data.body.tracks;
      });
      if (data) {
        data.forEach((item) => {
          topTracks.push(
            {
              id: item[1].id,
              name: item[1].name,
              artist: item[1].artists,
              album: item[1].album.name,
              preview_url: item[1].preview_url,
              images: item[1].album.images,
              albumURL: item[1].album.external_urls.spotify,
              trackURL: item[1].external_urls.spotify,
              popularity: item[1].popularity,
              explicit: item[1].explicit,
              duration: item[1].duration_ms,
              trackURI: item[1].uri,
            },
            {
              id: item[2].id,
              name: item[2].name,
              artist: item[2].artists,
              album: item[2].album.name,
              preview_url: item[2].preview_url,
              images: item[2].album.images,
              albumURL: item[2].album.external_urls.spotify,
              trackURL: item[2].external_urls.spotify,
              popularity: item[2].popularity,
              explicit: item[2].explicit,
              duration: item[2].duration_ms,
              trackURI: item[2].uri,
            },
            {
              id: item[3].id,
              name: item[3].name,
              artist: item[3].artists,
              album: item[3].album.name,
              preview_url: item[3].preview_url,
              images: item[3].album.images,
              albumURL: item[3].album.external_urls.spotify,
              trackURL: item[3].external_urls.spotify,
              popularity: item[3].popularity,
              explicit: item[3].explicit,
              duration: item[3].duration_ms,
              trackURI: item[3].uri,
            }
          );
        });
      } else {
        res.status(404).send({ message: "bad request" });
      }
    } catch (error: any) {
      res.status(404).send({ message: "bad request" });
    }
  } else {
    res.status(404).send({ message: "bad request" });
  }

  if (topTracks.length > 0) {
    const response = await Promise.all(
      topTracks.map((track) => spotifyApi.getAudioFeaturesForTrack(track.id))
    );
    const data = response.map((data, i) => {
      const track = topTracks[i];
      return {
        features: { ...data.body },
        data: { ...track },
        query: { ...queryArtist },
      };
    });
    res.send({ error: "", data });
  } else {
    res.status(404).send({ message: "bad request" });
  }
}
