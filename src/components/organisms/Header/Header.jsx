import React from "react";
import "./Header.scss";
import SearchMobile from "../SearchMobile/SearchMobile";

// import fondecran from "../../../images/fondecran.jpeg";

export default function Header() {
  return (
    <>
      <div className="header">
        <SearchMobile />
      </div>
    </>
  );
}
