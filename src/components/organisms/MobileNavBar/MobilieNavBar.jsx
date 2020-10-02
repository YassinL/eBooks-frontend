import React, { useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "../../atoms/SVG/HomeIcon";
import LivreIcon from "../../atoms/SVG/LivreIcon";
import ConnexionIcon from "../../atoms/SVG/ConnexionIcon";
import PanierIcon from "../../atoms/SVG/PanierIcon";
import "./MobileNavBar.scss";

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
              <h3>Accueil</h3>
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
        <div className="mobile-navbar-icon">
          <Link to="/">
            <div className="mobile-navbar-icon-link">
              <ConnexionIcon />
              <p>Connexion</p>
            </div>
          </Link>
        </div>
        <div className="mobile-navbar-icon">
          <Link to="/">
            <div className="mobile-navbar-icon-link">
              <PanierIcon />
              <p>Panier</p>
            </div>
          </Link>
        </div>
      </div>{" "}
    </>
  );
}
