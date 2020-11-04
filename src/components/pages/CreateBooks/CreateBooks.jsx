import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import emptyImage from "../../../images/empty.png";
import Add from "../../atoms/SVG/Add";
import "./CreateBooks.scss";

export default function CreateBook() {
  const history = useHistory();
  const [booksImage, setBooksImage] = useState(null);
  const [previewImages, setPreviewImages] = useState(emptyImage);

  const [books, setBooks] = useState({
    ISBN: "",
    title: "",
    summary: "",
    author: "",
    publicationDate: "",
    pagesNumber: parseInt(""),
    language: "",
    genreLivreId: "",
    uploadPicture: "",
    price: parseInt(""),
    isPosted: false,
    errorMessage: null,
  });

  const handleChange = (event) => {
    // event.preventDefault();
    let { name, value } = event.target;
    setBooks({
      ...books,
      [name]: value,
    });
  };

  const handleChangeFile = async (event) => {
    const [imageFile] = event.target.files;
    try {
      Resizer.imageFileResizer(
        imageFile,
        750,
        1500,
        "JPEG",
        50,
        0,
        (compressedFile) => {
          setBooksImage({ image: compressedFile });
          setPreviewImages(URL.createObjectURL(compressedFile));
        },
        "blob",
        750,
        750
      );
    } catch (error) {
      console.log(error);
    }
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
      formData.append("language", books.language);
      formData.append("genreLivreId", books.genreLivreId);
      formData.append("image", booksImage.image);
      formData.append("price", books.price);
      console.log(formData);
      const header = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const result = await axios.post(
        "http://localhost:8085/api/books",
        formData,
        header
      );
      history.push("/create-books");

      if (result.status === 201) {
        console.log("livre posté", result.status);
        setBooks({
          ...books,
          isPosted: true,
          errorMessage: null,
        });
        history.push("/books");
      }
    } catch (error) {
      setBooks({
        ...books,
        isPosted: false,
        errorMessage: error.response.data.description,
      });
    }
  };

  return (
    <>
      <div className="createbooks">
        <div className="createbooks-title">
          <h1>Création de livre</h1>
        </div>
        <form className="createbooks-form" onSubmit={handleSubmit}>
          <div className="createbooks-form-preview">
            <img
              className="createbooks-form-preview-image"
              src={previewImages}
              alt="preview"
            />
            <label htmlFor="file" className="createbooks-form-preview-label">
              <Add />
              <input
                className="createbooks-form-preview-label-input"
                type="file"
                name="uploadPicture"
                id="file"
                onChange={handleChangeFile}
                required
              />
            </label>
          </div>
          <label htmlFor="genreLivreId">
            Genres
            <input
              name="genreLivreId"
              onChange={handleChange}
              value={books.genreLivreId}
              type="text"
              placeholder="Genre Du livre"
            />
          </label>
          <label htmlFor="ISBN">
            ISBN
            <input
              name="ISBN"
              onChange={handleChange}
              value={books.ISBN}
              type="number"
              placeholder="Numéro ISBN"
            />
          </label>
          <label htmlFor="name">
            Title
            <input
              name="title"
              onChange={handleChange}
              value={books.title}
              type="text"
              placeholder="Titre"
            />
          </label>
          <label htmlFor="summary">
            Résumé
            <textarea
              name="summary"
              onChange={handleChange}
              value={books.summary}
              type="text"
              placeholder="Résumé"
            />
          </label>
          <label htmlFor="author">
            Auteur
            <input
              name="author"
              onChange={handleChange}
              value={books.author}
              type="text"
              placeholder="Auteur"
            />
          </label>
          <label htmlFor="language">
            Langue
            <input
              name="language"
              onChange={handleChange}
              value={books.language}
              type="text"
              placeholder="Langue du livre"
            />
          </label>
          <label htmlFor="price">
            Prix
            <input
              name="price"
              onChange={handleChange}
              value={books.price}
              type="number"
              placeholder="Prix"
              min="0"
            />
          </label>
          <label htmlFor="pagesNumber">
            Nombre de Pages
            <input
              name="pagesNumber"
              onChange={handleChange}
              value={books.pagesNumber}
              type="number"
              placeholder="Nombre de pages"
            />
          </label>
          <label htmlFor="publicationDate">
            Date de Publication
            <input
              name="publicationDate"
              onChange={handleChange}
              value={books.publicationDate}
              type="date"
              placeholder="Date de publication"
            />
          </label>
          <span>{books.errorMessage}</span>
          <button type="submit">Ajouter le livre</button>
        </form>
      </div>
    </>
  );
}
