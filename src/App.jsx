import React, { useReducer, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/organisms/Header/Header";
import MobileNavBar from "./components/organisms/MobileNavBar/MobilieNavBar";
import Routes from "./components/Routes";
import Footer from "./components/organisms/Footer/Footer";
import AuthContext from "./contexts/AuthContext";
import ContextRecherche from "./contexts/ContextRecherche";
import AuthReducer from "./reducer/AuthReducer";

import "./App.scss";

export default function App() {
  // barre de recherche
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  // const [genreLivreId, setGenreLivreId] = useState("");
  const contextValue = {
    title,
    setTitle,
    author,
    setAuthor,
    // genreLivreId,
    // setGenreLivreId,
  };

  const [state, dispatch] = useReducer(
    AuthReducer.reducer,
    AuthReducer.initialState
  );
  const authValue = {
    state,
    dispatch,
  };

  return (
    <Router>
      <AuthContext.Provider value={authValue}>
        <ContextRecherche.Provider value={contextValue}>
          <Header />
          <MobileNavBar />
          <Routes />
          <Footer />
        </ContextRecherche.Provider>
      </AuthContext.Provider>
    </Router>
  );
}
