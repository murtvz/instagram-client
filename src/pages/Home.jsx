import React from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }

  return <div>Home</div>;
};

export default Home;
