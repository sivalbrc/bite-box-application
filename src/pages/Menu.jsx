import React from "react";
import { useNavigate } from "react-router-dom";
import "./Menu.css";

function Menu() {

  const navigate = useNavigate();

  const categories = [
    {
      name: "Veg",
      image: "/vegItems/veg.jpg",
      path: "/veg",
      emoji: "🥗",
    },
    {
      name: "Non Veg",
      image: "/nonVegItems/Menu.jpg",
      path: "/nonveg",
      emoji: "🍗",
    },
    {
      name: "Chicken",
      image: "/nonVegItems/Chilli Chicken.jpg",
      path: "/chicken",
      emoji: "🔥",
    },
    {
      name: "Milkshakes",
      image: "/MilkItems/Menu.jpg",
      path: "/milk",
      emoji: "🥤",
    },
    {
      name: "Sweets",
      image: "/MilkItems/sweets.jpg",
      path: "/sweets",
      emoji: "🍰",
    },
    {
      name: "Cakes",
      image: "/MilkItems/White Forest Cake.jpg",
      path: "/cakes",
      emoji: "🎂",
    },
  ];

  return (

    <div className="menuPage">

      <h1 className="menuTitle">
        Explore Menu
      </h1>

      <div className="menuGrid">

        {categories.map((item, index) => (

          <div
            key={index}
            className="menuCard"
            onClick={() => navigate(item.path)}
          >

            <img
              src={item.image}
              alt={item.name}
            />

            <div className="menuOverlay">
              <span>{item.emoji}</span>
              <h2>{item.name}</h2>
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Menu;