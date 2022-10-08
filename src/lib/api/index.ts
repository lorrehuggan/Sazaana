const DEV = "http://localhost:5000/";
const PROD = "https://sazaana-server-production.up.railway.app/";
const ENV = PROD;

const BASE = `${ENV}api/`;
//import.meta.env.VITE_AUTH_TOKEN

//export const MAIN_ENDPOINT = BASE + "main";
export const MAIN_ENDPOINT = BASE + "main";
export const PRE_ENDPOINT = BASE + "main/pre-search";
export const ARTIST_TEST_ENDPOINT = BASE + "main/artist";

export const USER_ENDPOINT = BASE + "stor/get-user";
export const TEST_ENDPOINT = BASE + "main/test";
export const LOGIN_ENDPOINT = BASE + "main/login";
export const REFRESH_ENDPOINT = BASE + "main/refresh";

const DEV_URL = "http://localhost:3000/";
const PROD_URL = "https://www.sazaana.com/";

const REDIRECT_URL = PROD_URL;

export const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=1a98caa930f04397b79800309b24b9c5&response_type=code&redirect_uri=${REDIRECT_URL}&scope=ugc-image-upload%20user-read-recently-played%20user-read-playback-state%20user-top-read%20app-remote-control%20playlist-modify-public%20user-modify-playback-state%20playlist-modify-private%20user-follow-modify%20user-read-currently-playing%20user-follow-read%20user-library-modify%20user-read-playback-position%20playlist-read-private%20user-read-email%20user-read-private%20user-library-read%20playlist-read-collaborative%20streaming&state=state&show_dialog=true`;

export const CALLBACK_URL = `${BASE}stor/callback`;
export const CREATE_PLAYLIST_URL = BASE + "create-playlist";

export const AUTH_TOKEN = process.env.AUTH_TOKEN;
