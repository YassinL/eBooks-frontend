import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../contexts/AuthContext";

export default function useSigninForm(callback) {
  const [connexion, setConnexion] = useState({
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setConnexion((connexion) => ({
      ...connexion,
      [name]: value,
    }));
  };

  const { dispatch } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setConnexion({
        ...connexion,
        isSubmitting: true,
        errorMessage: null,
      });
      const result = await axios.post(
        `http://localhost:8085/api/signIn`,
        connexion
      );
      if (result.status === 200) {
        console.log("je suis ici ", result.status);
        return dispatch({ type: "SIGNIN", payload: result });
      }
    } catch (error) {
      setConnexion({
        ...connexion,
        isSubmitting: false,
        errorMessage: error.response,
      });
    }
  };

  return {
    handleSubmit,
    handleChange,
    connexion,
  };
}
