import React from "react";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
//Route Module
import Header from "Components/Header";
import Home from "Routes/Home";
import Movie from "Routes/Movie";
import TV from "Routes/TV";
import Search from "Routes/Search";

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" exact component={Home} />
        <Route path="/movie" component={Movie} />
        <Route path="/tv" component={TV} />
        <Route path="/search" component={Search} />
      </Switch>
    </>
  </Router>
);
