import React from "react";
import TVPresenter from "./TVPresenter";
import { tvApi } from "api";
import { Routes } from "Components/Router";

export default class extends React.Component {
  state = {
    tvs: null,
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
    console.log("TVContainer👍", props, "🐯page is", props.match.params.page);
  }

  getTVItems = (pathname, page = this.state.page) => {
    console.log("getTVItems Called in page 🙏", page);
    if (pathname.includes(Routes.tv.airingToday)) {
      console.log("getTVItems", "airing-today");
      return tvApi.airingToday(page);
    } else if (pathname.includes(Routes.tv.popular)) {
      console.log("getTVItems", "popular");
      return tvApi.popular(page);
    } else if (pathname.includes(Routes.tv.topRated)) {
      console.log("getTVItems", "top-rated");
      return tvApi.topRated(page);
    } else if (pathname.includes(Routes.tv.onTheAir)) {
      console.log("getTVItems", "on-the-air");
      return tvApi.onTheAir(page);
    } else {
      // invalid pathname
      return tvApi.onTheAir(page);
    }
  };

  setLoadingState = isLoading => {
    this.setState({
      loading: isLoading,
      tvs: null
    });
  };

  async componentDidMount() {
    this.setLoadingState(true);
    try {
      const { pathname } = this.state;
      // console.log("✨current location: ", pathname);
      const {
        data: { results: tvs, total_pages: totalPages }
      } = await this.getTVItems(pathname);
      // console.log("🙏 tv items are: ", tvs);
      this.setState({ pathname, tvs, loading: false, totalPages });
    } catch (error) {
      console.log("👿TVContainer:componentDidMount()", error);
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
      const {
        location: { pathname: nextPathname },
        match: {
          params: { page }
        }
      } = nextProps;
      const {
        data: { results: tvs, total_pages: totalPages }
      } = await this.getTVItems(nextPathname);
      console.log("🐯🐯🐯🐯👍", await this.getTVItems(nextPathname, page));
      // console.log("next",tvs);
      this.setState({
        pathname: nextPathname,
        tvs,
        loading: false,
        page: page === undefined ? 1 : page,
        totalPages
      });
    } catch (error) {
      console.log("👿TVContainer:componentWillReceiveProps()", error);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("The loading state is ", nextState.loading);
    return true;
  }

  render() {
    const { loading, tvs, pathname, page, totalPages } = this.state;
    return (
      <TVPresenter
        loading={loading}
        tvs={tvs}
        pathname={pathname}
        page={page}
        totalPages={totalPages}
      />
    );
  }
}
