import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path=":username" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
};

export default App;
