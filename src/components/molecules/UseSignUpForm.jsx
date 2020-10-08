import { useState } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";

export default function useSignupForm() {
  const [data, setdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthday: "",
    phoneNumber: "",
    isSubmitting: false,
    errorMessage: null,
  });

  const handleInputChange = (event) => {
    event.persist();
    setdata(() => ({
      ...data,
      [event.target.name]: event.target.value,
    }));
    console.log("data", data);
  };

  // const history = useHistory();
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const result = await axios.post(`http://localhost:8085/api/signUp`, data);
      if (result.status === 201) {
        // history.push();
        alert("Tu es bien inscrit !");
      }
    } catch (error) {
      setdata({
        ...data,
        isSubmitting: false,
        errorMessage: error.response,
      });
    }
  };

  return {
    handleSubmit,
    handleInputChange,
    data,
  };
}
