import { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

export default function updateUser() {
  const history = useHistory();

  const [updatedUser, setUpdatedUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthday: "",
    phoneNumber: "",
    isSubmitting: false,
    errorMessage: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const id = localStorage.getItem("user");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const token = localStorage.getItem("token");
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const userUpdated = await Axios.put(
        `http://localhost:5000/leboncoin/user/edit/${id}`,
        updateUser,
        options
      );
      if (userUpdated.status === 201) {
        setUpdatedUser({
          ...updatedUser,
          errorMessage: null,
        });
      }
      console.log(userUpdated);
      history.push("/profile");
    } catch (error) {
      setUpdatedUser({
        ...updatedUser,
        errorMessage: error.response,
      });
    }
  };
}
