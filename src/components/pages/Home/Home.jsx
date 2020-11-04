import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import RightArrow from "../../atoms/SVG/RightArrow";
import LeftArrow from "../../atoms/SVG/LeftArrow";
import "./Home.scss";

const style = {
  background: `url(${process.env.PUBLIC_URL}/booksPic.jpg)`,
  backgroundSize: "cover ",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

export default function Home() {
  const [genres, setGenres] = useState([]);
  const [books, setBooks] = useState([]);
  const [randomError, setRandomError] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios(`http://localhost:8085/api/genre`);
      setGenres(result.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Axios(`http://localhost:8085/api/random-books`);
        console.log(result);

        setBooks(result.data);
      } catch (error) {
        setRandomError(error.response.data);
      }
    };

    fetchData();
  }, []);

  const [x, setX] = useState(0);
  const [o, setO] = useState(0);

  const goLeft = () => {
    x === 0 ? setX(-100 * (genres.length - 1)) : setX(x + 100);
  };

  const goRight = () => {
    x === -100 * (genres.length - 1) ? setX(0) : setX(x - 100);
  };

  const goLeftBooks = () => {
    o === 0 ? setO(-100 * (books.length - 1)) : setO(o + 100);
  };

  const goRightBooks = () => {
    o === -100 * (books.length - 1) ? setO(0) : setO(o - 100);
  };

  return (
    <>
      <div className="componant">
        <section className="componant-home" style={style}>
          <div className="componant-home-citation">
            <h2>
              "La lecture nous offre un endroit où aller lorsque nous devons
              rester où nous sommes"
            </h2>
          </div>
          <div className="componant-home-button">
            <Link className="componant-home-button-link" to="/books">
              <button type="button">Explorer la Bibliothèque</button>
            </Link>
          </div>
        </section>
        <section className="componant-categorie">
          <h1 className="componant-categorie-title">Catégories</h1>
          <div className="componant-categorie-slider">
            {genres.map((genre, index) => {
              return (
                <div
                  key={index}
                  className="componant-categorie-slider-name"
                  style={{ transform: `translateX(${x}% )` }}
                >
                  <Link to={`/genre-livre/${genre.name}`}>
                    <h2>{genre.name}</h2>
                  </Link>
                </div>
              );
            })}
            <button
              type="button"
              className="componant-categorie-slider-left"
              onClick={goLeft}
            >
              <LeftArrow />
            </button>
            <button
              type="button"
              className="componant-categorie-slider-right"
              onClick={goRight}
            >
              <RightArrow />
            </button>
          </div>
        </section>
        <section className="componant-livrepopulaire">
          <h1 className="componant-livrepopulaire-title">Livres Populaires</h1>
          <div className="componant-livrepopulaire-sliderbooks">
            {randomError !== "" ? (
              <div className="span">
                <span className="span-error">
                  {randomError.title}, {randomError.description}
                </span>
              </div>
            ) : null}
            {books.map((book, index) => {
              return (
                <div
                  className="componant-livrepopulaire-sliderbooks-fiche"
                  key={index}
                  style={{ transform: `translateX(${o}% )` }}
                >
                  <Link to={`/books/${book.urlTitle}`}>
                    <div className="componant-livrepopulaire-sliderbooks-fiche-photo">
                      <img src={book.uploadPicture} alt="" />
                    </div>
                    <div className="componant-livrepopulaire-sliderbooks-fiche-description">
                      <h4>{book.title}</h4>
                      <h5>{book.author}</h5>
                    </div>
                  </Link>
                </div>
              );
            })}
            <button
              type="button"
              className="componant-livrepopulaire-sliderbooks-leftbooks"
              onClick={goLeftBooks}
            >
              <LeftArrow />
            </button>
            <button
              type="button"
              className="componant-livrepopulaire-sliderbooks-rightbooks"
              onClick={goRightBooks}
            >
              <RightArrow />
            </button>
          </div>
        </section>
        <section className="componant-presentation">
          <div className="componant-presentation-title">
            <h1>Présentation du site</h1>
          </div>
          <div className="componant-presentation-paragraphe">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              provident, corrupti id impedit quaerat et. Distinctio labore magni
              officia sapiente voluptas illo non cum inventore, dolorum aut
              dolore voluptates nesciunt suscipit velit consectetur! Voluptatem
              minus, ipsam repellat veniam, eveniet eius perferendis beatae vel
              nemo facere tempore impedit harum sunt excepturi. Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Libero rerum
              deleniti, mollitia ullam obcaecati totam veritatis fugit expedita
              iste corporis? Laudantium voluptatum, alias excepturi dignissimos
              harum ex. Perferendis, quisquam ab amet suscipit repellat eius
              dolores ex labore, veniam mollitia vitae. Amet iure dignissimos
              vel aliquid voluptates perspiciatis. Cumque, quaerat ab.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
