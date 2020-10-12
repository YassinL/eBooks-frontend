import Axios from "axios";
import React, { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ModaleAlert from "../../organisms/ModaleAlert/ModaleAlert";
import OneBookContext from "../../../contexts/OneBookContext";

export default function OneBook() {
  const context = useContext(OneBookContext);
  const { title } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios(`http://localhost:8085/api/books/${title}`);
      context.setOneBook(result.data);
    };

    fetchData();
  }, [title]);

  return (
    <div>
      <div>
        <img src={context.oneBook.uploadPicture} alt="" />
      </div>
      <div>
        <h2>{context.oneBook.title}</h2>
      </div>
      <ModaleAlert OneBook={context.oneBook} />
      <button>
        <Link to={`/update-books/${context.oneBook.title}`}> Modifier</Link>
      </button>
    </div>
  );
}
