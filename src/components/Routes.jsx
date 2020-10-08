import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Books from "./pages/Books/Books";
import OneBook from "./pages/OneBook/OneBook";
import Profile from "./pages/Profile/Profile";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/books" component={Books} />
      <Route exact path="/books/:title" component={OneBook} />
      <Route exact path="/profile" component={Profile} />
    </Switch>
  );
}
