import Axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import SearchForm from "../../organisms/SearchMobile/Search";
import "./Books.scss";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [booksError, setBooksError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Axios(`http://localhost:8085/api/books?`);

        setBooks(result.data);
      } catch (error) {
        setBooksError(error.response.data);
      }
    };

    fetchData();
  }, []);

  const [searchForm, setSearchForm] = useState("");

  const booksfilter = useMemo(() => {
    if (!searchForm) return books;
    return books.filter((book) => {
      return (
        book.author.toLowerCase().includes(searchForm.toLowerCase()) ||
        book.title.toLowerCase().includes(searchForm.toLowerCase())
      );
    });
  }, [searchForm, books]);

  return (
    <>
      <div className="searchBar">
        <SearchForm value={searchForm} onChange={setSearchForm} />
      </div>
      {booksError !== "" ? (
        <div className="span">
          <span className="span-error">
            {booksError.title}, {booksError.description}
          </span>
        </div>
      ) : null}
      <div className="books">
        {booksfilter.map((book, i) => {
          return (
            <div className="books-fiche" key={i}>
              <Link to={`/books/${book.urlTitle}`}>
                <div className="books-fiche-photo">
                  <img src={book.uploadPicture} alt="" />
                </div>
                <div className="books-fiche-description">
                  <h4>{book.title}</h4>
                  <h5>{book.author}</h5>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
