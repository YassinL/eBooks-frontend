import React, { useContext, useEffect } from "react";
import UserContext from "../../../contexts/UserContext";

export default function Profile() {
  const context = useContext(UserContext);

  useEffect(() => {}, []);

  console.log(context);
  return (
    <div>
      <h2>{context.user.firstName}</h2>
      <h2>{context.user.lastName}</h2>
    </div>
  );
}
