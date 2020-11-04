import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./Profile.scss";
import Box from "../../atoms/SVG/Box";
import Info from "../../atoms/SVG/Info";
import Card from "../../atoms/SVG/Card";
// import UserContext from "../../../contexts/UserContext";

const style = {
  background: `url(${process.env.PUBLIC_URL}/books_entete.jpg)`,
  backgroundSize: "cover ",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

export default function Profile() {
  // const context = useContext(UserContext);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      const foundUser = await Axios(`http://localhost:8085/api/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(foundUser.data);
    };
    fetchUser();
  }, []);

  console.log(user.firstName);

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-header-photo" style={style}></div>
        <div className="profile-header-initiale">
          <h1 style={{ textTransform: "capitalize" }}>
            {`${user.firstName}`.substring(0, 1)}
          </h1>
          <h1 style={{ textTransform: "capitalize" }}>
            {`${user.lastName}`.substring(0, 1)}
          </h1>
        </div>
        <div className="profile-header-name">
          <h2 className="profile-header-name-bonjour">Bonjour,</h2>
          <h2
            className="profile-header-name-firstName"
            style={{ textTransform: "capitalize" }}
          >
            {user.firstName} {user.lastName}
          </h2>
        </div>
        <div className="profile-header-details">
          <div className="profile-header-details-logo">
            <Box />
          </div>
          <div className="profile-header-details-title">
            <h3>Mes Commandes</h3>
          </div>
        </div>
        <div className="profile-header-details">
          <div className="profile-header-details-logo">
            <Info />
          </div>
          <div className="profile-header-details-title">
            <h3>Mes informations</h3>
          </div>
        </div>
        <div className="profile-header-details">
          <div className="profile-header-details-logo">
            <Card />
          </div>
          <div className="profile-header-details-title">
            <h3>Modes de paiements</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
