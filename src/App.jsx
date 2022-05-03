import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="login" element={<Login />} />
        <Route path=":username" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
};

export default App;
