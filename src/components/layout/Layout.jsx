import React from "react";
import { useLocation } from "react-router-dom";

import Header from "./Header";
import Container from "./Container";

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/login" && <Header />}
      <main className="bg-gray-50 min-h-screen h-full">
        <Container>{children}</Container>
      </main>
    </>
  );
};

export default Layout;
