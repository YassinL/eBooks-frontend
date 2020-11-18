import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import HomeIcon from "../../atoms/SVG/HomeIcon";
import LivreIcon from "../../atoms/SVG/LivreIcon";
import LogOutIcon from "../../atoms/SVG/LogOutIcon";
import ProfileIcon from "../../atoms/SVG/ProfileIcon";
import PanierIcon from "../../atoms/SVG/PanierIcon";
import "./MobileNavBar.scss";
import ModaleSignUp from "../ModaleSignUp/ModaleSignUp";
import ModaleSignIn from "../ModaleSignIn/ModaleSignIn";
import AuthContext from "../../../contexts/AuthContext";

export default function NavBar() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    console.log("mouse enter");
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    console.log("mouse leave");
    setIsHovered(false);
  };

  const { state, dispatch } = useContext(AuthContext);

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
        <div className="mobile-navbar-icon">
          <Link to="/profile">
            <div className="mobile-navbar-icon-link">
              <ProfileIcon />
              <p>Profile</p>
            </div>
          </Link>
        </div>
        <div className="mobile-navbar-icon">
          <div className="mobile-navbar-icon-link" onClick={logOut}>
            <LogOutIcon />
            <p>Déconnexion</p>
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
      <div className="mobile-navbar">
        <div className="mobile-navbar-icon">
          <Link to="/">
            <div className="mobile-navbar-icon-link">
              <HomeIcon
                color={isHovered ? "#0f0f0f" : "#7ecc9a"}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
              <p>Accueil</p>
            </div>
          </Link>
        </div>
        <div className="mobile-navbar-icon">
          <Link to="/books">
            <div className="mobile-navbar-icon-link">
              <LivreIcon />
              <p>Livres</p>
            </div>
          </Link>
        </div>
        {/* <div className="mobile-navbar-icon">
          <Link to="/">
            <div className="mobile-navbar-icon-link">
              <PanierIcon />
              <p>Panier</p>
            </div>
          </Link>
        </div> */}
        <ProfilIsAuth />
      </div>{" "}
    </>
  );
}
