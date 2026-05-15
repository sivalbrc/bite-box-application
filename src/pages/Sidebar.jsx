import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {

  return (

    <div className="sidebar">

      <NavLink
        to="/veg"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        <i className="fa-solid fa-leaf"></i>
        Veg
      </NavLink>

      <NavLink
        to="/nonveg"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        <i className="fa-solid fa-drumstick-bite"></i>
        Non-Veg
      </NavLink>

      <NavLink
        to="/milk"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        <i className="fa-solid fa-blender"></i>
        Milkshake
      </NavLink>

      <NavLink
        to="/chicken"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        <i className="fa-solid fa-drumstick-bite"></i>
        Chicken Items
      </NavLink>

      <NavLink
        to="/sweets"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        <i className="fa-solid fa-candy-cane"></i>
        Sweet Items
      </NavLink>

      <NavLink
        to="/cakes"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        <i className="fa-solid fa-cake-candles"></i>
        Cake Items
      </NavLink>
      {/* <NavLink
        to="/cart"
        className={({ isActive }) =>
          isActive ? "nav-link active" : "nav-link"
        }
      >
        <i className="fa-solid fa-cart-shopping"></i>
        Cart
      </NavLink> */}

    </div>

  );
}

export default Sidebar;