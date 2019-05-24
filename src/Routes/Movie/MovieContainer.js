import React from "react";
import MoviePresenter from "./MoviePresenter";
import { movieApi } from "api";
import { Routes } from "Components/Router";

export default class extends React.Component {
  state = {
    movies: null,
    error: null,
    pathname: null,
    page: 1,
    totalPages: 0,
    loading: true
  };

  constructor(props) {
    super(props);
    const {
      location: { pathname },
      match: {
        params: { page }
      }
    } = props;
    this.state = {
      pathname,
      page: page === undefined ? 1 : page
    };
    console.log("😂page is", this.state.page, page === undefined);
    console.log("MovieContainer👍", props, "🐯page is", props.match.params.page);
  }

  getMovieItems = (pathname, page = this.state.page) => {
    console.log("getMovieItems called in page ", page);
    if (pathname.includes(Routes.movie.nowPlaying)) {
      console.log("getMovieItems", "now-playing");
      return movieApi.nowPlaying(page);
    } else if (pathname.includes(Routes.movie.popular)) {
      console.log("getMovieItems", "popular");
      return movieApi.popular(page);
    } else if (pathname.includes(Routes.movie.topRated)) {
      console.log("getMovieItems", "top-rated");
      return movieApi.topRated(page);
    } else if (pathname.includes(Routes.movie.upcoming)) {
      console.log("getMovieItems", "upcoming");
      return movieApi.upcoming(page);
    } else {
      // invalid pathname
      return movieApi.nowPlaying(page);
    }
  };

  setLoadingState = isLoading => {
    this.setState({
      loading: isLoading,
      movies: null
    });
  };

  async componentDidMount() {
    this.setLoadingState(true);
    try {
      const { pathname } = this.state;
      // console.log("✨current location: ", pathname);
      const {
        data: { results: movies, total_pages: totalPages }
      } = await this.getMovieItems(pathname);
      console.log("🐯🐯🐯🐯👍", await this.getMovieItems(pathname));
      // console.log("🙏 movie items are: ", movies);
      this.setState({ pathname, movies, loading: false, totalPages });
    } catch (error) {
      console.log("👿MovieContainer:componentDidMount()", error);
    }
  }

  async componentWillReceiveProps(nextProps) {
    this.setLoadingState(true);
    try {
      const {
        location: { pathname: nextPathname },
        match: {
          params: { page }
        }
      } = nextProps;
      console.log(
        "😊componentWillReceiveProps()",
        nextProps,
        "🐯page is",
        nextProps.match.params.page
      );
      this.state = { page };
      const {
        data: { results: movies, total_pages: totalPages }
      } = await this.getMovieItems(nextPathname);
      console.log("🐯🐯🐯🐯👍", await this.getMovieItems(nextPathname, page));
      // console.log("next", movies);
      await this.setState({
        pathname: nextPathname,
        movies,
        loading: false,
        page: page === undefined ? 1 : page,
        totalPages
      });
      console.log("😂page is", this.state.page);
    } catch (error) {
      console.log("👿MovieContainer:componentWillReceiveProps()", error);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("The loading state is ", nextState.loading);
    if (this.state.movies === nextState.movies) {
      return false;
    }
    return true;
  }

  render() {
    const { loading, movies, pathname, page, totalPages } = this.state;
    return (
      <MoviePresenter
        loading={loading}
        movies={movies}
        pathname={pathname}
        page={page}
        totalPages={totalPages}
      />
    );
  }
}
