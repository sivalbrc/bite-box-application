import React, { useState } from "react";
import Paganation from "./Paganation";
import "./NonVeg.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartslice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SweetItems() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(300);

  const itemsPerPage = 8;

  const sweetItems = [
    { id: "Sweet-1", name: "Gulab Jamun", price: 120, image: "/vegItems/Gulab Jamun.jpg", description: "Soft milk-solid balls soaked in sugar syrup." },
    { id: "Sweet-2", name: "Rasgulla", price: 130, image: "/vegItems/Rasgulla.jpg", description: "Spongy Bengali sweet in sugar syrup." },
    { id: "Sweet-3", name: "Kaju Katli", price: 250, image: "/vegItems/Kaju Katli.jpg", description: "Delicious cashew fudge sweet." },
    { id: "Sweet-4", name: "Rasmalai", price: 160, image: "/vegItems/Rasmalai.jpg", description: "Soft paneer discs in sweet creamy milk." },
    { id: "Sweet-5", name: "Jalebi", price: 100, image: "/vegItems/Jalebi.jpg", description: "Crispy spiral sweet dipped in syrup." },
    { id: "Sweet-6", name: "Laddu", price: 110, image: "/vegItems/Laddu.jpg", description: "Traditional Indian festive sweet." },
    { id: "Sweet-7", name: "Mysore Pak", price: 180, image: "/vegItems/Mysore Pak.jpg", description: "Rich ghee-based South Indian sweet." },
    { id: "Sweet-8", name: "Badusha", price: 140, image: "/vegItems/Badusha.jpg", description: "Flaky sweet coated with sugar glaze." },
    { id: "Sweet-9", name: "Kalakand", price: 170, image: "/vegItems/kalakand.jpg", description: "Soft milk cake sweet." },
    { id: "Sweet-10", name: "Soan Papdi", price: 130, image: "/vegItems/Soan Papdi.jpg", description: "Flaky cube-shaped Indian sweet." },
    { id: "Sweet-11", name: "Cham Cham", price: 150, image: "/vegItems/Cham Cham.jpg", description: "Bengali sweet made with paneer." },
    { id: "Sweet-12", name: "Peda", price: 140, image: "/vegItems/Peda.jpg", description: "Milk-based soft Indian sweet." },
    { id: "Sweet-13", name: "Double Ka Meetha", price: 190, image: "/vegItems/Double Ka Meetha.jpg", description: "Hyderabadi bread pudding dessert." },
    { id: "Sweet-14", name: "Rabri", price: 170, image: "/vegItems/Rabri.jpg", description: "Sweet thickened milk dessert." },
    { id: "Sweet-15", name: "Halwa", price: 150, image: "/vegItems/Halwa.jpg", description: "Traditional rich sweet pudding." },
    { id: "Sweet-16", name: "Coconut Barfi", price: 160, image: "/vegItems/Coconut Barfi.jpg", description: "Sweet coconut fudge cubes." },
    { id: "Sweet-17", name: "Dry Fruit Laddu", price: 220, image: "/vegItems/Dry Fruit Laddu.jpg", description: "Healthy laddus with dry fruits." },
    { id: "Sweet-18", name: "Milk Cake", price: 180, image: "/vegItems/Milk Cake.jpg", description: "Dense caramelized milk sweet." },
    { id: "Sweet-19", name: "Imarti", price: 140, image: "/vegItems/Imarti.jpg", description: "Juicy flower-shaped Indian sweet." },
    { id: "Sweet-20", name: "Basundi", price: 170, image: "/vegItems/Basundi.jpg", description: "Creamy sweet milk dessert." }
  ];

  // const totalPages = Math.ceil(sweetItems.length / itemsPerPage);

  // const startIndex = (currentPage - 1) * itemsPerPage;

  // const currentItems = sweetItems.slice(
  //   startIndex,
  //   startIndex + itemsPerPage
  // );
  const filteredItems = sweetItems.filter((item) => {

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

      {/* TOP RATING */}
      <div className="nonVegMenu__rating">
        ⭐ 4.8
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

export default SweetItems;