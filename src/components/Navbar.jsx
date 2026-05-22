import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useSelector } from "react-redux";
import "./Navbar.css";

function Navbar({ menuOpen, setMenuOpen, closeMenu }) {
  let  cartItems = useSelector(state => state.cart);  
  let quantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  return (
    <nav className="navbar">

      <div className="nav-container">

        <h2 className="logo">BiteBox</h2>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>

          <Link to="/home" className="nav-link" onClick={closeMenu}>
            <i className="fa-solid fa-house"></i> Home
          </Link>

          {/* <Link to="/Veg" className="nav-link" onClick={closeMenu}>
            <i className="fa-solid fa-leaf"></i> Veg
          </Link> */}

          {/* <Link to="/NonVeg" className="nav-link" onClick={closeMenu}>
            <i className="fa-solid fa-drumstick-bite"></i> Non-Veg
          </Link> */}

          {/* <Link to="/Milk" className="nav-link" onClick={closeMenu}>
            <i className="fa-solid fa-blender"></i> Milkshake
          </Link> */}

          <Link to="/Cart" className="nav-link" onClick={closeMenu}>
            <i className="fa-solid fa-cart-shopping"></i> Cart {quantity}
          </Link>

          <Link to="/Orders" className="nav-link" onClick={closeMenu}>
            <i className="fa-solid fa-receipt"></i> Orders
          </Link>
          <Link to="/register" className="nav-link" onClick={closeMenu}>
            <i className="fa-solid fa-user-plus"></i> Register
          </Link>
          {/* <Link to="/login" className="nav-link" onClick={closeMenu}>
            <i className="fa-solid fa-user"></i> Login
          </Link> */}

        </div>

        <div
          className="menu-icon"
          onClick={() => setMenuOpen(prev => !prev)}
        >
          <i className="fa-solid fa-bars"></i>
        </div>

      </div>

    
      {menuOpen && (
        <div className="overlay" onClick={closeMenu}></div>
      )}

    </nav>
  );
}

export default Navbar;