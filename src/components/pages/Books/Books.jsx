import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContextRecherche from "../../../contexts/ContextRecherche";
import "./Books.scss";

export default function Books() {
  const [books, setBooks] = useState([]);

  const context = useContext(ContextRecherche);
  console.log(context);
  useEffect(() => {
    const fetchData = async () => {
      let url = `http://localhost:8085/api/books?`;

      if (context.title && context.author) {
        url = `${url}title=${context.title}&author=${context.author}`;
      } else if (context.title) {
        url = `${url}title=${context.title}`;
      } else if (context.author) {
        url = `${url}author=${context.author}`;
      }

      const result = await Axios(`${url}`);
      setBooks(result.data);

      // console.log(result.data);
    };

    fetchData();
  }, [context.title, context.author]);

  return (
    <>
      <div className="books">
        {books.map((book, i) => {
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
