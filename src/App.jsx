import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./pages/Sidebar";

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

import "./App.css";

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  /* SHOW SIDEBAR ONLY THESE PAGES */

  const showSidebar = [
    "/veg",
    "/nonveg",
    "/milk",
    "/chicken",
    "/sweets",
    "/cakes"
  ].includes(location.pathname);

  return (
    <>
      <Navbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        closeMenu={closeMenu}
      />

      {/* CONDITIONAL SIDEBAR */}

      {showSidebar && <Sidebar />}

      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/menu" element={<Menu />} />

          <Route path="/veg" element={<Veg />} />

          <Route path="/nonveg" element={<NonVeg />} />

          <Route path="/milk" element={<Milk />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/chicken" element={<ChickenItems />} />

          <Route path="/sweets" element={<SweetItems />} />

          <Route path="/cakes" element={<CakeItems />} />
          <Route path="/cart" element={<Cart />} />
          
        </Routes>
      </div>
    </>
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
