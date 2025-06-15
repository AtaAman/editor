import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/" || location.pathname === "/home";

  return (
    <>
      {isHome && <Navbar />}
      {isHome ? <Outlet /> : <Outlet />}
      {isHome && <Footer />}
    </>
  );
}

export default App;
