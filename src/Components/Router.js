import React from "react";
import { HashRouter as Router, Route, Redirect, Switch } from "react-router-dom";
//Route Module
import Home from "Routes/Home";

export default () => (
  <Router>
    <>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </>
  </Router>
);
