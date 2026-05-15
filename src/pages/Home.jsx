import React, { useState } from "react";
import "./home.css";
import Menu from "./Menu"; // IMPORT MENU

function Home() {

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="homeHero">

      {/* BACKGROUND VIDEO */}
      <div className="homeHero__bg">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="homeHero__video"
        >
          <source src="/nonVegItems/animated.mp4" type="video/mp4" />
        </video>
      </div>

      {/* OVERLAY */}
      <div className="homeHero__overlay"></div>

      {/* CONTENT */}
      <div className="homeHero__content">

        <h1 className="homeHero__title">
          Eat Fresh. Eat Smart. 🍽️
        </h1>

        <p className="homeHero__subtitle">
          Discover delicious veg & non-veg dishes made with love and delivered hot to your door.
        </p>

        <div className="homeHero__buttons">

          <button
            className="homeHero__btn"
            onClick={() => setShowMenu(true)}
          >
            Explore Menu
          </button>

        </div>
      </div>

      {/* POPUP MENU */}

      {showMenu && (

        <div
          className="menuPopupOverlay"
          onClick={() => setShowMenu(false)}
        >

          <div
            className="menuPopupBox"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="closePopup"
              onClick={() => setShowMenu(false)}
            >
              ✖
            </button>

            <Menu />

          </div>

        </div>

      )}

    </div>
  );
}

export default Home;