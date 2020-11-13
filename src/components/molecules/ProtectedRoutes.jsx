import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import IsLoading from "./IsLoading/IsLoading"

export default function ProtectedRoutes({ component: Component, ...rest }) {
  const { state } = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(props) => {
				return !state.isLoading ? (
					state.roleAdmin ? (
						<Component {...props} />
					) : (
						<Redirect to="/" />
					)
				) : (
					<IsLoading />
				);
			}}
		/>
	);
}
