import Axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/organisms/Header/Header";
import MobileNavBar from "./components/organisms/MobileNavBar/MobilieNavBar";
import Routes from "./components/Routes";
import Footer from "./components/organisms/Footer/Footer";
import AuthContext from "./contexts/AuthContext";
import ContextRecherche from "./contexts/ContextRecherche";
import AuthReducer from "./reducer/AuthReducer";
import UserContext from "./contexts/UserContext";
import OneBookContext from "./contexts/OneBookContext";
import NavBarResponsive from "./components/molecules/NavBarResponsive";
import "./App.scss";

export default function App() {
  // barre de recherche
  // const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  const [searchForm, setSearchForm] = useState("");
  const contextValue = {
    // title,
    // setTitle,
    // author,
    // setAuthor,
    searchForm,
    setSearchForm,
  };

  const [oneBook, setOneBook] = useState([]);
  const oneBookValue = {
    oneBook,
    setOneBook,
  };
  // authentification
  const [state, dispatch] = useReducer(
    AuthReducer.reducer,
    AuthReducer.initialState
  );
  const authValue = {
    state,
    dispatch,
  };

  // context du user
  const [user, setUser] = useState([]);
  const userValue = {
    user,
    setUser,
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const result = await Axios(`http://localhost:8085/api/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(result.data);
        dispatch({
          type: "LOAD_USER",
          payload: result.data,
        });
      }
    };
    fetchUser();
  }, []);

  return (
    <Router>
      <AuthContext.Provider value={authValue}>
        <UserContext.Provider value={userValue}>
          <ContextRecherche.Provider value={contextValue}>
            <OneBookContext.Provider value={oneBookValue}>
              <Header />
              <NavBarResponsive />
              <Routes />
              <Footer />
            </OneBookContext.Provider>
          </ContextRecherche.Provider>
        </UserContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
}
