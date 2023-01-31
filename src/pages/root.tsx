import { Outlet } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/header";

const Root = () => {
  return (
    <div>
      <header>
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
