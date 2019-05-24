import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "11b614bba2823bb8e43cbf99857c9cef",
    language: "en-US"
  }
});

export const movieApi = {
  nowPlaying: (page = 1) =>
    api.get("movie/now_playing", {
      params: {
        page
      }
    }),
  popular: (page = 1) =>
    api.get("movie/popular", {
      params: {
        page
      }
    }),
  topRated: (page = 1) =>
    api.get("movie/top_rated", {
      params: {
        page
      }
    }),
  upcoming: (page = 1) =>
    api.get("movie/upcoming", {
      params: {
        page
      }
    }),
  detail: id =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos"
      }
    })
};

export const tvApi = {
  airingToday: (page = 1) =>
    api.get("tv/airing_today", {
      params: {
        page
      }
    }),
  popular: (page = 1) =>
    api.get("tv/popular", {
      params: {
        page
      }
    }),
  topRated: (page = 1) =>
    api.get("tv/top_rated", {
      params: {
        page
      }
    }),
  onTheAir: (page = 1) =>
    api.get("tv/on_the_air", {
      params: {
        page
      }
    }),
  detail: id =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos"
      }
    })
};
