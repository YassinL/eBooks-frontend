import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function GenreLivre() {
  const [genreBooks, setGenreBooks] = useState([]);
  const { name } = useParams();
  console.log(genreBooks);
  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios(
        `http://localhost:8085/api/books/genre-livre/${name}`
      );
      setGenreBooks(result.data);
    };

    fetchData();
  }, [name]);
  return (
    <>
      {" "}
      <div className="books">
        {genreBooks.map((genreBook, i) => {
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
    </>
  );
}
