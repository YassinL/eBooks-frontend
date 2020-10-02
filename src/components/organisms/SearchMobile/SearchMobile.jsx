import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Search from "../../atoms/SVG/Search";
import "./SearchMobile.scss";

const SearchMobile = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const history = useHistory();
  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
    history.push("/books");
  };

  return (
    <div className="searchMobile">
      <form className="searchMobile-form">
        <label htmlFor="" className="searchMobile-form-label">
          <input
            value={searchValue}
            onChange={handleSearchInputChanges}
            type="search"
            placeholder="Où allez-vous ?"
            className="searchMobile-form-label-input"
          />

          <button
            onClick={callSearchFunction}
            className="searchMobile-form-label-button"
            type="submit"
          >
            <Search />
          </button>
        </label>
      </form>
    </div>
  );
};

export default SearchMobile;
