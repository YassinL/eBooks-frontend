import React from "react";
import { Link } from "react-router-dom";
import errorImage from "../../../images/errorImage.png";
import "./ErrorPage.scss";

export default function ErrorPage() {
  return (
    <div className="error">
      <div className="error-image">
        <img src={errorImage} alt="" />
      </div>
      <div className="error-title">
        <h1>ERROR 404</h1>
        <h2>La page que vous recherchez semble introuvable</h2>
      </div>
      <div className="error-link">
        <Link to="/">
          <p>&#8592; Revenez sur la page d'accueil</p>
        </Link>
      </div>
    </div>
  );
}