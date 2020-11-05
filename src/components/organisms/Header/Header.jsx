import React, { useContext } from "react";
import "./Header.scss";
// import SearchMobile from "../SearchMobile/SearchMobile";
// import ContextRecherche from "../../../contexts/ContextRecherche";
import Logo from "../../../images/EBLogo.png";
import { Link } from "react-router-dom";

export default function Header() {
  // const context = useContext(ContextRecherche);
  // const search = (searchValue) => {
  //   context.setTitle(searchValue.title);
  //   context.setAuthor(searchValue.author);
  // context.SetGenreLivreId(searchValue);
  // context.setRecherche(searchValue);
  // };
  return (
    <>
      <div className="header">
        {/* <SearchMobile search={search} /> */}
        <Link to="/">
          <img className="header-logo" src={Logo} alt="" />
        </Link>
      </div>
    </>
  );
}
