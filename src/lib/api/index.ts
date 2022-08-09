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
