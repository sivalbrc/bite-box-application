import React, { useState } from "react";
import Paganation from "./Paganation";
import "./NonVeg.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartslice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function ChickenItems() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(300);

  const itemsPerPage = 4;

  const chickenItems = [
  { id: "Chicken-1", name: "Chilli Chicken", price: 220, image: "/nonVegItems/Chilli Chicken.jpg", description: "Spicy Indo-Chinese chicken dish." },
  { id: "Chicken-2", name: "Chicken Do Pyaza", price: 240, image: "/nonVegItems/Chicken Do Pyaza.jpg", description: "Chicken cooked with double onions and spices." },
  { id: "Chicken-3", name: "Chicken Kolhapuri", price: 260, image: "/nonVegItems/Chicken Kolhapuri.jpg", description: "Fiery Maharashtrian style chicken curry." },
  { id: "Chicken-4", name: "Chicken Hyderabadi", price: 270, image: "/nonVegItems/Chicken Hyderabadi.jpg", description: "Rich Hyderabadi chicken masala." },
  { id: "Chicken-5", name: "Chicken Mughlai", price: 290, image: "/nonVegItems/Chicken Mughlai.jpg", description: "Creamy Mughlai chicken curry." },
  { id: "Chicken-6", name: "Chicken Korma", price: 280, image: "/nonVegItems/Chicken Korma.jpg", description: "Mild creamy chicken korma." },
  { id: "Chicken-7", name: "Chicken Chettinad", price: 250, image: "/nonVegItems/Chicken Chettinad.jpg", description: "South Indian spicy chicken curry." },
  { id: "Chicken-8", name: "Chicken Vindaloo", price: 260, image: "/nonVegItems/Chicken Vindaloo.jpg", description: "Tangy and spicy Goan chicken curry." },
  { id: "Chicken-9", name: "Chicken Stew", price: 210, image: "/nonVegItems/Chicken Stew.jpg", description: "Light Kerala style chicken stew." },
  { id: "Chicken-10", name: "Chicken Keema", price: 230, image: "/nonVegItems/Chicken Keema.jpg", description: "Minced chicken cooked with spices." },
  { id: "Chicken-11", name: "Chicken Cutlet", price: 160, image: "/nonVegItems/Chicken Cutlet.jpg", description: "Crispy fried chicken cutlets." },
  { id: "Chicken-12", name: "Chicken Nuggets", price: 180, image: "/nonVegItems/Chicken Nuggets.jpg", description: "Golden fried chicken nuggets." },
  { id: "Chicken-13", name: "Chicken Popcorn", price: 170, image: "/nonVegItems/Chicken Popcorn.jpg", description: "Bite-sized crispy chicken popcorn." },
  { id: "Chicken-14", name: "Chicken Sausage", price: 190, image: "/nonVegItems/Chicken Sausage.jpg", description: "Grilled juicy chicken sausages." },
  { id: "Chicken-15", name: "Chicken Spring Roll", price: 150, image: "/nonVegItems/Chicken Spring Roll.jpg", description: "Crunchy rolls stuffed with chicken." },
  { id: "Chicken-16", name: "Chicken Hot Wings", price: 220, image: "/nonVegItems/Chicken Hot Wings.jpg", description: "Spicy crispy hot wings." },
  { id: "Chicken-17", name: "Chicken Gravy", price: 240, image: "/nonVegItems/Chicken Gravy.jpg", description: "Rich and flavorful chicken gravy." },
  { id: "Chicken-18", name: "Chicken Dry Fry", price: 230, image: "/nonVegItems/Chicken Dry Fry.jpg", description: "Dry roasted spicy chicken fry." },
  { id: "Chicken-19", name: "Chicken Afghani", price: 300, image: "/nonVegItems/Chicken Afghani.jpg", description: "Creamy Afghani style grilled chicken." },
  { id: "Chicken-20", name: "Chicken Reshmi Kebab", price: 280, image: "/nonVegItems/Chicken Reshmi Kebab.jpg", description: "Soft juicy creamy chicken kebabs." }
];

  // const totalPages = Math.ceil(chickenItems.length / itemsPerPage);

  // const startIndex = (currentPage - 1) * itemsPerPage;

  // const currentItems = chickenItems.slice(
  //   startIndex,
  //   startIndex + itemsPerPage
  // );
  const filteredItems = chickenItems.filter((item) => {

  return (

    item.name.toLowerCase().includes(search.toLowerCase()) &&

    item.price <= maxPrice

  );

});

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
    <div className="nonVegMenu">

      <ToastContainer position="top-right" autoClose={2000} />
      <div className="filter-section">

        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          } }
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
              onClick={() => { dispatch(addToCart(item)); toast(`Item ${item.name} added to cart!`); }}
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

export default ChickenItems;