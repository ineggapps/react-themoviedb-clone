import React from "react";
import MoviePresenter from "./MoviePresenter";
import { movieApi } from "api";

export default class extends React.Component {
  state = {
    movies: null,
    error: null,
    pathname: null,
    loading: true
  };

  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      pathname
    };
  }

  getMovieItems = pathname => {
    if (pathname.includes("/now-playing")) {
      console.log("getMovieItems", "now-playing");
      return movieApi.nowPlaying();
    } else if (pathname.includes("popular")) {
      console.log("getMovieItems", "popular");
      return movieApi.popular();
    } else if (pathname.includes("top-rated")) {
      console.log("getMovieItems", "top_rated");
      return movieApi.topRated();
    } else if (pathname.includes("upcoming")) {
      console.log("getMovieItems", "upcoming");
      return movieApi.upcoming();
    } else {
      // invalid pathname
      return movieApi.nowPlaying();
    }
  };

  setLoadingState = isLoading => {
    this.setState({
      loading: isLoading
    });
  };

  async componentDidMount() {
    this.setLoadingState(true);
    try {
      const { pathname } = this.state;
      // console.log("✨current location: ", pathname);
      const {
        data: { results: movies }
      } = await this.getMovieItems(pathname);
      // console.log("🙏 movie items are: ", movies);
      this.setState({ pathname, movies, loading: false });
    } catch (error) {
      console.log("👿MovieContainer:componentDidMount()", error);
    }
  }

  async componentWillReceiveProps(nextProps) {
    this.setLoadingState(true);
    console.log("😊componentWillReceiveProps()", nextProps);
    try {
      const {
        location: { pathname: nextPathname }
      } = nextProps;
      const {
        data: { results: movies }
      } = await this.getMovieItems(nextPathname);
      // console.log("next", movies);
      this.setState({ nextPathname, movies, loading: false });
    } catch (error) {
      console.log("👿MovieContainer:componentWillReceiveProps()", error);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("The loading state is ", nextState.loading);
    return true;
  }

  render() {
    const { loading, movies, pathname } = this.state;
    return <MoviePresenter loading={loading} movies={movies} pathname={pathname} />;
  }
}
