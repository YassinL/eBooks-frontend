import Axios from "axios";
import React, { useContext, useEffect } from "react";
import Moment from "react-moment";
import "moment-timezone";
// import "moment/locale/fr";
import { useParams, Link } from "react-router-dom";
import ModaleDelete from "../../organisms/ModaleAlert/ModaleAlert";
import OneBookContext from "../../../contexts/OneBookContext";
import AuthContext from "../../../contexts/AuthContext";
import "./OneBook.scss";

export default function OneBook() {
  const context = useContext(OneBookContext);
  const { urlTitle } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios(`http://localhost:8085/api/books/${urlTitle}`);
      context.setOneBook(result.data);
    };

    fetchData();
  }, [urlTitle]);

  const { state } = useContext(AuthContext);
  useEffect(() => {
    return () => {};
  }, [state]);

  console.log("context", context.oneBook.urlTitle);
  return (
    <div className="div">
      <div className="div-oneBook">
        <div className="div-oneBook-description">
          <div className="div-oneBook-description-picture">
            <img src={context.oneBook.uploadPicture} alt="" />
          </div>
          <div className="div-oneBook-description-price">
            <h3>Prix : {context.oneBook.price}€</h3>
          </div>
        </div>

        <div className="div-oneBook-firstDescription">
          <h2 style={{ textTransform: "capitalize" }}>
            {context.oneBook.title}
          </h2>
          <h3 style={{ textTransform: "capitalize" }}>
            {context.oneBook.author}
          </h3>
          <p style={{ textTransform: "capitalize" }}>
            {context.oneBook.summary}
          </p>
        </div>
        <div className="div-oneBook-secondeDescription">
          <div className="div-oneBook-secondeDescription-details">
            <h4>
              Nombre de pages : <span>{context.oneBook.pagesNumber}</span>
            </h4>
          </div>
          <div className="div-oneBook-secondeDescription-details">
            <h4>
              Date de publication :{"  "}
              <span>
                <Moment format="D MMM YYYY" withTitle>
                  {context.oneBook.publicationDate}
                </Moment>
              </span>
            </h4>
          </div>
          <div className="div-oneBook-secondeDescription-details">
            <h4>
              Langue : <span>{context.oneBook.language}</span>
            </h4>
          </div>
          <div className="div-oneBook-secondeDescription-details">
            <h4>
              ISBN : <span>{context.oneBook.ISBN}</span>
            </h4>
          </div>
        </div>
      </div>
      {state.roleAdmin === true ? (
        <div className="div-button">
          <div className="div-button-delete">
            <ModaleDelete OneBook={context.oneBook} />
          </div>

          <div className="div-button-update">
            <button className="div-button-update-button">
              <Link
                className="div-button-update-button-link"
                to={`/update-books/${context.oneBook.urlTitle}`}
              >
                {" "}
                Modifier l'annonce de livre
              </Link>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
