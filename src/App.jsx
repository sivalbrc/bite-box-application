import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Sidebar from "./pages/Sidebar";
import ErrorBoundary from "./components/ErrorBoundary";

import Home from "./pages/Home";
import Veg from "./pages/Veg";
import NonVeg from "./pages/NonVeg";
import Milk from "./pages/Milk";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Signup from "./pages/Signup";
import Menu from "./pages/Menu";
import ChickenItems from "./pages/ChickenItems";
import SweetItems from "./pages/SweetItems";
import CakeItems from "./pages/CakeItems";

import Register from "./pages/Register";
import Login from "./pages/Login";

import "./App.css";

function Layout() {

  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  /* HIDE NAVBAR THESE PAGES */

  const hideNavbarRoutes = [
    "/",
    "/login",
    "/register"
  ];

  const showNavbar =
    !hideNavbarRoutes.includes(location.pathname);

  /* SHOW SIDEBAR ONLY THESE PAGES */

  const showSidebar = [
    "/veg",
    "/nonveg",
    "/milk",
    "/chicken",
    "/sweets",
    "/cakes",
  ].includes(location.pathname);

  // const showFooter = showNavbar;

  return (
    <ErrorBoundary>
      <>

        {/* NAVBAR */}

      {showNavbar && (

        <Navbar
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          closeMenu={closeMenu}
        />

      )}

      {/* SIDEBAR */}

      {showSidebar && <Sidebar />}

      {/* PAGE CONTAINER */}

      <div
        className={
          hideNavbarRoutes.includes(location.pathname)
            ? ""
            : "page-container"
        }
      >

        <Routes>

          {/* AUTH PAGES */}

          <Route path="/" element={<Register />} />

          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />

          {/* MAIN PAGES */}

          <Route path="/home" element={<Home />} />

          <Route path="/menu" element={<Menu />} />

          <Route path="/veg" element={<Veg />} />

          <Route path="/nonveg" element={<NonVeg />} />

          <Route path="/milk" element={<Milk />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/signup" element={<Signup />} />

          {/* CATEGORY PAGES */}

          <Route path="/chicken" element={<ChickenItems />} />

          <Route path="/sweets" element={<SweetItems />} />

          <Route path="/cakes" element={<CakeItems />} />

        </Routes>

      </div>

      {/* {showFooter && <Footer />}   */}

    </>
    </ErrorBoundary>
  );
}

function App() {

  return (

    <BrowserRouter>

      <Layout />

    </BrowserRouter>

  );
}

export default App;