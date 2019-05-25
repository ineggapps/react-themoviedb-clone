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

  checkValidOfPathname(pathname) {
    const menus = [
      Routes.movie.nowPlaying,
      Routes.movie.popular,
      Routes.movie.topRated,
      Routes.movie.upcoming
    ];
    let exists = false;
    menus.map(menu => {
      if (pathname.includes(menu)) {
        exists = true;
      }
    });
    return exists;
  }

  constructor(props) {
    super(props);
    let {
      location: { pathname },
      match: {
        params: { page }
      }
    } = props;

    //check valid of pathname
    if (pathname === undefined || !this.checkValidOfPathname(pathname)) {
      pathname = Routes.movie.nowPlaying;
    }
    console.log("I will initialize pathname😉", pathname);
    this.state = {
      pathname,
      page
    };
    console.log("MovieContainer👍", props, "🐯page is", props.match.params.page);
  }

  getMovieItems = pathname => {
    const { page } = this.state;
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
      loading: isLoading
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
    console.log(
      "😊componentWillReceiveProps()",
      nextProps,
      "🐯page is",
      nextProps.match.params.page
    );
    try {
      let {
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
      //check valid of pathname
      if (nextPathname === undefined || !this.checkValidOfPathname(nextPathname)) {
        nextPathname = Routes.movie.nowPlaying;
      }
      this.state = { page };
      const {
        data: { results: movies, total_pages: totalPages }
      } = await this.getMovieItems(nextPathname);
      console.log("🐯🐯🐯🐯👍", await this.getMovieItems(nextPathname));
      // console.log("next", movies);
      this.setState({ pathname: nextPathname, movies, loading: false, page, totalPages });
    } catch (error) {
      console.log("👿MovieContainer:componentWillReceiveProps()", error);
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("The loading state is ", nextState.loading);
  //   return true;
  // }

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
