import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Books from "./pages/Books/Books";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/books" component={Books} />
    </Switch>
  );
}
