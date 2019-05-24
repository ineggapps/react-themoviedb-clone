import React from "react";
import TVPresenter from "./TVPresenter";
import { tvApi } from "api";
import { Routes } from "Components/Router";

export default class extends React.Component {
  state = {
    tvs: null,
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

  getTVItems = pathname => {
    if (pathname.includes(Routes.tv.airingToday)) {
      console.log("getTVItems", "airing-today");
      return tvApi.airingToday();
    } else if (pathname.includes(Routes.tv.popular)) {
      console.log("getTVItems", "popular");
      return tvApi.popular();
    } else if (pathname.includes(Routes.tv.topRated)) {
      console.log("getTVItems", "top-rated");
      return tvApi.topRated();
    } else if (pathname.includes(Routes.tv.onTheAir)) {
      console.log("getTVItems", "on-the-air");
      return tvApi.onTheAir();
    } else {
      // invalid pathname
      return tvApi.onTheAir();
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
        data: { results: tvs }
      } = await this.getTVItems(pathname);
      // console.log("🙏 tv items are: ", tvs);
      this.setState({ pathname, tvs, loading: false });
    } catch (error) {
      console.log("👿TVContainer:componentDidMount()", error);
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
        data: { results: tvs }
      } = await this.getTVItems(nextPathname);
      // console.log("next",tvs);
      this.setState({ pathname: nextPathname, tvs, loading: false });
    } catch (error) {
      console.log("👿TVContainer:componentWillReceiveProps()", error);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("The loading state is ", nextState.loading);
    return true;
  }

  render() {
    const { loading, tvs, pathname } = this.state;
    return <TVPresenter loading={loading} tvs={tvs} pathname={pathname} />;
  }
}
