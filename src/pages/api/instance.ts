import axios from "axios";

export const $ApiBase = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});