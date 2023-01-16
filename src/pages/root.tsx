import { Box, List, Tab, Tabs } from "@mui/material";
import * as React from "react";
import { BrowserRouter, Link, NavLink, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/header";

const Root = () => {
  
  return (
    <div>
      <header >
        <Header />
      </header>
      <Outlet />
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Root;
