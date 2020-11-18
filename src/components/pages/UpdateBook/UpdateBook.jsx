import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import Add from "../../atoms/SVG/Add";
import "../CreateBooks/CreateBooks.scss";

export default function UpdateBook() {
  const history = useHistory();
  const { urlTitle } = useParams();
  const [booksImage, setBooksImage] = useState("");
  const [previewImages, setPreviewImages] = useState(null);

  const [books, setBooks] = useState({
    ISBN: "",
    title: "",
    urlTitle: "",
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          // eslint-disable-next-line camelcase
          `http://localhost:8085/api/books/${urlTitle}`
        );
        setBooks(result.data);
        setPreviewImages(result.data.uploadPicture);
        console.log(result);
      } catch (error) {
        history.push("/error");
      }
    };
    fetchData();
    // eslint-disable-next-line camelcase
  }, [history]);

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
      formData.set("ISBN", books.ISBN);
      formData.set("title", books.title);
      formData.set("urlTitle", books.urlTitle);
      formData.set("summary", books.summary);
      formData.set("author", books.author);
      formData.set("publicationDate", books.publicationDate);
      formData.set("pagesNumber", books.pagesNumber);
      formData.set("language", books.language);
      formData.set("genreLivreId", books.genreLivreId);
      formData.set("image", booksImage.image);
      formData.set("price", books.price);
      console.log(formData);
      const header = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      const result = await axios.put(
        `http://localhost:8085/api/books/${urlTitle}`,
        formData,
        header
      );
      console.log("PUT", result.data);
      history.push(`/books/${result.data.updateBooks.urlTitle}`);
    } catch (error) {
      setBooks({
        ...books,
        isPosted: false,
        errorMessage: error.response,
      });
    }
  };

  return (
    <>
      <div className="createbooks">
        <div className="createbooks-title">
          <h1>Modification</h1>
        </div>
        <form
          action="POST"
          encType="multipart/form-data"
          className="createbooks-form"
          onSubmit={handleSubmit}
        >
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
          <div className="createbooks-form-form2">
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
          </div>

          <button type="submit">Modifier</button>
        </form>
      </div>
    </>
  );
}
