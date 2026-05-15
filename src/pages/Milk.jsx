import React, { useState } from "react";
import Pagination from "./Paganation";
import "./Milk.css";

import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartslice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Milk() {

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  /* SEARCH */

  const [search, setSearch] = useState("");

  /* PRICE FILTER */

  const [maxPrice, setMaxPrice] = useState(300);

  const milkItems = [

    { id: "Milk-1", name: "Vanilla Milkshake", price: 120, image: "/MilkItems/Vanilla Milkshake.jpg", description: "Classic creamy vanilla flavored milkshake." },

    { id: "Milk-2", name: "Chocolate Milkshake", price: 140, image: "/MilkItems/Chocolate Milkshake.jpg", description: "Rich chocolate blended milkshake." },

    { id: "Milk-3", name: "Strawberry Milkshake", price: 130, image: "/MilkItems/Strawberry Milkshake.jpg", description: "Sweet and fruity strawberry shake." },

    { id: "Milk-4", name: "Mango Milkshake", price: 150, image: "/MilkItems/Mango Milkshake.jpg", description: "Refreshing mango milkshake." },

    { id: "Milk-5", name: "Banana Milkshake", price: 110, image: "/MilkItems/Banana Milkshake.jpg", description: "Healthy banana milkshake." },

    { id: "Milk-6", name: "Oreo Milkshake", price: 160, image: "/MilkItems/Oreo Milkshake.jpg", description: "Creamy Oreo shake." },

    { id: "Milk-7", name: "KitKat Milkshake", price: 170, image: "/MilkItems/KitKat Milkshake.jpg", description: "Chocolate KitKat shake." },

    { id: "Milk-8", name: "Cold Coffee", price: 130, image: "/MilkItems/Cold Coffee.jpg", description: "Chilled coffee drink." },

    { id: "Milk-9", name: "Badam Milk", price: 90, image: "/MilkItems/Badam Milk.jpg", description: "Almond flavored milk." },

    { id: "Milk-10", name: "Rose Milk", price: 80, image: "/MilkItems/Rose Milk.jpg", description: "Refreshing rose milk." },

    { id: "Milk-11", name: "Kulfi", price: 90, image: "/MilkItems/Kulfi.jpg", description: "Traditional kulfi dessert." },

    { id: "Milk-12", name: "Falooda", price: 140, image: "/MilkItems/Falooda.jpg", description: "Milk dessert with noodles." },

    { id: "Milk-13", name: "Rabri", price: 120, image: "/MilkItems/Rabri.jpg", description: "Thick sweet milk." },

    { id: "Milk-14", name: "Rasmalai", price: 130, image: "/MilkItems/Rasmalai.jpg", description: "Soft milk sweets." },

    { id: "Milk-15", name: "Milk Cake", price: 110, image: "/MilkItems/Milk Cake.jpg", description: "Milk-based sweet." },

    { id: "Milk-16", name: "Ice Cream Sundae", price: 150, image: "/MilkItems/Ice Cream Sundae.jpg", description: "Ice cream dessert." },

    { id: "Milk-17", name: "Butterscotch Milkshake", price: 140, image: "/MilkItems/Butterscotch Milkshake.jpg", description: "Butterscotch shake." },

    { id: "Milk-18", name: "Pista Milkshake", price: 150, image: "/MilkItems/Pista Milkshake.jpg", description: "Pistachio shake." },

    { id: "Milk-19", name: "Dry Fruit Shake", price: 170, image: "/MilkItems/Dry Fruit Shake.jpg", description: "Healthy dry fruit shake." },

    { id: "Milk-20", name: "Choco Lava with Ice Cream", price: 180, image: "/MilkItems/Choco Lava with Ice Cream.jpg", description: "Chocolate dessert with ice cream." }

  ];

  /* FILTER */

  const filteredItems = milkItems.filter((item) => {

    return (

      item.name.toLowerCase().includes(
        search.toLowerCase()
      ) &&

      item.price <= maxPrice

    );

  });

  /* PAGINATION */

  const totalPages = Math.ceil(
    filteredItems.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (

    <div className="milk-container">

      <ToastContainer
        position="top-right"
        autoClose={2000}
      />

      {/* SEARCH + FILTER */}

      <div className="filter-section">

        <input
          type="text"
          placeholder="Search Milkshakes..."
          value={search}
          onChange={(e) => {

            setSearch(e.target.value);

            setCurrentPage(1);

          }}
          className="search-input"
        />

        <div className="price-filter">

          <label>
            Max Price: ₹{maxPrice}
          </label>

          <input
            type="range"
            min="50"
            max="300"
            value={maxPrice}
            onChange={(e) => {

              setMaxPrice(
                Number(e.target.value)
              );

              setCurrentPage(1);

            }}
          />

        </div>

      </div>

      {/* ITEMS */}

      <ul className="milk-list">

        {currentItems.length > 0 ? (

          currentItems.map((item) => (

            <li
              key={item.id}
              className="milk-card"
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <strong>
                {item.name}
              </strong>

              <p>
                {item.description}
              </p>

              <span>
                ₹{item.price}
              </span>

              <button
                className="milk-btn"
                onClick={() => {

                  dispatch(addToCart(item));

                  toast(
                    `Item ${item.name} added to cart!`
                  );

                }}
              >
                Add to Cart
              </button>

            </li>

          ))

        ) : (

          <h2 className="no-items">
            No Milkshakes Found
          </h2>

        )}

      </ul>

      {/* PAGINATION */}

      {filteredItems.length > 0 && (

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />

      )}

    </div>
  );
}

export default Milk;