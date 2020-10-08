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

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios(`http://localhost:8085/api/genre`);
      setGenres(result.data);
    };

    fetchData();
  }, []);

  const [x, setX] = useState(0);

  const goLeft = () => {
    x === 0 ? setX(-100 * (genres.length - 1)) : setX(x + 100);
  };

  const goRight = () => {
    x === -100 * (genres.length - 1) ? setX(0) : setX(x - 100);
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
            <div className="componant-home-button">
              <Link to="/books">
                <button type="button">Explorer la bibliothèque</button>
              </Link>
            </div>
          </div>
          {/* <div className="componant-home-image">
            <img src={image} alt="" />
          </div> */}
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
                  <h2>{genre.name}</h2>
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
        <section>
          <h1>Livres Populaires</h1>
        </section>
      </div>
    </>
  );
}
