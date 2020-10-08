import React from "react";

export default function Profile() {
  const id = localStorage.getItem("user");
  const email = localStorage.getItem("email");
  const firstname = localStorage.getItem("firstname");
  const lastname = localStorage.getItem("lastname");
  return (
    <div>
      <h2>{firstname}</h2>
      <h2>{lastname}</h2>
    </div>
  );
}
