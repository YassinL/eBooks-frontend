/* eslint-disable no-unused-expressions */
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import RightArrow from "../../atoms/SVG/RightArrow";
import LeftArrow from "../../atoms/SVG/LeftArrow";
import ReadingMan from "../../../images/homme_lire.jpg";
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
            <HashLink className="componant-home-button-link" to="/books/#">
              <button type="button">Explorer la Bibliothèque</button>
            </HashLink>
          </div>
        </section>
        <section className="componant-categorie">
          <div className="componant-categorie-title">
            <h1 className="componant-categorie-title-h1">Catégories</h1>
          </div>
          <div className="componant-categorie-bloc">
            <div className="componant-categorie-bloc-slider">
              {genres.map((genre, index) => {
                return (
                  <div
                    key={index}
                    className="componant-categorie-bloc-slider-name"
                    style={{ transform: `translateX(${x}% )` }}
                  >
                    <HashLink to={`/genre-livre/${genre.name}/#`}>
                      <h2>{genre.name}</h2>
                    </HashLink>
                  </div>
                );
              })}
              <button
                type="button"
                className="componant-categorie-bloc-slider-left"
                onClick={goLeft}
              >
                <LeftArrow />
              </button>
              <button
                type="button"
                className="componant-categorie-bloc-slider-right"
                onClick={goRight}
              >
                <RightArrow />
              </button>
            </div>
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
          <div className="componant-presentation-details">
            <div className="componant-presentation-details-image">
              <img src={ReadingMan} alt="" />
            </div>
            <div className="componant-presentation-details-paragraphe">
              <p>
                Mon projet est un site dont le but principal est de trouver et
                d’acheter des livres d’occasion. Ce sera une interface
                utilisateur de gestion de contenus, et de e-commerce par la
                suite. Les utilisateurs visés sont des personnes qui sont dans
                une démarche éco-responsable, ils sont sensibles aux circuits
                alternatifs de recherche de particulier à particulier pour
                trouver des produits de seconde main, qui représentent des
                achats plus abordables, ici des livres qu’on ne trouve pas
                partout et pour un prix avantageux. La démarche de ce projet est
                de mettre en place une recherche et une sélection des livres
                accessibles : autant pour l’administrateur avec une base de
                données correctement organisée, que pour l’utilisateur avec une
                catégorisation des contenus intuitive et pratique. Ce projet
                vise à correspondre à un maximum de types d’utilisateurs, et est
                donc accessible sur plusieurs supports (mobile, tablette, et ​
                desktop ​ ). Par ailleurs, comme le recommandent les normes de
                référencement de Google, je l’ai développé en format ​ mobile
                first ​ .
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
