{
  /*import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      {/* Outlet renders the matched child route components */
}
{
  /*<Outlet />
      <Footer />
    </div>
  );
};

export default Layout;*/
}

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SearchBar from "./SearchBar";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  const location = useLocation();

  return (
    <div className="layout-container px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      {/* Toast notification configuration */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <header>
        <Navbar />
        <SearchBar />
      </header>

      {/*<main>
        {/* Conditionally render Hero component on homepage only 
        {location.pathname === "/" && (
          <>
            <Hero />
            <LatestCollection />
            <BestSeller />
            <OurPolicy/>
            <NewsletterBox/>
          </>
        )}
        {location.pathname === "/collection" && <Collection/>}
        
        <Outlet />
      </main> */}

      <main>
        <Outlet /> {/* Will render the current route’s component */}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
