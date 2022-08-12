export interface User {
  refresh_token: string;
  access_token: string;
  user: UserClass;
  userTopArtists: UserTopArtists;
}

export interface UserClass {
  body: UserBody;
  headers: Headers;
  statusCode: number;
}

export interface UserBody {
  country: string;
  display_name: string;
  email: string;
  explicit_content: ExplicitContent;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}

export interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Followers {
  href: null;
  total: number;
}

export interface Image {
  height: number | null;
  url: string;
  width: number | null;
}

export interface Headers {
  "content-type": string;
  "cache-control": string;
  vary?: string;
  "x-robots-tag"?: string;
  "access-control-allow-origin": string;
  "access-control-allow-headers": string;
  "access-control-allow-methods": string;
  "access-control-allow-credentials": string;
  "access-control-max-age": string;
  "content-encoding": string;
  "strict-transport-security": string;
  "x-content-type-options": string;
  date: string;
  server: string;
  via: string;
  "alt-svc": string;
  connection: string;
  "transfer-encoding": string;
}

export interface UserTopArtists {
  body: UserTopArtistsBody;
  headers: Headers;
  statusCode: number;
}

export interface UserTopArtistsBody {
  items: Item[];
  total: number;
  limit: number;
  offset: number;
  href: string;
  previous: null;
  next: string;
}

export interface Item {
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

export enum Type {
  Artist = "artist",
}
