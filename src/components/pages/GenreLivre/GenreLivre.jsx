import Axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SearchForm from "../../organisms/SearchMobile/Search";
import "./GenreLivre.scss";

export default function GenreLivre() {
  const [genreBooks, setGenreBooks] = useState([]);
  const [genreError, setGenreError] = useState("");
  const { name } = useParams();
  console.log(genreBooks);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Axios(
          `http://localhost:8085/api/books/genre-livre/${name}`
        );
        setGenreBooks(result.data);
      } catch (genreError) {
        setGenreError(genreError.response.data);
      }
    };

    fetchData();
  }, [name]);

  const [searchForm, setSearchForm] = useState("");

  const booksfilter = useMemo(() => {
    if (!searchForm) return genreBooks;
    return genreBooks.filter((genreBook) => {
      console.log(genreBook.author);
      return (
        genreBook.author.toLowerCase().includes(searchForm.toLowerCase()) ||
        genreBook.title.toLowerCase().includes(searchForm.toLowerCase())
      );
    });
  }, [searchForm, genreBooks]);

  return (
    <>
      {" "}
      <SearchForm value={searchForm} onChange={setSearchForm} />
      <div className="categorie">
        <h1 className="categorie-title">Catégorie : {name}</h1>
      </div>
      <div className="books">
        {booksfilter.map((genreBook, i) => {
          return (
            <div className="books-fiche" key={i}>
              <Link to={`/books/${genreBook.title}`}>
                <div className="books-fiche-photo">
                  <img src={genreBook.uploadPicture} alt="" />
                </div>
                <div className="books-fiche-description">
                  <h4>{genreBook.title}</h4>
                  <h5>{genreBook.author}</h5>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="product-error">
        {genreError !== "" ? (
          <div className="product-error-spanAll">
            <span className="product-error-spanAll-span">
              {genreError.title}
            </span>
            <span className="product-error-spanAll-span">
              {genreError.description}
            </span>
          </div>
        ) : null}
      </div>
    </>
  );
}
