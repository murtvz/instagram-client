import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Feed from "./pages/Feed";

const Profile = React.lazy(() => import("./pages/Profile"));
// most of the time users will land on Feed and Login is not used
const Login = React.lazy(() => import("./pages/Login"));

const App = () => {
  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="login" element={<Login />} />
          <Route path=":username" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
