import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Contact.scss";

export default function ContactForm() {
  const [messageSend, setMessageSend] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputForm, setInputForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post(
      "http://localhost:8085/api/sendMail",
      inputForm,
      setLoading(true)
    );
    setLoading(false);
    setInputForm({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      subject: "",
      message: "",
    });
    setMessageSend(true);
    setTimeout(() => {
      setMessageSend(false);
    }, 5000);
  };

  const SuccesSend = () => {
    if (loading) {
      return (
        <div className="form_successSend">
          <h3>Chargement ...</h3>
        </div>
      );
    }
    if (!messageSend) {
      return null;
    }
    return (
      <div className="form_successSend">
        <h3>&#10003; Message envoyé avec succès !</h3>
      </div>
    );
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form_title">
        <h1>Contactez-nous</h1>
      </div>

      <div className="input_container">
        <div className="input_text">
          <label htmlFor="first-name" className="input_text_label">
            Nom
          </label>
          <input
            className="input_text_field"
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Nom"
            value={inputForm.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input_text">
          <label htmlFor="lastName" className="input_text_label">
            Prénom
          </label>
          <input
            className="input_text_field"
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Prénom"
            value={inputForm.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="input_container">
        <div className="input_email">
          <label htmlFor="email" className="input_email_label">
            Email
          </label>
          <input
            className="input_email_field"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={inputForm.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input_tel">
          <label htmlFor="phoneNumber" className="input_tel_label">
            Téléphone
          </label>
          <input
            className="input_tel_field"
            type="phoneNumber"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Téléphone"
            value={inputForm.tel}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input_tel">
          <label htmlFor="subject" className="input_select_label">
            Sujet
          </label>
          <input
            className="input_email_field"
            type="subject"
            name="subject"
            id="subject"
            placeholder="Sujet"
            value={inputForm.subject}
            onChange={handleChange}
            required
          />
        </div>

        <label htmlFor="message" className="textarea_label">
          Message
        </label>
        <textarea
          className="textarea"
          name="message"
          id="message"
          placeholder="Message"
          value={inputForm.message}
          onChange={handleChange}
          required
        />

        <div className="input_submit">
          <button className="input_submit_button" type="submit">
            <p>
              Envoyer <span>&#10095;</span>
            </p>
          </button>
        </div>
      </div>
      <SuccesSend />
    </form>
  );
}
