import Axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/organisms/Header/Header";
import Routes from "./components/Routes";
import Footer from "./components/organisms/Footer/Footer";
import AuthContext from "./contexts/AuthContext";
import AuthReducer from "./reducer/AuthReducer";
import UserContext from "./contexts/UserContext";
import OneBookContext from "./contexts/OneBookContext";
import NavBarResponsive from "./components/molecules/NavBarResponsive";
import "./App.scss";

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  roleAdmin: null,
  isLoading: true,
};

export default function App() {
  // context d'un seul livre
  const [oneBook, setOneBook] = useState([]);
  const oneBookValue = {
    oneBook,
    setOneBook,
  };

  // authentification
  const [state, dispatch] = useReducer(AuthReducer.reducer, initialState);

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

  // Fetch de la route User/me pour conserver le state du USER
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const result = await Axios(`http://localhost:8085/api/user/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(result.data);
          if (result.status === 200) {
            dispatch({
              type: "LOAD_USER",
              payload: result.data,
            });
          }
        } catch (error) {
          dispatch({
            type: "LOGOUT",
          });
        }
      } else {
        dispatch({
          type: "NO_USER",
        });
      }
    };
    fetchUser();
  }, []);

  console.log("STATE APP", state);
  return (
    <Router>
      <AuthContext.Provider value={authValue}>
        <UserContext.Provider value={userValue}>
          <OneBookContext.Provider value={oneBookValue}>
            <Header />
            <NavBarResponsive />
            <Routes />
            <Footer />
          </OneBookContext.Provider>
        </UserContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
}
