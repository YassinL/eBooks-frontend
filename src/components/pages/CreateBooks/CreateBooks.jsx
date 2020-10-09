import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import emptyImage from "../../../images/empty.png";

export default function CreateBook() {
  const history = useHistory();

  const [books, setBooks] = useState({
    ISBN: "",
    title: "",
    summary: "",
    author: "",
    publicationDate: "",
    pagesNumber: "",
    language: "",
    uploadPicture: "",
    genreLivreId: parseInt("1"),
    price: "",
  });

  const [previewImages, setPreviewImages] = useState(emptyImage);
  console.log("previewImages", previewImages);
  const handleChange = (event) => {
    let { name, value } = event.target;
    setBooks({
      ...books,
      [name]: value,
    });
  };

  const handleChangeFile = async (event) => {
    const [imageFile] = event.target.files;
    setPreviewImages(URL.createObjectURL(imageFile));
  };

  const token = localStorage.getItem("token");
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append("ISBN", books.ISBN);
      formData.append("title", books.title);
      formData.append("summary", books.summary);
      formData.append("author", books.author);
      formData.append("publicationDate", books.publicationDate);
      formData.append("pagesNumber", books.pagesNumber);
      formData.append("uploadPicture", previewImages.uploadPicture);
      formData.append("genreLivreId", books.genreLivreId);
      formData.append("price", books.price);

      const header = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post("http://localhost:8085/api/books", formData, header);
      history.push("/create-books");
    } catch (error) {
      history.push("/error");
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <img src={previewImages} alt="" />
            <label htmlFor="file" className="preview_label">
              <input
                className="preview_input"
                type="file"
                name="uploadPicture"
                id="file"
                onChange={handleChangeFile}
                required
              />
            </label>
          </div>
          <label htmlFor="idCategory">
            Genres
            <select
              name="genreLivreId"
              value={books.genreLivreId}
              onChange={handleChange}
            >
              <option value="1">Roman</option>
              <option value="2">Polar</option>
            </select>
          </label>
          <label htmlFor="ISBN">
            ISBN
            <input
              name="ISBN"
              onChange={handleChange}
              value={books.name}
              type="text"
            />
          </label>
          <label htmlFor="name">
            Title
            <input
              name="title"
              onChange={handleChange}
              value={books.name}
              type="text"
            />
          </label>
          <label htmlFor="description">
            Description
            <input
              name="description"
              onChange={handleChange}
              value={books.descripton}
              type="text"
            />
          </label>
          <label htmlFor="price">
            Prix
            <input
              name="price"
              onChange={handleChange}
              value={books.price}
              type="number"
            />
          </label>
          <button type="submit">Envoyer</button>
        </form>
      </div>
    </>
  );
}
