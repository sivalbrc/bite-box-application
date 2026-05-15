import React, { useEffect, useState } from "react";
import Paganation from "./Paganation";
import "./Veg.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartslice";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

function Veg() {
    const dispatch = useDispatch();
    const [vegItems, setVegItems] = useState([]);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [search, setSearch] = useState("");
const [maxPrice, setMaxPrice] = useState(300);

  

  // const totalPages = Math.ceil(vegItems.length / itemsPerPage);
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const currentItems = vegItems.slice(startIndex, startIndex + itemsPerPage);
  const filteredItems = vegItems.filter((item) => {
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
///////////////////////////
//////////Backend data fetching//////////
useEffect(() => {
  axios.get("http://localhost:8080/api/auth/getAllVegItems")
    .then((res) => {
      setVegItems(res.data);
    })
    .catch((err) => {
      console.log("Error fetching veg items:", err);
    });
}, []);

  return (
    
    <div className="vegMenu">
      <div className="filter-section">

  {/* SEARCH BAR */}
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

  {/* PRICE FILTER */}
  <div className="price-filter">
    <label>Max Price: ₹{maxPrice}</label>

    <input
      type="range"
      min="50"
      max="300"
      value={maxPrice}
      onChange={(e) => {
        setMaxPrice(e.target.value);
        setCurrentPage(1);
      }}
    />
  </div>

</div>
      <ToastContainer position="top-right" autoClose={2000} />
     

      {/* <h1 className="vegMenu__title">Veg Menu</h1> */}

      <ul className="vegMenu__list">
        {currentItems.map((item) => (
          <li key={item.id} className="vegMenu__card">
            <img src={item.image} alt={item.name} className="vegMenu__image" />
            <h3 className="vegMenu__name">{item.name}</h3>
            <p className="vegMenu__desc">{item.description}</p>
            <span className="vegMenu__price">₹{item.price}</span>
<button className="vegMenu__btn"onClick={() => {dispatch(addToCart(item));toast(`Item ${item.name} added to cart!`);}}>Add to Cart</button>
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

export default Veg;