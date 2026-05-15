import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import couponReducer from "./features/couponSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    coupon: couponReducer,
  },
});

export default store;