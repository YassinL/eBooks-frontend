import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ModaleSignUp from "../ModaleSignUp/ModaleSignUp";
import ModaleSignIn from "../ModaleSignIn/ModaleSignIn";
import AuthContext from "../../../contexts/AuthContext";
import "./DesktopNavBar.scss";

export default function DesktopNavBar() {
  const { state, dispatch } = useContext(AuthContext);
  console.log("state navbar", state);
  useEffect(() => {
    return () => {};
  }, [state]);

  const SignUpIN = () => {
    return (
      <>
        <ModaleSignUp />

        <ModaleSignIn />
      </>
    );
  };

  const history = useHistory();
  const logOut = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
  };

  const Profil = () => {
    return (
      <>
        <div className="desktop-navbar-icon">
          <Link to="/profile">
            <div className="desktop-navbar-icon-link">
              <h3>Profil</h3>
            </div>
          </Link>
        </div>
        <div className="desktop-navbar-icon">
          <div className="desktop-navbar-icon-link" onClick={logOut}>
            <h3>Déconnexion</h3>
          </div>
        </div>
      </>
    );
  };

  const ProfilIsAuth = () => {
    if (state.isAuthenticated) {
      return <Profil />;
    }
    return <SignUpIN />;
  };
  return (
    <>
      <div className="desktop-navbar">
        <div className="desktop-navbar-icon">
          <Link to="/">
            <div className="desktop-navbar-icon-link">
              <h3>Accueil</h3>
            </div>
          </Link>
        </div>
        <div className="desktop-navbar-icon">
          <Link to="/books">
            <div className="desktop-navbar-icon-link">
              <h3>Livres</h3>
            </div>
          </Link>
        </div>
        {/* <div className="desktop-navbar-icon">
          <Link to="/">
            <div className="desktop-navbar-icon-link">
              <h3>Panier</h3>
            </div>
          </Link>
        </div> */}
        <ProfilIsAuth />
      </div>{" "}
    </>
  );
}
