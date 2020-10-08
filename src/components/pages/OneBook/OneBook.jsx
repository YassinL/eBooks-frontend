import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OneBook() {
  const [OneBook, setOneBook] = useState([]);
  const { title } = useParams();
  console.log(title);
  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios(`http://localhost:8085/api/books/${title}`);
      setOneBook(result.data);
    };

    fetchData();
  }, [title]);
  return (
    <div>
      <div>
        <img src={OneBook.uploadPicture} alt="" />
      </div>
      <div>
        <h2>{OneBook.title}</h2>
      </div>
    </div>
  );
}
