import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Books from "./pages/Books/Books";
import OneBook from "./pages/OneBook/OneBook";
import Profile from "./pages/Profile/Profile";
import CreateBook from "./pages/CreateBooks/CreateBooks";
import UpdateBook from "./pages/UpdateBook/UpdateBook";
import GenreLivre from "./pages/GenreLivre/GenreLivre";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Contact from "./pages/Contact/Contact";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/books" component={Books} />
      <Route exact path="/books/:urlTitle" component={OneBook} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/create-books" component={CreateBook} />
      <Route exact path="/update-books/:title" component={UpdateBook} />
      <Route exact path="/genre-livre/:name" component={GenreLivre} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="*" component={ErrorPage} />
    </Switch>
  );
}
