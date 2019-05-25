import React from "react";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
//Route Module
import Header from "Components/Header";
import Home from "Routes/Home";
import Movie from "Routes/Movie";
import TV from "Routes/TV";
import Search from "Routes/Search";
import Detail from "Routes/Detail";
import MainContainer from "Components/MainContainer";

const ROUTE_HOME = "/";
const ROUTE_MOVIE = "/movie";
const ROUTE_TV = "/tv";
const ROUTE_SEARCH = "/search";

const PARAM_PAGE = "/page/:page";
const PARAM_PAGE_RAW = "/page";

export const RouteIdentifier = {
  page: PARAM_PAGE_RAW
};

export const Routes = {
  home: ROUTE_HOME,
  movie: {
    home: ROUTE_MOVIE,
    nowPlaying: `${ROUTE_MOVIE}/now-playing`,
    popular: `${ROUTE_MOVIE}/popular`,
    upcoming: `${ROUTE_MOVIE}/upcoming`,
    topRated: `${ROUTE_MOVIE}/top-rated`,
    detail: `${ROUTE_MOVIE}/:id`
  },
  tv: {
    home: ROUTE_TV,
    airingToday: `${ROUTE_TV}/airing-today`,
    popular: `${ROUTE_TV}/popular`,
    onTheAir: `${ROUTE_TV}/on-the-air`,
    topRated: `${ROUTE_TV}/top-rated`,
    detail: `${ROUTE_TV}/:id`
  },
  search: {
    home: ROUTE_SEARCH
  }
};

export default () => (
  <Router>
    <>
      <Header />
      <MainContainer>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact component={Home} />
          {/* Movie */}
          <Route path={Routes.movie.home} exact component={Movie} />
          <Route path={`${Routes.movie.nowPlaying}${PARAM_PAGE}`} component={Movie} />
          <Route path={Routes.movie.nowPlaying} component={Movie} />
          <Route path={`${Routes.movie.popular}${PARAM_PAGE}`} component={Movie} />
          <Route path={Routes.movie.popular} component={Movie} />
          <Route path={`${Routes.movie.topRated}${PARAM_PAGE}`} component={Movie} />
          <Route path={Routes.movie.topRated} component={Movie} />
          <Route path={`${Routes.movie.upcoming}${PARAM_PAGE}`} component={Movie} />
          <Route path={Routes.movie.upcoming} component={Movie} />
          <Route path={Routes.movie.detail} component={Detail} />
          {/* TV */}
          <Route path={Routes.tv.home} exact component={TV} />
          <Route path={`${Routes.tv.onTheAir}${PARAM_PAGE}`} component={TV} />
          <Route path={Routes.tv.onTheAir} component={TV} />
          <Route path={`${Routes.tv.airingToday}${PARAM_PAGE}`} component={TV} />
          <Route path={Routes.tv.airingToday} component={TV} />
          <Route path={`${Routes.tv.popular}${PARAM_PAGE}`} component={TV} />
          <Route path={Routes.tv.popular} component={TV} />
          <Route path={`${Routes.tv.topRated}${PARAM_PAGE}`} component={TV} />
          <Route path={Routes.tv.topRated} component={TV} />
          <Route path={Routes.tv.detail} component={Detail} />
          <Route path={Routes.search.home} component={Search} />
          <Redirect from="*" to="/" />
        </Switch>
      </MainContainer>
    </>
  </Router>
);
