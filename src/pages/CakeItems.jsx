import React, { useState } from "react";
import Paganation from "./Paganation";
import "./NonVeg.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartslice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CakeItems() {

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");

  /* UPDATED */
  const [maxPrice, setMaxPrice] = useState(600);

  const itemsPerPage = 4;

  const cakeItems = [

    { id: "Cake-1", name: "Chocolate Cake", price: 350, image: "/MilkItems/Oreo Cake.jpg", description: "Rich creamy chocolate cake." },

    { id: "Cake-2", name: "Black Forest Cake", price: 400, image: "/MilkItems/Black Forest Cake.jpg", description: "Classic black forest cream cake." },

    { id: "Cake-3", name: "White Forest Cake", price: 420, image: "/MilkItems/White Forest Cake.jpg", description: "Delicious white cream forest cake." },

    { id: "Cake-4", name: "Red Velvet Cake", price: 450, image: "/MilkItems/Red Velvet Cake.jpg", description: "Soft red velvet layered cake." },

    { id: "Cake-5", name: "Vanilla Cake", price: 300, image: "/MilkItems/Vanilla Cake.jpg", description: "Simple soft vanilla cream cake." },

    { id: "Cake-6", name: "Strawberry Cake", price: 380, image: "/MilkItems/Strawberry Cake.jpg", description: "Fresh strawberry flavored cake." },

    { id: "Cake-7", name: "Butterscotch Cake", price: 390, image: "/MilkItems/Butterscotch Cake.jpg", description: "Crunchy butterscotch cream cake." },

    { id: "Cake-8", name: "Pineapple Cake", price: 360, image: "/MilkItems/Pineapple Cake.jpg", description: "Juicy pineapple cream cake." },

    { id: "Cake-9", name: "Fruit Cake", price: 430, image: "/MilkItems/Fruit Cake.jpg", description: "Mixed fresh fruit layered cake." },

    { id: "Cake-10", name: "Coffee Cake", price: 370, image: "/MilkItems/Coffee Cake.jpg", description: "Coffee flavored creamy cake." },

    { id: "Cake-11", name: "Mango Cake", price: 410, image: "/MilkItems/mango cake.jpg", description: "Sweet mango cream cake." },

    { id: "Cake-12", name: "Oreo Cake", price: 450, image: "/MilkItems/Oreo Cake.jpg", description: "Crunchy Oreo chocolate cake." },

    { id: "Cake-13", name: "KitKat Cake", price: 500, image: "/MilkItems/KitKat Cake.jpg", description: "Chocolate cake topped with KitKat." },

    { id: "Cake-14", name: "Truffle Cake", price: 480, image: "/MilkItems/Truffle Cake.jpg", description: "Rich dark chocolate truffle cake." },

    { id: "Cake-15", name: "Blueberry Cake", price: 420, image: "/MilkItems/Blueberry Cake.jpg", description: "Creamy blueberry flavored cake." },

    { id: "Cake-16", name: "Cheese Cake", price: 520, image: "/MilkItems/Cheese Cake.jpg", description: "Smooth creamy cheesecake dessert." },

    { id: "Cake-17", name: "Caramel Cake", price: 400, image: "/MilkItems/Caramel Cake.jpg", description: "Sweet caramel layered cake." },

    { id: "Cake-18", name: "Cup Cake", price: 120, image: "/MilkItems/Cup Cake.jpg", description: "Soft mini cream cupcake." },

    { id: "Cake-19", name: "Ice Cream Cake", price: 550, image: "/MilkItems/Ice Cream Cake.jpg", description: "Frozen creamy ice cream cake." },

    { id: "Cake-20", name: "Rainbow Cake", price: 600, image: "/MilkItems/Rainbow Cake.jpg", description: "Colorful layered rainbow cake." }

  ];

  /* FILTER LOGIC */

  const filteredItems = cakeItems.filter((item) => {

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

    <div className="nonVegMenu">

      <ToastContainer
        position="top-right"
        autoClose={2000}
      />

      {/* FILTER SECTION */}

      <div className="filter-section">

        <input
          type="text"
          placeholder="Search Cakes..."
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
            min="100"
            max="600"
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

      {/* CARD LIST */}

      <ul className="nonVegMenu__list">

        {currentItems.length > 0 ? (

          currentItems.map((item) => (

            <li
              key={item.id}
              className="nonVegMenu__card"
            >

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

                  toast(
                    `${item.name} added to cart!`
                  );

                }}
              >
                Add to Cart
              </button>

            </li>

          ))

        ) : (

          <h2 className="no-items">
            No Cakes Found
          </h2>

        )}

      </ul>

      {/* PAGINATION */}

      {filteredItems.length > 0 && (

        <Paganation
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />

      )}

    </div>
  );
}

export default CakeItems;