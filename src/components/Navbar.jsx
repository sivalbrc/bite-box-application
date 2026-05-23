import { Link, useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import NotificationCenter from "./NotificationCenter";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import "./Navbar.css";

function Navbar({ menuOpen, setMenuOpen, closeMenu }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  let cartItems = useSelector(state => state.cart);  
  let quantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to sign out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#7e22ce",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        setProfileDropdownOpen(false);
        closeMenu();
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have successfully logged out.",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/login");
      }
    });
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h2 className="logo" onClick={() => navigate(isAuthenticated ? "/home" : "/login")}>BiteBox</h2>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          {isAuthenticated ? (
            <>
              <Link to="/home" className="nav-link" onClick={closeMenu}>
                <i className="fa-solid fa-house"></i> Home
              </Link>

              <Link to="/Cart" className="nav-link" onClick={closeMenu}>
                <i className="fa-solid fa-cart-shopping"></i> Cart {quantity > 0 && <span>{quantity}</span>}
              </Link>

              <Link to="/Orders" className="nav-link" onClick={closeMenu}>
                <i className="fa-solid fa-receipt"></i> Orders
              </Link>

              <NotificationCenter />

              {/* USER PROFILE DROPDOWN */}
              <div className="user-profile-menu">
                <button 
                  className="profile-trigger-btn"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                >
                  <i className="fa-solid fa-circle-user"></i>
                  <span className="profile-username">{user?.name?.split(" ")[0] || "User"}</span>
                  <i className="fa-solid fa-chevron-down caret"></i>
                </button>

                {profileDropdownOpen && (
                  <div className="profile-dropdown">
                    <div className="profile-dropdown-header">
                      <h4>{user?.name || "BiteBox Foodie"}</h4>
                      <p>{user?.email || "foodie@bitebox.com"}</p>
                      {user?.phone && <p className="phone"><i className="fa-solid fa-phone"></i> {user.phone}</p>}
                    </div>
                    <div className="profile-dropdown-divider"></div>
                    <button className="logout-btn" onClick={handleLogout}>
                      <i className="fa-solid fa-sign-out-alt"></i> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={closeMenu}>
                <i className="fa-solid fa-sign-in-alt"></i> Login
              </Link>
              <Link to="/register" className="nav-link premium-register-btn" onClick={closeMenu}>
                <i className="fa-solid fa-user-plus"></i> Register
              </Link>
            </>
          )}
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