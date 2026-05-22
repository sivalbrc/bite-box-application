import React, { useEffect, useState } from "react";
import Paganation from "./Paganation";
import "./NonVeg.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartslice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


function NonVeg() {
  const dispatch = useDispatch();
  const [nonVegItems, setNonVegItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [search, setSearch] = useState("");
const [maxPrice, setMaxPrice] = useState(300);


  // const totalPages = Math.ceil(nonVegItems.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const currentItems = nonVegItems.slice(startIndex, startIndex + itemsPerPage);

  ///////////////////////////
//////////Backend data fetching//////////
useEffect(() => {
  axios.get("http://localhost:8080/api/auth/getAllNonVegItems")
    .then((res) => {
      setNonVegItems(res.data);
    })
    .catch((err) => {
      console.log("Error fetching veg items:", err);
    });
}, []);


const filteredItems = nonVegItems.filter((item) => {
  return (
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    item.price <= maxPrice
  );
});

const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;

const currentItems = filteredItems.slice(
  startIndex,
  startIndex + itemsPerPage
);
  return (
    <div className="nonVegMenu">
      {/* <h1 className="nonVegMenu__title">Non-Veg Menu</h1> */}

      <ToastContainer position="top-right" autoClose={2000} />
      <div className="filter-section">
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="search-input"
        />

        <div className="price-filter">
          <label>Max Price: ₹{maxPrice}</label>

          <input
            type="range"
            min="100"
            max="400"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(Number(e.target.value));
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <ul className="nonVegMenu__list">
        {currentItems.map((item) => (
          <li key={item.id} className="nonVegMenu__card">
            <img
              src={item.image}
              alt={item.name}
              className="nonVegMenu__image"
            />
            <h3 className="nonVegMenu__name">{item.name}</h3>
            <p className="nonVegMenu__desc">{item.description}</p>
            <span className="nonVegMenu__price">₹{item.price}</span>
            <button
              className="nonVegMenu__btn"
              onClick={() => {
                dispatch(addToCart(item));
                toast(`Item ${item.name} added to cart!`);
              }}
            >
              {" "}
              Add to Cart{" "}
            </button>
          </li>
        ))}
      </ul>

      <Paganation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default NonVeg;