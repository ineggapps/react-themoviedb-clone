import React from "react";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
//Route Module
import Home from "Routes/Home";
import Movie from "Routes/Movie";
import TV from "Routes/TV";
import Search from "Routes/Search";

export default () => (
  <Router>
    <>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/movie" component={Movie} />
        <Route path="/tv" component={TV} />
        <Route path="/search" component={Search} />
      </Switch>
    </>
  </Router>
);
