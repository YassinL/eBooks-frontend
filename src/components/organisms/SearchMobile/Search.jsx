import React from "react";
import Search from "../../atoms/SVG/Search";
import "./SearchMobile.scss";

const SearchMobile = ({ value, onChange }) => {
  return (
    <div className="searchMobile">
      <form className="searchMobile-form">
        <label htmlFor="" className="searchMobile-form-label">
          <input
            name="title"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            type="search"
            placeholder="Titre"
            className="searchMobile-form-label-input"
          />
          <button
            // onClick={callSearchFunction}
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
