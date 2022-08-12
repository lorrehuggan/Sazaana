const DEV = "http://localhost:5000/";
// const PROD = import.meta.env.VITE_PROD_URL;
const ENV = DEV;

const BASE = `${ENV}api/`;
//import.meta.env.VITE_AUTH_TOKEN

//export const MAIN_ENDPOINT = BASE + "main";
export const MAIN_ENDPOINT = BASE + "main";

export const PRE_ENDPOINT =
  BASE + "https://qwanfy.herokuapp.com/api/main/pre-search";

export const USER_ENDPOINT = BASE + "stor/get-user";
export const TEST_ENDPOINT = BASE + "main/test";

const REDIRECT_URL = "http://localhost:3000/";

export const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=1a98caa930f04397b79800309b24b9c5&response_type=code&redirect_uri=${REDIRECT_URL}&scope=ugc-image-upload%20user-read-recently-played%20user-read-playback-state%20user-top-read%20app-remote-control%20playlist-modify-public%20user-modify-playback-state%20playlist-modify-private%20user-follow-modify%20user-read-currently-playing%20user-follow-read%20user-library-modify%20user-read-playback-position%20playlist-read-private%20user-read-email%20user-read-private%20user-library-read%20playlist-read-collaborative%20streaming&state=state`;

export const CALLBACK_URL = `${BASE}stor/callback`;
