import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Search from "../../atoms/SVG/Search";
import "./SearchMobile.scss";

const SearchMobile = (props) => {
  const [searchForm, setSearchForm] = useState({
    title: "",
    author: "",
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setSearchForm({
      ...searchForm,
      [evt.target.name]: value,
    });
  }
  const resetInputField = () => {
    setSearchForm({
      title: "",
      author: "",
    });
  };

  const history = useHistory();
  const callSearchFunction = (event) => {
    event.preventDefault();
    props.search(searchForm);
    resetInputField();
    history.push("/books");
  };

  return (
    <div className="searchMobile">
      <form className="searchMobile-form">
        <label htmlFor="" className="searchMobile-form-label">
          <input
            name="title"
            value={searchForm.title}
            onChange={handleChange}
            type="search"
            placeholder="Titre"
            className="searchMobile-form-label-input"
          />
          <input
            name="author"
            value={searchForm.author}
            onChange={handleChange}
            type="search"
            placeholder="Auteur"
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
