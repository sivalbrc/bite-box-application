import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cartslice";
import couponReducer from "./features/couponSlice";
import ordersReducer from "./features/ordersSlice";

// Persistence middleware
const persistenceMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();

  // Persist cart to localStorage
  if (action.type.startsWith("cart/")) {
    try {
      localStorage.setItem("bitebox_cart", JSON.stringify(state.cart));
    } catch (error) {
      console.error("Failed to persist cart:", error);
    }
  }

  // Persist orders to localStorage
  if (action.type.startsWith("orders/")) {
    try {
      localStorage.setItem("bitebox_orders", JSON.stringify(state.orders));
    } catch (error) {
      console.error("Failed to persist orders:", error);
    }
  }

  // Persist coupons to localStorage
  if (action.type.startsWith("coupon/")) {
    try {
      localStorage.setItem("bitebox_coupon", JSON.stringify(state.coupon));
    } catch (error) {
      console.error("Failed to persist coupon:", error);
    }
  }

  return result;
};

// Rehydrate state from localStorage
const rehydrateState = () => {
  try {
    const cart = localStorage.getItem("bitebox_cart");
    const orders = localStorage.getItem("bitebox_orders");
    const coupon = localStorage.getItem("bitebox_coupon");

    return {
      cart: cart ? JSON.parse(cart) : [],
      orders: orders ? JSON.parse(orders) : [],
      coupon: coupon ? JSON.parse(coupon) : {},
    };
  } catch (error) {
    console.error("Failed to rehydrate state:", error);
    return {
      cart: [],
      orders: [],
      coupon: {},
    };
  }
};

const preloadedState = rehydrateState();

const store = configureStore({
  reducer: {
    cart: cartReducer,
    coupon: couponReducer,
    orders: ordersReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["cart/addToCart", "orders/addOrder"],
        ignoredPaths: ["cart", "orders"],
      },
    }).concat(persistenceMiddleware),
});

export default store;