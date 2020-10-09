import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Books from "./pages/Books/Books";
import OneBook from "./pages/OneBook/OneBook";
import Profile from "./pages/Profile/Profile";
import CreateBook from "./pages/CreateBooks/CreateBooks";
import GenreLivre from "./pages/GenreLivre/GenreLivre";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/books" component={Books} />
      <Route exact path="/books/:title" component={OneBook} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/create-books" component={CreateBook} />
      <Route exact path="/genre-livre/:name" component={GenreLivre} />
      <Route exact path="*" component={ErrorPage} />
    </Switch>
  );
}
