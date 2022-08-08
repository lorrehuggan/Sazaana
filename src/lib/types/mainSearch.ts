export interface MainResponse {
  error: string;
  data: Main[];
}
export interface Main {
  features: Features;
  data: Data;
}

export interface AudioFeatures {
  popularity: number;
  danceability: number;
  energy: number;
  acousticness: number;
  valence: number;
  tempo: number;
}

export interface Data {
  id: string;
  name: string;
  artist: Artist[];
  album: string;
  preview_url: null;
  images: Image[];
  albumURL: string;
  popularity: number;
  explicit: boolean;
  duration: number;
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Features {
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  type: string;
  id: string;
  uri: string;
  track_href: string;
  analysis_url: string;
  duration_ms: number;
  time_signature: number;
}

export interface Origin {
  trackName: string;
  artistName: string;
  img: Image[];
}

export interface Item {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: null;
  track_number: number;
  type: ItemType;
  uri: string;
}

export interface Album {
  album_type: AlbumTypeEnum;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: ReleaseDatePrecision;
  total_tracks: number;
  type: AlbumTypeEnum;
  uri: string;
}

export enum AlbumTypeEnum {
  Album = "album",
  Single = "single",
}

export interface ExternalUrls {
  spotify: string;
}
export enum ItemType {
  Track = "track",
}

export interface ExternalIDS {
  isrc: string;
}

export enum ReleaseDatePrecision {
  Day = "day",
  Year = "year",
}

export interface ArtistResponse {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface AlbumResponse {
  tracks: Tracks;
}

export interface Tracks {
  href: string;
  items: Item[];
  limit: number;
  next: string;
  offset: number;
  previous: null;
  total: number;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: string;
  total: number;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}
