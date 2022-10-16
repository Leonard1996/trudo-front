import React from "react";
import { Navigate } from "react-router-dom";
import parseJson from "../helpers/parseJson";

const PrivateRoute = ({ children }) => {
  const token = parseJson(localStorage.getItem("user"));

  if (!Boolean(token)) {
    return <Navigate to="/authenticate" replace />;
  }

  return children;
};

export default PrivateRoute;
