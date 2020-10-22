import Axios from "axios";
import React, { useContext, useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ContextRecherche from "../../../contexts/ContextRecherche";
// import BooksContext from "../../../contexts/BooksContext";
import SearchForm from "../../organisms/SearchMobile/Search";
import "./Books.scss";

export default function Books() {
  // const context = useContext(ContextRecherche);
  // const booksContext = useContext(BooksContext);
  const [books, setBooks] = useState([]);
  const [booksError, setBooksError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `http://localhost:8085/api/books?`;

        // if (context.title && context.author) {
        //   url = `${url}title=${context.title}&author=${context.author}`;
        // } else if (context.title) {
        //   url = `${url}title=${context.title}`;
        // } else if (context.author) {
        //   url = `${url}author=${context.author}`;
        // }

        const result = await Axios(`${url}`);

        setBooks(result.data);
      } catch (error) {
        setBooksError(error.response.data);
        console.log("error", error.response);
      }
    };

    fetchData();
  }, []);

  const [searchForm, setSearchForm] = useState("");

  const booksfilter = useMemo(() => {
    if (!searchForm) return books;
    return books.filter((book) => {
      console.log(book.author);
      return (
        book.author.toLowerCase().includes(searchForm.toLowerCase()) ||
        book.title.toLowerCase().includes(searchForm.toLowerCase())
      );
    });
  }, [searchForm, books]);

  return (
    <>
      {booksError !== "" ? (
        <div>
          <span>{booksError.title}</span>
          <span>{booksError.description}</span>
        </div>
      ) : null}
      <SearchForm value={searchForm} onChange={setSearchForm} />
      <div className="books">
        {booksfilter.map((book, i) => {
          return (
            <div className="books-fiche" key={i}>
              <Link to={`/books/${book.title}`}>
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
