import React from "react";
import MoviePresenter from "./MoviePresenter";
import { movieApi } from "api";

export default class extends React.Component {
  state = {
    nowPlaying: null,
    popular: null,
    topRated: null,
    upcoming: null,
    error: null,
    loading: true
  };

  async componentDidMount() {
    try {
      //getting nowPlaying
      const {
        data: { results: nowPlaying }
      } = await movieApi.nowPlaying();
      const {
        data: { results: popular }
      } = await movieApi.popular();
      const {
        data: { results: topRated }
      } = await movieApi.topRated();
      const {
        data: { results: upcoming }
      } = await movieApi.upcoming();
      console.log("🙏", "nowPlaying", nowPlaying);
      console.log("🙏", "popular", popular);
      console.log("🙏", "top", topRated);
      console.log("🙏", "upcoming", upcoming);
    } catch (error) {
      console.log("👿MovieContainer:componentDidMount()", error);
    }
  }

  render() {
    return <MoviePresenter />;
  }
}
