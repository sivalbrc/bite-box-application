import React, { useState } from "react";
import Paganation from "./Paganation";
import "./Veg.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartslice";
import { ToastContainer, toast } from "react-toastify";
// import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const FALLBACK_VEG_ITEMS = [
  { id: 101, name: "Paneer Butter Masala", description: "Rich, creamy paneer cubes simmered in a tomato, butter, and cashew gravy.", price: 220, image: "/vegItems/Paneer-Butter-Masala.jpg" },
  { id: 102, name: "Aloo Paratha", description: "Golden whole wheat flatbread stuffed with spiced mashed potatoes, served with butter.", price: 90, image: "/vegItems/Aloo Paratha.jpg" },
  { id: 103, name: "Kadai Paneer", description: "Cottage cheese pieces tossed with bell peppers and freshly ground kadai spices.", price: 230, image: "/vegItems/Kadai Paneer.jpg" },
  { id: 104, name: "Pav Bhaji", description: "Spicy mashed vegetable curry topped with butter and served with hot toasted soft pav.", price: 120, image: "/vegItems/Pav Bhaji.jpg" },
  { id: 105, name: "Palak Paneer", description: "Soft paneer cubes in a silky, spiced fresh spinach gravy topped with cream.", price: 210, image: "/vegItems/Palak Paneer.jpg" },
  { id: 106, name: "Dal Tadka", description: "Yellow lentils tempered with cumin, garlic, red chilies, and pure ghee.", price: 160, image: "/vegItems/Dal Tadka.avif" },
  { id: 107, name: "Veg Manchurian", description: "Crisp vegetable dumplings cooked in a savory, sweet and tangy Manchurian sauce.", price: 180, image: "/vegItems/Veg Manchurian.jpg" },
  { id: 108, name: "Veg Fried Rice", description: "Wok-tossed rice with fresh seasonal vegetables and authentic Chinese seasonings.", price: 170, image: "/vegItems/Veg Fried Rice.jpg" },
  { id: 109, name: "Rajma Chawal", description: "Classic homestyle red kidney beans curry served with fluffy basmati rice.", price: 140, image: "/vegItems/Rajma Chawal.jpg" },
  { id: 110, name: "Veg Sandwich", description: "Crispy grilled sandwich loaded with fresh veggies, green chutney, and cheese.", price: 80, image: "/vegItems/Veg Sandwich.jpg" },
];

function Veg() {


  const vegItems = [
    { id: "Veg-1", name: "Paneer Butter Masala", price: 1, image: "/vegItems/Paneer-Butter-Masala.jpg", description: "Soft paneer cubes cooked in rich tomato butter gravy." },
    { id: "Veg-2", name: "Veg Biryani", price: 180, image: "/vegItems/veg-biryani.jpg", description: "Fragrant basmati rice cooked with mixed vegetables and spices." },
    { id: "Veg-3", name: "Masala Dosa", price: 90, image: "/vegItems/mysore_masala_dosa.avif", description: "Crispy dosa stuffed with spicy potato filling." },
    { id: "Veg-4", name: "Chole Bhature", price: 120, image: "/vegItems/cholle-bhature.jpeg", description: "Spicy chickpea curry served with deep-fried bread." },
    { id: "Veg-5", name: "Vegetable Pulao", price: 140, image: "/vegItems/Vegetable Pulao.jpg", description: "Lightly spiced rice dish with fresh vegetables." },
    { id: "Veg-6", name: "Aloo Paratha", price: 80, image: "/vegItems/Aloo Paratha.jpg", description: "Stuffed flatbread with spicy mashed potatoes." },
    { id: "Veg-7", name: "Palak Paneer", price: 200, image: "/vegItems/Palak Paneer.jpg", description: "Paneer cubes cooked in creamy spinach gravy." },
    { id: "Veg-8", name: "Veg Manchurian", price: 160, image: "/vegItems/Veg Manchurian.jpg", description: "Fried vegetable balls tossed in Indo-Chinese sauce." },
    { id: "Veg-9", name: "Spring Rolls", price: 130, image: "/vegItems/Spring Rolls.jpg", description: "Crispy rolls stuffed with seasoned vegetables." },
    { id: "Veg-10", name: "Rajma Chawal", price: 150, image: "/vegItems/Rajma Chawal.jpg", description: "Kidney bean curry served with steamed rice." },
    { id: "Veg-11", name: "Paneer Tikka", price: 210, image: "/vegItems/Paneer Tikka.webp", description: "Grilled paneer cubes marinated in spices and yogurt." },
    { id: "Veg-12", name: "Veg Fried Rice", price: 140, image: "/vegItems/Veg Fried Rice.jpg", description: "Stir-fried rice with vegetables and soy sauce." },
    { id: "Veg-13", name: "Dal Tadka", price: 130, image: "/vegItems/Dal Tadka.avif", description: "Yellow lentils tempered with spices and herbs." },
    { id: "Veg-14", name: "Kadai Paneer", price: 230, image: "/vegItems/Kadai Paneer.jpg", description: "Paneer cooked with capsicum in spicy kadai masala." },
    { id: "Veg-15", name: "Vegetable Cutlet", price: 100, image: "/vegItems/Vegetable Cutlet.jpg", description: "Crispy patties made with mixed vegetables and spices。" },
    { id: "Veg-16", name: "Tomato Soup", price: 90, image:"/vegItems/Tomato Soup.jpg", description:"Smooth and tangy tomato soup with herbs。" },
    { id: "Veg-17", name: "Veg Sandwich", price: 110, image: "/vegItems/Veg Sandwich.jpg", description: "Grilled sandwich filled with fresh vegetables." },
    { id: "Veg-18", name: "Pav Bhaji", price: 120, image: "/vegItems/Pav Bhaji.jpg", description: "Spicy mashed vegetable curry served with buttered pav." },
    { id: "Veg-19", name: "Mushroom Masala", price: 190, image: "/vegItems/Mushroom Masala.jpg", description: "Mushrooms cooked in rich onion-tomato gravy." },
    { id: "Veg-20", name: "Veg Noodles", price: 130, image: "/vegItems/Veg Noodles.jpg", description: "Stir-fried noodles with fresh vegetables and sauces." }
  ];

    const dispatch = useDispatch();
    // const [vegItems, setVegItems] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(300);

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

  // Backend data fetching with robust local fallbacks
  // useEffect(() => {
  //   axios.get("http://localhost:8080/api/auth/getAllVegItems")
  //     .then((res) => {
  //       if (res.data && res.data.length > 0) {
  //         setVegItems(res.data);
  //       } else {
  //         console.log("Empty veg items returned from server, using local fallbacks.");
  //         // setVegItems(FALLBACK_VEG_ITEMS);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Error fetching veg items, using local fallbacks:", err);
  //       // setVegItems(FALLBACK_VEG_ITEMS);
  //     });
  // }, []);
  
 

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

      {/* RATING */}
      <div className="vegMenu__rating">
        <span>⭐4.5</span>
        <span>{item.rating}</span>
      </div>

      <img
        src={item.image}
        alt={item.name}
        className="vegMenu__image"
      />

      <h3 className="vegMenu__name">
        {item.name}
      </h3>

      <p className="vegMenu__desc">
        {item.description}
      </p>

      <span className="vegMenu__price">
        ₹{item.price}
      </span>

      <button
        className="vegMenu__btn"
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

export default Veg;