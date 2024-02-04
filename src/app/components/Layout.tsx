import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer/Footer";
import { ToastContainer } from "react-toastify";

const Layout: React.FC = () => {
  return (
    <section>
      <Navbar />
      <ToastContainer />
      <Outlet />
      <Footer />
    </section>
  );
};

export default Layout;
