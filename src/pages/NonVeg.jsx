import React, { useEffect, useState } from "react";
import Paganation from "./Paganation";
import "./NonVeg.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartslice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const FALLBACK_NON_VEG_ITEMS = [
  { id: 201, name: "Chicken Biryani", description: "Fragrant basmati rice layered with juicy, marinated chicken, saffron, and aromatic spices.", price: 290, image: "/nonVegItems/Chicken Biryani.jpg" },
  { id: 202, name: "Butter Chicken", description: "Tender tandoori chicken cooked in a rich, buttery, velvety smooth tomato cream sauce.", price: 320, image: "/nonVegItems/Butter Chicken.jpg" },
  { id: 203, name: "Chicken 65", description: "Spicy, deep-fried chicken cubes tossed with curry leaves, green chilies, and yogurt.", price: 240, image: "/nonVegItems/Chicken 65.jpg" },
  { id: 204, name: "Mutton Biryani", description: "Slow-cooked basmati rice and succulent goat meat, flavored with saffron, cardamom, and mint.", price: 380, image: "/nonVegItems/Mutton Biryani.jpg" },
  { id: 205, name: "Tandoori Chicken", description: "Juicy chicken roasted in a clay oven with yogurt marinade and fiery spices.", price: 280, image: "/nonVegItems/Tandoori Chicken.jpg" },
  { id: 206, name: "Chicken Lollipop", description: "Crisp and juicy seasoned chicken drumettes, served hot with schezwan dipping sauce.", price: 250, image: "/nonVegItems/Chicken Lollipop.jpg" },
  { id: 207, name: "Chicken Tikka", description: "Boneless chicken chunks marinated in spiced yogurt and grilled to smoky perfection.", price: 270, image: "/nonVegItems/Chicken Tikka.jpg" },
  { id: 208, name: "Egg Fried Rice", description: "Fragrant wok-fried rice tossed with scrambled eggs, fresh green onions, and soy sauce.", price: 180, image: "/nonVegItems/Egg Fried Rice.jpg" },
  { id: 209, name: "Chicken Fried Rice", description: "Authentic street-style fried rice loaded with scrambled eggs, chicken chunks, and veggies.", price: 210, image: "/nonVegItems/Chicken Fried Rice.jpg" },
  { id: 210, name: "Egg Curry", description: "Hard-boiled eggs simmered in a spicy, onion-tomato gravy infused with classic spices.", price: 160, image: "/nonVegItems/Egg Curry.jpg" },
];

function NonVeg() {
  const dispatch = useDispatch();
  const [nonVegItems, setNonVegItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(300);

  // Backend data fetching with robust local fallbacks
  useEffect(() => {
    axios.get("http://localhost:8080/api/auth/getAllNonVegItems")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setNonVegItems(res.data);
          // alert(JSON.stringify(res.data));
        } else {
          console.log("Empty non-veg items returned from server, using local fallbacks.");
          // setNonVegItems(FALLBACK_NON_VEG_ITEMS);
        }
      })
      .catch((err) => {
        console.log("Error fetching non-veg items, using local fallbacks:", err);
        // setNonVegItems(FALLBACK_NON_VEG_ITEMS);
      });
  }, []);
  // alert(JSON.stringify(nonVegItems));

  const filteredItems = nonVegItems.filter((item) => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      item.price <= maxPrice
    );
  });
  // console.log(nonVegItems);

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

      {/* RATING */}
      <div className="nonVegMenu__rating">
        <span>⭐4.5</span>
        <span>{item.rating}</span>
      </div>

      <img
        src={item.image}
        alt={item.name}
        className="nonVegMenu__image"
      />

      <h3 className="nonVegMenu__name">
        {item.name}
      </h3>

      <p className="nonVegMenu__desc">
        {item.description}
      </p>

      <span className="nonVegMenu__price">
        ₹{item.price}
      </span>

      <button
        className="nonVegMenu__btn"
        onClick={() => {
          dispatch(addToCart(item));
          toast(`Item ${item.name} added to cart!`);
        }}
      >
        Add to Cart
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